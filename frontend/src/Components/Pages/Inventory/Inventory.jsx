import React, { useState } from "react";
import { GiftIcon, TruckIcon, CubeIcon } from "@heroicons/react/24/outline";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import Overview from "../../Overview.jsx";
import StockInForm from "./StockInForm.jsx";
import DynamicModal from "../../DynamicComponents/DynamicModal.jsx";
import CreateDeliveryOrderForm from "./CreateDeliveryOrderForm.jsx";
import { useFetchData } from "../../Hooks/useFetchData.js";
import { useEffect } from "react";

export default function Inventory() {
  const [method, setMethod] = useState("");
  const [stockInModal, setStockInModal] = useState(false);
  const [createDeliveryModal, setCreateDeliveryModal] = useState(false);

  // MODAL TOGGLE
  const toggleModal = () => {
    // setModal((m) => (m = !m));
  };

  const toggleStockInModal = () => {
    setStockInModal((m) => (m = !m));
  };

  const toggleCreateDeliveryModal = () => {
    setCreateDeliveryModal((m) => (m = !m));
  };

  const [errorWindow, setErrorWindow] = useState(false);

  // ERROR WINDOW TOGGLE
  const toggleErrorWindow = () => {
    setErrorWindow((e) => (e = !e));
  };

  // ERROR TEXT
  const [errors, setErrors] = useState("");
  var errorFields = [];

  //DISPLAY TEMPLATE ON <TABLE></TABLE>

  const tableColumns = [
    {
      header: "Inventory ID",
      row: "id",
    },

    {
      header: "Product Name",
      row: "product.product_name",
    },
    {
      header: "Price",
      row: "product.price",
    },
    {
      header: "Product Type",
      row: "product.product_type",
    },

    {
      header: "Vehicle type",
      row: "product.vehicle_type",
    },
    {
      header: "Threshold",
      customRender: (item) => {
        return <p className="font-semibold">{item.stock_minimum_threshold}</p>;
      },
    },
    {
      header: "Status",
      customRender: (item) => {
        if (item.stock === 0) {
          return <p className={`text-orange-500 font-bold`}>INACTIVE</p>;
        } else if (item.stock < item.stock_minimum_threshold) {
          return <p className={`text-yellow-500 font-bold`}>LOW STOCK</p>;
        } else {
          return <p className={`text-green-500 font-bold`}>ACTIVE</p>;
        }
      },
    },
    {
      header: "Quantity",
      customRender: (item) => {
        return <p className="font-bold">{item.stock}</p>;
      },
    },
  ];

  const { data: inventory } = useFetchData("inventory");

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (form, callback) => {
    setLoading(true);
  };

  const [deleteBtn, setDeleteBtn] = useState(""); // HANDLES DELETE BUTTON STATE
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowIdEdit, setRowIdEdit] = useState(null);
  const [btnTitle, setBtnTitle] = useState("Create Order");
  const handleEditRow = (index, id) => {
    console.log("Editing row:", index); // just for troubleshoot
    toggleModal();
    setRowIdEdit(id);
    setRowToEdit(index);
    setMethod("edit");
    setBtnTitle("Edit Inventory");
    setDeleteBtn("active");
    console.log(statusCount);
  };

  // DISPLAY TEMPLATE ON <OVERVIEW></OVERVIEW>
  let inactiveCount = 0;
  let lowStockCount = 0;
  let activeCount = 0;

  const statusCount = inventory;

  statusCount.forEach((item) => {
    if (item.stock === 0) {
      inactiveCount++;
    } else if (item.stock < item.stock_minimum_threshold) {
      lowStockCount++;
    } else {
      activeCount++;
    }
  });
  const overviewArr = [
    { title: "Products", quantity: `${inventory.length}` },
    {
      title: "Active",
      quantity: `${activeCount}`,
      className: "!text-green-500",
    },
    {
      title: "Low-Stock",
      quantity: `${lowStockCount}`,
      className: "!text-yellow-400",
    },
    {
      title: "Inactive",
      quantity: `${inactiveCount}`,
      className: "!text-orange-500",
    },
  ];

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview title={`Inventory`} overviewArr={overviewArr} />

        <div className={`flex flex-col flex-1 m-4 `}>
          <div className={`m-4`}>
            <div className={`flex justify-between`}>
              <h1 className={`text-3xl font-bold`}>Inventory</h1>

              <div className="flex mr-24">
                <div className="flex gap-4 mr-32 items-center">
                  <label className="font-bold ">Status</label>
                  <select
                    className={`min-w-[10vw] max-h-4 rounded-lg p-4`}
                  ></select>
                </div>
                <div>
                  <button
                    onClick={toggleStockInModal}
                    className={`bg-white border-2 border-red-800 rounded-lg px-4 py-2 mx-4 hover:bg-red-700 hover:text-gray-100 transition-all duration-100 flex gap-4 items-center shadow-md`}
                  >
                    Stock In
                    <div
                      className={`text-gray-100 py-2 px-3 rounded-lg bg-red-800 hover:bg-red-800 transition-all duration-100`}
                    >
                      <CubeIcon className="size-5" />
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex gap">
                <button
                  onClick={toggleCreateDeliveryModal}
                  className={`text-gray-100 bg-red-600 border-2 border-red-800 rounded-lg px-4 py-2 mx-4 hover:bg-red-700  transition-all duration-100 flex gap-4 items-center shadow-md`}
                >
                  Delivery Order
                  <div
                    className={`py-2 px-3 rounded-lg bg-red-700  transition-all duration-100`}
                  >
                    <TruckIcon className="size-5" />
                  </div>
                </button>
                <button
                  onClick={toggleModal}
                  className={`text-gray-100 bg-red-600 border-2 border-red-800 rounded-lg px-4 py-2 mx-4 hover:bg-red-700  transition-all duration-100 flex gap-4 items-center shadow-md`}
                >
                  Walk-In Order
                  <div
                    className={`py-2 px-3 rounded-lg bg-red-700  transition-all duration-100`}
                  >
                    <GiftIcon className="size-5" />
                  </div>
                </button>
              </div>
            </div>

            {/* STOCK IN FORM */}
            <DynamicModal modal={stockInModal} toggleModal={toggleStockInModal}>
              <StockInForm />
            </DynamicModal>
            <DynamicModal
              modal={createDeliveryModal}
              toggleModal={toggleCreateDeliveryModal}
            >
              <CreateDeliveryOrderForm />
            </DynamicModal>

            <div className="absolute top-50 z-10 shadow-xl">
              {errorWindow && (
                <div
                  className={`rounded mt-8 p-4 text-lg font-bold text-red-600  shadow-shadowTable bg-red-200 flex justify-between transition-all`}
                >
                  <h1>
                    <span className="text-red-700">Please fill in the: </span>
                    {errors}
                  </h1>
                  <button
                    onClick={toggleErrorWindow}
                    className={`p-2 hover:text-red-700 text-xl`}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
          <Table
            columnArr={tableColumns}
            dataArr={inventory}
            editRow={handleEditRow}
          />
        </div>
      </div>
    </section>
  );
}
