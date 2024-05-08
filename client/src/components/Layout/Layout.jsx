import { Outlet, useLocation } from "react-router-dom";

import Header from "../Headers/Header";

const Layout = () => {
  const { pathname } = useLocation();
  const regex = /home/g.test(pathname);

  return (
    <main className={"min-h-screen flex flex-col"}>
      {!regex ? <Header /> : null}
      <Outlet />
      {!regex ? (
        <div className="mt-auto text-center bg-tertiary text-white text-sm py-2">
          Copyright &copy; inventory-management
        </div>
      ) : null}
    </main>
  );
};

export default Layout;
