import { Outlet, Navigate } from "react-router-dom";
import { storage1 } from "../service/storage";

export const AuthLayout = () => {
  const isAuthentication = !!storage1.getItem("token");
  // const isAuthentication = false;
  if (!isAuthentication) {
    return <Outlet />;
  }
  return <Navigate to="/home"></Navigate>;
};
