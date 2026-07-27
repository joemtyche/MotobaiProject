import { Link, useMatch, useResolvedPath } from "react-router-dom";

const DynamicCustomLink = ({
  to,
  children,
  className = "",
  contentClassName = "",
  ...props
}) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link
      to={to}
      className={`flex min-w-[120px] shrink-0 items-center justify-center rounded-md border-2 border-red-600 text-black shadow-md transition-all duration-150 hover:bg-red-600 hover:text-white ${
        isActive ? "bg-red-600 text-white" : "bg-white"
      } ${className}`}
      {...props}
    >
      <span
        className={`flex items-center gap-3 whitespace-nowrap px-4 py-2 text-base ${contentClassName}`}
      >
        {children}
      </span>
    </Link>
  );
};

export default DynamicCustomLink;
