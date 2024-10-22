import React, { useState, useEffect } from "react";
import { UserPlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import Overview from "../../Overview.jsx";
import DynamicForm from "../../DynamicComponents/DynamicForm.jsx";
import DynamicModal from "../../DynamicComponents/DynamicModal.jsx";
import api from "../../../api.js";
import DynamicCustomLink from "../../DynamicComponents/DynamicCustomLink.jsx";
import { useFetchData } from "../../Hooks/useFetchData.js";
import { useDeleteData } from "../../Hooks/useDeleteData.js";

export default function Accounts() {
  const [method, setMethod] = useState("");
  const [modal, setModal] = useState(false);

  // MODAL TOGGLE
  const toggleModal = () => {
    setMethod("create");
    setBtnTitle("Create Account");
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
    { label: "Account Name", name: "account" },
    {
      label: "Representative Name",
      name: "representative_name",
      pattern: "[A-Za-z .]*",
    },
    {
      label: "Representative Position",
      name: "representative_position",
      pattern: "[A-Za-z .]*",
    },
    {
      label: "Phone Number",
      name: "phone_number",
      type: "number",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "City",
      name: "city",
      pattern: "[A-Za-z .]*",
    },
    {
      label: "Barangay",
      name: "barangay",
    },
    {
      label: "Street",
      name: "street",
    },
  ];

  //DISPLAY TEMPLATE ON <TABLE></TABLE>

  const tableColumns = [
    {
      header: "Account ID",
      row: "id",
    },

    {
      header: "Account Name",
      row: "account",
    },
    {
      header: "Representative Name",
      row: "representative_name",
    },
    {
      header: "Position",
      row: "representative_position",
    },
    {
      header: "City",
      row: "city",
    },
    {
      header: "Phone number",
      row: "phone_number",
    },
    {
      header: "Email",
      row: "email",
    },
    {
      header: "Date Created",
      customRender: (item) => {
        const createdAtDate = new Date(item.date_created);
        const formattedDate = `${
          createdAtDate.getMonth() + 1
        }/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;

        return <p>{formattedDate}</p>;
      },
    },
  ];

  // fetch and delete accounts
  const { data: account, triggerRefresh } = useFetchData("account");
  const { deleteData, error } = useDeleteData(); // add error field here later

  const deleteHandler = () => {
    deleteData("account", rowIdEdit);
  };

  // DISPLAY TEMPLATE ON <OVERVIEW></OVERVIEW>
  const overviewArr = [{ title: "Accounts", quantity: `${account.length}` }];

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (form, callback) => {
    setLoading(true);
    if (method === "create") {
      ////////////////////////////////////////// CODE FOR SAVING DATA
      if (rowToEdit === null) {
        try {
          const res = await api.post(
            "http://127.0.0.1:8000/api/account/create/",
            {
              account: form.account,
              representative_name: form.representative_name,
              representative_position: form.representative_position,
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
      console.log(`edit method, id: ` + rowIdEdit);
      ////////////////////////////////////////// CODE FOR EDITING DATA
      try {
        const res = await api.put(
          `http://127.0.0.1:8000/api/account/update/${rowIdEdit}/`,
          {
            account: form.account,
            representative_name: form.representative_name,
            representative_position: form.representative_position,
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
  const [btnTitle, setBtnTitle] = useState("Create Account");
  const handleEditRow = (index, id) => {
    console.log("Editing row:", index); // just for troubleshoot
    console.log("ID:", id); // just for troubleshoot
    toggleModal();
    setRowIdEdit(id); // need to make null after this is done
    setRowToEdit(index);
    setMethod("edit");
    setBtnTitle("Edit Account");
    setDeleteBtn("active");
  };

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview overviewArr={overviewArr} />

        <div className={`flex flex-col flex-1 m-4 `}>
          <div className={`m-4`}>
            <div className={`flex justify-between`}>
              <h1 className={`text-3xl font-bold`}>Accounts</h1>
              <div className={`flex`}>
                <DynamicCustomLink to="/walkIn">
                  <div>
                    <UserPlusIcon className="size-6 " />
                  </div>
                  <p>Walk-In Customers</p>
                </DynamicCustomLink>
                <button
                  onClick={toggleModal}
                  className={`text-white bg-red-600 border-2 border-red-800 rounded-lg px-4 py-2 mx-4 hover:bg-red-700  transition-all duration-100 flex gap-4 items-center shadow-md`}
                >
                  <div
                    className={`py-2 px-3 rounded-lg bg-red-700  transition-all duration-100`}
                  >
                    <UserPlusIcon className="size-5" />
                  </div>
                  Create Account
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
                btnTitle={btnTitle}
                title={"Account"}
                deleteBtn={deleteBtn}
                deleteHandler={deleteHandler}
                deleteBtnTitle={"Delete Account"}
                trashIcon={<TrashIcon className="size-5" />}
                formArr={formArr}
                onSubmit={onSubmitHandler}
                defaultValue={rowToEdit !== null ? account[rowToEdit] : ""}
                icon={<UserPlusIcon className="size-5" />}
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
            dataArr={account}
            editRow={handleEditRow}
          />
        </div>
      </div>
    </section>
  );
}
