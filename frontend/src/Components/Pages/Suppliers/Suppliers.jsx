import React, { useState, useEffect } from "react";
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

const Suppliers = () => {
  const [method, setMethod] = useState("");
  const [modal, setModal] = useState(false);

  // MODAL TOGGLE
  const toggleModal = () => {
    setMethod("create");
    setBtnTitle("Create Supplier");
    setModal((m) => (m = !m));
    setDeleteBtn("inactive");

    if (method === "edit") {
      setRowToEdit(null);
    }

    {
      errorWindow ? toggleErrorWindow() : "";
    }
  };

  // ERROR WINDOW TOGGLE

  const [errorWindow, setErrorWindow] = useState(false);
  const toggleErrorWindow = () => {
    setErrorWindow((e) => (e = !e));
  };

  useEffect(() => {
    if (errorWindow) {
      const timer = setTimeout(() => {
        setErrorWindow(false);
      }, 5000); // Closes the error window after 5 seconds

      return () => clearTimeout(timer); // Cleanup if component unmounts
    }
  }, [errorWindow]);

  // ERROR TEXT
  const [errors, setErrors] = useState("");
  var errorFields = [];

  // SUCCESS WINDOW TOGGLE
  const [successWindow, setSuccessWindow] = useState(false);
  const toggleSuccessWindow = () => {
    setSuccessWindow((e) => (e = !e));
  };

  useEffect(() => {
    if (successWindow) {
      const timer = setTimeout(() => {
        setSuccessWindow(false);
      }, 2000); // Closes the error window after 2.5 seconds

      return () => clearTimeout(timer); // Cleanup if component unmounts
    }
  }, [successWindow]);

  const [successMethod, setSuccessMethod] = useState("");
  //PROPS FOR <INPUT>
  const formArr = [
    {
      label: "Supplier Name",
      name: "supplier_name",
    },

    {
      label: "Phone Number",
      name: "phone_number",
      type: "number",
    },
    {
      label: "Description",
      name: "description",
    },
  ];

  //DISPLAY TEMPLATE ON <TABLE></TABLE>

  const tableColumns = [
    {
      header: "Supplier Name",
      row: "supplier_name",
    },

    {
      header: "Phone Number",
      row: "phone_number",
    },
    {
      header: "Description",
      row: "description",
    },
  ];

  const { data: supplier, triggerRefresh } = useFetchData("supplier");
  const { deleteData, error } = useDeleteData(); // add error field here later

  const deleteHandler = () => {
    deleteData("supplier", rowIdEdit);
  };

  // DISPLAY TEMPLATE ON <OVERVIEW></OVERVIEW>
  const overviewArr = [{ title: "Suppliers", quantity: `${supplier.length}` }];

  /////////////////////////////////////////////////////////// BACKEND

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (form, callback) => {
    setLoading(true);

    if (method === "create") {
      if (rowToEdit === null) {
        ////////////////////////////////////////// CODE FOR SAVING DATA
        try {
          const res = await api.post(
            "http://127.0.0.1:8000/api/supplier/create/",
            {
              supplier_name: form.supplier_name,
              phone_number: form.phone_number,
              description: form.description,
            }
          );

          {
            errorWindow ? toggleErrorWindow() : "";
          }
          triggerRefresh();
          toggleModal();
          callback();
          setSuccessMethod("Added");
          toggleSuccessWindow();
          setRowToEdit(null);
          errorFields = [];
        } catch (error) {
          for (const [key, value] of Object.entries(form)) {
            if (!value) {
              errorFields.push(key);
            }
          }
          setErrors((e) => errorFields.join(", "));
          {
            !errorWindow ? toggleErrorWindow() : "";
          }
        } finally {
          setLoading(false);
        }
      }
    } else if (method === "edit") {
      console.log(`edit method, id: ` + rowIdEdit);
      ////////////////////////////////////////// CODE FOR EDITING DATA
      try {
        const res = await api.put(
          `http://127.0.0.1:8000/api/supplier/update/${rowIdEdit}/`,
          {
            supplier_name: form.supplier_name,
            phone_number: form.phone_number,
            description: form.description,
          }
        );
        {
          errorWindow ? toggleErrorWindow() : "";
        }
        triggerRefresh();
        toggleModal();
        callback();
        setSuccessMethod("Edited");
        toggleSuccessWindow();
        setRowToEdit(null);
        errorFields = [];
      } catch (error) {
        for (const [key, value] of Object.entries(form)) {
          if (!value) {
            if (key !== "is_deleted") {
              errorFields.push(key);
            }
          }
        }
        setErrors((e) => errorFields.join(", "));
        {
          !errorWindow ? toggleErrorWindow() : "";
        }
        callback();
      } finally {
        setLoading(false);
      }
    } else if (method === "delete") {
      // rename rowIdEdit to rowIdSelected or smth similar
      try {
        const res = await api.delete(
          `http://127.0.0.1:8000/api/supplier/delete/${rowIdEdit}`
        );
        console.log("product deleted.");
      } catch (error) {
        // feel free to change here
        console.log(error);
      } finally {
        setLoading(false);
        setRowIdEdit(null); // ito ung delete id
      }
    }
  };

  const [deleteBtn, setDeleteBtn] = useState(""); // HANDLES DELETE BUTTON STATE
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowIdEdit, setRowIdEdit] = useState(null);
  const [btnTitle, setBtnTitle] = useState("Create Supplier");
  const handleEditRow = (index, id) => {
    toggleModal();
    setRowIdEdit(id);
    setRowToEdit(index);
    setMethod("edit");
    setBtnTitle("Edit Supplier");
    setDeleteBtn("active");
  };

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview overviewArr={overviewArr} />

        <div className={`flex flex-col flex-1 m-4 `}>
          <div className={`m-4`}>
            <div className={`flex justify-between`}>
              <h1 className={`text-3xl font-bold`}>Suppliers</h1>
              <div>
                <button
                  onClick={toggleModal}
                  className={` shadow-md text-white bg-red-600 border-2 border-red-800 rounded-lg px-4 py-2 mx-4 hover:bg-red-700  transition-all duration-100 flex gap-4 items-center`}
                >
                  Create Supplier
                  <div
                    className={`py-2 px-3 rounded-lg bg-red-700 hover:bg-red-800 transition-all duration-100`}
                  >
                    <ArrowDownTrayIcon className="size-5" />
                  </div>
                </button>
              </div>
            </div>

            <DynamicModal modal={modal} toggleModal={toggleModal}>
              <div className="absolute z-20 top-20  left-1/2 transform -translate-x-1/2  ">
                {errorWindow && (
                  <div
                    className={`rounded mt-8 p-4 text-lg font-bold text-red-600   bg-red-200 flex justify-between transition-all w-[70vw] shadow-2xl`}
                  >
                    <h1>
                      <span className="text-red-700">
                        Please fill in properly the:{" "}
                      </span>
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
              <DynamicForm
                error={errorFields}
                btnTitle={btnTitle}
                title={"Supplier"}
                deleteBtn={deleteBtn}
                deleteHandler={deleteHandler}
                deleteBtnTitle={"Delete Supplier"}
                trashIcon={<TrashIcon className="size-5" />}
                formArr={formArr}
                onSubmit={onSubmitHandler}
                defaultValue={rowToEdit !== null ? supplier[rowToEdit] : ""}
                icon={<ArrowDownTrayIcon className="size-5" />}
              />
            </DynamicModal>
            <div className="absolute z-20 top-20  left-1/2 transform -translate-x-1/2">
              {successWindow && (
                <div
                  className={`rounded p-4 text-lg font-bold text-green-600 bg-green-200 flex justify-between  transition-all w-[30vw] shadow-2xl`}
                >
                  <h1>
                    <span className="text-green-700">
                      Successfully {successMethod}!
                    </span>
                  </h1>
                  <button
                    onClick={toggleSuccessWindow}
                    className={`p-2 hover:text-green-700 text-xl`}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
          <Table
            columnArr={tableColumns}
            dataArr={supplier}
            editRow={handleEditRow}
          />
        </div>
      </div>
    </section>
  );
};

export default Suppliers;
