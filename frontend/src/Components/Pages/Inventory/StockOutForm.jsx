/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Logo from "../../../assets/Logo.png";
import Table from "../../DynamicComponents/DynamicTable";
import SearchableDropdown from "../../DynamicComponents/SearchableDropdown";
import api from "../../../api";
import {
  PlusCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useFetchData } from "../../Hooks/useFetchData.js";
import { getAvailableInventoryOptions } from "../../Utils/formHelpers.js";
import Swal from "sweetalert2";

const StockOutForm = ({ confirmHandler }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [initialStockOut, setInitialStockOut] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editingQuantity, setEditingQuantity] = useState("");

  const { data: productOptions } = useFetchData("inventory");
  const { data: employeeOptions } = useFetchData("employee");

  const formArr = [
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
    },
  ];
  const tableColumns = [
    {
      header: "SKU",
      row: "sku",
    },
    {
      header: "Product Name",
      row: "product_name",
    },

    {
      header: "Quantity to remove",
      row: "quantity",
    },
  ];

  //Makes array to OBJECT
  const prepareForm = () => {
    return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {
      product_name: "",
      supplier_name: "",
      sku: "",
      inventory_stock: "",
    });
  };
  const [form, setForm] = useState(prepareForm(formArr));
  const initialForm = prepareForm(formArr);

  const onChangeHandler = (e, fieldName, extraData = {}) => {
    const { value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
      ...extraData,
    }));
  };

  const showValidationError = (text) => {
    Swal.fire({
      title: "Error!",
      text,
      icon: "warning",
    });
  };

  const getQuantityError = (quantity, stock = form.inventory_stock) => {
    const quantityValue = Number(quantity);
    const stockValue = Number(stock);

    if (!quantity || Number.isNaN(quantityValue) || quantityValue <= 0) {
      return "Quantity must be greater than 0.";
    }

    if (!Number.isNaN(stockValue) && quantityValue > stockValue) {
      return `Quantity cannot be greater than current stock (${stockValue}).`;
    }

    return "";
  };

  const getAddProductError = () => {
    if (!form.inventory_id || !form.product_name) {
      return "Please select a valid product.";
    }

    const quantityError = getQuantityError(form.quantity);

    if (quantityError) {
      return quantityError;
    }

    if (
      initialStockOut.some((item) => item.inventory_id === form.inventory_id)
    ) {
      return `You already added ${form.product_name}.`;
    }

    return "";
  };

  //SET FORM BACK TO OLD STATE
  const onSubmitHandler = () => {
    const error = getAddProductError();

    if (error) {
      showValidationError(error);
      return;
    }

    setInitialStockOut((prevStock) => [
      { ...form, quantity: String(form.quantity) },
      ...prevStock,
    ]);
    setForm(initialForm);
  };

  // send data to database
  const getConfirmError = () => {
    if (initialStockOut.length === 0) {
      return "Please add at least one product.";
    }

    if (!selectedEmployee) {
      return "Please select an employee.";
    }

    return "";
  };

  const confirmButton = async () => {
    const error = getConfirmError();

    if (error) {
      showValidationError(error);
      return;
    }

    const { value: reason, isConfirmed: isReasonConfirmed } = await Swal.fire({
      title: "Reason for stockout",
      input: "text",
      text: "Please input a reason for stockout.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#196e3a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create order",
      inputValidator: (value) => {
        if (!value?.trim()) {
          return "Reason cannot be empty.";
        }
      },
    });

    if (!isReasonConfirmed) {
      return;
    }
  
    // Show the confirmation Swal dialog for stockout
    const result = await Swal.fire({
      customClass: { container: "create-swal" },
      title: "Are you sure you want to Stock Out?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#196e3a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create order",
    });
  
    // If confirmed, proceed with the stock out process
    if (result.isConfirmed) {
      // Pass 'reason' to the createStockOut function or handle accordingly
      createStockOut(reason.trim());
    }
  };

  const createStockOut = async (reason) => {
    if (initialStockOut.length > 0) {
      const outboundStockItems = initialStockOut.map((stockOutItem) => ({
        inventory: stockOutItem.inventory_id,
        quantity: parseInt(stockOutItem.quantity, 10),
      }));

      console.log(outboundStockItems)

      try {
        const res = await api.post(
          "/api/stockout/create/",
          {
            outboundStockItems: outboundStockItems,
            employee: selectedEmployee,
            reason: reason,
          }
        );

        console.log("Stock Out in successful:", res.data);
        // setSuccessMethod("Added");
        // toggleSuccessWindow();
        if (res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "The operation was successful.",
            icon: "success",
          }).then(() => {
            setInitialStockOut([]);
            location.reload();
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          Swal.fire({
            title: "Error!",
            text: error.response.data || "There was an issue stocking out.",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "An unexpected error occurred. Please try again.",
            icon: "error",
          });
        }
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: `Please add at least one product`,
        icon: "warning",
      });
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const searchInputClassName = "text-lg p-2 min-w-[350px]";
  const compactInputClassName =
    "h-12 w-24 text-center text-lg border-2 rounded py-2 px-3 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm";
  const availableProductOptions = getAvailableInventoryOptions(
    productOptions,
    initialStockOut
  );
  const getProductName = (item) => item.product?.product_name || "";
  const getEmployeeName = (employee) =>
    [employee.first_name, employee.middle_name, employee.last_name]
      .filter(Boolean)
      .join(" ");
  const findExactOption = (options, getLabel, value) =>
    options.find(
      (option) => getLabel(option).toLowerCase() === value.trim().toLowerCase()
    );

  const handleProductInputChange = (e) => {
    const value = e.target.value;
    const selectedProduct = findExactOption(
      availableProductOptions,
      getProductName,
      value
    );

    setForm((prevForm) => ({
      ...prevForm,
      product_name: value,
      inventory_id: selectedProduct ? selectedProduct.id : null,
      sku: selectedProduct ? selectedProduct.product.sku : "",
      inventory_stock: selectedProduct ? selectedProduct.stock : "",
    }));
  };

  const handleProductSelect = (item) => {
    setForm((prevForm) => ({
      ...prevForm,
      product_name: getProductName(item),
      inventory_id: item.id,
      sku: item.product.sku,
      inventory_stock: item.stock,
    }));
  };

  const handleEmployeeInputChange = (e) => {
    const value = e.target.value;
    const selectedOption = findExactOption(employeeOptions, getEmployeeName, value);

    setSearchInput(value);
    setForm((prevForm) => ({
      ...prevForm,
      employee_name: value,
      employee_id: selectedOption ? selectedOption.id : null,
    }));
    setSelectedEmployee(selectedOption ? selectedOption.id : null);
  };

  const handleEmployeeSelect = (employee) => {
    const employeeName = getEmployeeName(employee);

    setForm((prevForm) => ({
      ...prevForm,
      employee_name: employeeName,
      employee_id: employee.id,
    }));
    setSelectedEmployee(employee.id);
    setSearchInput(employeeName);
  };

  const validateSelectedOption = ({
    value,
    options,
    getLabel,
    message,
    onInvalid,
  }) => {
    if (!value) {
      return;
    }

    if (!findExactOption(options, getLabel, value)) {
      showValidationError(message);
      onInvalid();
    }
  };

  const closeEditModal = () => {
    setEditingRowIndex(null);
    setEditingQuantity("");
  };

  const openEditModal = (index) => {
    const selectedItem = initialStockOut[index];

    if (!selectedItem) {
      return;
    }

    setEditingRowIndex(index);
    setEditingQuantity(selectedItem.quantity || "");
  };

  const updateRowQuantity = () => {
    const selectedItem = initialStockOut[editingRowIndex];
    const error = getQuantityError(
      editingQuantity,
      selectedItem?.inventory_stock
    );

    if (error) {
      showValidationError(error);
      return;
    }

    setInitialStockOut((prevStock) =>
      prevStock.map((item, index) =>
        index === editingRowIndex
          ? { ...item, quantity: String(editingQuantity) }
          : item
      )
    );
    closeEditModal();
  };

  const deleteRow = () => {
    setInitialStockOut((prevStock) =>
      prevStock.filter((_, index) => index !== editingRowIndex)
    );
    closeEditModal();
  };

  return (
    <section>
      <div>
        <div>
          <div
            className={`absolute inset-0 w-fit h-fit m-auto bg-mainColor rounded-lg z-10
            `}
          >
            <div className={`bg-mainColor w-1/2 rounded-l-lg`}>
              <img
                className="max-w-16 rounded-l-xl"
                src={Logo}
                alt="Motobai-Logo"
              />
            </div>
            <form onSubmit={confirmHandler} className={`min-w-[70vw]`}>
              <div className={`bg-gray-100 py-10 px-8 h-full  rounded-b-lg`}>
                <h1 className="font-bold text-2xl mb-10">Stock Out</h1>
                <div className="mb-12 ml-4 h-[45vh] md:h-[40vh] sm:h-[20vh] overflow-y-hidden">
                  <div className="flex items-center gap-4">
                    <label className="flex h-12 items-center font-bold">
                      Product
                    </label>
                    <div className={`flex justify-center relative`}>
                      <div className={`border-2 rounded-md`}>
                        <SearchableDropdown
                          placeholder="Search for Product"
                          inputClassName={searchInputClassName}
                          options={availableProductOptions}
                          getOptionLabel={getProductName}
                          getOptionKey={(item) => item.id}
                          onInputChange={handleProductInputChange}
                          onSelect={handleProductSelect}
                          onBlur={() => {
                            validateSelectedOption({
                              value: form.product_name,
                              options: availableProductOptions,
                              getLabel: getProductName,
                              message: "Please select a valid product.",
                              onInvalid: () =>
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  product_name: "",
                                  inventory_id: null,
                                  sku: "",
                                  inventory_stock: "",
                                })),
                            });
                          }}
                          name="product_name"
                          value={form.product_name || ""}
                        />
                      </div>
                    </div>
                    <div className="flex h-12 w-24 flex-col items-center justify-center rounded-md border-2 border-gray-200 bg-white px-3 shadow-sm">
                      <span className="text-xs font-semibold uppercase text-gray-500">
                        Stock
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        {form.inventory_stock !== ""
                          ? form.inventory_stock
                          : "--"}
                      </span>
                    </div>
                    <label
                      className="flex h-12 items-center font-bold"
                      htmlFor="quantity"
                    >
                      Quantity
                    </label>
                    <div className="flex flex-col justify-between">
                      <input
                        className={compactInputClassName}
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={form.quantity || ""}
                        onChange={(e) => onChangeHandler(e, "quantity")}
                        min="1"
                        required
                      />
                    </div>
                    {/* CREATE ROW BUTTON */}
                    <button
                      onClick={() => {
                        onSubmitHandler();
                      }}
                      type="button"
                      className={`shadow-md bg-white border-2 border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 flex gap-4 items-center`}
                    >
                      Add Product to Stock Out
                      <PlusCircleIcon className={`size-6`} />
                    </button>
                  </div>
                  <Table
                    columnArr={tableColumns}
                    dataArr={initialStockOut}
                    className={`!h-[40vh] !max-h-[40vh]`}
                    editRow={openEditModal}
                    sortField={null}
                    sortDirection="asc"
                    allowSort={false}
                  />
                </div>

                <div className={`gap-x-6 gap-y-8 flex flex-wrap `}>
                  <div className={`flex w-full flex-wrap gap-4 items-center mb-4`}>
                    {/* EMPLOYEE SELECTION */}
                    <label className="font-bold ">Employee</label>
                    <div className={`flex justify-center relative`}>
                      <div className={`border-2 rounded-md`}>
                        <SearchableDropdown
                          placeholder="Search for Employee"
                          inputClassName={searchInputClassName}
                          options={employeeOptions}
                          getOptionLabel={getEmployeeName}
                          getOptionKey={(employee) => employee.id}
                          onInputChange={handleEmployeeInputChange}
                          onSelect={handleEmployeeSelect}
                          onBlur={() => {
                            validateSelectedOption({
                              value: searchInput,
                              options: employeeOptions,
                              getLabel: getEmployeeName,
                              message: "Select an employee from the dropdown list.",
                              onInvalid: () => {
                                setSearchInput("");
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  employee_name: "",
                                  employee_id: null,
                                }));
                                setSelectedEmployee(null);
                              },
                            });
                          }}
                          name="employee_name"
                          value={searchInput}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        confirmButton();
                      }}
                      className={`ml-auto shadow-md bg-white border-2 border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 flex gap-4 items-center `}
                    >
                      Confirm Stock-Out
                      <CheckCircleIcon className={`size-6`} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {editingRowIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[360px] rounded-lg bg-gray-100 p-8 shadow-2xl">
            <h2 className="text-2xl font-bold">Update Quantity</h2>
            <p className="mt-2 font-semibold text-gray-700">
              {initialStockOut[editingRowIndex]?.product_name}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-500">
              Current Stock: {initialStockOut[editingRowIndex]?.inventory_stock}
            </p>
            <div className="mt-6">
              <label
                className="font-bold text-gray-700"
                htmlFor="stock-out-edit-quantity"
              >
                Quantity
              </label>
              <input
                id="stock-out-edit-quantity"
                className="mt-2 h-12 w-full rounded border-2 px-4 py-2 text-center text-lg shadow-sm focus:border-green-600 focus:outline-none focus:ring-0"
                type="number"
                min="1"
                value={editingQuantity}
                onChange={(e) => setEditingQuantity(e.target.value)}
              />
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded border-2 border-gray-500 bg-white px-4 py-2 font-semibold text-gray-700 shadow-md transition-all duration-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateRowQuantity}
                className="rounded border-2 border-green-700 bg-white px-4 py-2 font-semibold text-green-700 shadow-md transition-all duration-100 hover:bg-green-700 hover:text-white"
              >
                Update
              </button>
              <button
                type="button"
                onClick={deleteRow}
                className="rounded border-2 border-red-700 bg-white px-4 py-2 font-semibold text-red-700 shadow-md transition-all duration-100 hover:bg-red-700 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StockOutForm;
