import { useState, useEffect } from "react";

import SubHeader from "../../components/SubHeader/SubHeader";
import ItemsTable from "../../components/ItemsTable/ItemsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  selectAllProducts,
  selectSeasonalProducts,
} from "../../features/products/productSlice";

const InventoryPage = () => {
  const [addItem, setAddItem] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const seasonalProducts = useSelector(selectSeasonalProducts);

  useEffect(() => {
    dispatch(fetchData());
  });

  return (
    <section className='flex-1 lg:px-[15rem] lg:py-10'>
      <SubHeader
        isToggleActive={isActive}
        handleToggleActive={setIsActive}
        headers={["All", "Seasonal"]}
        disable={false}
        title={"Inventory"}
        setNewItem={setAddItem}
      />

      <ItemsTable
        newProduct={addItem}
        setNewItem={setAddItem}
        data={isActive ? products : seasonalProducts}
      />
    </section>
  );
};

export default InventoryPage;
