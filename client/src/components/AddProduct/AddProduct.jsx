import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { addNewProduct } from "../../features/products/productSlice";

import FormInput from "../FormInput/FormInput";

const AddProduct = ({ newProduct, setNewItem }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const [formState, setFormState] = useState({
    name: "",
    itemCount: "",
    price: "",
    isSeasonal: false,
  });

  useEffect(() => {
    const handleClick = function (e) {
      if (!formRef.current.contains(e.target)) {
        setFormState({ name: "", itemCount: "", price: "" });
        setNewItem(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [formRef, setFormState, setNewItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { itemCount, name, price } = formState;

    if (!name || !itemCount || !price) {
      return;
    }

    dispatch(addNewProduct(formState));
    setFormState({
      name: "",
      itemCount: "",
      price: "",
      isSeasonal: false,
    });
  };
  return (
    <>
      {newProduct ? (
        <form
          className='mt-5 px-5 default_flex justify-center items-center md:flex-row lg:relative lg:px-0'
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <FormInput
            holderName={"Product Name"}
            inputType={"text"}
            inputName={"productName"}
            inputValue={formState.name}
            onInputChange={(e) =>
              setFormState((prevState) => {
                return {
                  ...prevState,
                  name: e.target.value,
                };
              })
            }
          />
          <FormInput
            holderName={"No. of Items"}
            inputType={"number"}
            inputName={"productItemCount"}
            inputValue={formState.itemCount}
            onInputChange={(e) =>
              setFormState((prevState) => {
                return {
                  ...prevState,
                  itemCount: Number(e.target.value),
                };
              })
            }
          />
          <FormInput
            holderName={"Price"}
            inputType={"number"}
            inputName={"productPrice"}
            inputValue={formState.price}
            onInputChange={(e) =>
              setFormState((prevState) => {
                return {
                  ...prevState,
                  price: Number(e.target.value),
                };
              })
            }
          />

          <select
            name='isSeasonal'
            id='seasonal'
            className='bg-gray-300 w-full px-4 py-2 text-lg font-medium rounded-md placeholder:text-gray-600'
            value={formState.isSeasonal}
            onChange={(e) =>
              setFormState((prevState) => {
                return {
                  ...prevState,
                  isSeasonal: e.target.value,
                };
              })
            }
          >
            <option value={false}>Not Seasonal</option>
            <option value={true}>Seasonal</option>
          </select>
          <button className='bg-blue-600 text-white px-6 py-2 text-xl rounded-md font-medium lg:inventory_button'>
            ADD
          </button>
        </form>
      ) : null}
    </>
  );
};

AddProduct.propTypes = {
  setNewItem: PropTypes.func,
  newProduct: PropTypes.bool,
};

export default AddProduct;
