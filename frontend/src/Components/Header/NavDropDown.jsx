import React from "react";
import DynamicCustomLink from "../DynamicComponents/DynamicCustomLink";

const NavDropDown = ({ navigationArr }) => {
  return (
    <div
      className={` absolute left-1/2 transform -translate-x-1/2 flex flex-col flex-wrap gap-2 bg-gray-100 border-2 border-t-0 border-red-800 rounded-lg p-2 shadow-lg`}
    >
      {navigationArr.map(({ route, navName }, index) => {
        return (
          <div key={index}>
            <DynamicCustomLink to={route}>{navName}</DynamicCustomLink>
          </div>
        );
      })}
    </div>
  );
};

export default NavDropDown;
