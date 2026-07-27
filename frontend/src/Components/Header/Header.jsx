import Navigation from "./Navigation";
import Logo from "../../assets/Logo.png";

function Header() {
  return (
    <header className="w-full">
      <div className="flex w-full max-h-28 items-center rounded pr-4 font-main font-medium">
        <img
          className="max-w-24 shrink-0 rounded-b"
          src={Logo}
          alt="Motobai-Logo"
        />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
