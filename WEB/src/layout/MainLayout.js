import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getInfoUser } from "../store/slice/authSlice";
import { storage1 } from "../service/storage";

export const MainLayout = () => {
  // namnh
  // const isAuthentication = !!storage.getItem("token");
  const isAuthentication = true;
  const dispatch = useDispatch();
  console.log(storage1.getItem("email"));
  useEffect(() => {
    if (isAuthentication) {
      dispatch(getInfoUser());
    }
  }, []);

  if (isAuthentication) {
    return <Outlet />;
  }
  return <Navigate to="/auth/login"></Navigate>;
};
