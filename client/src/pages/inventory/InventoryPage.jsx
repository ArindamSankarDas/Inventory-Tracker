import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  selectAllProducts,
  selectSeasonalProducts,
  selectStateError,
  selectStateStatus,
} from "../../features/products/productSlice";

import SubHeader from "../../components/SubHeader/SubHeader";
import ItemsTable from "../../components/ItemsTable/ItemsTable";
import AddProduct from "../../components/AddProduct/AddProduct";
import { selectUser } from "../../features/auth/authSlice";

const InventoryPage = () => {
  const [addItem, setAddItem] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const dispatch = useDispatch();

  const currentUser = useSelector(selectUser);
  const products = useSelector(selectAllProducts);
  const seasonalProducts = useSelector(selectSeasonalProducts);
  const productStatus = useSelector(selectStateStatus);
  const productError = useSelector(selectStateError);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts(currentUser.id));
    }
  }, [dispatch, productStatus, currentUser]);

  return (
    <section className='relative flex-1 lg:px-[15rem] lg:py-10'>
      <SubHeader
        isToggleActive={isActive}
        handleToggleActive={setIsActive}
        headers={["All", "Seasonal"]}
        disable={false}
        title={"Inventory"}
        setNewItem={setAddItem}
      />
      <AddProduct newProduct={addItem} setNewItem={setAddItem} />
      {productStatus === "loading" ? (
        <span className='loader relative top-14 left-1/2 -translate-x-1/2'></span>
      ) : productStatus === "succeeded" ? (
        <ItemsTable data={isActive ? products : seasonalProducts} />
      ) : (
        <h1 className='text-center mt-10 font-semibold'>{productError}</h1>
      )}
    </section>
  );
};

export default InventoryPage;
