import { useState, useEffect } from "react";
import {
  ArrowDownTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import Overview from "../../Overview.jsx";
import DynamicForm from "../../DynamicComponents/DynamicForm.jsx";
import DynamicModal from "../../DynamicComponents/DynamicModal.jsx";
import PageActionButton from "../../DynamicComponents/PageActionButton.jsx";
import { useFetchData } from "../../Hooks/useFetchData.js";
import { useDeleteData } from "../../Hooks/useDeleteData.js";
import { useCreateData } from "../../Hooks/useCreateData.js";
import { useUpdateData } from "../../Hooks/useUpdateData.js";

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
  const [errors] = useState("");
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

  const [successMethod] = useState("");
  //PROPS FOR <INPUT>
  const formArr = [
    {
      label: "Supplier Name",
      name: "supplier_name",
    },

    {
      label: "Phone Number",
      name: "phone_number",
      type: "tel",
      inputMode: "tel",
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
  const { deleteData } = useDeleteData();

  const deleteHandler = () => {
    deleteData("supplier", rowIdEdit);
  };

  // DISPLAY TEMPLATE ON <OVERVIEW></OVERVIEW>
  const overviewArr = [{ title: "Suppliers", quantity: `${supplier.length}` }];

  /////////////////////////////////////////////////////////// BACKEND

  const { createData } = useCreateData();
  const { updateData } = useUpdateData();

  const onSubmitHandler = async (form) => {
    if (method === "create") {
      if (rowToEdit === null) {
        await createData(
          "supplier",
          {
            supplier_name: form.supplier_name,
            phone_number: form.phone_number,
            description: form.description,
          },
          "Supplier Created Successfully",
          toggleModal
        );
      }
      triggerRefresh();
      setRowToEdit(null);

    } else if (method === "edit") {
      await updateData(
        `supplier`,
        rowIdEdit,
        {
          supplier_name: form.supplier_name,
          phone_number: form.phone_number,
          description: form.description,
        },
        "Supplier Updated Successfully",
        toggleModal
      );
      triggerRefresh();
      setRowToEdit(null);
    }
  };

  const [deleteBtn, setDeleteBtn] = useState(""); // HANDLES DELETE BUTTON STATE
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowIdEdit, setRowIdEdit] = useState(null);
  const [btnTitle, setBtnTitle] = useState("Create Supplier");
  const handleEditRow = (id) => {
    toggleModal();
    setRowIdEdit(id);
    setRowToEdit(supplier.findIndex((item) => item.id === id));
    setMethod("edit");
    setBtnTitle("Edit Supplier");
    setDeleteBtn("active");
  };

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview overviewArr={overviewArr} />

        <div className={`flex flex-col flex-1 m-4 `}>
          <div className="my-4 mr-4">
            <div className={`flex justify-between`}>
              <h1 className={`text-5xl font-bold leading-[60px]`}>Suppliers</h1>
              <div className="pr-6">
                <PageActionButton
                  onClick={toggleModal}
                  icon={<ArrowDownTrayIcon className="size-5" />}
                >
                  Create Supplier
                </PageActionButton>
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
            <Table
              columnArr={tableColumns}
              dataArr={supplier}
              editRow={handleEditRow}
              sortField="id"
              sortDirection="asc"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suppliers;
