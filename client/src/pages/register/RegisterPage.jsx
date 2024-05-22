import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authRegister } from "../../features/auth/authSlice";

import FormInput from "../../components/FormInput/FormInput";

const RegisterPage = () => {
  const [registerState, setRegisterState] = useState({
    username: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    shopname: "",
    address: "",
  });

  const [errorState, setErrorState] = useState({
    username: false,
    emailId: false,
    password: false,
    confirmPassword: false,
    shopname: false,
    address: false,
  });

  const NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const dispatch = useDispatch();

  const validateForm = () => {
    const { username, emailId, password, confirmPassword, shopname, address } =
      registerState;

    const errors = {
      username: !NAME_REGEX.test(username),
      emailId: !EMAIL_REGEX.test(emailId),
      password: PWD_REGEX.test(password),
      confirmPassword: password !== confirmPassword,
      shopname: !NAME_REGEX.test(shopname),
      address: address.length === 0,
    };

    setErrorState(errors);

    return !Object.values(errors).includes(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("hello");
      return;
    }

    dispatch(authRegister(registerState));

    setRegisterState({
      username: "",
      emailId: "",
      password: "",
      confirmPassword: "",
      shopname: "",
      address: "",
    });

    setErrorState({
      username: false,
      emailId: false,
      password: false,
      confirmPassword: false,
      shopname: false,
      address: false,
    });
  };

  return (
    <section
      className='my-3 flex flex-col justify-center items-center gap-y-5 flex-1 lg:gap-y-14 '
      onSubmit={handleSubmit}
    >
      <h1 className='text-4xl font-semibold'>Register</h1>
      <form className='w-4/5 flex flex-col gap-7 justify-center items-center sm:w-2/3 md:w-2/4 lg:w-full lg:gap-12'>
        <div className='w-full relative mb-3 flex flex-col lg:flex-row lg:justify-evenly lg:horizontal_line'>
          <h2 className='text-2xl font-medium'>Account</h2>
          <div className='space-y-8 pl-3 mt-4 lg:pl-0 lg:mt-0 lg:w-1/3 lg:ml-14'>
            <div
              className={`relative ${
                errorState.username ? "border-2 border-red-500" : "border-none"
              }  rounded-lg`}
            >
              <FormInput
                holderName='User Name'
                inputType='text'
                inputName='user-name'
                inputValue={registerState.username}
                onInputChange={(e) =>
                  setRegisterState((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }))
                }
              />
              {errorState.username && (
                <h3 className=' text-red-600 font-bold'>
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </h3>
              )}
            </div>
            <div
              className={`relative ${
                errorState.emailId ? "border-2 border-red-500" : "border-none"
              }  rounded-lg`}
            >
              <FormInput
                holderName='Email ID'
                inputType='email'
                inputName='email-id'
                inputValue={registerState.emailId}
                onInputChange={(e) =>
                  setRegisterState((prevState) => ({
                    ...prevState,
                    emailId: e.target.value,
                  }))
                }
              />
              {errorState.emailId && (
                <h3 className=' text-red-600 font-bold'>Invalid email</h3>
              )}
            </div>
            <div
              className={`relative ${
                errorState.password ? "border-2 border-red-500" : "border-none"
              }  rounded-lg`}
            >
              <FormInput
                holderName='Password'
                inputType='password'
                inputName='password'
                inputValue={registerState.password}
                onInputChange={(e) =>
                  setRegisterState((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
              {errorState.password && (
                <h3 className=' text-red-600 font-bold'>
                  8 to 24 characters, atleast one uppercase and one lowercase
                  letter and a special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label='exclamation mark'>!</span>
                  <span aria-label='at symbol'>@</span>
                  <span aria-label='hashtag'>#</span>
                  <span aria-label='dollar sign'>$</span>
                  <span aria-label='percent'>%</span>
                </h3>
              )}
            </div>
            <div
              className={`relative ${
                errorState.confirmPassword
                  ? "border-2 border-red-500"
                  : "border-none"
              }  rounded-lg`}
            >
              <FormInput
                holderName='Confirm Password'
                inputType='password'
                inputName='confirm-password'
                inputValue={registerState.confirmPassword}
                onInputChange={(e) =>
                  setRegisterState((prevState) => ({
                    ...prevState,
                    confirmPassword: e.target.value,
                  }))
                }
              />
              {errorState.confirmPassword && (
                <h3 className=' text-red-600 font-bold'>
                  Passwords do not match
                </h3>
              )}
            </div>
          </div>
        </div>
        <div className='w-full relative flex flex-col lg:flex-row lg:justify-evenly lg:horizontal_line'>
          <h2 className='text-2xl font-medium'>Shop Details</h2>
          <div className='space-y-8 pl-3 mt-4 lg:pl-0 lg:mt-0 lg:w-1/3'>
            <div
              className={`relative ${
                errorState.shopname ? "border-2 border-red-500" : "border-none"
              }  rounded-lg`}
            >
              <FormInput
                holderName='Name'
                inputType='text'
                inputName='shop-name'
                inputValue={registerState.shopname}
                onInputChange={(e) =>
                  setRegisterState((prevState) => ({
                    ...prevState,
                    shopname: e.target.value,
                  }))
                }
              />
              {errorState.shopname && (
                <h3 className=' text-red-600 font-bold'>
                  {" "}
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </h3>
              )}
            </div>
            <div
              className={`relative ${
                errorState.address ? "border-2 border-red-500" : "border-none"
              }  rounded-lg`}
            >
              <FormInput
                holderName='Address'
                inputType='text'
                inputName='shop-address'
                inputValue={registerState.address}
                onInputChange={(e) =>
                  setRegisterState((prevState) => ({
                    ...prevState,
                    address: e.target.value,
                  }))
                }
              />
              {errorState.address && (
                <h3 className=' text-red-600 font-bold'>Invalid address</h3>
              )}
            </div>
          </div>
        </div>
        <button className='bg-blue-600 text-white px-6 py-2 text-xl rounded-md font-medium'>
          Register
        </button>
        <h1 className='text-center font-semibold'>
          <span className='text-gray-500'>Already a user?</span>
          <span className='ml-1 text-gray-700 hover:underline'>
            <Link to='/login'>Login</Link>
          </span>
        </h1>
      </form>
    </section>
  );
};

export default RegisterPage;
