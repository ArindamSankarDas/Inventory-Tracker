import { useState, useEffect } from "react";

import SubHeader from "../../components/SubHeader/SubHeader";
import ItemsTable from "../../components/ItemsTable/ItemsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
  selectSeasonalProducts,
  selectStateError,
  selectStateStatus,
} from "../../features/products/productSlice";

const InventoryPage = () => {
  const [addItem, setAddItem] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const seasonalProducts = useSelector(selectSeasonalProducts);
  const productStatus = useSelector(selectStateStatus);
  const productError = useSelector(selectStateError);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productStatus]);

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

      {productStatus === "loading" ? (
        <span className='loader relative top-14 left-1/2 -translate-x-1/2'></span>
      ) : productStatus === "succeeded" ? (
        <ItemsTable
          newProduct={addItem}
          setNewItem={setAddItem}
          data={isActive ? products : seasonalProducts}
        />
      ) : (
        <h1>{productError}</h1>
      )}
    </section>
  );
};

export default InventoryPage;
