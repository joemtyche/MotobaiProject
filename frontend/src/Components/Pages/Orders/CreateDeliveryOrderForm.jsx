import { useState } from "react";
import Logo from "../../../assets/Logo.png";
import "../../pages.css";
import Table from "../../DynamicComponents/DynamicTable";
import SearchableDropdown from "../../DynamicComponents/SearchableDropdown";
import api from "../../../api";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

import { useFetchData } from "../../Hooks/useFetchData.js";

const CreateDeliveryOrderForm = ({ confirmHandler }) => {
  const [initialOrder, setInitialOrder] = useState([]);

  const { data: productOptions } = useFetchData("inventory");
  const { data: employeeOptions } = useFetchData("employee");
  const { data: accountOptions } = useFetchData("account");

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [referenceNumber, setReferenceNumber] = useState("");
  const [deduction, setDeduction] = useState();

  const confirmButton = () => {
    Swal.fire({
      title: "Confirm Order Creation",
      text: "You are about to create a new order with the provided details. Please ensure all information is accurate before proceeding.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Create Order",
    }).then((result) => {
      if (result.isConfirmed) {
        createOrder();
      }
    });
  };

  const createOrder = async () => {
    const total_balance = totalPrice.toFixed(2);

    console.log("initial confirm", initialOrder);
    if (initialOrder.length > 0) {
      if (!selectedAccount || !selectedEmployee) {
        Swal.fire({
          title: "Error!",
          text: `Please select an account and employee.`,
          icon: "warning",
        });
        return;
      }
      const orderItems = initialOrder.map((item) => ({
        inventory: parseInt(item.inventory_id, 10),
        quantity: parseInt(item.quantity, 10),
        product_price: parseFloat(item.product_price),
      }));

      const deductions = parseFloat(deduction);

      try {
        const res = await api.post("/api/order/create/", {
          order_details: orderItems,
          order_type: "Delivery",
          account: selectedAccount,
          reference_number: referenceNumber,
          employee: selectedEmployee,
          total_balance: total_balance,
          deductions: deductions || 0,
        });
        Swal.fire({
          title: "Order Successfully Created!",
          text: "The order has been created and saved successfully.",
          icon: "success",
          timer: 2000,
        }).then(() => {
          location.reload();
        });
        console.log("Order creation successful:", res.data);
        setInitialOrder([]);
      } catch (error) {
        console.log(error);
        if (error.response) {
          Swal.fire({
            title: "Error!",
            text:
              error.response.data || "There was an issue creating the order.",
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
      header: "Quantity",
      row: "quantity",
      customRender: (item) => {
        return <p>{item.quantity}</p>;
      },
    },
    {
      header: "Unit Price",
      row: "product_price",
    },
    {
      header: "Total Price",
      customRender: (item) => {
        return <p>{(item.quantity * item.product_price).toFixed(2)}</p>;
      },
    },
  ];

  //Makes array to OBJECT
  const prepareForm = () => {
    return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
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

  let totalPrice = 0;
  const allPrices = initialOrder;

  allPrices.forEach((item) => {
    totalPrice += item.product_price * item.quantity;
  });

  //SET FORM BACK TO OLD STATE
  const onSubmitHandler = () => {
    delete form.account_id;
    delete form.employee_id;

    if (form && form.quantity && form.product_name) {
      setInitialOrder((prevOrder) => {
        const isDuplicate = prevOrder.some(
          (item) => item.product_name === form.product_name
        );

        if (isDuplicate) {
          Swal.fire({
            title: "Error",
            text: `You added a duplicate ${form.product_name}`,
            icon: "error",
          });
          return prevOrder;
        } else {
          const updatedOrder = [...prevOrder, form]; // Update order
          setForm(initialForm); // Reset the form
          console.log("updated order", updatedOrder); // This will now correctly log the updated order
          return updatedOrder; // Return updated state
        }
      });
    }
  };

  const handleRowDetails = () => {
    Swal.fire({
      title: "Error",
      text: `kung ok lng delete sana dito`,
      icon: "error",
    });
  };

  const [searchInput, setSearchInput] = useState("");
  const searchInputClassName = "text-lg p-2 min-w-[350px]";
  const getProductName = (item) => item.product?.product_name || "";
  const getAccountName = (item) => item.account || "";
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
      product_price: selectedProduct ? selectedProduct.product.price : null,
      inventory_stock: selectedProduct ? selectedProduct.stock : null,
      sku: selectedProduct ? selectedProduct.product.sku : "",
    }));
  };

  const handleProductSelect = (item) => {
    setForm((prevForm) => ({
      ...prevForm,
      product_name: getProductName(item),
      product_price: item.product.price,
      inventory_id: item.id,
      inventory_stock: item.stock,
      sku: item.product.sku,
    }));
  };

  const handleAccountInputChange = (e) => {
    const value = e.target.value;
    const selectedOption = findExactOption(accountOptions, getAccountName, value);

    setForm((prevForm) => ({
      ...prevForm,
      account: value,
      account_id: selectedOption ? selectedOption.id : null,
    }));
    setSelectedAccount(selectedOption ? selectedOption.id : null);
  };

  const handleAccountSelect = (item) => {
    setForm((prevForm) => ({
      ...prevForm,
      account: getAccountName(item),
      account_id: item.id,
    }));
    setSelectedAccount(item.id);
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
            <form onSubmit={confirmHandler} className={`min-w-[90vw] `}>
              <div className={`bg-gray-100 py-10 px-8 h-full rounded-b-lg`}>
                <h1 className="font-bold text-2xl mb-10">
                  Create Order Delivery
                </h1>
                <div className={`ml-4 gap-x-6 gap-y-8 flex min-w-[40vw]`}>
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
                                product_price: null,
                                inventory_id: null,
                                inventory_stock: null,
                                sku: "",
                              })),
                          });
                        }}
                        name="product_name"
                        value={form.product_name || ""}
                      />
                    </div>
                  </div>
                  {formArr.map(({ label, name, type, readOnly }, index) => (
                    <div
                      className={`flex flex-col justify-between`}
                      key={index}
                    >
                      <input
                        className={`text-base border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm`}
                        readOnly={readOnly}
                        label={label}
                        id={name}
                        name={name}
                        type={type}
                        value={form[name] || ""}
                        onChange={(e) => onChangeHandler(e, name)}
                        required
                      ></input>
                      <label
                        className={`absolute transition-all duration-100 ease-in  px-4 py-2 label-line text-gray-600 label-line`}
                        htmlFor={name}
                      >
                        {label}
                      </label>
                    </div>
                  ))} 
                  {/* CREATE ROW BUTTON */}
                  <button
                    onClick={() => {
                      onSubmitHandler();
                    }}
                    type="button"
                    className={`shadow-md bg-white border-2 border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 flex gap-4 items-center`}
                  >
                    Add Product to Order
                    <PlusCircleIcon className={`size-6`} />
                  </button>
                </div>

                <div className="mb-12 ml-4 min-h-[40vh] max-h-[40vh] overflow-y-hidden">
                  <Table
                    columnArr={tableColumns}
                    dataArr={initialOrder}
                    className={`!h-[40vh] !max-h-[40vh]`}
                    editRow={handleRowDetails}
                    sortField={null}
                    sortDirection="asc"
                  />
                </div>
                <div className={`gap-x-6 gap-y-8 flex flex-wrap mt-2`}>
                  <div className="flex items-center gap-4">
                    {/* ACCOUNT SELECTION */}
                    <div className="flex flex-col gap-2">
                      <label className="font-bold">Account</label>
                      <div
                        className={`flex justify-center relative items-center gap-4`}
                      >
                        <div className={`flex justify-center relative`}>
                          <div className={`border-2 rounded-md`}>
                            <SearchableDropdown
                              placeholder="Search for Account"
                              inputClassName={searchInputClassName}
                              options={accountOptions}
                              getOptionLabel={getAccountName}
                              getOptionKey={(item) => item.id}
                              onInputChange={handleAccountInputChange}
                              onSelect={handleAccountSelect}
                              onBlur={() => {
                                validateSelectedOption({
                                  value: form.account,
                                  options: accountOptions,
                                  getLabel: getAccountName,
                                  message: "Please select a valid account.",
                                  onInvalid: () => {
                                    setForm((prevForm) => ({
                                      ...prevForm,
                                      account: "",
                                      account_id: null,
                                    }));
                                    setSelectedAccount(null);
                                  },
                                });
                              }}
                              name="account"
                              value={form.account || ""}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* EMPLOYEE SELECTION */}
                    <div className="flex flex-col gap-2">
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
                    <div className="flex mt-8">
                      <input
                        className={`text-lg border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm`}
                        type="text"
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
                        Reference #
                      </label>
                    </div>
                    <div className="flex mt-8">
                      <input
                        className={`text-lg border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm`}
                        type="text"
                        value={deduction}
                        onChange={(e) => setDeduction(e.target.value)}
                        required
                        name="deduction"
                        id="deduction"
                      />

                      <label
                        htmlFor={"deduction"}
                        className={`text-base absolute transition-all duration-100 ease-in px-4 py-2 text-gray-600 label-line`}
                      >
                        Deduction
                      </label>
                    </div>
                  </div>

                  <div className="auto">
                    <span className=" text-xl">{`TOTAL PRICE: `}</span>
                    <span className="text-2xl font-bold">{`${totalPrice.toFixed(
                      2
                    )}`}</span>
                  </div>
                </div>
                <div className={`flex justify-end gap-4 mt-12`}>
                  <button
                    type="button"
                    onClick={() => {
                      {
                        confirmButton();
                      }
                    }}
                    className={` shadow-md bg-white border-2 border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 flex gap-4 items-center `}
                  >
                    Confirm Delivery Order
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

export default CreateDeliveryOrderForm;
