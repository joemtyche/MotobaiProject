import React, { useState } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  GiftIcon,
  InboxArrowDownIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import Overview from "../../Overview.jsx";
import DynamicModal from "../../DynamicComponents/DynamicModal.jsx";
import DetailsOrderModal from "./DetailsOrderModal.jsx";
import { useFetchData } from "../../Hooks/useFetchData.js";
import CreateDeliveryOrderForm from "./CreateDeliveryOrderForm.jsx";
import CreateWalkinOrderForm from "./CreateWalkinOrderForm.jsx";
import PageActionButton from "../../DynamicComponents/PageActionButton.jsx";

export default function Orders() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderId, setOrderId] = useState();
  const [orderFilter, setOrderFilter] = useState("all");
  const { data: orders, triggerRefresh } = useFetchData("order");

  const order = orders.filter(
    (item) =>
      item.order_tracking?.status !== "completed" &&
      item.order_tracking?.status !== "returned" &&
      item.order_tracking?.status !== "cancelled"
  );
  const filteredOrder =
    orderFilter === "all"
      ? order
      : order.filter((item) => item.order_tracking?.status === orderFilter);

  const [createDeliveryModal, setCreateDeliveryModal] = useState(false);
  const [createWalkinModal, setCreateWalkinModal] = useState(false);

  const toggleCreateDeliveryModal = () => {
    triggerRefresh();
    setCreateDeliveryModal((m) => (m = !m));
  };

  const toggleCreateWalkinModal = () => {
    triggerRefresh();
    setCreateWalkinModal((m) => (m = !m));
  };

  //DISPLAY TEMPLATE ON <TABLE></TABLE>
  const tableColumns = [
    {
      header: "Order ID",
      row: "id",
    },

    {
      header: "Reference #",
      row: "reference_number",
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
      row: "account_name",
      customRender: (item) => {
        if (item.order_type === "Walkin") {
          return <p>{item.customer_name}</p>;
        } else if (item.order_type === "Delivery") {
          return <p>{item.account_name}</p>;
        } else {
          return <p>Unknown</p>; // Fallback case
        }
      },
    },
    {
      header: "Employee",
      row: "employee_first_name",
      customRender: (item) => {
        return (
          <p>
            {item.employee_last_name}, {item.employee_first_name},{" "}
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
        if (item.order_tracking.status === "validated") {
          return (
            <p className="uppercase font-semibold text-green-600">
              {item.order_tracking.status}
            </p>
          );
        } else if (item.order_tracking.status === "unvalidated") {
          return (
            <p className="uppercase font-semibold text-gray-600">
              {item.order_tracking.status}
            </p>
          );
        } else if (item.order_tracking.status === "shipped") {
          return (
            <p className="uppercase font-semibold text-indigo-800">
              {item.order_tracking.status}
            </p>
          );
        } else if (item.order_tracking.status === "received") {
          return (
            <p className="uppercase font-semibold text-yellow-600">
              {item.order_tracking.status}
            </p>
          );
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
  let unvalidatedCount = 0;
  let validatedCount = 0;
  let shippedCount = 0;
  let receivedCount = 0;

  const statusCount = order;

  statusCount.forEach((item) => {
    if (item.order_tracking.status === "unvalidated") {
      unvalidatedCount++;
    } else if (item.order_tracking.status === "validated") {
      validatedCount++;
    } else if (item.order_tracking.status === "shipped") {
      shippedCount++;
    } else if (item.order_tracking.status === "received") {
      receivedCount++;
    }
  });
  // DISPLAY TEMPLATE ON <OVERVIEW></OVERVIEW>
  const overviewArr = [
    {
      title: "Orders",
      quantity: `${order.length}`,
      icon: <ShoppingCartIcon />,
      onClick: () => setOrderFilter("all"),
      active: orderFilter === "all",
    },
    {
      title: "Unvalidated",
      quantity: `${unvalidatedCount}`,
      className: "!text-gray-400",
      icon: <ClockIcon />,
      onClick: () => setOrderFilter("unvalidated"),
      active: orderFilter === "unvalidated",
    },
    {
      title: "Validated",
      quantity: `${validatedCount}`,
      className: "!text-green-500",
      icon: <CheckCircleIcon />,
      onClick: () => setOrderFilter("validated"),
      active: orderFilter === "validated",
    },
    {
      title: "Shipped",
      quantity: `${shippedCount}`,
      className: "!text-blue-500",
      icon: <TruckIcon />,
      onClick: () => setOrderFilter("shipped"),
      active: orderFilter === "shipped",
    },
    {
      title: "Received",
      quantity: `${receivedCount}`,
      className: "!text-yellow-500",
      icon: <InboxArrowDownIcon />,
      onClick: () => setOrderFilter("received"),
      active: orderFilter === "received",
    },
  ];

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview
          title={`Order Management`}
          overviewArr={overviewArr}
          onReset={() => setOrderFilter("all")}
        />

        <div className={`flex flex-col flex-1 m-4`}>
          <div className="my-4 mr-4">
            <div className={`flex justify-between mb-4`}>
              <h1 className={`text-5xl font-bold leading-[60px]`}>
                Order Management
              </h1>
              <div className="flex justify-end gap-4 pr-6">
                <PageActionButton
                  onClick={toggleCreateDeliveryModal}
                  icon={<TruckIcon className="size-5" />}
                >
                  Delivery Order
                </PageActionButton>
                <PageActionButton
                  onClick={toggleCreateWalkinModal}
                  icon={<GiftIcon className="size-5" />}
                >
                  Walk-In Order
                </PageActionButton>
                <DynamicModal
                  modal={createDeliveryModal}
                  toggleModal={toggleCreateDeliveryModal}
                >
                  <CreateDeliveryOrderForm />
                </DynamicModal>
                <DynamicModal
                  modal={createWalkinModal}
                  toggleModal={toggleCreateWalkinModal}
                >
                  <CreateWalkinOrderForm />
                </DynamicModal>
              </div>
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
