import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  selectBuyTransactions,
  selectSellTransactions,
  selectTotalTransactions,
  selectTransactionStatus,
} from "../../features/transactions/transactionSlice";
import { useEffect } from "react";
import { selectUser } from "../../features/auth/authSlice";
import {
  fetchProducts,
  selectAvailableProducts,
  selectStateStatus,
} from "../../features/products/productSlice";

const UserHomePage = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectUser);
  const totalTransactions = useSelector(selectTotalTransactions);
  const buyTransactions = useSelector(selectBuyTransactions);
  const sellTransactions = useSelector(selectSellTransactions);
  const transactionStatus = useSelector(selectTransactionStatus);
  const productsStatus = useSelector(selectStateStatus);
  const availableProducts = useSelector(selectAvailableProducts);

  useEffect(() => {
    if (transactionStatus === "idle" && productsStatus === "idle") {
      dispatch(fetchTransactions(currentUser.id));
      dispatch(fetchProducts(currentUser.id));
    }
  }, [dispatch, transactionStatus, currentUser, productsStatus]);

  return (
    <section className='bg-secondary h-full py-6 overflow-hidden flex-1 flex flex-col-reverse gap-10 justify-center items-center'>
      <div className='p-10 flex flex-col gap-3 bg-white shadow-md rounded-xl'>
        <h1 className='text-gray-500 text-2xl font-semibold '>
          Total Transactions : {totalTransactions}
        </h1>
        <div className='space-y-2'>
          <h1>Buy Transactions : {buyTransactions}</h1>
          <h1>Sell Transactions : {sellTransactions}</h1>
        </div>
      </div>
      <div className='px-5 bg-white shadow-md rounded-xl'>
        <h1 className='text-gray-500 text-2xl  py-4 font-semibold '>
          Total Products Available : {availableProducts}
        </h1>
      </div>
      <h1 className='text-2xl font-semibold'>
        Welcome back, this is your current Inventory State :
      </h1>
    </section>
  );
};

export default UserHomePage;
