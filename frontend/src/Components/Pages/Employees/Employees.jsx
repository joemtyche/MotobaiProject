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

const Employees = () => {
  const [method, setMethod] = useState("");
  const [modal, setModal] = useState(false);

  // MODAL TOGGLE
  const toggleModal = () => {
    setMethod("create");
    setBtnTitle("Create Employee");
    setModal((m) => (m = !m));
    setDeleteBtn("inactive");

    if (method === "edit") {
      setRowToEdit(null);
    }

    {
      errorWindow ? toggleErrorWindow() : "";
    }
  };

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
      label: "First Name",
      name: "first_name",
    },
    {
      label: "Middle Name",
      name: "middle_name",
    },
    {
      label: "Last Name",
      name: "last_name",
    },
    {
      label: "City",
      name: "city",
    },
    {
      label: "Barangay",
      name: "barangay",
    },
    {
      label: "Street",
      name: "street",
    },
    {
      label: "Phone Number",
      name: "phone_number",
      type: "number",
    },
    {
      label: "Email",
      name: "email",
    },
  ];

  //DISPLAY TEMPLATE ON <TABLE></TABLE>

  const tableColumns = [
    {
      header: "Employee ID",
      row: "id",
    },
    {
      header: "Employee Name",
      customRender: (item) => {
        return (
          <p>
            {item.first_name} {item.middle_name} {item.last_name}
          </p>
        );
      },
    },
    {
      header: "City",
      row: "city",
    },
    {
      header: "Barangay",
      row: "barangay",
    },
    {
      header: "Street",
      row: "street",
    },
    {
      header: "Phone Number",
      row: "phone_number",
    },
    {
      header: "Email",
      row: "email",
    },
  ];

  const { data: employee, triggerRefresh } = useFetchData("employee");
  const { deleteData, error } = useDeleteData(); // add error field here later

  const deleteHandler = () => {
    deleteData("employee", rowIdEdit);
  };
  // DISPLAY TEMPLATE ON <OVERVIEW></OVERVIEW>
  const overviewArr = [{ title: "Employees", quantity: `${employee.length}` }];

  /////////////////////////////////////////////////////////// BACKEND

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (form, callback) => {
    setLoading(true);
    if (method === "create") {
      console.log("create method");
      ////////////////////////////////////////// CODE FOR SAVING DATA
      if (rowToEdit === null) {
        try {
          const res = await api.post(
            "http://127.0.0.1:8000/api/employee/create/",
            {
              first_name: form.first_name,
              middle_name: form.middle_name,
              last_name: form.last_name,
              city: form.city,
              barangay: form.barangay,
              street: form.street,
              phone_number: form.phone_number,
              email: form.email,
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
      try {
        const res = await api.put(
          `http://127.0.0.1:8000/api/employee/update/${rowIdEdit}/`,
          {
            first_name: form.first_name,
            middle_name: form.middle_name,
            last_name: form.last_name,
            city: form.city,
            barangay: form.barangay,
            street: form.street,
            phone_number: form.phone_number,
            email: form.email,
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
      } finally {
        setLoading(false);
      }
    }
  };

  const [deleteBtn, setDeleteBtn] = useState(""); // HANDLES DELETE BUTTON STATE
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowIdEdit, setRowIdEdit] = useState(null);
  const [btnTitle, setBtnTitle] = useState("Create Employee");
  const handleEditRow = (index, id) => {
    toggleModal();
    setRowIdEdit(id);
    setRowToEdit(index);
    setMethod("edit");
    setBtnTitle("Edit Employee");
    setDeleteBtn("active");
  };

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview overviewArr={overviewArr} />

        <div className={`flex flex-col flex-1 m-4 `}>
          <div className={`m-4`}>
            <div className={`flex justify-between`}>
              <h1 className={`text-3xl font-bold`}>Employee</h1>
              <div>
                <button
                  onClick={toggleModal}
                  className={` shadow-md text-white bg-red-600 border-2 border-red-800 rounded-lg px-4 py-2 mx-4 hover:bg-red-700  transition-all duration-100 flex gap-4 items-center`}
                >
                  Create Employee
                  <div
                    className={`py-2 px-3 rounded-lg bg-red-700 hover:bg-red-800 transition-all duration-100`}
                  >
                    <ArrowDownTrayIcon className="size-5" />
                  </div>
                </button>
              </div>
            </div>

            <DynamicModal modal={modal} toggleModal={toggleModal}>
              <div className="absolute z-20 top-20  left-1/2 transform -translate-x-1/2">
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
              <DynamicForm
                error={errorFields}
                btnTitle={btnTitle}
                title={"Employee"}
                deleteBtn={deleteBtn}
                deleteHandler={deleteHandler}
                deleteBtnTitle={"Delete Employee"}
                trashIcon={<TrashIcon className="size-5" />}
                formArr={formArr}
                onSubmit={onSubmitHandler}
                defaultValue={rowToEdit !== null ? employee[rowToEdit] : ""}
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
            dataArr={employee}
            editRow={handleEditRow}
          />
        </div>
      </div>
    </section>
  );
};

export default Employees;
