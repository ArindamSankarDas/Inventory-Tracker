import PropTypes from "prop-types";
import { formatISO, format } from "date-fns";

const HistoryItemsTable = ({ data }) => {
  return (
    <div className='px-4 lg:px-0 select-none'>
      <table className='w-full mt-5 px-10 text-center rounded-lg table_container overflow-hidden'>
        <thead>
          <tr className='h-12 text-lg text-gray-600 bg-gray-300'>
            <th>Date</th>
            <th>Type</th>
            <th>Product</th>
            <th>Items</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {!data?.length ? (
            <tr className='absolute w-[90%] mt-3 left-1/2 -translate-x-1/2'>
              No Items available
            </tr>
          ) : (
            data.map((transaction) => (
              <tr key={transaction.id} className='h-14 text-lg bg-secondary'>
                <td>
                  {format(
                    formatISO(transaction.date, { representation: "date" }),
                    "dd-MM-yy"
                  )}
                </td>
                <td className='capitalize'>{transaction.transactionType}</td>
                <td className='relative w-[15rem] lg:w-[25rem]'>
                  {transaction.product_details.name}
                </td>
                <td>{transaction.product_details.itemCount}</td>
                <td className='relative'>
                  &#8377; {transaction.product_details.price}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

HistoryItemsTable.propTypes = {
  data: PropTypes.array,
};

export default HistoryItemsTable;
