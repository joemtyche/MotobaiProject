import Logo from "../../../assets/Logo.png";
import Table from "../../DynamicComponents/DynamicTable";

const DetailsStockModal = ({
  logsData,
  supplierData,
  employeeData,
  referenceNumberData,
  reasonData,
  titleData = "Stock In",
  quantityHeader = "Quantity Added",
}) => {
  const tableColumns = [
    {
      header: "SKU",
      row: "product.sku",
    },
    {
      header: "Product Name",
      customRender: (item) => {
        return <p>{item.product.product_name}</p>;
      },
    },

    {
      header: quantityHeader,
      customRender: (item) => {
        return <p>{item.quantity}</p>;
      },
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
          <div className="mb-6 flex min-h-[64px] gap-12">
            <h1 className="shrink-0 text-2xl font-bold">{titleData}</h1>
            <div className="flex flex-col gap-2">
              <h1 className="text-md ">Employee</h1>
              <p className="text-lg font-bold">{employeeData}</p>
            </div>
            {reasonData && (
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h1 className="text-md ">Reason</h1>
                <p className="h-7 truncate text-lg font-bold" title={reasonData}>
                  {reasonData}
                </p>
              </div>
            )}
            {referenceNumberData && (
              <>
                <div className="flex flex-col gap-2">
                  <h1 className="text-md ">Supplier</h1>
                  <p className="text-lg font-bold">{supplierData}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="text-md ">Reference #</h1>
                  <p className="text-lg font-bold">{referenceNumberData}</p>
                </div>
              </>
            )}
          </div>

          <Table
            columnArr={tableColumns}
            dataArr={logsData}
            className="!h-[52vh] !max-h-[52vh]"
            sortField={null}
            sortDirection="asc"
          ></Table>
        </div>
      </div>
    </section>
  );
};

export default DetailsStockModal;
