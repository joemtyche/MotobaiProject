import { useState } from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import NavDropDown from "./NavDropDown";
import DynamicCustomLink from "../DynamicComponents/DynamicCustomLink";
import { clearAuthTokens } from "../../authTokens";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

function Navigation() {
  const [accountDropDown, setAccountDropDown] = useState(false);
  const [inventoryDropDown, setInventoryDropDown] = useState(false);

  const onHoverAccounts = () => {
    setAccountDropDown((d) => (d = !d));
  };
  const onHoverInventory = () => {
    setInventoryDropDown((d) => (d = !d));
  };

  const navigate = useNavigate();
  const logout = () => {
    clearAuthTokens();
  
    // Show success message
    Swal.fire({
      title: "Logged out!",
      icon: "success",
      timer: 1000,
    }).then(() => {
      // Redirect to login page or another route
      navigate("/login");
    });
  };

  // DROPWDOWN TEMPLATE

  const accountNavigationArr = [
    {
      route: "/accounts",
      navName: "Companies",
    },
    {
      route: "/walkIn",
      navName: "Walk In",
    },
  ];

  const inventoryNavigationArr = [
    {
      route: "/stockinlogs",
      navName: "Stock-in Logs",
    },
    {
      route: "/stockoutlogs",
      navName: "Stock-out Logs",
    },
  ];

  return (
    <nav className="ml-6 flex flex-1 items-center gap-3 text-base">
      <div
        className={`flex flex-col relative`}
        onMouseEnter={onHoverAccounts}
        onMouseLeave={onHoverAccounts}
      >
        <DynamicCustomLink to="/accounts" className="!min-w-[170px]">
          <div>
            <UserGroupIcon className="size-6 " />
          </div>
          <p>Accounts</p>
        </DynamicCustomLink>
        <div>
          {accountDropDown && (
            <div className={`flex flex-col item-center`}>
              <NavDropDown navigationArr={accountNavigationArr} />
            </div>
          )}
        </div>
      </div>
      <DynamicCustomLink to="/employees">
        <div>
          <ClipboardDocumentListIcon className="size-6 " />
        </div>
        <p>Employees</p>
      </DynamicCustomLink>
      <DynamicCustomLink to="/products">
        <div>
          <ArchiveBoxIcon className="size-6 " />
        </div>
        <p>Products</p>
      </DynamicCustomLink>
      <DynamicCustomLink to="/suppliers">
        <div>
          <BuildingStorefrontIcon className="size-6 " />
        </div>
        <p>Suppliers</p>
      </DynamicCustomLink>
      
      <div
        className={`relative `}
        onMouseEnter={onHoverInventory}
        onMouseLeave={onHoverInventory}
      >
        <DynamicCustomLink to="/inventory" className="!min-w-[185px]">
          <div>
            <ArchiveBoxArrowDownIcon className="size-6 " />
          </div>
          <p>Inventory</p>
        </DynamicCustomLink>
        <div>
          {inventoryDropDown && (
            <div className={`flex  item-center `}>
              <NavDropDown
                navigationArr={inventoryNavigationArr}
                className="!min-w-[185px]"
              />
            </div>
          )}
        </div>
      </div>
      <DynamicCustomLink to="/orders">
        <div>
          <ShoppingCartIcon className="size-6 " />
        </div>
        <p>Order Management</p>
      </DynamicCustomLink>
      <DynamicCustomLink to="/orderList">
        <div>
          <ClipboardDocumentListIcon className="size-6 " />
        </div>
        <p>Order History</p>
      </DynamicCustomLink>

      <div className="mx-1 h-9 w-px shrink-0 bg-gray-300" aria-hidden="true" />
      <button
        onClick={logout}
        className="flex shrink-0 items-center gap-2 rounded-md border border-red-700 bg-red-600 px-4 py-2 font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <ArrowRightOnRectangleIcon className="size-5" />
        Logout
      </button>
    </nav>
  );
}

export default Navigation;
