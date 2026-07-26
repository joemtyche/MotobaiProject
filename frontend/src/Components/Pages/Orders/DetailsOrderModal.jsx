import { useEffect, useState } from "react";
import Logo from "../../../assets/Logo.png";
import Table from "../../DynamicComponents/DynamicTable";
import api from "../../../api";
import Swal from "sweetalert2";
import InvoicePDFButton from "./InvoicePDFButton";

const DetailsOrderModal = ({ logsData, orderId }) => {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderDetailItems, setOrderDetailItems] = useState(null);
  const [returnItems, setReturnItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchOrderDetail = async (orderId) => {
    try {
      const response = await api.get(`/api/order/view/${orderId}/`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchOrderDetailItems = async (orderDetailId) => {
    try {
      const response = await api.get(`/api/orderdetails/view/${orderDetailId}/`);
      setOrderDetailItems(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const updateOrderDetail = async (returnItems) => {
    try {
      // Log the current returnItems to check what is being sent
      console.log("Updated Return Items: ", returnItems);

      // Loop through each item in returnItems
      for (const item of returnItems) {
        const url = `/api/orderdetails/update/${item.order_detail_id}/`;

        const formData = {
          order_detail_id: item.order_detail_id,
          inventory: item.inventory_id,
          product_name: item.product_name,
          original_quantity: item.original_quantity,
          quantity_to_return: item.quantity_to_return,
          quantity: item.updated_quantity, // ensure the updated quantity is correct here
        };

        // Send the PUT request
        const res = await api.put(url, formData);

        // Check the response
        if (res.status === 200) {
          Swal.fire({
            title: "Return Success",
            text: `Order updated successfully!`,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload(); // You might want to use this cautiously (could be optimized later)
            }
          });
        } else {
          Swal.fire({
            title: "Error",
            text: `Failed to update Order. Please try again.`,
            icon: "error",
          });
        }
      }

      // Fetch updated order details (optional)
      fetchOrderDetail(orderId);
    } catch (error) {
      console.error("Error updating order details:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update the backend. Please try again.",
        icon: "error",
      });
    }
  };

  const handleRowDetails = async (id) => {
    await fetchOrderDetailItems(id);
  };

  useEffect(() => {
    if (!orderDetailItems || !orderDetailItems.id) {
      return;
    }

    if (selectedRows.includes(orderDetailItems.id)) {
      Swal.fire({
        title: "This row has already been selected.",
        text: "You can't select the same row again.",
        icon: "info",
      });
      return;
    }

    if (orderDetailItems) {
      Swal.fire({
        title: `Edit ${orderDetailItems.product_name}?`,
        input: "number",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        text: `Current quantity: ${orderDetailItems.quantity}`,
        icon: "warning",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const quantityToReturn = parseInt(result.value, 10);

          if (
            quantityToReturn > 0 &&
            quantityToReturn <= orderDetailItems.quantity
          ) {
            const updatedQuantity =
              orderDetailItems.quantity - quantityToReturn;

            // Create a new return item object
            const newReturnItem = {
              order_detail_id: orderDetailItems.id,
              inventory_id: orderDetailItems.inventory,
              product_name: orderDetailItems.product_name,
              original_quantity: orderDetailItems.quantity,
              quantity_to_return: quantityToReturn,
              updated_quantity: updatedQuantity,
            };

            // Only then add to the returnItems state
            setReturnItems((prevItems) => {
              const itemIndex = prevItems.findIndex(
                (item) => item.order_detail_id === orderDetailItems.id
              );

              if (itemIndex > -1) {
                // Update the existing item
                const updatedItems = [...prevItems];
                updatedItems[itemIndex] = {
                  ...updatedItems[itemIndex],
                  quantity_to_return: updatedQuantity,
                  updated_quantity: updatedQuantity,
                };
                return updatedItems;
              } else {
                // Add a new item if it doesn't exist
                return [...prevItems, newReturnItem];
              }
            });

            // Mark this row as selected
            setSelectedRows((prev) => [...prev, orderDetailItems.id]);
            Swal.fire({
              title: `Update Success`,
              text: `Returning ${quantityToReturn} of ${orderDetailItems.product_name}, please confirm to update!`,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Invalid quantity",
              text: "The quantity entered is invalid. Please try again.",
              icon: "error",
            });
          }
        }
      });
    }
  }, [orderDetailItems]);

  useEffect(() => {
    console.log("Order ID in modal:", orderId); // Log Order ID when modal is opened
    fetchOrderDetail(orderId);
  }, [orderId]);

  const onClickUpdateStatus = async (status) => {
    let statusString = ""; // Local variable inside the function
    if (status === "validated") {
      statusString = "Validate";
    } else if (status === "shipped") {
      statusString = "Ship";
    } else if (status === "received") {
      statusString = "Receive";
    } else if (status === "completed") {
      if (referenceNumber === "") {
        Swal.fire({
          title: "Error",
          text: `Please input a Reference Number`,
          icon: "error",
        });
        return;
      } else {
        statusString = "Complete Order";
      }
    } else if (status === "cancelled") {
      statusString = "Cancel Order";
    } else if (status === "returned") {
      statusString = "Return";
    }

    Swal.fire({
      title: `Confirm ${statusString}`,
      text: "This process is irreversible!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${statusString}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(status);
      }
    });
  };

  const updateStatus = async (status) => {
    let date_field = "";

    let statusString = "";
    if (status === "validated") {
      statusString = "Validated";
      date_field = "date_validated";
    } else if (status === "shipped") {
      statusString = "Shipped";
      date_field = "date_shipped";
    } else if (status === "received") {
      statusString = "Received";
      date_field = "date_received";
    } else if (status === "completed") {
      statusString = "Completed";
      date_field = "date_completed";
    } else if (status === "cancelled") {
      statusString = "Cancelled";
      date_field = "date_cancelled";
    } else if (status === "returned") {
      statusString = "Returned";
      date_field = "date_returned";
    }

    try {
      const currentDate = new Date().toISOString();

      const payload = {
        status: status,
        [date_field]: currentDate,
      };

      if (status === "completed" && referenceNumber) {
        payload.reference_number = referenceNumber;
      } else if (status === "completed" && !referenceNumber) {
        // If referenceNumber is not available yet, handle it (e.g., fetch it from another source or create it)
        console.error("Reference number is required but not available.");
        Swal.fire({
          title: "Error!",
          text: "Reference number is required but not available.",
          icon: "error",
        });
        return;
      }
  

      const res = await api.put(
        `/api/ordertracking/update/${orderId}/`,
        payload
      );

      Swal.fire({
        title: `Order has been ${statusString}!`,
        text: "The order has been updated.",
        icon: "success",
        timer: 2000,
      }).then(() => {
        location.reload();
      });
      console.log(`Order status updated to: ${status}`);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.detail ||
          "There was an issue updating the order.",
        icon: "error",
      });
    }
  };

  const tableColumns = [
    {
      header: "SKU",
      row: "sku_hold",
      customRender: (item) => {
        return <p>{item.sku_hold}</p>;
      },
    },

    {
      header: "Product Name",
      row: "product_name",
      customRender: (item) => {
        return <p>{item.product_name}</p>;
      },
    },

    {
      header: "Quantity",
      row: "quantity",
      customRender: (item) => {
        return <p>{item.quantity}</p>;
      },
    },
    {
      header: "Item Price",
      row: "product_price",
      customRender: (item) => {
        return <p>{item.product_price}</p>;
      },
    },
    {
      header: "Total Price",
      customRender: (item) => {
        return <p>{item.quantity * item.product_price}</p>;
      },
      row: "totalPrice",
    },
  ];

  // Define tracking status when orderDetailsObj is fetched
  const orderTrackingStatus = orderDetails?.order_tracking?.status;
  const orderPayment = orderDetails?.payment?.total_balance;
  const orderDeductions = orderDetails?.payment?.deductions;
  const orderInitialBalance = orderDetails?.payment?.initial_balance;
  const orderType = orderDetails?.order_type;
  const orderPaymentRefNum = orderDetails?.order_tracking?.reference_number;

  const dateCreated = pdfDateSet("date_created");
  const dateValidated = pdfDateSet("date_validated");
  const dateShipped = pdfDateSet("date_shipped");
  const dateReceived = pdfDateSet("date_received");
  const dateCompleted = pdfDateSet("date_completed");

  function pdfDateSet(statusDateName) {
    const createdAtDate = new Date(
      orderDetails?.order_tracking?.[statusDateName]
    );
    const options = { hour: "numeric", minute: "numeric", hour12: true }; // Options for formatting time
    const formattedTime = createdAtDate.toLocaleString("en-US", options); // Format the time
    const formattedDate = `${
      createdAtDate.getMonth() + 1
    }/${createdAtDate.getDate()}/${createdAtDate.getFullYear()} - ${formattedTime}`;

    return formattedDate;
  }

  //PDF things

  // REUSABLE BUTTON
  function OrderModalButton({ onClick, buttonName, className }) {
    return (
      <div
        className={`${className} shadow-md bg-white border-2 border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 flex gap-4 items-center`}
      >
        <button onClick={onClick}>{buttonName}</button>
      </div>
    );
  }

  const [payBeforeDate, setPayBeforeDate] = useState("");

  function StatusDates({
    statusName,
    statusDateName,
    className,
    stateCheck,
    colorState,
  }) {
    const checkDate = orderDetails?.order_tracking?.[statusDateName];

    const createdAtDate = new Date(
      orderDetails?.order_tracking?.[statusDateName]
    );

    if (statusDateName === "date_received") {
      // Add 30 days to the date
      createdAtDate.setDate(createdAtDate.getDate() + 30);
      const options = { hour: "numeric", minute: "numeric", hour12: true }; // Options for formatting time
      const formattedTime = createdAtDate.toLocaleString("en-US", options); // Format the time

      // Format the updated date
      const formattedPayDate = `${
        createdAtDate.getMonth() + 1
      }/${createdAtDate.getDate()}/${createdAtDate.getFullYear()} - ${formattedTime}`;

      // Update the state with the formatted date
      setPayBeforeDate(formattedPayDate);
    }

    const options = { hour: "numeric", minute: "numeric", hour12: true }; // Options for formatting time
    const formattedTime = createdAtDate.toLocaleString("en-US", options); // Format the time
    const formattedDate = `${
      createdAtDate.getMonth() + 1
    }/${createdAtDate.getDate()}/${createdAtDate.getFullYear()} - ${formattedTime}`;

    const colorMap = {
      created: "!bg-red-600 text-white",
      validated: "!bg-green-600 text-white",
      shipped: "!bg-blue-600 text-white",
      received: "!bg-yellow-600 text-white",
      completed: "!bg-green-800 text-white",
      cancelled: "!bg-red-700 text-white",
      returned: "!bg-orange-600 text-white",
    };

    const statusColorClass = colorMap[colorState];

    return (
      <div
        className={`bg-white py-2 px-4 rounded-md hover:-translate-y-1 hover:bg-gray-200 shadow-md transition-all duration-150 cursor-default ${statusColorClass}`}
      >
        <p className={`font-semibold ${className}`}>{`${statusName}`}</p>{" "}
        <span className="text-lg font-bold">{`${
          checkDate ? formattedDate : `Not yet ${stateCheck}`
        }`}</span>
      </div>
    );
  }

  function dateStateChecker(state) {
    const orderState = orderDetails?.order_tracking?.[state];
    return orderState;
  }

  const [referenceNumber, setReferenceNumber] = useState("");

  return (
    <section>
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

        <div
          className={`flex flex-col gap-12 bg-gray-100 p-12 pr-6 h-full w-[85vw] rounded-b-lg`}
        >
          <div className="flex gap-12">
            <h1 className="font-bold text-2xl">{orderDetails.order_type}</h1>
            <div>
              <h1 className="text-md">Account Name</h1>
              <h1 className="font-bold text-lg">
                {orderDetails.account_name || orderDetails.customer_name}
              </h1>
            </div>
            <div>
              <div className="flex gap-6">
                {orderType === "Delivery" && (
                  <>
                    <div>
                      <h1 className=" text-md">City</h1>
                      <h1 className="font-bold text-lg">{orderDetails.city}</h1>
                    </div>
                    <div>
                      <h1 className=" text-md">Barangay</h1>
                      <h1 className="font-bold text-lg">
                        {orderDetails.barangay}
                      </h1>
                    </div>
                    <div>
                      <h1 className=" text-md">Street</h1>
                      <h1 className="font-bold text-lg">
                        {orderDetails.street}
                      </h1>
                    </div>
                  </>
                )}

                <div>
                  <h1 className=" text-md">Phone Number</h1>
                  <h1 className="font-bold text-lg">
                    {orderDetails.phone_number
                      ? orderDetails.phone_number
                      : "N/A"}
                  </h1>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-md">Employee Name</h1>
              <h1 className="font-bold text-lg">
                {orderDetails.employee_first_name}{" "}
                {orderDetails.employee_last_name}
              </h1>
            </div>
            <div>
              <h1 className="font-bold text-lg">
                <InvoicePDFButton
                  orderDetails={orderDetails}
                  logsData={logsData}
                  orderInitialBalance={orderInitialBalance}
                  orderDeductions={orderDeductions}
                  orderPayment={orderPayment}
                  orderTrackingStatus={orderTrackingStatus}
                  orderPaymentRefNum={orderPaymentRefNum}
                  dateCreated={dateCreated}
                  dateValidated={dateValidated}
                  dateShipped={dateShipped}
                  dateReceived={dateReceived}
                  dateCompleted={dateCompleted}
                />
              </h1>
            </div>
          </div>
          <div className={`flex gap-4`}>
            <Table
              columnArr={tableColumns}
              dataArr={logsData}
              editRow={
                ["unvalidated", "received", "completed"].includes(
                  orderTrackingStatus
                )
                  ? (row) => handleRowDetails(row)
                  : null
              }
              className={` !h-[380px] !w-[1000px]`}
              sortField="id"
              sortDirection="asc"
              allowSort={false}
            ></Table>
            <div className="flex gap-2"></div>
            <div className="flex flex-col gap-4 min-w-[400px]">
              <h1 className="text-2xl font-bold">Order Summary</h1>
              <StatusDates
                statusName={`Created`}
                statusDateName={"date_created"}
                className={`${
                  dateStateChecker("date_created")
                    ? "text-red-200"
                    : "text-red-500"
                }`}
                stateCheck={`Created`}
                colorState={`${
                  dateStateChecker("date_created") ? "created" : ""
                }`}
              />
              <p className="hover:-translate-y-1 transition-all duration-100 text-lg font-semibold p-3 shadow-md rounded-md">
                Sales Reference #: {orderDetails.reference_number}
              </p>
              <p className="hover:-translate-y-1 transition-all duration-100 text-lg font-semibold p-3 shadow-md rounded-md">
                Initial Balance: {orderInitialBalance}
              </p>
              <p className="hover:-translate-y-1 transition-all duration-100 text-lg font-semibold p-3 shadow-md rounded-md">
                Deductions: {orderDeductions}
              </p>
              <p className="hover:-translate-y-1 transition-all duration-100 text-lg font-semibold p-3 shadow-md rounded-md">
                Total Balance: {orderPayment}
              </p>
              {orderTrackingStatus === "received" && (
                <p className="bg-red-800 hover:-translate-y-1 transition-all duration-100 text-lg font-semibold p-3 shadow-md rounded-md">
                  <span className="text-red-200">Must pay before: </span>{" "}
                  <span className="text-white">{payBeforeDate}</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Status History</h1>
              <div className="flex mt-4 gap-6">
                {orderType === "Delivery" &&
                  orderTrackingStatus !== "cancelled" && (
                    <>
                      <StatusDates
                        statusName={`Validated`}
                        statusDateName={"date_validated"}
                        className={`${
                          dateStateChecker("date_validated")
                            ? "text-green-200"
                            : "text-green-500"
                        }`}
                        stateCheck={`Validated`}
                        colorState={`${
                          dateStateChecker("date_validated") ? "validated" : ""
                        }`}
                      />
                      <StatusDates
                        statusName={`Shipped`}
                        statusDateName={"date_shipped"}
                        className={`${
                          dateStateChecker("date_shipped")
                            ? "text-blue-200"
                            : "text-blue-500"
                        }`}
                        stateCheck={`Shipped`}
                        colorState={`${
                          dateStateChecker("date_shipped") ? "shipped" : ""
                        }`}
                      />
                      <StatusDates
                        statusName={`Received`}
                        statusDateName={"date_received"}
                        className={`${
                          dateStateChecker("date_received")
                            ? "text-yellow-200"
                            : "text-yellow-500"
                        }`}
                        stateCheck={`Received`}
                        colorState={`${
                          dateStateChecker("date_received") ? "received" : ""
                        }`}
                      />
                    </>
                  )}

                {orderTrackingStatus !== "cancelled" && (
                  <>
                    <StatusDates
                      statusName={`Completed`}
                      statusDateName={"date_completed"}
                      className={`${
                        dateStateChecker("date_completed")
                          ? "text-green-200"
                          : "text-green-500"
                      }`}
                      stateCheck={`Completed`}
                      colorState={`${
                        dateStateChecker("date_completed") ? "completed" : ""
                      }`}
                    />
                  </>
                )}

                {orderTrackingStatus === "completed" && (
                  <div
                    className={`bg-white py-2 px-4 rounded-md hover:-translate-y-1 hover:bg-gray-200 shadow-md transition-all duration-150 cursor-default`}
                  >
                    <p className={`font-semibold `}>Bill Reference #</p>
                    <span className="font-bold text-lg">
                      {orderPaymentRefNum}
                    </span>
                  </div>
                )}

                {orderTrackingStatus === "cancelled" && (
                  <StatusDates
                    statusName={`Cancelled`}
                    statusDateName={"date_cancelled"}
                    className={`${
                      dateStateChecker("date_cancelled")
                        ? "text-red-200"
                        : "text-red-500"
                    }`}
                    stateCheck={`Cancelled`}
                    colorState={`${
                      dateStateChecker("date_cancelled") ? "cancelled" : ""
                    }`}
                  />
                )}
              </div>
            </div>
            <div className="flex gap-4 max-h-[50px] ">
              {orderTrackingStatus === "unvalidated" &&
                orderType === "Delivery" && (
                  <OrderModalButton
                    className={`text-green-800 border-green-800 hover:bg-green-800`}
                    onClick={() => onClickUpdateStatus("validated")}
                    buttonName={"Validate Order"}
                  ></OrderModalButton>
                )}
              {orderTrackingStatus === "validated" && (
                <OrderModalButton
                  className={`text-blue-800 border-blue-800 hover:bg-blue-800`}
                  onClick={() => onClickUpdateStatus("shipped")}
                  buttonName={"Proceed to Shipping"}
                ></OrderModalButton>
              )}

              {orderTrackingStatus === "shipped" && (
                <OrderModalButton
                  className={`text-yellow-800 border-yellow-800 hover:bg-yellow-800`}
                  onClick={() => onClickUpdateStatus("received")}
                  buttonName={"Receive Order"}
                ></OrderModalButton>
              )}

              {orderTrackingStatus === "received" &&
                orderType === "Delivery" && (
                  <div className={`flex flex-col gap-4`}>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-4 ml-4">
                        <input
                          className="text-lg border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm"
                          type="number"
                          value={referenceNumber}
                          onChange={(e) => setReferenceNumber(e.target.value)}
                          required
                          name="reference"
                          id="reference"
                        />
                        <label
                          htmlFor="reference"
                          className="text-base absolute transition-all duration-100 ease-in px-4 py-2 text-gray-600 label-line"
                        >
                          Payment Reference #
                        </label>
                      </div>
                      <OrderModalButton
                        className={`text-green-800 border-green-800 hover:bg-green-800`}
                        onClick={() => onClickUpdateStatus("completed")}
                        buttonName={"Complete Order"}
                      ></OrderModalButton>
                      <OrderModalButton
                        className={`text-orange-500 border-orange-500`}
                        onClick={() => updateOrderDetail(returnItems)}
                        buttonName={"Return Order"}
                      ></OrderModalButton>
                    </div>
                  </div>
                )}
              {orderType === "Walkin" &&
                orderTrackingStatus !== "cancelled" &&
                orderTrackingStatus !== "completed" && (
                  <div className={`flex  gap-4`}>
                    <div className="flex items-center gap-4 ml-4">
                      <input
                        className="text-lg border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none shadow-sm"
                        type="number"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        required
                        name="reference"
                        id="reference"
                      />
                      <label
                        htmlFor="reference"
                        className="text-base absolute transition-all duration-100 ease-in px-4 py-2 text-gray-600 label-line"
                      >
                        Payment Reference #
                      </label>
                    </div>
                    <div className="flex gap-4">
                      <OrderModalButton
                        className={`text-green-800 border-green-800 hover:bg-green-800`}
                        onClick={() => onClickUpdateStatus("completed")}
                        buttonName={"Complete Order"}
                      ></OrderModalButton>
                    </div>
                  </div>
                )}
              {orderTrackingStatus === "unvalidated" && (
                <OrderModalButton
                  className={`text-red-600`}
                  onClick={() => onClickUpdateStatus("cancelled")}
                  buttonName={"Cancel Order"}
                ></OrderModalButton>
              )}

              {orderTrackingStatus === "validated" && (
                <OrderModalButton
                  className={`text-red-600`}
                  onClick={() => onClickUpdateStatus("cancelled")}
                  buttonName={"Cancel Order"}
                ></OrderModalButton>
              )}

              {orderTrackingStatus === "unvalidated" && (
                <OrderModalButton
                  className={`text-red-600`}
                  onClick={() => updateOrderDetail(returnItems)}
                  buttonName={"Edit Order"}
                ></OrderModalButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsOrderModal;
