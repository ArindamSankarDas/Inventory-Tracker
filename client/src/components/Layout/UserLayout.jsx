import { Outlet } from "react-router-dom";

import UserHeader from "../Headers/UserHeader";

const UserLayout = () => {
  return (
    <main className={"min-h-screen flex flex-col"}>
      <UserHeader />
      <Outlet />
    </main>
  );
};

export default UserLayout;
