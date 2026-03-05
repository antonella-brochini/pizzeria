import "tailwindcss/tailwind.css";
import "@fontsource/pacifico";
import "@fontsource/poppins";
import "@fontsource/quicksand/700.css";

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import Loader from "@/components/Loader";
import { authLoading } from "@/redux/slices/appSlice";
import { setProfile } from "@/redux/slices/profileSlice";
import { signInSuccess } from "@/redux/slices/authSlice";

import { store, persistor } from "../redux/store/index";

function AppInner({ Component, pageProps }: AppProps) {
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // Loader de navegación
  useEffect(() => {
    const start = () => setPageLoading(true);
    const done = () => setPageLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router.events]);

  // ✅ Hydrate auth (mock) desde localStorage
  useEffect(() => {
    dispatch(authLoading(true));

    try {
      const rawUser = localStorage.getItem("user"); // lo guardás en authService
      const rawToken = localStorage.getItem("token");

      if (rawUser && rawToken) {
        const parsed = JSON.parse(rawUser);

        // OJO: según tu API vos guardás {token, user} o solo user
        const user = parsed.user ? parsed.user : parsed;

        dispatch(
          setProfile({
            fullname: user.fullname || "User",
            email: user.email || "",
            address: user.address || "",
            postalCode: user.postalCode || "",
            mobile: user.mobile || "",
            dateJoined: user.dateJoined || "",
          })
        );

        dispatch(
          signInSuccess({
            id: user.uid || user.id || "mock",
            role: "USER",
            user_name: user.fullname || "User",
          })
        );
      }
    } catch (e) {
      // si hay algo corrupto en localStorage, lo ignoramos
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      dispatch(authLoading(false));
    }
  }, [dispatch]);

  return (
    <PersistGate persistor={persistor} loading={<Loader />}>
      {pageLoading ? (
        <Loader />
      ) : (
        <>
          <Component {...pageProps} />
          <Toaster />
        </>
      )}
    </PersistGate>
  );
}

export default function MyApp(props: AppProps) {
  return (
    <Provider store={store}>
      <AppInner {...props} />
    </Provider>
  );
}