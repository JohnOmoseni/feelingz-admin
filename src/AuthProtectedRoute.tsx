import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { routes } from "./constants";
import { useLocation, useNavigate } from "react-router-dom";
import FallbackLoader from "./components/fallback/FallbackLoader";

function AuthProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current || user === undefined) {
      return;
    }

    if (user && pathname === "/signin") {
      // Redirect to dashboard page if already logged in
      hasRedirected.current = true;
      navigate(routes.DASHBOARD, { replace: true });
      return;
    }

    setIsLoading(false);

    return () => {
      hasRedirected.current = false;
    };
  }, [navigate, user]);

  if (user === undefined || isLoading) return <FallbackLoader label="Loading" />;

  return children;
}

export default AuthProtectedRoute;
