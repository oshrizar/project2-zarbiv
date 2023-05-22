import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const ProtectedEditRoute = ({ element, isAdmin, isBiz }) => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  const loction = useLocation();
  if (isLoggedIn) {
    if (
      (isAdmin && payload && payload.isAdmin) ||
      (isBiz && payload && payload.biz)
    ) {
      if (
        loction.state &&
        loction.state.user_id &&
        loction.state.user_id == payload._id
      ) {
        return element;
      }
    }
  }
  toast.error("invalid permissions");
  return <Navigate to={ROUTES.LOGIN} />;
};
export default ProtectedEditRoute;
