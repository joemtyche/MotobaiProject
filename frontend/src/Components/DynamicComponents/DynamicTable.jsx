import { useState } from "react";
import "../pages.css";

export default function Table({
  editRow,
  columnArr = [],
  dataArr = [],
  className,
  sortField,
  sortDirection,
  allowSort = true,
}) {
  const getNestedValue = (obj, path) => {
    if (!path) {
      return "";
    }

    const value = path.split(".").reduce((acc, part) => acc?.[part], obj);
    return value ?? "N/A";
  };

  const getSortValue = (item, field) => {
    const column = columnArr.find((col) => col.row === field);
    return column?.sortAccessor
      ? column.sortAccessor(item)
      : getNestedValue(item, field);
  };

  const compareSortValues = (aValue, bValue) => {
    if (Array.isArray(aValue) || Array.isArray(bValue)) {
      const aParts = Array.isArray(aValue) ? aValue : [aValue];
      const bParts = Array.isArray(bValue) ? bValue : [bValue];
      const length = Math.max(aParts.length, bParts.length);

      for (let index = 0; index < length; index++) {
        const comparison = compareSortValues(aParts[index], bParts[index]);
        if (comparison !== 0) {
          return comparison;
        }
      }

      return 0;
    }

    const aNumber = Number(aValue);
    const bNumber = Number(bValue);
    const bothNumeric =
      aValue !== "" &&
      bValue !== "" &&
      !Number.isNaN(aNumber) &&
      !Number.isNaN(bNumber);

    if (bothNumeric) {
      return aNumber - bNumber;
    }

    return String(aValue ?? "").localeCompare(String(bValue ?? ""), undefined, {
      numeric: true,
      sensitivity: "base",
    });
  };

  const filteredDataArr = dataArr.filter((item) => !item.is_deleted);

  const [sortedField, setSortedField] = useState(sortField);
  const [sortedDirection, setSortedDirection] = useState(sortDirection);

  const handleSort = (field) => {
    if (allowSort === true && field) {
      if (sortedField === field) {
        setSortedDirection(sortedDirection === "asc" ? "desc" : "asc");
        return;
      }

      setSortedField(field);
      setSortedDirection("asc");
    }
  };

  const sortedDataArr = sortedField
    ? [...filteredDataArr].sort((a, b) => {
        const comparison = compareSortValues(
          getSortValue(a, sortedField),
          getSortValue(b, sortedField)
        );

        return sortedDirection === "asc" ? comparison : comparison * -1;
      })
    : filteredDataArr;
  const canEditRows = typeof editRow === "function";

  return (
    <section className={`h-full`}>
      <div
        className={`overflow-y-auto shadow-shadowTable max-h-[72vh] mt-1 mr-6 rounded-lg ${className}`}
      >
        <div>
          <table className={`border-collapse min-w-full`}>
            <thead
              className={`bg-red-600 p-4 m-10 text-left text-white top-0 z-0 sticky`}
            >
              <tr>
                {columnArr.map((item, index) => {
                  const isSortable = allowSort === true && Boolean(item.row);
                  const isSorted = sortedField === item.row;

                  return (
                    <th
                      key={index}
                      onClick={() => isSortable && handleSort(item.row)}
                      onKeyDown={(event) => {
                        if (
                          isSortable &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          handleSort(item.row);
                        }
                      }}
                      role={isSortable ? "button" : undefined}
                      tabIndex={isSortable ? 0 : undefined}
                      aria-sort={
                        isSorted
                          ? sortedDirection === "asc"
                            ? "ascending"
                            : "descending"
                          : undefined
                      }
                      className={`p-3 transition-all duration-100 ${
                        isSortable ? "cursor-pointer hover:bg-red-700" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span>{item.header}</span>
                        {isSortable && (
                          <span
                            aria-hidden="true"
                            className={`inline-flex w-4 shrink-0 justify-center ${
                              isSorted ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            {sortedDirection === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {sortedDataArr.length > 0 ? (
                sortedDataArr.map((item, index) => {
                  const rowKey = item.id ?? index;

                  return (
                    <tr
                      onClick={canEditRows ? () => editRow(rowKey) : undefined}
                      className={`bg-gray-50 border-b-2 border-gray-200 transition-all duration-75 ease-in ${
                        canEditRows
                          ? "cursor-pointer hover:bg-red-700 hover:border-red-800 hover:text-white"
                          : ""
                      }`}
                      key={rowKey}
                    >
                      {columnArr.map((header, i) => (
                        <td key={i} className={`p-4`}>
                          {header.customRender
                            ? header.customRender(item)
                            : header.row?.includes(".")
                            ? getNestedValue(item, header.row)
                            : header.row
                            ? item[header.row] ?? "N/A"
                            : "N/A"}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columnArr.length} className={`p-4 text-center`}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
