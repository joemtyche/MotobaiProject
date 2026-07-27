import { cloneElement, isValidElement } from "react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

// OVERVIEW COMPONENT
export default function Overview({ overviewArr, onReset }) {
  const renderIcon = (icon) => {
    if (isValidElement(icon)) {
      return cloneElement(icon, {
        className: `size-5 ${icon.props.className || ""}`,
      });
    }

    return <Squares2X2Icon className="size-5" />;
  };

  return (
    <div
      className={`m-8 flex h-[82vh] w-[16vw] min-w-[220px] flex-col gap-5 rounded-lg bg-red-600 p-6 text-xl shadow-shadow`}
    >
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className={`flex items-center gap-2 text-left text-2xl font-bold leading-tight text-white transition-all duration-100 hover:text-red-100`}
        >
          <Squares2X2Icon className="size-7 shrink-0" />
          <span>Overview</span>
        </button>
      ) : (
        <h2
          className={`flex items-center gap-2 text-2xl font-bold leading-tight text-white`}
        >
          <Squares2X2Icon className="size-7 shrink-0" />
          <span>Overview</span>
        </h2>
      )}
      <div className={`flex min-h-0 flex-col gap-1.5 overflow-y-auto pr-1`}>
        {overviewArr.map((item, index) => {
          if (item.type === "separator") {
            return (
              <div
                key={index}
                className="mt-2 border-t border-red-300/60 pt-3 text-xs font-bold uppercase tracking-wide text-red-100"
              >
                {item.title}
              </div>
            );
          }

          const { title, quantity, className, icon, onClick, active } = item;
          const isClickable = typeof onClick === "function";
          const quantityNumber = Number(quantity);
          const displayQuantity =
            !Number.isNaN(quantityNumber) && quantityNumber < 10
              ? "0" + quantity
              : quantity;
          const itemClassName = `flex w-full items-center gap-2 rounded-md p-1.5 text-left transition-all duration-100 ${
            isClickable ? "cursor-pointer hover:bg-red-700" : ""
          } ${active ? "bg-red-700 ring-2 ring-white/25" : ""}`;
          const itemContent = (
            <>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-red-700 text-white">
                {renderIcon(icon)}
              </span>
              <span className="min-w-0">
                <h2 className={`break-words text-sm leading-tight text-white`}>
                  {title}
                </h2>
                <h1
                  className={`text-shadow text-2xl font-semibold text-white drop-shadow-lg ${
                    className || ""
                  }`}
                >
                  {displayQuantity}
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
        })}
      </div>
    </div>
  );
}
