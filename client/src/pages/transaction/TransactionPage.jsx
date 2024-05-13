import { useState } from "react";
import SubHeader from "../../components/SubHeader/SubHeader";
import FormInput from "../../components/FormInput/FormInput";
import { useDispatch } from "react-redux";
import { addNewTransaction } from "../../features/transactions/transactionSlice";

const TransactionPage = () => {
  const [isActive, setIsActive] = useState(true);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [productDetails, setProductDetails] = useState({
    name: "",
    count: "",
    price: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e, customer_info, product_info) => {
    e.preventDefault();

    const { name: customerName, phone, address } = customer_info;
    const { name: productName, count, price } = product_info;

    if (
      !customerName ||
      !phone ||
      !address ||
      !productName ||
      !count ||
      !price
    ) {
      alert("No fields can be empty");
      return;
    }

    let buyOrSell;

    if (isActive) {
      buyOrSell = "buy";
    } else {
      buyOrSell = "sell";
    }

    dispatch(
      addNewTransaction({
        customer_info,
        product_info,
        transactionType: buyOrSell,
      })
    );

    setCustomerDetails({
      name: "",
      phone: "",
      address: "",
    });

    setProductDetails({
      name: "",
      count: "",
      price: "",
    });
  };

  return (
    <section className='flex-1 lg:px-[15rem] lg:py-10'>
      <SubHeader
        headers={["Buy", "Sell"]}
        title={"Transacitons"}
        isToggleActive={isActive}
        handleToggleActive={setIsActive}
        disable={true}
      />

      <section className='px-5 mt-10 lg:px-0'>
        <form
          className='flex flex-col gap-10 items-center input_arrow_removal'
          onSubmit={(e) => handleSubmit(e, customerDetails, productDetails)}
        >
          <section
            id='customer_details'
            className='w-full default_flex lg:flex-row lg:justify-around'
          >
            <h1 className='font-semibold text-lg'>Customer Details</h1>
            <div className='default_flex lg:w-1/2 '>
              <FormInput
                holderName={"Customer Name"}
                inputType={"text"}
                inputValue={customerDetails.name}
                onInputChange={(e) =>
                  setCustomerDetails((prevState) => {
                    return {
                      ...prevState,
                      name: e.target.value,
                    };
                  })
                }
              />
              <FormInput
                holderName={"Phone Number"}
                inputType={"number"}
                inputValue={customerDetails.phone}
                onInputChange={(e) =>
                  setCustomerDetails((prevState) => {
                    return {
                      ...prevState,
                      phone: e.target.value,
                    };
                  })
                }
              />
              <FormInput
                holderName={"Address"}
                inputType={"text"}
                inputValue={customerDetails.address}
                onInputChange={(e) =>
                  setCustomerDetails((prevState) => {
                    return {
                      ...prevState,
                      address: e.target.value,
                    };
                  })
                }
              />
            </div>
          </section>
          <section
            id='product_details'
            className='w-full default_flex lg:flex-row lg:justify-around'
          >
            <h1 className='font-semibold text-lg'>Product Details</h1>
            <div className='default_flex lg:w-1/2'>
              <FormInput
                holderName={"Product Name"}
                inputType={"text"}
                inputValue={productDetails.name}
                onInputChange={(e) =>
                  setProductDetails((prevState) => {
                    return {
                      ...prevState,
                      name: e.target.value,
                    };
                  })
                }
              />
              <FormInput
                holderName={"Price"}
                inputType={"number"}
                inputValue={productDetails.price}
                onInputChange={(e) =>
                  setProductDetails((prevState) => {
                    return {
                      ...prevState,
                      price: e.target.value,
                    };
                  })
                }
              />
              <FormInput
                holderName={"No. of Items"}
                inputType={"number"}
                inputValue={productDetails.count}
                onInputChange={(e) =>
                  setProductDetails((prevState) => {
                    return {
                      ...prevState,
                      count: e.target.value,
                    };
                  })
                }
              />
            </div>
          </section>
          <button className='px-10 mt-10 py-2 bg-tertiary text-white font-semibold text-xl rounded-md'>
            {isActive ? "Buy" : "Sell"}
          </button>
        </form>
      </section>
    </section>
  );
};

export default TransactionPage;
