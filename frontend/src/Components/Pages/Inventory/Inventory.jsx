import { useState } from "react";
import { MinusCircleIcon, CubeIcon } from "@heroicons/react/24/outline";
import Table from "../../DynamicComponents/DynamicTable.jsx";
import Overview from "../../Overview.jsx";
import StockInForm from "./StockInForm.jsx";
import DynamicModal from "../../DynamicComponents/DynamicModal.jsx";
import { useFetchData } from "../../Hooks/useFetchData.js";
import StockOutForm from "./StockOutForm.jsx";
import PageActionButton from "../../DynamicComponents/PageActionButton.jsx";

export default function Inventory() {
  const [stockInModal, setStockInModal] = useState(false);
  const [stockOutModal, setStockOutModal] = useState(false);

  const getInventoryStatusRank = (item) => {
    if (item.stock === 0) {
      return 2;
    }

    if (item.stock < item.stock_minimum_threshold) {
      return 0;
    }

    return 1;
  };

  // const [packageModal, setPackageModal] = useState(false);

  // MODAL TOGGLE

  const toggleStockInModal = () => {
    setStockInModal((m) => (m = !m));
    triggerRefresh();
  };

  const toggleStockOutModal = () => {
    setStockOutModal((m) => (m = !m));
    triggerRefresh();
  };

  const tableColumns = [
    {
      header: "SKU",
      row: "product.sku",
      customRender: (item) => {
        return (
          <p className="overflow-y-auto max-w-[200px]">{item.product.sku}</p>
        );
      },
    }, 

    {
      header: "Product Name",
      row: "product.product_name",
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
      header: "Price",
      row: "product.price",
    },

    {
      header: "Threshold",
      row: "stock_minimum_threshold",
      customRender: (item) => {
        return <p className="font-semibold">{item.stock_minimum_threshold}</p>;
      },
    },
    {
      header: "Quantity",
      row: "stock",
      customRender: (item) => {
        return <p className="font-bold">{item.stock}</p>;
      },
    },

    {
      header: "Status",
      row: "inventory_status",
      sortAccessor: (item) => [
        getInventoryStatusRank(item),
        item.product?.sku || "",
      ],
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
  ];

  const { data: inventory, triggerRefresh } = useFetchData("inventory");

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
          <div className="my-4 mr-4">
            <div className={`flex justify-between`}>
              <h1 className={`text-5xl font-bold leading-[60px]`}>Inventory</h1>

              <div className="flex justify-end gap-4 pr-6">
                <PageActionButton
                  onClick={toggleStockOutModal}
                  icon={<MinusCircleIcon className="size-5" />}
                >
                  Stock Out
                </PageActionButton>
                <PageActionButton
                  onClick={toggleStockInModal}
                  icon={<CubeIcon className="size-5" />}
                >
                  Stock In
                </PageActionButton>
              </div>
            </div>

            {/* STOCK IN FORM */}
            <DynamicModal modal={stockInModal} toggleModal={toggleStockInModal}>
              <StockInForm />
            </DynamicModal>
            {/* STOCK OUT FORM */}
            <DynamicModal
              modal={stockOutModal}
              toggleModal={toggleStockOutModal}
            >
              <StockOutForm />
            </DynamicModal>
          </div>
          <Table
            columnArr={tableColumns}
            dataArr={inventory}
            sortField="inventory_status"
            sortDirection="asc"
          />
        </div>
      </div>
    </section>
  );
}
