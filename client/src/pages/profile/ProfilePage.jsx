import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authLogout, selectUser } from "../../features/auth/authSlice";

import Logo from "../../assets/mobile/logo-mobl.svg";

const ProfilePage = () => {
  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(authLogout());
    navigate("/");
  };

  // remove it after implementing pesistance
  if (!currentUser) {
    navigate("/");
  }

  return (
    <section className='min-h-full flex-1 px-6 py-6 bg-secondary'>
      <div className='mt-6 default_flex justify-center items-center lg:flex-row lg:gap-16 lg:mt-14'>
        <img
          className='max-w-20 shadow-lg bg-white rounded-full p-2 lg:max-w-28'
          src={Logo}
          alt='profile_logo'
          width={"100%"}
          height={"100%"}
        />
        <div className='text-center space-y-3 lg:text-left'>
          <h2 className='text-4xl font-bold'>
            {currentUser.user_details.username}
          </h2>
          <h3 className='text-2xl'>{currentUser.user_details.emailId}</h3>
          <button
            className='border-[4px] rounded-[3px] px-2 py-1 border-tertiary text-tertiary font-bold hover:bg-tertiary hover:text-white transition-all'
            onClick={handleClick}
          >
            LOG OUT
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
