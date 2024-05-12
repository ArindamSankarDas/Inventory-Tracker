import PropTypes from "prop-types";
import ProductItem from "../ProductItem/ProductItem";

const ItemsTable = ({ data }) => {
  return (
    <div className='px-4 lg:px-0 select-none'>
      <table className='w-full mt-5 text-center rounded-lg table_container overflow-hidden'>
        <thead className='relative'>
          <tr className='h-12 text-lg text-gray-600 bg-gray-300'>
            <th>Product</th>
            <th>Items</th>
            <th>Price</th>
          </tr>
        </thead>
        {!data?.length ? (
          <tbody>
            <tr className='absolute w-[90%] mt-3 left-1/2 -translate-x-1/2'>
              No Items available
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((product) => (
              <ProductItem key={product.id} productDetails={product} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

ItemsTable.propTypes = {
  history: PropTypes.any,
  setNewItem: PropTypes.func,
  data: PropTypes.array,
};

export default ItemsTable;
