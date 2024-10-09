import React, { useEffect } from "react";
import { useState } from "react";
import Logo from "../../../assets/Logo.png";
import Table from "../../DynamicComponents/DynamicTable";
const DetailsStockModal = ({ logsData }) => {
  const tableColumns = [
    {
      header: "Product Name",
      customRender: (item) => {
        return <p>{item.inboundStockItems.quantity}</p>;
      },
    },
    {
      header: "Supplier Name",
      row: "inventory",
    },
    {
      header: "Quantity Added",
      row: "inboundStockItems.quantity",
    },
  ];

  return (
    <section>
      <div
        className={`absolute inset-0 w-fit h-fit m-auto bg-mainColor rounded-lg z-10
            `}
      >
        <div className={`bg-mainColor w-1/2 rounded-l-lg`}>
          <img
            className="max-w-16 rounded-l-xl"
            src={Logo}
            alt="Motobai-Logo"
          />
        </div>
        <div className={`bg-gray-100 p-12 pr-6 h-[75vh] w-[65vw] rounded-b-lg`}>
          <Table columnArr={tableColumns} dataArr={logsData}></Table>
        </div>
      </div>
    </section>
  );
};

export default DetailsStockModal;