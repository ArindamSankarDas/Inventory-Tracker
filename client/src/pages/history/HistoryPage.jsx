import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTransactions,
  selectAllTransactions,
  selectTransactionError,
  selectTransactionStatus,
} from "../../features/transactions/transactionSlice";
import { selectAuthToken } from "../../features/auth/authSlice";

import HistoryItemsTable from "../../components/HistoryItemsTable/HistoryItemsTable";

const HistoryPage = () => {
  const transactionHistory = useSelector(selectAllTransactions);
  const transactionStatus = useSelector(selectTransactionStatus);
  const transactionError = useSelector(selectTransactionError);
  const currentUserToken = useSelector(selectAuthToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (transactionStatus === "idle") {
      dispatch(fetchTransactions(currentUserToken));
    }
  }, [dispatch, transactionStatus, currentUserToken]);

  return (
    <section className='flex-1 min-h-full lg:px-20'>
      <h1 className='mt-10 text-2xl font-bold px-4 lg:px-0'>
        Transaction History
      </h1>

      {transactionStatus === "loading" ? (
        <span className='loader relative top-14 left-1/2 -translate-x-1/2'></span>
      ) : transactionStatus === "succeeded" ? (
        <HistoryItemsTable data={transactionHistory} />
      ) : (
        <h1 className='text-center mt-10 font-semibold'>{transactionError}</h1>
      )}
    </section>
  );
};

export default HistoryPage;
