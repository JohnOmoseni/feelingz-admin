import { PropsWithChildren, useLayoutEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { routes } from "./constants";
import { useLocation, useNavigate } from "react-router-dom";
import FallbackLoader from "./components/fallback/FallbackLoader";

function AuthProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (user && pathname === "/signin") {
      // Redirect to dashboard page if already logged in
      navigate(routes.DASHBOARD, { replace: true });
      return;
    }
  }, [navigate, user]);

  if (user === undefined) return <FallbackLoader label="Loading" />;

  return children;
}

export default AuthProtectedRoute;
