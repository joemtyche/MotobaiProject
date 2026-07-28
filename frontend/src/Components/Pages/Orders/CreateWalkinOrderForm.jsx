import { useState } from "react";
import Logo from "../../../assets/Logo.png";
import "../../pages.css";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import SearchableDropdown from "../../DynamicComponents/SearchableDropdown.jsx";
import api from "../../../api.js";
import {
  PlusCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import {
  getApiErrorText,
  getAvailableInventoryOptions,
  getNextOrderReferenceNumber,
  formatPeso,
} from "../../Utils/formHelpers.js";

import { useFetchData } from "../../Hooks/useFetchData.js";

const CreateWalkinOrderForm = ({ confirmHandler }) => {
  const [initialOrder, setInitialOrder] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editingQuantity, setEditingQuantity] = useState("");

  const { data: productOptions } = useFetchData("inventory");
  const { data: employeeOptions } = useFetchData("employee");
  const { data: orderOptions } = useFetchData("order");

  const [deduction, setDeduction] = useState("");
  const referenceNumber = getNextOrderReferenceNumber(orderOptions, "WO");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const { data: accountOptions } = useFetchData("account");

  // const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const showValidationError = (text) => {
    Swal.fire({
      title: "Error!",
      text,
      icon: "warning",
    });
  };

  const confirmButton = async () => {
    const error = getConfirmError();

    if (error) {
      showValidationError(error);
      return;
    }

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
    const error = getConfirmError();

    if (error) {
      showValidationError(error);
      return;
    }

    if (initialOrder.length > 0) {
      const orderItems = initialOrder.map((item) => ({
        inventory: parseInt(item.inventory_id, 10),
        quantity: parseInt(item.quantity, 10),
        product_price: parseFloat(item.product_price),
      }));

      const deductions = deductionAmount;

      try {
        const res = await api.post("/api/order/create/", {
          order_details: orderItems,
          order_type: "Walkin",
          employee: selectedEmployee,
          total_balance: total_balance,
          customer_name: customerName,
          phone_number: phoneNumber,
          reference_number: referenceNumber,
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
        Swal.fire({
          title: "Error!",
          text: getApiErrorText(
            error,
            "There was an issue creating the order."
          ),
          icon: "error",
        });
      }
    } else {
      showValidationError("Please add at least one product.");
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
    },
    {
      header: "Unit Price",
      row: "product_price",
      customRender: (item) => {
        return <p>{formatPeso(item.product_price)}</p>;
      },
    },
    {
      header: "Total Price",
      customRender: (item) => {
        return <p>{formatPeso(item.quantity * item.product_price)}</p>;
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

    if (fieldName === "employee_name") {
      setSelectedEmployee(extraData.employee_id);
    }
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

    if (initialOrder.some((item) => item.inventory_id === form.inventory_id)) {
      return `You already added ${form.product_name}.`;
    }

    return "";
  };

  const subtotalPrice = initialOrder.reduce(
    (total, item) => total + item.product_price * item.quantity,
    0
  );
  const hasDeduction = String(deduction ?? "").trim() !== "";
  const deductionValue = Number(deduction);
  const deductionAmount =
    hasDeduction && !Number.isNaN(deductionValue) && deductionValue > 0
      ? deductionValue
      : 0;
  const totalPrice = Math.max(subtotalPrice - deductionAmount, 0);

  const getDeductionError = () => {
    if (!hasDeduction) {
      return "";
    }

    if (Number.isNaN(deductionValue)) {
      return "Deduction must be a valid number.";
    }

    if (deductionValue < 0) {
      return "Deduction cannot be negative.";
    }

    if (deductionValue >= subtotalPrice) {
      return "Deduction must be less than the subtotal.";
    }

    return "";
  };

  const getConfirmError = () => {
    if (initialOrder.length === 0) {
      return "Please add at least one product.";
    }

    const deductionError = getDeductionError();

    if (deductionError) {
      return deductionError;
    }

    if (!customerName.trim()) {
      return "Please enter the customer name.";
    }

    if (!selectedEmployee) {
      return "Select an employee from the dropdown list.";
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

    setInitialOrder((prevOrder) => [
      { ...form, quantity: String(form.quantity) },
      ...prevOrder,
    ]);
    setForm(initialForm);
  };

  const closeEditModal = () => {
    setEditingRowIndex(null);
    setEditingQuantity("");
  };

  const openEditModal = (index) => {
    const selectedItem = initialOrder[index];

    if (!selectedItem) {
      return;
    }

    setEditingRowIndex(index);
    setEditingQuantity(selectedItem.quantity || "");
  };

  const updateRowQuantity = () => {
    const selectedItem = initialOrder[editingRowIndex];
    const error = getQuantityError(
      editingQuantity,
      selectedItem?.inventory_stock
    );

    if (error) {
      showValidationError(error);
      return;
    }

    setInitialOrder((prevOrder) =>
      prevOrder.map((item, index) =>
        index === editingRowIndex
          ? { ...item, quantity: String(editingQuantity) }
          : item
      )
    );
    closeEditModal();
  };

  const deleteRow = () => {
    setInitialOrder((prevOrder) =>
      prevOrder.filter((_, index) => index !== editingRowIndex)
    );
    closeEditModal();
  };

  const [searchInput, setSearchInput] = useState("");
  const searchInputClassName = "text-lg p-2 min-w-[350px]";
  const compactInputClassName =
    "h-12 w-24 text-center text-lg border-2 rounded py-2 px-3 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm";
  const availableProductOptions = getAvailableInventoryOptions(
    productOptions,
    initialOrder
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

  const handleEmployeeInputChange = (e) => {
    const value = e.target.value;
    const selectedOption = findExactOption(
      employeeOptions,
      getEmployeeName,
      value
    );

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

  // Walk In Profile
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
            <form onSubmit={confirmHandler} className={`min-w-[80vw] `}>
              <div className={`bg-gray-100 py-10 px-8 h-full rounded-b-lg`}>
                <h1 className="font-bold text-2xl mb-10">
                  Create Walk-In Order
                </h1>
                <h1 className="text-lg font-bold ml-4 mb-4">
                  Customer Details
                </h1>
                <div className="flex gap-4">
                  <div className="ml-4 mb-6 flex gap-4">
                    <input
                      className={`text-lg border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm`}
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      name="customer"
                      id="customer"
                    />

                    <label
                      htmlFor={"customer"}
                      className={`text-base absolute transition-all duration-100 ease-in px-4 py-2 text-gray-600 label-line`}
                    >
                      Customer Name
                    </label>
                  </div>
                  <div className="ml-4 mb-6 flex gap-4">
                    <input
                      className={`text-lg border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm`}
                      type="tel"
                      inputMode="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      name="phone_number"
                      id="phone_number"
                    />
                    <label
                      htmlFor={"phone_number"}
                      className={`text-base absolute transition-all duration-100 ease-in px-4 py-2 text-gray-600 label-line `}
                    >
                      Phone Number (optional)
                    </label>
                  </div>
                </div>

                <div
                  className={`ml-4 flex min-w-[40vw] items-center gap-x-6 gap-y-8`}
                >
                  <label className="flex h-12 items-center font-bold">
                    Product
                  </label>
                  <div className={`flex justify-center relative gap-6`}>
                    <div className="flex items-center gap-4">
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
                    </div>
                    <div className="flex h-12 w-24 flex-col items-center justify-center rounded-md border-2 border-gray-200 bg-white px-3 shadow-sm">
                      <span className="text-xs font-semibold uppercase text-gray-500">
                        Stock
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        {form.inventory_stock !== null &&
                        form.inventory_stock !== undefined &&
                        form.inventory_stock !== ""
                          ? form.inventory_stock
                          : "--"}
                      </span>
                    </div>
                    <label
                      className="flex h-12 items-center font-bold"
                      htmlFor="walkin-quantity"
                    >
                      Quantity
                    </label>
                    <div className="flex flex-col justify-between">
                      <input
                        className={compactInputClassName}
                        id="walkin-quantity"
                        name="quantity"
                        type="number"
                        value={form.quantity || ""}
                        onChange={(e) => onChangeHandler(e, "quantity")}
                        min="1"
                        required
                      />
                    </div>
                  </div>
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
                    editRow={openEditModal}
                    sortField={null}
                    sortDirection="asc"
                    allowSort={false}
                  />
                </div>

                <div className={`gap-x-6 gap-y-8 flex items-center`}>
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
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={"walkin-reference"}
                      className="text-sm font-semibold text-gray-600"
                    >
                      Reference #
                    </label>
                    <div
                      id="walkin-reference"
                      className="flex h-12 min-w-[210px] items-center justify-center rounded border-2 border-gray-200 bg-white px-4 text-lg font-bold text-gray-700 shadow-sm"
                    >
                      {referenceNumber}
                    </div>
                  </div>
                  <div className="flex">
                    <input
                      className={`text-center text-lg border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm`}
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
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
                      Deduction (₱)
                    </label>
                  </div>

                  <div className="auto min-w-[220px] text-right">
                    <p className="text-sm text-gray-600">
                      Subtotal:{" "}
                      <span className="font-semibold">
                        {formatPeso(subtotalPrice)}
                      </span>
                    </p>
                    {deductionAmount > 0 && (
                      <p className="text-sm font-semibold text-red-700">
                        Deduction: -{formatPeso(deductionAmount)}
                      </p>
                    )}
                    <span className=" text-xl">{`TOTAL PRICE: `}</span>
                    <span className="text-2xl font-bold">
                      {formatPeso(totalPrice)}
                    </span>
                  </div>
                </div>

                <div className={`flex justify-end gap-4 `}>
                  <button
                    type="button"
                    onClick={() => {
                      confirmButton();
                    }}
                    className={` shadow-md bg-white border-2 border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 flex gap-4 items-center `}
                  >
                    Confirm Walk-In Order
                    <CheckCircleIcon className={`size-6`} />
                  </button>
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
              {initialOrder[editingRowIndex]?.product_name}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-500">
              Current Stock: {initialOrder[editingRowIndex]?.inventory_stock}
            </p>
            <div className="mt-6">
              <label
                className="font-bold text-gray-700"
                htmlFor="walkin-edit-quantity"
              >
                Quantity
              </label>
              <input
                id="walkin-edit-quantity"
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

export default CreateWalkinOrderForm;
