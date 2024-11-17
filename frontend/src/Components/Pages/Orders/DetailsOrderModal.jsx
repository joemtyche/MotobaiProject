import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo.png";
import Table from "../../DynamicComponents/DynamicTable";
import api from "../../../api";
import Swal from 'sweetalert2'

const DetailsOrderModal = ({ logsData, orderId }) => {
  const [orderDetails, setOrderDetails] = useState({});
  const fetchOrderDetail = async (orderId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/order/view/${orderId}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrderDetails(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    console.log("Order ID in modal:", orderId); // Log Order ID when modal is opened
    fetchOrderDetail(orderId);
  }, [orderId]);

  const onClickUpdateStatus = async (status) => {
    let statusString = "";  // Local variable inside the function
    if (status === "validated") {
      statusString = "Validate";
    } else if (status === "shipped") {
      statusString = "Ship";
    } else if (status === "received") {
      statusString = "Receive";
    } else if (status === "completed") {
      statusString = "Complete, this should also open a modal first";
    } else if (status === "cancelled") {
      statusString = "Cancel";
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
      confirmButtonText: `${statusString}`
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(status);
      }
    });
  }

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

      const res = await api.put(
        `http://127.0.0.1:8000/api/ordertracking/update/${orderId}/`,
        {
          status: status,
          [date_field]: currentDate,
        }
      );
      Swal.fire({
        title: `Order has been ${statusString}!`,
        text: "The order has been updated.",
        icon: "success",
        timer: 2000,
      }).then((result) => {
        location.reload();
      });
      console.log(`Order status updated to: ${status}`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.detail || "There was an issue creating the order.",
        icon: "error",
      });
    }
  };

  const tableColumns = [
    {
      header: "Product Name",
      row: "product_name",
      customRender: (item) => {
        return <p>{item.product_name}</p>;
      },
    },

    {
      header: "Quantity Added",
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
          className={`flex flex-col gap-12 bg-gray-100 p-12 pr-6 h-[80vh] w-[75vw] rounded-b-lg`}
        >
          <div className="flex gap-12">
            <h1 className="font-bold text-2xl">{orderDetails.order_type}</h1>
            <div>
              <h1 className="text-md">Account Name</h1>
              <h1 className="font-bold text-lg">{orderDetails.account_name}</h1>
            </div>
            <div>
              <div className="flex gap-6">
                <div>
                  <h1 className=" text-md">City</h1>
                  <h1 className="font-bold text-lg">{orderDetails.city}</h1>
                </div>
                <div>
                  <h1 className=" text-md">Barangay</h1>
                  <h1 className="font-bold text-lg">{orderDetails.barangay}</h1>
                </div>
                <div>
                  <h1 className=" text-md">Street</h1>
                  <h1 className="font-bold text-lg">{orderDetails.street}</h1>
                </div>
                <div>
                  <h1 className=" text-md">Phone Number</h1>
                  <h1 className="font-bold text-lg">
                    {orderDetails.phone_number}
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
          </div>
          <div>
            <Table
              columnArr={tableColumns}
              dataArr={logsData}
              className={`!h-[45vh]`}
              sortField="id"
              sortDirection="asc"
            ></Table>
          </div>
          <div className="flex justify-end gap-4">
            {orderTrackingStatus === "unvalidated" && (
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

            {orderTrackingStatus === "received" && (
              <OrderModalButton
                className={`text-green-800 border-green-800 hover:bg-green-800`}
                onClick={() => onClickUpdateStatus("completed")}
                buttonName={"Complete Order"}
              ></OrderModalButton>
            )}
            {orderTrackingStatus === "unvalidated" && (
              <OrderModalButton
                className={`text-red-600`}
                onClick={() => onClickUpdateStatus("cancelled")}
                buttonName={"Cancel Order"}
              ></OrderModalButton>
            )}

            {orderTrackingStatus !== "completed" &&
              orderTrackingStatus !== "cancelled" &&
              orderTrackingStatus !== "returned" && (
                <OrderModalButton
                  className={`text-orange-500 border-orange-500`}
                  onClick={() => onClickUpdateStatus("returned")}
                  buttonName={"Return Order"}
                ></OrderModalButton>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsOrderModal;
