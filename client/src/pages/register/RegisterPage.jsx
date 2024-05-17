import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addUser } from "../../features/users/userSlice";

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

  const dispatch = useDispatch();

  const handleSubmit = (e, registerFormState) => {
    e.preventDefault();

    const { username, emailId, password, confirmPassword, shopname, address } =
      registerFormState;

    if (
      !username ||
      !emailId ||
      !password ||
      !confirmPassword ||
      !shopname ||
      !address
    ) {
      alert("no field can be empty");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(addUser(registerFormState));
  };

  return (
    <section
      className='my-3 flex flex-col justify-center items-center gap-y-5 flex-1 lg:gap-y-14 '
      onSubmit={(e) => handleSubmit(e, registerState)}
    >
      <h1 className='text-4xl font-semibold'>Register</h1>
      <form className='w-4/5 flex flex-col gap-7 justify-center items-center sm:w-2/3 md:w-2/4 lg:w-full lg:gap-12'>
        <div className='relative flex flex-col lg:flex-row lg:justify-evenly lg:w-full lg:horizontal_line'>
          <h2 className='text-2xl font-medium'>Account</h2>
          <div className='space-y-3 pl-3 mt-4 lg:pl-0 lg:mt-0 lg:w-1/3 lg:ml-14'>
            <FormInput
              holderName='User Name'
              inputType='text'
              inputName='user-name'
              inputValue={registerState.username}
              onInputChange={(e) =>
                setRegisterState((prevState) => {
                  return {
                    ...prevState,
                    username: e.target.value,
                  };
                })
              }
            />
            <FormInput
              holderName='Email ID'
              inputType='email'
              inputName='email-id'
              inputValue={registerState.emailId}
              onInputChange={(e) =>
                setRegisterState((prevState) => {
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
              inputValue={registerState.password}
              onInputChange={(e) =>
                setRegisterState((prevState) => {
                  return {
                    ...prevState,
                    password: e.target.value,
                  };
                })
              }
            />
            <FormInput
              holderName='Confirm Password'
              inputType='password'
              inputName='confirm-password'
              inputValue={registerState.confirmPassword}
              onInputChange={(e) =>
                setRegisterState((prevState) => {
                  return {
                    ...prevState,
                    confirmPassword: e.target.value,
                  };
                })
              }
            />
          </div>
        </div>
        <div className='relative flex flex-col lg:flex-row lg:justify-evenly lg:w-full lg:horizontal_line'>
          <h2 className='text-2xl font-medium'>Shop Details</h2>
          <div className='space-y-3 pl-3 mt-4 lg:pl-0 lg:mt-0 lg:w-1/3'>
            <FormInput
              holderName='Name'
              inputType='text'
              inputName='shop-name'
              inputValue={registerState.shopname}
              onInputChange={(e) =>
                setRegisterState((prevState) => {
                  return {
                    ...prevState,
                    shopname: e.target.value,
                  };
                })
              }
            />
            <FormInput
              holderName='Address'
              inputType='text'
              inputName='shop-address'
              inputValue={registerState.address}
              onInputChange={(e) =>
                setRegisterState((prevState) => {
                  return {
                    ...prevState,
                    address: e.target.value,
                  };
                })
              }
            />
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
