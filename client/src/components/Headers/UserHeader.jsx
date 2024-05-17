import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Home,
  List,
  Menu,
  History,
  ArrowLeftRight,
  CircleUserRound,
} from "lucide-react";
import HeaderLogo from "../../assets/mobile/logo-mobl.svg";

const UserHeader = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className='relative select-none'>
      <header className='relative z-40 bg-primary py-3 px-4 flex justify-between items-center'>
        <Menu
          className={`cursor-pointer transition-all ${
            toggle ? "rotate-90" : "rotate-0"
          }`}
          size={"35"}
          strokeWidth={3}
          color='white'
          onClick={() => setToggle((prevState) => !prevState)}
        />

        <div className='flex items-center gap-3 text-white'>
          <img src={HeaderLogo} alt='logo' width={40} />
          <p className='text-lg font-semibold'>Inventory Management</p>
        </div>

        <CircleUserRound
          className='cursor-pointer'
          size={"35"}
          strokeWidth={3}
          color='white'
          onClick={() => navigate("/home/profile")}
        />
      </header>
      <section
        className={`bg-white shadow-2xl sidebar transition-all absolute z-30 top-full ${
          toggle ? "left-0" : "-left-[999rem]"
        }`}
      >
        <Link to={"/home"}>
          <Home color='#86B6F6' />
          <h1>Home</h1>
        </Link>
        <Link to={"/home/inventory"}>
          <List color='#86B6F6' />
          <h1>Inventory</h1>
        </Link>
        <Link to={"/home/transactions"}>
          <ArrowLeftRight color='#86B6F6' />
          <h1>Transactions</h1>
        </Link>
        <Link to={"/home/history"}>
          <History color='#86B6F6' />
          <h1>History</h1>
        </Link>
      </section>
    </nav>
  );
};

export default UserHeader;
