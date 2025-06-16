import FallbackLoader from "@/components/fallback/FallbackLoader";
import { routes } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const hasRedirected = useRef(false);
  const prevUserVerified = useRef<boolean | null>(null);

  useEffect(() => {
    // Reset hasRedirected if user or verification state changes
    if (user === null || (user && prevUserVerified.current !== !!user.is_verified)) {
      hasRedirected.current = false;
    }

    // Update previous verification state
    prevUserVerified.current = user ? !!user.is_verified : null;

    // Skip if already redirected in this cycle
    if (hasRedirected.current) return;

    if (user && !user.is_verified) {
      hasRedirected.current = true;
      navigate(routes.VERIFY_OTP, { replace: true });
      return;
    }

    setIsLoading(false);

    return () => {
      hasRedirected.current = false;
    };
  }, [user, pathname, routes]);

  if (user === undefined || isLoading) {
    return <FallbackLoader />;
  }

  if (user === null) {
    return <Navigate to={routes.LOGIN} replace state={{ returnTo: pathname }} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
