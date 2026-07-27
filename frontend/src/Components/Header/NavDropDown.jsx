import DynamicCustomLink from "../DynamicComponents/DynamicCustomLink";

const NavDropDown = ({ navigationArr, className = "" }) => {
  return (
    <div
      className={`absolute left-1/2 z-20 flex min-w-[170px] -translate-x-1/2 transform flex-col gap-1 rounded-lg border-2 border-t-0 border-red-800 bg-gray-100 p-2 shadow-lg ${className}`}
    >
      {navigationArr.map(({ route, navName }, index) => {
        return (
          <div key={index}>
            <DynamicCustomLink
              to={route}
              className="w-full !min-w-0"
              contentClassName="w-full justify-center px-3 py-1.5 text-sm"
            >
              {navName}
            </DynamicCustomLink>
          </div>
        );
      })}
    </div>
  );
};

export default NavDropDown;
