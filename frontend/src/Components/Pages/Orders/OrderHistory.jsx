import React, { useState } from "react";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import Overview from "../../Overview.jsx";
import DynamicModal from "../../DynamicComponents/DynamicModal.jsx";
import DetailsOrderModal from "./DetailsOrderModal.jsx";
import { useFetchData } from "../../Hooks/useFetchData.js";

export default function OrderHistory() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderId, setOrderId] = useState();
  const { data: orders } = useFetchData("order");

  const order = orders.filter(
    (item) =>
      item.order_tracking?.status !== "unvalidated" &&
      item.order_tracking?.status !== "validated" &&
      item.order_tracking?.status !== "shipped" &&
      item.order_tracking?.status !== "received"
  );

  //DISPLAY TEMPLATE ON <TABLE></TABLE>
  const tableColumns = [
    {
      header: "Order ID",
      row: "id",
    },

    {
      header: "Number of Products",
      row: "order_details.length",
      customRender: (item) => {
        return <p>{item.order_details.length}</p>;
      },
    },

    {
      header: "Customer",
      customRender: (item) => {
        const orderType = item.order_type;
        if (orderType === "Delivery") {
          return <p>{item.account_name}</p>;
        } else {
          return <p>{item.customer_name}</p>;
        }
      },
    },
    {
      header: "Employee",
      row: "employee_first_name",
      customRender: (item) => {
        return (
          <p>
            {item.employee_last_name}, {item.employee_first_name},{""}
            {item.employee_middle_name}
          </p>
        );
      },
    },

    {
      header: "Last Updated",
      row: "order_tracking.last_updated",
      customRender: (item) => {
        const createdAtDate = new Date(item.order_tracking.last_updated);
        const options = { hour: "numeric", minute: "numeric", hour12: true }; // Options for formatting time
        const formattedTime = createdAtDate.toLocaleString("en-US", options); // Format the time
        const formattedDate = `${
          createdAtDate.getMonth() + 1
        }/${createdAtDate.getDate()}/${createdAtDate.getFullYear()} - ${formattedTime}`;

        return <p>{formattedDate}</p>;
      },
    },

    {
      header: "Order Type",
      row: "order_type",
      customRender: (item) => {
        return (
          <p
            className={`font-bold uppercase ${
              item.order_type === "Delivery"
                ? "text-blue-700"
                : "text-amber-700"
            }`}
          >
            {item.order_type}
          </p>
        );
      },
    },

    {
      header: "Status",
      row: "order_tracking.status",
      customRender: (item) => {
        if (item.order_tracking.status === "completed") {
          return (
            <p className="uppercase font-semibold text-green-600">
              {item.order_tracking.status}
            </p>
          );
        } else if (item.order_tracking.status === "cancelled") {
          return (
            <p className="uppercase font-semibold text-red-600">
              {item.order_tracking.status}
            </p>
          );
        } else if (item.order_tracking.status === "returned") {
          return (
            <p className="uppercase font-semibold text-red-600">
              {item.order_tracking.status}
            </p>
          );
        } else {
          return <p className="uppercase font-semibold text-green-600">N/A</p>;
        }
      },
    },
  ];

  const [modal, setModal] = useState(false);
  const [method, setMethod] = useState("None");
  const [detailsRow, setDetailsRow] = useState(null);

  const toggleModal = () => {
    setModal((m) => (m = !m));

    if (method == "Details") {
      setMethod("None");
      setDetailsRow(null);
    }
  };

  const handleRowDetails = (id) => {
    const selectedItem = order.find((log) => log.id === id); // Get the log based on the row clicked
    setOrderDetails(selectedItem.order_details); // Set the specific log's items
    setOrderId(selectedItem.id);

    setDetailsRow(id);
    setMethod("Details");

    toggleModal();
  };

  // DISPLAY TEMPLATE ON <OVERVIEW></OVERVIEW>

  let completedOrderCount = 0;
  let cancelledOrderCount = 0;
  let returnedOrderCount = 0;

  const statusCount = orders;

  statusCount.forEach((item) => {
    if (item.order_tracking.status === "completed") {
      completedOrderCount++;
    } else if (item.order_tracking.status === "cancelled") {
      cancelledOrderCount++;
    } else if (item.order_tracking.status === "returned") {
      returnedOrderCount++;
    }
  });
  const overviewArr = [
    { title: "Orders", quantity: `${order.length}` },
    {
      title: "Completed",
      quantity: `${completedOrderCount}`,
      className: "!text-green-500",
    },
    {
      title: "Cancelled",
      quantity: `${cancelledOrderCount}`,
      className: "!text-red-300",
    },
    {
      title: "Returned",
      quantity: `${returnedOrderCount}`,
      className: "!text-orange-500",
    },
  ];

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview title={`Order History`} overviewArr={overviewArr} />

        <div className={`flex flex-col flex-1 m-4`}>
          <div className={`m-4`}>
            <div className={`flex gap-12 mb-12`}>
              <h1 className={`text-3xl font-bold`}>Order History</h1>
              <div className="flex gap-4 mr-32 items-center">
                <label className="font-bold ">Status</label>
                <select
                  className={`min-w-[10vw] max-h-4 rounded-lg p-4`}
                ></select>
              </div>
            </div>

            <Table
              columnArr={tableColumns}
              dataArr={order}
              editRow={handleRowDetails}
              sortField="order_tracking.last_updated"
              sortDirection="desc"
            />
          </div>
        </div>
      </div>
      <DynamicModal modal={modal} toggleModal={toggleModal}>
        <DetailsOrderModal logsData={orderDetails} orderId={orderId} />
      </DynamicModal>
    </section>
  );
}
