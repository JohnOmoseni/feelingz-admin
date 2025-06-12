import { PropsWithChildren, useLayoutEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { routes } from "./constants";
import { useNavigate } from "react-router-dom";
import FallbackLoader from "./components/fallback/FallbackLoader";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user === null || token === null) {
      // Redirect to login page
      navigate(routes.LOGIN, { replace: true });
      return;
    }

    if (user?.otpVerified === false) {
      // navigate(routes.VERIFY_OTP, { replace: true });
      return;
    }
  }, [navigate, user]);

  if (user === undefined) return <FallbackLoader label="Loading" />;

  return children;
}

export default ProtectedRoute;
