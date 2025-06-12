import { useAppDispatch, useAppSelector } from "@/types";
import { Suspense, useEffect } from "react";
import { setNetwork, setScreenSize } from "@/redux/features/appSlice";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import Menu from "@/layouts/Menu";

function LayoutProvider() {
  const dispatch = useAppDispatch();
  const { openMenu, screenSize } = useAppSelector((state) => state.appState);

  useEffect(() => {
    const updateNetwork = () => {
      dispatch(setNetwork(navigator.onLine));
    };
    const getScreenSize = () => {
      dispatch(setScreenSize(window?.innerWidth));
    };

    getScreenSize();
    updateNetwork();

    window.addEventListener("resize", getScreenSize);
    window.addEventListener("online", updateNetwork);
    window.addEventListener("offline", updateNetwork);

    return () => {
      window.removeEventListener("resize", getScreenSize);
      window.removeEventListener("online", updateNetwork);
      window.removeEventListener("offline", updateNetwork);
    };
  }, []);

  return (
    <>
      <AnimatePresence>{openMenu && <Menu />}</AnimatePresence>
      <div className="wrapper">
        <Suspense fallback={<FallbackLoader label="Loading" />}>
          <Outlet />
        </Suspense>
      </div>
      <Toaster
        richColors
        position={screenSize < 768 ? "top-center" : "bottom-right"}
        toastOptions={{
          style: { padding: "1rem" },
          className: "my-toast",
        }}
      />
    </>
  );
}
export default LayoutProvider;
