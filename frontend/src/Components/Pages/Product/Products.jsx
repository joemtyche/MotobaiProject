import React, { useState, useEffect } from "react";
import {
  ArchiveBoxArrowDownIcon,
  ArrowDownTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import Overview from "../../Overview.jsx";
import DynamicForm from "../../DynamicComponents/DynamicForm.jsx";
import DynamicModal from "../../DynamicComponents/DynamicModal.jsx";
import PageActionButton from "../../DynamicComponents/PageActionButton.jsx";
import api from "../../../api";
import { useFetchData } from "../../Hooks/useFetchData.js";
import { useDeleteData } from "../../Hooks/useDeleteData.js";
import { useCreateData } from "../../Hooks/useCreateData.js";
import { useUpdateData } from "../../Hooks/useUpdateData.js";
import { formatPeso } from "../../Utils/formHelpers.js";

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

  //PROPS FOR <INPUT>
  const formArr = [
    {
      label: "Product Name",
      name: "product.product_name",
    },
    {
      label: "Price (₱)",
      name: "product.price",
      type: "number",
      inputMode: "decimal",
      min: "1",
      step: "0.01",
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
      type: "number",
      inputMode: "numeric",
      min: "1",
      step: "1",
    },
    {
      label: "SKU",
      name: "product.sku",
    },
  ];

  //DISPLAY TEMPLATE ON <TABLE></TABLE>
  const tableColumns = [
    {
      header: "SKU",
      row: "product.sku",
    },

    {
      header: "Product Name",
      row: "product.product_name",
    },
    {
      header: "Description",
      row: "product.description",
      customRender: (item) => {
        return (
          <p className="overflow-y-auto max-w-[240px] max-h-[100px]">
            {item.product.description}
          </p>
        );
      },
    },
    {
      header: "Price",
      row: "product.price",
      customRender: (item) => {
        return <p>{formatPeso(item.product.price)}</p>;
      },
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
      header: "Minimum Threshold",
      row: "stock_minimum_threshold",
      customRender: (item) => {
        return (
          <p className="font-semibold">{item.stock_minimum_threshold} units</p>
        );
      },
    },
  ];

  const { data: product, triggerRefresh } = useFetchData("inventory");
  const { deleteData, error } = useDeleteData(); // add error field here later

  const deleteHandler = () => {
    deleteData("inventory", rowIdEdit);
  };

  // DISPLAY TEMPLATE ON <OVERVIEW></OVERVIEW>
  const overviewArr = [{ title: "Products", quantity: `${product.length}` }];

  const { createData, loading: createLoading } = useCreateData();
  const { updateData, loading: updateLoading } = useUpdateData();

  const onSubmitHandler = async (form) => {
    const info = {
      product_name: form.product.product_name,
      sku: form.product.sku,
      product_type: form.product.product_type,
      price: form.product.price,
      description: form.product.description,
      vehicle_type: form.product.vehicle_type,
      brand: form.product.brand,
      stock_minimum_threshold: form.stock_minimum_threshold,
    };

    console.log("form being sent to backend:", info);

    if (method === "create") {
      if (rowToEdit === null) {
        await createData(
          "product",
          {
            product_name: form.product.product_name,
            sku: form.product.sku,
            product_type: form.product.product_type,
            price: form.product.price,
            description: form.product.description,
            vehicle_type: form.product.vehicle_type,
            brand: form.product.brand,
            stock_minimum_threshold: form.stock_minimum_threshold,
          },
          "Product Created Successfully",
          toggleModal
        );
      }
      triggerRefresh();
      setRowToEdit(null);
    } else if (method === "edit") {
      await updateData(
        `product`,
        rowIdEdit,
        {
          product_name: form.product.product_name,
          sku: form.product.sku,
          product_type: form.product.product_type,
          price: form.product.price,
          description: form.product.description,
          vehicle_type: form.product.vehicle_type,
          brand: form.product.brand,
          stock_minimum_threshold: form.stock_minimum_threshold,
        },
        "Product Updated Successfully",
        toggleModal
      );
      triggerRefresh();
      setRowToEdit(null);
    }
  };

  const [deleteBtn, setDeleteBtn] = useState(""); // HANDLES DELETE BUTTON STATE
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowIdEdit, setRowIdEdit] = useState(null);
  const [btnTitle, setBtnTitle] = useState("Create Product");
  const handleEditRow = (id) => {
    toggleModal();
    setRowIdEdit(id); // need to make null after this is done
    setRowToEdit(product.findIndex((item) => item.id === id));
    setMethod("edit");
    setBtnTitle("Edit Product");
    setDeleteBtn("active");
  };

  return (
    <section className={`font-main h-full overflow-hidden`}>
      <div className={`bg-normalGray box-border flex h-full `}>
        <Overview title={`Products`} overviewArr={overviewArr} />

        <div className={`flex flex-col flex-1 m-4 `}>
          <div className="my-4 mr-4">
            <div className={`flex justify-between`}>
              <h1 className={`text-5xl font-bold leading-[60px]`}>Products</h1>
              <div className="flex gap-4 pr-6">
                <PageActionButton
                  onClick={toggleModal}
                  icon={<ArrowDownTrayIcon className="size-5" />}
                >
                  Create Product
                </PageActionButton>
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
            <Table
              columnArr={tableColumns}
              dataArr={product}
              editRow={handleEditRow}
              sortField="product.id"
              sortDirection="asc"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
