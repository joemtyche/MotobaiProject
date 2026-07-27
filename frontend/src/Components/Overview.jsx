import { cloneElement, isValidElement } from "react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

// OVERVIEW COMPONENT
export default function Overview({ overviewArr, onReset, resetActive = false }) {
  const renderIcon = (icon) => {
    if (isValidElement(icon)) {
      return cloneElement(icon, {
        className: `size-6 ${icon.props.className || ""}`,
      });
    }

    return <Squares2X2Icon className="size-6" />;
  };

  return (
    <div
      className={`m-8 flex h-[82vh] w-[16vw] min-w-[220px] flex-col gap-8 rounded-lg bg-red-600 p-8 text-xl shadow-shadow`}
    >
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className={`flex items-center gap-3 text-left text-3xl font-bold leading-tight text-white transition-all duration-100 hover:text-red-100`}
        >
          <Squares2X2Icon className="size-8 shrink-0" />
          <span>Overview</span>
        </button>
      ) : (
        <h2
          className={`flex items-center gap-3 text-3xl font-bold leading-tight text-white`}
        >
          <Squares2X2Icon className="size-8 shrink-0" />
          <span>Overview</span>
        </h2>
      )}
      <div className={`flex flex-col gap-2`}>
        {overviewArr.map(
          ({ title, quantity, className, icon, onClick, active }, index) => {
            const isClickable = typeof onClick === "function";
            const itemClassName = `flex w-full items-center gap-3 rounded-md p-2 text-left transition-all duration-100 ${
              isClickable ? "cursor-pointer hover:bg-red-700" : ""
            } ${active ? "bg-red-700 ring-2 ring-white/25" : ""}`;
            const itemContent = (
              <>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-red-700 text-white">
                  {renderIcon(icon)}
                </span>
                <span className="min-w-0">
                  <h2 className={`break-words text-lg leading-tight text-white`}>
                    {title}
                  </h2>
                  <h1
                    className={`text-shadow text-3xl font-semibold text-white drop-shadow-lg ${
                      className || ""
                    }`}
                  >
                    {quantity < 10 ? "0" + quantity : quantity}
                  </h1>
                </span>
              </>
            );

            return isClickable ? (
              <button
                key={index}
                type="button"
                onClick={onClick}
                className={itemClassName}
              >
                {itemContent}
              </button>
            ) : (
              <div key={index} className={itemClassName}>
                {itemContent}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
