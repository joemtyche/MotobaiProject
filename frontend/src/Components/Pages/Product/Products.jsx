import React, { useState } from "react";
import {
  UserPlusIcon,
  ArrowDownTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import Overview from "../../Overview.jsx";
import DynamicForm from "../../DynamicComponents/DynamicForm.jsx";
import DynamicModal from "../../DynamicComponents/DynamicModal.jsx";
import api from "../../../api";
import { useFetchData } from "../../Hooks/useFetchData.js";
import { useDeleteData } from "../../Hooks/useDeleteData.js";

export default function Products() {
  const [method, setMethod] = useState("");
  const [modal, setModal] = useState(false);

  // MODAL TOGGLE
  const toggleModal = () => {
    setMethod("create");
    setBtnTitle("Create Product");
    setModal((m) => (m = !m));
    setDeleteBtn("inactive");

    if (method === "edit") {
      setRowToEdit(null);
    }
  };

  const [errorWindow, setErrorWindow] = useState(false);

  // ERROR WINDOW TOGGLE
  const toggleErrorWindow = () => {
    setErrorWindow((e) => (e = !e));
  };

  // ERROR TEXT
  const [errors, setErrors] = useState("");
  var errorFields = [];

  //PROPS FOR <INPUT>
  const formArr = [
    {
      label: "Product Name",
      name: "product.product_name",
    },
    {
      label: "Price",
      name: "product.price",
    },
    {
      label: "Product Type",
      name: "product.product_type",
    },
    {
      label: "Description",
      name: "product.description",
    },
    {
      label: "Vehicle Type",
      name: "product.vehicle_type",
    },

    {
      label: "Brand",
      name: "product.brand",
    },
    {
      label: "Stock Minimum Threshold",
      name: "stock_minimum_threshold",
    },
  ];

  //DISPLAY TEMPLATE ON <TABLE></TABLE>
  const tableColumns = [
    {
      header: "Product ID",
      row: "product.id",
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
      header: "Brand",
      row: "product.brand",
    },
    {
      header: "Minimum Treshold",
      customRender: (item) => {
        return <p className="font-semibold">{item.stock_minimum_threshold}</p>;
      },
    },
  ];

  const { data: product } = useFetchData("inventory");
  const { deleteData, error } = useDeleteData(); // add error field here later

  const deleteHandler = () => {
    deleteData("inventory", rowIdEdit);
  };

  // DISPLAY TEMPLATE ON <OVERVIEW></OVERVIEW>
  const overviewArr = [{ title: "Products", quantity: `${product.length}` }];

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (form, callback) => {
    setLoading(true);
    if (method === "create") {
      console.log(form);
      console.log("create method");
      ////////////////////////////////////////// CODE FOR SAVING DATA
      if (rowToEdit === null) {
        try {
          const res = await api.post(
            "http://127.0.0.1:8000/api/product/create/",
            {
              product_name: form.product.product_name,
              product_type: form.product.product_type,
              price: form.product.price,
              description: form.product.description,
              vehicle_type: form.product.vehicle_type,
              brand: form.product.brand,
              stock_minimum_threshold: form.stock_minimum_threshold,
            }
          );

          window.location.reload();
          {
            errorWindow ? toggleErrorWindow() : "";
          }
          callback();
          toggleModal();
        } catch (error) {
          setRowToEdit(null);
          errorFields = [];
          toggleModal();
          for (const [key, value] of Object.entries(form.product)) {
            if (!value) {
              errorFields.push(key);
            }
          }
          if (!form.stock_minimum_threshold) {
            errorFields.push("stock_minimum_threshold");
          }
          setErrors((e) => errorFields.join(", "));
          {
            !errorWindow ? toggleErrorWindow() : "";
          }
          callback();
        } finally {
          setLoading(false);
        }
      }
    } else if (method === "edit") {
      console.log(`edit method, id: ` + rowIdEdit);
      try {
        const res = await api.put(
          `http://127.0.0.1:8000/api/product/update/${rowIdEdit}/`,
          {
            product_name: form.product.product_name,
            product_type: form.product.product_type,
            price: form.product.price,
            description: form.product.description,
            vehicle_type: form.product.vehicle_type,
            brand: form.product.brand,
            stock_minimum_threshold: form.stock_minimum_threshold,
          }
        );
        window.location.reload();
        {
          errorWindow ? toggleErrorWindow() : "";
        }
      } catch (error) {
        setRowToEdit(null);
        errorFields = [];
        toggleModal();
        for (const [key, value] of Object.entries(form.product)) {
          if (!value) {
            errorFields.push(key);
          }
        }
        if (!form.stock_minimum_threshold) {
          errorFields.push("stock_minimum_threshold");
        }
        setErrors((e) => errorFields.join(", "));
        {
          !errorWindow ? toggleErrorWindow() : "";
        }
        callback();
      } finally {
        setLoading(false);
        setRowIdEdit(null);
      }

      callback();
    }
  };
  const [deleteBtn, setDeleteBtn] = useState(""); // HANDLES DELETE BUTTON STATE
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowIdEdit, setRowIdEdit] = useState(null);
  const [btnTitle, setBtnTitle] = useState("Create Product");
  const handleEditRow = (index, id) => {
    toggleModal();
    setRowIdEdit(id); // need to make null after this is done
    setRowToEdit(index);
    setMethod("edit");
    setBtnTitle("Edit Product");
    setDeleteBtn("active");
  };

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview title={`Products`} overviewArr={overviewArr} />

        <div className={`flex flex-col flex-1 m-4 `}>
          <div className={`m-4`}>
            <div className={`flex justify-between`}>
              <h1 className={`text-3xl font-bold`}>Products</h1>
              <div>
                <button
                  onClick={toggleModal}
                  className={`shadow-md text-white bg-red-600 border-2 border-red-800 rounded-lg px-4 py-2 mx-4 hover:bg-red-700  transition-all duration-100 flex gap-4 items-center`}
                >
                  Create Product
                  <div
                    className={`py-2 px-3 rounded-lg bg-red-700 hover:bg-red-800 transition-all duration-100`}
                  >
                    <ArrowDownTrayIcon className="size-5" />
                  </div>
                </button>
              </div>
            </div>

            <DynamicModal modal={modal} toggleModal={toggleModal}>
              <DynamicForm
                btnTitle={btnTitle}
                title={"Product"}
                deleteBtn={deleteBtn}
                deleteHandler={deleteHandler}
                deleteBtnTitle={"Delete Product"}
                trashIcon={<TrashIcon className="size-5" />}
                formArr={formArr}
                onSubmit={onSubmitHandler}
                defaultValue={rowToEdit !== null ? product[rowToEdit] : ""}
                icon={<ArrowDownTrayIcon className="size-5" />}
              />
            </DynamicModal>

            <div className="absolute top-50 z-10 shadow-2xl">
              {errorWindow && (
                <div
                  className={`rounded mt-8 p-4 text-lg font-bold text-red-600  shadow-shadowTable bg-red-200 flex justify-between transition-all w-[70vw]`}
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
            dataArr={product}
            editRow={handleEditRow}
          />
        </div>
      </div>
    </section>
  );
}
