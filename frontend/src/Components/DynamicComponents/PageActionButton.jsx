export default function PageActionButton({
  children,
  icon,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group inline-flex h-14 shrink-0 items-center gap-4 rounded-lg border-2 border-red-800 bg-red-600 px-5 py-2 text-lg font-semibold text-white shadow-md transition-all duration-100 hover:bg-red-700 ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      {icon && (
        <span className="inline-flex h-10 w-11 shrink-0 items-center justify-center rounded-lg bg-red-700 text-white transition-all duration-100 group-hover:bg-red-800">
          {icon}
        </span>
      )}
    </button>
  );
}
