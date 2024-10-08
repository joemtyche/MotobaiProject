import Navigation from "./Navigation";
import Logo from "../../assets/Logo.png";

function Header() {
  return (
    <header>
      <div className="flex max-h-28 items-center rounded font-main font-medium  ">
        <img className="max-w-24 rounded-b" src={Logo} alt="Motobai-Logo" />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
