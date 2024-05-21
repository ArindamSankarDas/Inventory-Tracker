import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectAuthStatus,
  selectAuthToken,
  selectUser,
} from "../../features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector(selectUser);
  const currentAuthStatus = useSelector(selectAuthStatus);
  const currentAuthToken = useSelector(selectAuthToken);

  if (currentAuthStatus === "loading") {
    return (
      <div className='h-screen relative bg-cyan-100'>
        <span className='loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></span>
      </div>
    );
  }
  return currentUser && currentAuthToken ? (
    children
  ) : (
    <Navigate to={"/login"} />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

export default ProtectedRoute;
