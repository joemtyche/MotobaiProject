import { useState } from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
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
    <nav className=" flex ml-6 justify-between max-h-12 gap-4 text-base">
      <div
        className={`flex flex-col relative`}
        onMouseEnter={onHoverAccounts}
        onMouseLeave={onHoverAccounts}
      >
        <DynamicCustomLink to="/accounts">
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
        <DynamicCustomLink to="/inventory">
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
                className={"flex-row"}
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

        <button
          onClick={logout}
          className="ml-auto flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
    </nav>
  );
}

export default Navigation;
