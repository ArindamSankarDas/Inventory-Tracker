const HistoryItemsTable = () => {
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
          <tr className='h-14 text-lg bg-secondary'>
            <td>12-01-23</td>
            <td>Buy</td>
            <td className='relative w-[15rem] lg:w-[25rem]'>Fans</td>
            <td>40</td>
            <td className='relative'>&#8377; 500</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HistoryItemsTable;
