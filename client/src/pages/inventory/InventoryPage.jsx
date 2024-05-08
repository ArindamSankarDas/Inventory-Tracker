import { useState } from "react";

import SubHeader from "../../components/SubHeader/SubHeader";
import ItemsTable from "../../components/ItemsTable/ItemsTable";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  selectSeasonalProducts,
} from "../../features/products/productSlice";

const InventoryPage = () => {
  const [addItem, setAddItem] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const products = useSelector(selectAllProducts);
  const seasonalProducts = useSelector(selectSeasonalProducts);

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
