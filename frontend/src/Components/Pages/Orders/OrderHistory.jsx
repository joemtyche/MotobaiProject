import { useState } from "react";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  GiftIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import Overview from "../../Overview.jsx";
import DynamicModal from "../../DynamicComponents/DynamicModal.jsx";
import DetailsOrderModal from "./DetailsOrderModal.jsx";
import { useFetchData } from "../../Hooks/useFetchData.js";

export default function OrderHistory() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderId, setOrderId] = useState();
  const [historyFilter, setHistoryFilter] = useState("all");
  const [historyTypeFilter, setHistoryTypeFilter] = useState("all");
  const { data: orders } = useFetchData("order");

  const historyStatuses = ["completed", "cancelled", "returned"];
  const order = orders.filter(
    (item) => historyStatuses.includes(item.order_tracking?.status)
  );
  const filteredOrder = order.filter((item) => {
    const matchesStatus =
      historyFilter === "all" ||
      item.order_tracking?.status === historyFilter;
    const matchesOrderType =
      historyTypeFilter === "all" || item.order_type === historyTypeFilter;

    return matchesStatus && matchesOrderType;
  });

  //DISPLAY TEMPLATE ON <TABLE></TABLE>
  const tableColumns = [
    {
      header: "Order ID",
      row: "id",
    },

    {
      header: "Sales Reference #",
      row: "reference_number",
      customRender: (item) => {
        return <p>{item.reference_number || "N/A"}</p>;
      },
    },
    {
      header: "Bill Reference #",
      row: "order_tracking.reference_number",
      customRender: (item) => {
        return <p>{item.order_tracking?.reference_number || "N/A"}</p>;
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

  const toggleModal = () => {
    setModal((m) => (m = !m));

    if (method == "Details") {
      setMethod("None");
    }
  };

  const handleRowDetails = (id) => {
    const selectedItem = order.find((log) => log.id === id); // Get the log based on the row clicked
    setOrderDetails(selectedItem.order_details); // Set the specific log's items
    setOrderId(selectedItem.id);

    setMethod("Details");

    toggleModal();
  };

  // DISPLAY TEMPLATE ON <OVERVIEW></OVERVIEW>

  let completedOrderCount = 0;
  let cancelledOrderCount = 0;
  let returnedOrderCount = 0;
  let deliveryCount = 0;
  let walkinCount = 0;

  const statusCount = order;

  statusCount.forEach((item) => {
    if (item.order_tracking.status === "completed") {
      completedOrderCount++;
    } else if (item.order_tracking.status === "cancelled") {
      cancelledOrderCount++;
    } else if (item.order_tracking.status === "returned") {
      returnedOrderCount++;
    }

    if (item.order_type === "Delivery") {
      deliveryCount++;
    } else if (item.order_type === "Walkin") {
      walkinCount++;
    }
  });
  const overviewArr = [
    {
      title: "Orders",
      quantity: `${order.length}`,
      icon: <ClipboardDocumentListIcon />,
      onClick: () => setHistoryFilter("all"),
      active: historyFilter === "all",
    },
    {
      title: "Completed",
      quantity: `${completedOrderCount}`,
      className: "!text-green-500",
      icon: <CheckCircleIcon />,
      onClick: () => setHistoryFilter("completed"),
      active: historyFilter === "completed",
    },
    {
      title: "Cancelled",
      quantity: `${cancelledOrderCount}`,
      className: "!text-red-300",
      icon: <XCircleIcon />,
      onClick: () => setHistoryFilter("cancelled"),
      active: historyFilter === "cancelled",
    },
    {
      title: "Returned",
      quantity: `${returnedOrderCount}`,
      className: "!text-red-300",
      icon: <ArrowPathIcon />,
      onClick: () => setHistoryFilter("returned"),
      active: historyFilter === "returned",
    },
    {
      type: "separator",
      title: "Order Type",
    },
    {
      title: "All Types",
      quantity: `${order.length}`,
      icon: <ClipboardDocumentListIcon />,
      onClick: () => setHistoryTypeFilter("all"),
      active: historyTypeFilter === "all",
    },
    {
      title: "Delivery",
      quantity: `${deliveryCount}`,
      className: "!text-blue-300",
      icon: <TruckIcon />,
      onClick: () => setHistoryTypeFilter("Delivery"),
      active: historyTypeFilter === "Delivery",
    },
    {
      title: "Walk-In",
      quantity: `${walkinCount}`,
      className: "!text-amber-300",
      icon: <GiftIcon />,
      onClick: () => setHistoryTypeFilter("Walkin"),
      active: historyTypeFilter === "Walkin",
    },
  ];

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview
          title={`Order History`}
          overviewArr={overviewArr}
          onReset={() => {
            setHistoryFilter("all");
            setHistoryTypeFilter("all");
          }}
        />

        <div className={`flex flex-col flex-1 m-4`}>
          <div className="my-4 mr-4">
            <div className={`flex gap-12 mb-4`}>
              <h1 className={`text-5xl font-bold leading-[60px]`}>Order History</h1>
            </div>

            <Table
              columnArr={tableColumns}
              dataArr={filteredOrder}
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
