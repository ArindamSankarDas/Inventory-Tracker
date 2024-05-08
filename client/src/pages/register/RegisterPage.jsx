import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";

const handleSubmit = (e) => {
  e.preventDefault();
};

const RegisterPage = () => {
  return (
    <section
      className="my-3 flex flex-col justify-center items-center gap-y-5 flex-1 lg:gap-y-14 "
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-semibold">Register</h1>
      <form className="w-4/5 flex flex-col gap-7 justify-center items-center sm:w-2/3 md:w-2/4 lg:w-full lg:gap-12">
        <div className="relative flex flex-col lg:flex-row lg:justify-evenly lg:w-full lg:horizontal_line">
          <h2 className="text-2xl font-medium">Account</h2>
          <div className="space-y-3 pl-3 mt-4 lg:pl-0 lg:mt-0 lg:w-1/3 lg:ml-14">
            <FormInput
              holderName="Full Name"
              inputType="text"
              inputName="user-name"
            />
            <FormInput
              holderName="Email ID"
              inputType="email"
              inputName="email"
            />
            <FormInput
              holderName="Password"
              inputType="password"
              inputName="password"
            />
            <FormInput
              holderName="Confirm Password"
              inputType="password"
              inputName="confirm-password"
            />
          </div>
        </div>
        <div className="relative flex flex-col lg:flex-row lg:justify-evenly lg:w-full lg:horizontal_line">
          <h2 className="text-2xl font-medium">Shop Details</h2>
          <div className="space-y-3 pl-3 mt-4 lg:pl-0 lg:mt-0 lg:w-1/3">
            <FormInput
              holderName="Name"
              inputType="text"
              inputName="shop-name"
            />
            <FormInput
              holderName="Address"
              inputType="text"
              inputName="shop-address"
            />
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 text-xl rounded-md font-medium">
          Register
        </button>
        <h1 className="text-center font-semibold">
          <span className="text-gray-500">Already a user?</span>
          <span className="ml-1 text-gray-700 hover:underline">
            <Link to="/login">Login</Link>
          </span>
        </h1>
      </form>
    </section>
  );
};

export default RegisterPage;
