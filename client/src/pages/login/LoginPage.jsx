import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { authLogin } from "../../features/auth/authSlice";

import mobileLoginImg from "../../assets/mobile/mobile_illus_login.svg";

import FormInput from "../../components/FormInput/FormInput";

const LoginPage = () => {
  const [loginState, setLoginState] = useState({
    emailId: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { emailId, password } = loginState;

    if (!emailId || !password) {
      alert("no field can be empty");
      return;
    }

    dispatch(authLogin(loginState));
    setLoginState({
      emailId: "",
      password: "",
    });
  };
  return (
    <section
      className='my-2 flex flex-col justify-center items-center gap-y-6 flex-1 lg:flex-row lg:gap-x-[6rem]'
      onSubmit={handleSubmit}
    >
      <h1 className='text-4xl font-semibold lg:hidden'>Login</h1>

      <img
        src={mobileLoginImg}
        alt='login-image'
        width={"100%"}
        height={"100%"}
        className='max-w-xs lg:max-w-md'
      />

      <form
        onSubmit={handleSubmit}
        className='space-y-7 w-3/4 md:w-1/2 lg:w-1/3'
      >
        <h1 className='text-4xl font-semibold hidden lg:block'>Login</h1>

        <FormInput
          holderName='Email ID'
          inputType='email'
          inputName='email'
          inputValue={loginState.emailId}
          onInputChange={(e) =>
            setLoginState((prevState) => {
              return {
                ...prevState,
                emailId: e.target.value,
              };
            })
          }
        />
        <FormInput
          holderName='Password'
          inputType='password'
          inputName='password'
          inputValue={loginState.password}
          onInputChange={(e) =>
            setLoginState((prevState) => {
              return {
                ...prevState,
                password: e.target.value,
              };
            })
          }
        />
        <button className='relative left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 text-xl rounded-md font-medium lg:w-1/2'>
          Login
        </button>
        <h1 className='text-center font-semibold'>
          <span className='text-gray-500'>New User?</span>
          <span className='ml-1 text-gray-700 hover:underline'>
            <Link to='/register'>Register</Link>
          </span>
        </h1>
      </form>
    </section>
  );
};

export default LoginPage;
