import { useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { Menu } from "lucide-react";

import HeaderLogo from "../../assets/mobile/logo-mobl.svg";

const HeaderButton = ({ children, to }) => {
  return (
    <Link
      to={to}
      className="w-1/4 text-center bg-secondary text-black font-semibold px-3 py-2 rounded-sm transition-all hover:bg-black hover:text-white lg:w-auto"
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="relative select-none">
      <header className="relative z-40 text-white bg-primary flex justify-between items-center py-3 px-4 xl:justify-around">
        <Link to="/" className="flex items-center gap-3">
          <img src={HeaderLogo} alt="logo" width={50} />
          <p className="text-xl font-semibold">Inventory Management</p>
        </Link>

        <Menu
          className={`cursor-pointer transition-all lg:hidden ${
            toggle ? "rotate-90 toggleHover" : "rotate-0"
          }`}
          size={"35"}
          strokeWidth={3}
          color="white"
          onClick={() => setToggle((prevState) => !prevState)}
        />

        <div className={`hidden space-x-3 lg:block`}>
          <HeaderButton to="/login">LogIn</HeaderButton>
          <HeaderButton to="/register">Register</HeaderButton>
        </div>
      </header>
      <div
        className={`auth-toggler transition-all z-10 ${
          toggle ? "top-full" : "top-0"
        } lg:hidden`}
      >
        <HeaderButton to="/login">LogIn</HeaderButton>
        <HeaderButton to="/register">Register</HeaderButton>
      </div>
    </nav>
  );
};

HeaderButton.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string.isRequired,
};

export default Header;
