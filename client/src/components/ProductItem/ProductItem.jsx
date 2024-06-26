import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteProduct,
  updateProduct,
} from "../../features/products/productSlice";

import { Pencil, Trash2 } from "lucide-react";

import FormInput from "../FormInput/FormInput";
import { selectUser } from "../../features/auth/authSlice";

const ProductItem = ({ productDetails }) => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [toEdit, setToEdit] = useState(false);

  const [itemState, setItemState] = useState({
    name: productDetails.name,
    itemCount: productDetails.itemCount,
    price: productDetails.price,
  });

  const { itemCount, name, price } = itemState;

  const handleUpdate = (info) => {
    const { name: infoName, price: infoPrice, itemCount: infoItemCount } = info;

    if (!toEdit) {
      setToEdit(true);
      return;
    }

    if (
      toEdit &&
      infoName === name &&
      infoItemCount === itemCount &&
      infoPrice === price
    ) {
      setToEdit(false);
      return;
    }

    dispatch(
      updateProduct({
        userId: currentUser.id,
        updatedData: {
          id: productDetails.id,
          ...itemState,
        },
      })
    );
    setToEdit(false);
  };

  return (
    <tr key={productDetails.id} className='w-full h-14 text-lg bg-secondary'>
      <td
        className={`relative ${
          toEdit ? "top-[1.8px]" : "top-3"
        } flex justify-start gap-3 items-center lg:justify-center`}
      >
        <section
          className={`flex justify-center ml-2 items-center gap-3 ${
            !toEdit ? "lg:absolute" : "lg:static"
          }  lg:left-5 lg:ml-0`}
        >
          <div
            className='bg-black px-2 py-2 rounded-full cursor-pointer inventory_hover_effect'
            onClick={() => handleUpdate(productDetails)}
          >
            <Pencil color='black' size={"13px"} />
          </div>
          <div
            className='bg-black px-2 py-2 rounded-full cursor-pointer inventory_hover_effect '
            onClick={() =>
              dispatch(
                deleteProduct({
                  userId: currentUser.id,
                  productId: productDetails.id,
                })
              )
            }
          >
            <Trash2 color='black' size={"13px"} />
          </div>
        </section>

        {!toEdit ? (
          <span className='capitalize'>{name}</span>
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
          itemCount
        ) : (
          <div className='px-4 py-1 text-center'>
            <FormInput
              inputName={"itemItemCount"}
              inputType='number'
              inputValue={itemState.itemCount}
              onInputChange={(e) =>
                setItemState((prevState) => {
                  return {
                    ...prevState,
                    itemCount: e.target.value,
                  };
                })
              }
            />
          </div>
        )}
      </td>
      <td>
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
      </td>
    </tr>
  );
};

ProductItem.propTypes = {
  productDetails: PropTypes.object,
};

export default ProductItem;
