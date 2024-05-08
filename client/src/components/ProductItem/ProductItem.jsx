import { Pencil, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import {
  deleteProduct,
  updateProduct,
} from "../../features/products/productSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FormInput from "../FormInput/FormInput";

const ProductItem = ({ productDetails }) => {
  const dispatch = useDispatch();

  const [toEdit, setToEdit] = useState(false);

  const [itemState, setItemState] = useState({
    name: productDetails.name,
    count: productDetails.count,
    price: productDetails.price,
  });

  const { count, name, price } = itemState;

  const handleUpdate = (info) => {
    const { name: infoName, price: infoPrice, count: infoCount } = info;

    if (!toEdit) {
      setToEdit(true);
      return;
    }

    if (
      toEdit &&
      infoName === name &&
      infoCount === count &&
      infoPrice === price
    ) {
      setToEdit(false);
      return;
    }

    dispatch(updateProduct(productDetails.id, name, count, price));
    setItemState({
      name: productDetails.name,
      count: productDetails.count,
      price: productDetails.price,
    });
    setToEdit(false);
  };

  return (
    <tr key={productDetails.id} className='w-full h-14 text-lg bg-secondary'>
      <td className='relative top-3 flex justify-center gap-3 items-center'>
        <div
          className='bg-black px-2 py-2 rounded-full cursor-pointer inventory_hover_effect'
          onClick={() => handleUpdate(productDetails)}
        >
          <Pencil color='black' size={"13px"} />
        </div>
        {!toEdit ? (
          name
        ) : (
          <div className='px-4 py-1 text-center'>
            <FormInput
              inputName={"itemName"}
              inputType='text'
              inputValue={itemState.name}
              onInputChange={(e) =>
                setItemState((prevState) => {
                  return {
                    ...prevState,
                    name: e.target.value,
                  };
                })
              }
            />
          </div>
        )}
      </td>
      <td>
        {!toEdit ? (
          count
        ) : (
          <div className='px-4 py-1 text-center'>
            <FormInput
              inputName={"itemCount"}
              inputType='number'
              inputValue={itemState.count}
              onInputChange={(e) =>
                setItemState((prevState) => {
                  return {
                    ...prevState,
                    count: e.target.value,
                  };
                })
              }
            />
          </div>
        )}
      </td>
      <td className='flex justify-center items-center gap-4 lg:static'>
        {!toEdit ? (
          <>&#8377; {price}</>
        ) : (
          <div className='px-4 py-1 text-center'>
            <FormInput
              inputName={"itemPrice"}
              inputType='number'
              inputValue={itemState.price}
              onInputChange={(e) =>
                setItemState((prevState) => {
                  return {
                    ...prevState,
                    price: e.target.value,
                  };
                })
              }
            />
          </div>
        )}
        <div
          className='bg-black px-2 py-2 rounded-full cursor-pointer inventory_hover_effect '
          onClick={() => dispatch(deleteProduct(productDetails.id))}
        >
          <Trash2 color='black' size={"13px"} />
        </div>
      </td>
    </tr>
  );
};

ProductItem.propTypes = {
  productDetails: PropTypes.object,
};

export default ProductItem;
