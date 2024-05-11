import HistoryItemsTable from "../../components/HistoryItemsTable/HistoryItemsTable";
import { useSelector } from "react-redux";

import { selectAllTransactions } from "../../features/transactions/transactionSlice";

const HistoryPage = () => {
  const transactionHistory = useSelector(selectAllTransactions);
  console.log(transactionHistory);

  return (
    <section className='flex-1 min-h-full lg:px-20'>
      <h1 className='mt-10 text-2xl font-bold px-4 lg:px-0'>
        Transaction History
      </h1>
      <HistoryItemsTable data={transactionHistory} />
    </section>
  );
};

export default HistoryPage;
