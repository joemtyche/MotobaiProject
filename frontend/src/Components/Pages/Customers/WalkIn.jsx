import React, { useState } from "react";
import { UserPlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import Overview from "../../Overview.jsx";
import DynamicForm from "../../DynamicComponents/DynamicForm.jsx";
import DynamicModal from "../../DynamicComponents/DynamicModal.jsx";
import api from "../../../api";
import DynamicCustomLink from "../../DynamicComponents/DynamicCustomLink.jsx";
import { useFetchData } from "../../Hooks/useFetchData.js";
import { useDeleteData } from "../../Hooks/useDeleteData.js";

const WalkIn = () => {
  const [method, setMethod] = useState("");
  const [modal, setModal] = useState(false);

  // MODAL TOGGLE
  const toggleModal = () => {
    setMethod("create");
    setBtnTitle("Create Customer");
    setModal((m) => (m = !m));
    setDeleteBtn("inactive");

    if (method === "edit") {
      setRowToEdit(null);
    }
  };

  const [errorWindow, setErrorWindow] = useState(false);

  const toggleErrorWindow = () => {
    setErrorWindow((e) => (e = !e));
  };

  const [errors, setErrors] = useState("");
  var errorFields = [];

  //PROPS FOR <INPUT>
  const formArr = [
    { label: "Customer Name", name: "customer_name" },
    {
      label: "Phone Number",
      name: "phone_number",
    },
  ];

  //DISPLAY TEMPLATE ON <TABLE></TABLE>

  const tableColumns = [
    {
      header: "Customer ID",
      row: "id",
    },
    { header: "Customer Name", row: "customer_name" },
    {
      header: "Phone Number",
      row: "phone_number",
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

  const { data: customer } = useFetchData("customer");
  const { deleteData, error } = useDeleteData(); // add error field here later

  const deleteHandler = () => {
    deleteData("customer", rowIdEdit);
  };

  const overviewArr = [
    { title: "Walk-in Customers", quantity: `${customer.length}` },
  ];

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (form, callback) => {
    console.log("submitting..");
    if (method === "create") {
      console.log("create method");
      if (rowToEdit === null) {
        try {
          const res = await api.post(
            "http://127.0.0.1:8000/api/customer/create/",
            {
              customer_name: form.customer_name,
              phone_number: form.phone_number,
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
          for (const [key, value] of Object.entries(form)) {
            if (!value) {
              errorFields.push(key);
            }
          }
          setErrors((e) => errorFields.join(", "));
          {
            !errorWindow ? toggleErrorWindow() : "";
          }
          callback();
        } finally {
        }
      }
    } else if (method === "edit") {
      console.log(`edit method, id: ` + rowIdEdit);
      try {
        const res = await api.put(
          `http://127.0.0.1:8000/api/customer/update/${rowIdEdit}/`,
          {
            customer_name: form.customer_name,
            phone_number: form.phone_number,
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
        for (const [key, value] of Object.entries(form)) {
          if (!value) {
            errorFields.push(key);
          }
        }
        setErrors((e) => errorFields.join(", "));
        {
          !errorWindow ? toggleErrorWindow() : "";
        }
        callback();
      } finally {
        setRowIdEdit(null); // ito ung customer id
      }

      callback();
    }
  };
  const [deleteBtn, setDeleteBtn] = useState(""); // HANDLES DELETE BUTTON STATE
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowIdEdit, setRowIdEdit] = useState(null);
  const [btnTitle, setBtnTitle] = useState("Create Customer");
  const handleEditRow = (index, id) => {
    console.log("Editing row:", index); // just for troubleshoot
    console.log("ID:", id); // just for troubleshoot
    toggleModal();
    setRowIdEdit(id); // need to make null after this is done
    setRowToEdit(index);
    setMethod("edit");
    setBtnTitle("Edit Customer");
    setDeleteBtn("active");
  };

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview overviewArr={overviewArr} />

        <div className={`flex flex-col flex-1 m-4 `}>
          <div className={`m-4`}>
            <div className={`flex justify-between`}>
              <h1 className={`text-3xl font-bold`}>Walk-In</h1>
              <div className={`flex`}>
                <DynamicCustomLink to="/accounts">
                  <div>
                    <UserPlusIcon className="size-6 " />
                  </div>
                  <p>Accounts</p>
                </DynamicCustomLink>
                <button
                  onClick={toggleModal}
                  className={`text-white bg-red-600 border-2 border-red-800 rounded-lg px-4 py-2 mx-4 hover:bg-red-700  transition-all duration-100 flex gap-4 items-center`}
                >
                  <div
                    className={`py-2 px-3 rounded-lg bg-red-700  transition-all duration-100`}
                  >
                    <UserPlusIcon className="size-5" />
                  </div>
                  Create Walk-In
                </button>
              </div>
            </div>

            <DynamicModal modal={modal} toggleModal={toggleModal}>
              <DynamicForm
                error={errorFields}
                btnTitle={btnTitle}
                title={"Customer"}
                deleteBtn={deleteBtn}
                deleteHandler={deleteHandler}
                deleteBtnTitle={"Delete Customer"}
                trashIcon={<TrashIcon className="size-5" />}
                formArr={formArr}
                onSubmit={onSubmitHandler}
                defaultValue={rowToEdit !== null ? customer[rowToEdit] : ""}
                icon={<UserPlusIcon className="size-5" />}
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
            dataArr={customer}
            editRow={handleEditRow}
          />
        </div>
      </div>
    </section>
  );
};

export default WalkIn;
