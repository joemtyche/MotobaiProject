/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Logo from "../../../assets/Logo.png";
import Table from "../../DynamicComponents/DynamicTable";
import api from "../../../api";
import {
  ChevronDownIcon,
  PlusCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useFetchData } from "../../Hooks/useFetchData.js";
import Swal from "sweetalert2";

const StockOutForm = ({ confirmHandler }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reason, setReason] = useState();
  const [initialStockOut, setInitialStockOut] = useState([]);

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
      setInitialStockOut((prevStock) => {
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
  const confirmButton = async () => {
    
    const { value: reason } = await Swal.fire({
      title: "Reason for stockout",
      input: "text",
      text: "Please input a reason for stockout.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#196e3a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create order",
    });
  
    // If the user canceled or didn't provide a reason, exit
    if (!reason) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Reason cannot be empty.",
      });
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
      createStockOut(reason);
    }
  };

  const createStockOut = async (reason) => {
    if (initialStockOut.length > 0) {
      const outboundStockItems = initialStockOut.map((stockOutItem) => ({
        inventory: stockOutItem.inventory_id,
        quantity: stockOutItem.quantity,
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

  const validateInput = (field, options, fieldName) => {
    // Normalize input and options for comparison
    const inputValue = (form[field]?.trim() || "").toLowerCase();
    const isValid = options.some(
      (option) => option[fieldName].trim().toLowerCase() === inputValue
    );

    if (!isValid) {
      setForm((prevForm) => ({
        ...prevForm,
        [field]: "",
        [`${field}_id`]: null,
      }));
      alert(`Please input the correct ${fieldName.replace("_", " ")}`);
    }
  };

  const [searchInput, setSearchInput] = useState("");

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
                    <label className="font-bold">Product</label>
                    <div className={`flex justify-center relative`}>
                      <div className={`border-2 rounded-md`}>
                        <input
                          autoComplete="off"
                          placeholder="Search for Product"
                          className="text-lg p-2 min-w-[350px]"
                          type="text"
                          onChange={(e) =>
                            onChangeHandler(e, "product_name", {
                              inventory_id:
                                productOptions.find(
                                  (item) =>
                                    item.product.product_name === e.target.value
                                ) || null,
                            })
                          }
                          onBlur={() => {
                            if (form.product_name) {
                              validateInput(
                                "product_name",
                                productOptions.map((item) => ({
                                  product_name: item.product.product_name,
                                })), // Flatten options to match the expected structure
                                "product_name"
                              );
                            }
                          }}
                          name="product_name"
                          value={form.product_name || ""}
                        />
                        <div
                          className={`flex flex-col absolute bg-gray-50 overflow-y-auto max-h-[180px] min-w-[450px] shadow-md rounded-md z-50`}
                        >
                          {productOptions
                            .filter((item) => {
                              const searchTerm = (
                                form.product_name || ""
                              ).toLowerCase();
                              const fullName =
                                item.product.product_name.toLowerCase();

                              return (
                                searchTerm &&
                                fullName.startsWith(searchTerm) &&
                                fullName !== searchTerm
                              );
                            })
                            .map((item) => {
                              return (
                                <div
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={() =>
                                    setForm({
                                      ...form,
                                      product_name: item.product.product_name,
                                      inventory_id: item.id,
                                      sku: item.product.sku,
                                    })
                                  }
                                  data-id={item.product.id}
                                  key={item.product.id}
                                  className={`hover:bg-red-700 hover:text-white p-4 rounded-sm transition-all duration-100 cursor-pointer`}
                                >
                                  {item.product.product_name}
                                </div>
                              );
                            })}
                        </div>
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
                      Add Product to Stock Out
                      <PlusCircleIcon className={`size-6`} />
                    </button>
                  </div>
                  <Table
                    columnArr={tableColumns}
                    dataArr={initialStockOut}
                    className={`!h-[40vh] !max-h-[40vh]`}
                    sortField={null}
                    sortDirection="asc"
                  />
                </div>

                <div className={`gap-x-6 gap-y-8 flex flex-wrap `}>
                  <div className={`flex gap-4 items-center mb-4`}>
                    {/* EMPLOYEE SELECTION */}
                    <label className="font-bold ">Employee</label>
                    <div className={`flex justify-center relative`}>
                      <div className={`border-2 rounded-md`}>
                        <input
                          autoComplete="off"
                          placeholder="Search for Employee"
                          className="text-lg p-2 min-w-[350px]"
                          type="text"
                          onChange={(e) => {
                            setSearchInput(e.target.value); // Update the search input value
                          }}
                          onBlur={() => {
                            // Validate the input only if the user hasn't selected from the dropdown
                            const matchedEmployee = employeeOptions.find(
                              (employee) => {
                                const fullName = [
                                  employee.first_name,
                                  employee.middle_name,
                                  employee.last_name,
                                ]
                                  .join(" ")
                                  .toLowerCase();
                                return fullName === searchInput.toLowerCase();
                              }
                            );

                            if (!matchedEmployee) {
                              alert("Please select a valid employee.");
                              setSearchInput(""); // Reset input
                              setForm({
                                ...form,
                                employee_name: "",
                                employee_id: null,
                              });
                              setSelectedEmployee(null);
                            }
                          }}
                          name="employee_name"
                          value={searchInput} // Bind to the search input state
                        />
                        <div
                          className={`flex flex-col absolute bg-gray-50 overflow-y-auto max-h-[180px] min-w-[450px] shadow-md rounded-md z-50`}
                        >
                          {employeeOptions
                            .filter((employee) => {
                              const searchTerm = searchInput.toLowerCase();
                              const fullName = [
                                employee.first_name,
                                employee.middle_name,
                                employee.last_name,
                              ]
                                .join(" ")
                                .toLowerCase();

                              return (
                                searchTerm &&
                                fullName.startsWith(searchTerm) &&
                                fullName !== searchTerm
                              );
                            })
                            .map((employee) => (
                              <div
                                key={employee.id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  // Update the form when an option is clicked
                                  setForm({
                                    ...form,
                                    employee_name: [
                                      employee.first_name,
                                      employee.middle_name,
                                      employee.last_name,
                                    ].join(" "),
                                    employee_id: employee.id,
                                  });
                                  setSelectedEmployee(employee.id); // Update state
                                  setSearchInput(
                                    [
                                      employee.first_name,
                                      employee.middle_name,
                                      employee.last_name,
                                    ].join(" ")
                                  ); // Set the input value to the selected employee
                                }}
                                className={`hover:bg-red-700 hover:text-white p-4 rounded-sm transition-all duration-100 cursor-pointer`}
                              >
                                {employee.first_name} {employee.middle_name}{" "}
                                {employee.last_name}
                              </div>
                            ))}
                        </div>
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
                    Confirm Stock-Out
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

export default StockOutForm;
