import { useSelector } from "react-redux";
import { AreaChart, CollumnChart } from "../../components/Chart/Chart";
import { useNavigate } from "react-router-dom";
import {
  selectAuthStatus,
  selectAuthToken,
  selectUser,
} from "../../features/auth/authSlice";
import { useEffect } from "react";

const UserHomePage = () => {
  const currentUser = useSelector(selectUser);
  const currentAuthStatus = useSelector(selectAuthStatus);
  const currentAuthToken = useSelector(selectAuthToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser && !currentAuthToken) {
      navigate("/");
    }
  });

  if (currentAuthStatus === "loading") {
    return (
      <div className='h-screen relative bg-cyan-100'>
        <span className='loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></span>
      </div>
    );
  }

  return (
    <section className='bg-secondary h-full py-6 overflow-hidden flex-1 flex flex-col gap-10 justify-center items-center '>
      <div className='w-[90%] px-5 bg-white shadow-md rounded-xl lg:w-3/4'>
        <h1 className='text-gray-500 text-2xl py-4 font-semibold '>
          Sales and Profit
          <AreaChart />
        </h1>
      </div>
      <div className='w-[90%] px-5 bg-white shadow-md rounded-xl lg:w-3/4'>
        <h1 className='text-gray-500 text-2xl  py-4 font-semibold '>
          Product Sales
        </h1>
        <CollumnChart />
      </div>
    </section>
  );
};

export default UserHomePage;
