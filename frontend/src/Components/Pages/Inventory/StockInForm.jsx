/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Logo from "../../../assets/Logo.png";
import Table from "../../DynamicComponents/DynamicTable";
import SearchableDropdown from "../../DynamicComponents/SearchableDropdown";
import api from "../../../api";
import {
  ChevronDownIcon,
  PlusCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useFetchData } from "../../Hooks/useFetchData.js";
import Swal from "sweetalert2";

const StockInForm = ({ confirmHandler }) => {
  const [successWindow, setSuccessWindow] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [initialStockIn, setInitialStockIn] = useState([]);

  const { data: productOptions } = useFetchData("inventory");
  const { data: supplierOptions } = useFetchData("supplier");
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
      header: "Quantity to add",
      row: "quantity",
    },
  ];

  //Makes array to OBJECT
  const prepareForm = () => {
    return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {
      product_name: "",
      supplier_name: "",
      reference_number: "",
      sku: "",
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

  //SET FORM BACK TO OLD STATE
  const onSubmitHandler = (e) => {
    if (form && form.quantity && form.product_name) {
      setInitialStockIn((prevStock) => {
        // Check if a product with the same name already exists in the stock
        const isDuplicate = prevStock.some(
          (item) => item.product_name === form.product_name
        );

        if (isDuplicate) {
          Swal.fire({
            title: "Error",
            text: `You added a duplicate ${form.product_name}`,
            icon: "error",
          });
          return prevStock;
        } else {
          const updatedStock = [...prevStock, form];
          setForm(initialForm); // Reset the form
          console.log(updatedStock); // This will now correctly log the updated stock
          return updatedStock; // Return updated state
        }
      });
    }
  };

  // send data to database
  const confirmButton = () => {
    Swal.fire({
      customClass: { container: "create-swal" },
      title: `Are you sure you want to Stock In?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#196e3a",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, create order`,
    }).then((result) => {
      if (result.isConfirmed) {
        createStockIn();
      }
    });
  };

  const createStockIn = async () => {
    if (initialStockIn.length > 0) {
      const inboundStockItems = initialStockIn.map((stockInItem) => ({
        inventory: stockInItem.inventory_id,
        quantity: stockInItem.quantity, // must never be zero, need fix
      }));

      console.log(inboundStockItems);
      const items = {
            inboundStockItems: inboundStockItems,
            supplier: selectedSupplier, // replace SelectedSupplier or smth
            employee: selectedEmployee, // same here
            reference_number: String(referenceNumber),
      }

      console.log(items);

      try {
        const res = await api.post(
          "/api/stockin/create/",
          {
            inboundStockItems: inboundStockItems,
            supplier: selectedSupplier, // replace SelectedSupplier or smth
            employee: selectedEmployee, // same here
            reference_number: String(referenceNumber), // need inputvalidation, idk din kung ano actual input dito tho
          }
        );

        console.log("Stocking in successful:", res.data);
        // setSuccessMethod("Added");
        // toggleSuccessWindow();
        if (res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "The operation was successful.",
            icon: "success",
          }).then(() => {
            setInitialStockIn([]);
            location.reload();
          });
        }
      } catch (error) {
        console.error("Backend Error:", error.response.data);
        if (error.response) {
          Swal.fire({
            title: "Error!",
            text: error.response.data || "There was an issue stocking in.",
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
  const getProductName = (item) => item.product?.product_name || "";
  const getSupplierName = (item) => item.supplier_name || "";
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
    const selectedProduct = findExactOption(productOptions, getProductName, value);

    setForm((prevForm) => ({
      ...prevForm,
      product_name: value,
      inventory_id: selectedProduct ? selectedProduct.id : null,
      sku: selectedProduct ? selectedProduct.product.sku : "",
    }));
  };

  const handleProductSelect = (item) => {
    setForm((prevForm) => ({
      ...prevForm,
      product_name: getProductName(item),
      inventory_id: item.id,
      sku: item.product.sku,
    }));
  };

  const handleSupplierInputChange = (e) => {
    const value = e.target.value;
    const selectedOption = findExactOption(supplierOptions, getSupplierName, value);

    setForm((prevForm) => ({
      ...prevForm,
      supplier_name: value,
      supplier_id: selectedOption ? selectedOption.id : null,
    }));
    setSelectedSupplier(selectedOption ? selectedOption.id : null);
  };

  const handleSupplierSelect = (item) => {
    setForm((prevForm) => ({
      ...prevForm,
      supplier_name: getSupplierName(item),
      supplier_id: item.id,
    }));
    setSelectedSupplier(item.id);
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
      alert(message);
      onInvalid();
    }
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
                <h1 className="font-bold text-2xl mb-10">Stock In</h1>
                <div className="mb-12 ml-4 h-[45vh] md:h-[40vh] sm:h-[20vh] overflow-y-hidden">
                  <div className="flex items-center gap-4">
                    <label className="font-bold">Product</label>
                    <div className={`flex justify-center relative`}>
                      <div className={`border-2 rounded-md`}>
                        <SearchableDropdown
                          placeholder="Search for Product"
                          inputClassName={searchInputClassName}
                          options={productOptions}
                          getOptionLabel={getProductName}
                          getOptionKey={(item) => item.id}
                          onInputChange={handleProductInputChange}
                          onSelect={handleProductSelect}
                          onBlur={() => {
                            validateSelectedOption({
                              value: form.product_name,
                              options: productOptions,
                              getLabel: getProductName,
                              message: "Please select a valid product.",
                              onInvalid: () =>
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  product_name: "",
                                  inventory_id: null,
                                  sku: "",
                                })),
                            });
                          }}
                          name="product_name"
                          value={form.product_name || ""}
                        />
                      </div>
                      <div>
                        <ChevronDownIcon
                          className={` size-4 h-full mr-2  absolute flex right-0 items-center justify-center`}
                        />
                      </div>
                    </div>
                    {formArr.map(({ label, name, type, readOnly }, index) => (
                      <div
                        className={`flex flex-col justify-between`}
                        key={index}
                      >
                        <input
                          className={`text-lg border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm`}
                          readOnly={readOnly}
                          label={label}
                          id={name}
                          name={name}
                          type={type}
                          value={form[name] || ""}
                          onChange={(e) => onChangeHandler(e, name)}
                          min="1"
                          required
                        ></input>
                        <label
                          className={`absolute transition-all duration-100 ease-in  px-4 py-2 text-gray-600 label-line`}
                          htmlFor={name}
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                    {/* CREATE ROW BUTTON */}
                    <button
                      onClick={(e) => {
                        onSubmitHandler();
                      }}
                      type="button"
                      className={`shadow-md bg-white border-2 border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 flex gap-4 items-center`}
                    >
                      Add Product to Stock In
                      <PlusCircleIcon className={`size-6`} />
                    </button>
                  </div>
                  <Table
                    columnArr={tableColumns}
                    dataArr={initialStockIn}
                    className={`!h-[40vh] !max-h-[40vh]`}
                    sortField={null}
                    sortDirection="asc"
                  />
                </div>

                <div className={`gap-x-6 gap-y-8 flex flex-wrap `}>
                  <div className={`flex gap-4 items-center mb-4`}>
                    <div className="flex items-center gap-4 ml-4">
                      <input
                        className={`text-lg border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm`}
                        type="number"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        required
                        name="reference"
                        id="reference"
                      />
                      <label
                        htmlFor={"reference"}
                        className={`text-base absolute transition-all duration-100 ease-in px-4 py-2 text-gray-600 label-line`}
                      >
                        Reference Number
                      </label>
                    </div>
                    <label className="font-bold">Supplier</label>
                    <div className={`flex justify-center relative`}>
                      <div className={`border-2 rounded-md`}>
                        <SearchableDropdown
                          placeholder="Search for Supplier"
                          inputClassName={searchInputClassName}
                          options={supplierOptions}
                          getOptionLabel={getSupplierName}
                          getOptionKey={(item) => item.id}
                          onInputChange={handleSupplierInputChange}
                          onSelect={handleSupplierSelect}
                          onBlur={() => {
                            validateSelectedOption({
                              value: form.supplier_name,
                              options: supplierOptions,
                              getLabel: getSupplierName,
                              message: "Please select a valid supplier.",
                              onInvalid: () => {
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  supplier_name: "",
                                  supplier_id: null,
                                }));
                                setSelectedSupplier(null);
                              },
                            });
                          }}
                          name="supplier_name"
                          value={form.supplier_name || ""}
                        />
                      </div>
                      <div>
                        <ChevronDownIcon
                          className={` size-4 h-full mr-2  absolute flex right-0 items-center justify-center`}
                        />
                      </div>
                    </div>
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
                              message: "Please select a valid employee.",
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
                  </div>
                </div>
                <div className={`flex justify-end gap-4 mt-12`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      {
                        confirmButton();
                      }
                    }}
                    className={` shadow-md bg-white border-2 border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 flex gap-4 items-center `}
                  >
                    Confirm Stock-In
                    <CheckCircleIcon className={`size-6`} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockInForm;
