import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";

import { addProduct } from "../../features/products/productSlice";

import FormInput from "../FormInput/FormInput";
import ProductItem from "../ProductItem/ProductItem";

const ItemsTable = ({ newProduct, setNewItem, data }) => {
  const formRef = useRef(null);

  const [formState, setFormState] = useState({
    name: "",
    count: "",
    price: "",
    isSeasonal: false,
  });

  useEffect(() => {
    const handleClick = function (e) {
      if (!formRef.current.contains(e.target)) {
        setFormState({ name: "", count: "", price: "" });
        setNewItem(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [formRef, setFormState, setNewItem]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { count, name, price, isSeasonal } = formState;

    if (!name || !count || !price) {
      return;
    }

    dispatch(addProduct(name, count, price, isSeasonal));
    setFormState({
      name: "",
      count: "",
      price: "",
      isSeasonal: false,
    });
  };

  return (
    <div className='px-4 lg:px-0 select-none'>
      {newProduct ? (
        <form
          className='mt-5 default_flex justify-center items-center md:flex-row lg:relative'
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
            inputName={"productCount"}
            inputValue={formState.count}
            onInputChange={(e) =>
              setFormState((prevState) => {
                return {
                  ...prevState,
                  count: Number(e.target.value),
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
            className='bg-gray-300 w-full px-4 py-2  text-lg font-medium rounded-md placeholder:text-gray-600'
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

      <table className='w-full mt-5 text-center rounded-lg table_container overflow-hidden'>
        <thead>
          <tr className='h-12 text-lg text-gray-600 bg-gray-300'>
            <th>Product</th>
            <th>Items</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <ProductItem key={product.id} productDetails={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ItemsTable.propTypes = {
  history: PropTypes.any,
  newProduct: PropTypes.bool,
  setNewItem: PropTypes.func,
  data: PropTypes.array,
};

export default ItemsTable;
