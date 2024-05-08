import { useState } from "react";
import SubHeader from "../../components/SubHeader/SubHeader";
import FormInput from "../../components/FormInput/FormInput";

const TransactionPage = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <section className="flex-1 lg:px-[15rem] lg:py-10">
      <SubHeader
        headers={["Buy", "Sell"]}
        title={"Transacitons"}
        isToggleActive={isActive}
        handleToggleActive={setIsActive}
        disable={true}
      />

      <section className="px-5 mt-10 lg:px-0">
        <form className="flex flex-col gap-10 items-center input_arrow_removal">
          <section
            id="customer_details"
            className="w-full default_flex lg:flex-row lg:justify-around"
          >
            <h1 className="font-semibold text-lg">Customer Details</h1>
            <div className="default_flex lg:w-1/2 ">
              <FormInput holderName={"Customer Name"} inputType={"text"} />
              <FormInput holderName={"Phone Number"} inputType={"number"} />
              <FormInput holderName={"Address"} inputType={"text"} />
            </div>
          </section>
          <section
            id="product_details"
            className="w-full default_flex lg:flex-row lg:justify-around"
          >
            <h1 className="font-semibold text-lg">Product Details</h1>
            <div className="default_flex lg:w-1/2">
              <FormInput holderName={"Product Name"} inputType={"text"} />
              <FormInput holderName={"Price"} inputType={"number"} />
              <FormInput holderName={"No. of Items"} inputType={"number"} />
            </div>
          </section>
          <button className="px-10 mt-10 py-2 bg-tertiary text-white font-semibold text-xl rounded-md">
            Buy
          </button>
        </form>
        <div></div>
      </section>
    </section>
  );
};

export default TransactionPage;
