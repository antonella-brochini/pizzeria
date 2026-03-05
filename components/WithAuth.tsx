import { useSelector } from "react-redux";
import Register from "pages/register";
import { useEffect } from "react";
import toast from "react-hot-toast";
import EmptyCart from "./checkout/EmptyCart";
import AuthLoader from "./auth/AuthLoader";


const WithAuth = ({ children }) => {
  const { cart, auth, authLoading } = useSelector((state: any) => ({
  cart: state.cart,
  auth: state.auth,
  authLoading: state.app?.authLoading,
}));

  useEffect(() => {
    if (!authLoading && !auth?.id) {
      toast.error("You need to Login To checkout");
    }
  }, [authLoading, auth?.id]);

  if (authLoading) return <AuthLoader />;

  if (!auth?.id) return <Register />;

  return cart?.length > 0 ? children : <EmptyCart />;
};

export default WithAuth;