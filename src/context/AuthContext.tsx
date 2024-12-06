import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import api from "@/server/axios";
import { toast } from "sonner";
import { routes } from "@/constants";
import { authApi } from "@/server/actions/auth";
import { APP_ROLES, User } from "@/types";
import { NavigateFunction } from "react-router-dom";
import { Alert } from "@/constants/icons";
import { useCallback } from "react";

type AuthContextType = {
  user?: User | null;
  token?: string | null;
  role?: (typeof APP_ROLES)[keyof typeof APP_ROLES] | string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleVerifyOtp: (otp: number, email: string) => Promise<void>;
  handleResendOtp: (email: string) => Promise<void>;
  handleForgotPassword: (email: string) => Promise<void>;
  handleResetPassword: (email: string, password: string, otp: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  isAuthenticated?: boolean;
  isLoadingAuth?: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderType = PropsWithChildren & {
  navigate: NavigateFunction;
};

export default function AuthProvider({ children, navigate, ...props }: AuthProviderType) {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string | null>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [role, setRole] = useState<(typeof APP_ROLES)[keyof typeof APP_ROLES] | string | null>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authApi.getAuthUser();

        if (!res?.status) throw new Error(res?.message || "Error getting Auth User");

        const { user, token: authToken } = res.data;
        const currentUser = setUserSession(user, authToken);

        if (!currentUser.otpVerified) {
          navigate("/verify-otp");
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        const storedUser = sessionStorage.getItem("admin-skymeasures-currentUser");
        const token = sessionStorage.getItem("admin-skymeasures-token");

        if (storedUser && token) {
          const currentUser = JSON.parse(storedUser);
          setToken(JSON.parse(token));
          setUser(currentUser);
          setRole(currentUser.role);
        } else {
          setToken(null);
          setUser(null);
          setRole(null);
        }
      }
    };

    fetchUser();
  }, []);

  const setUserSession = useCallback(
    (user: any, authToken: string) => {
      const currentUser = {
        userId: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.profile_picture,
        otpVerified: user.is_verified || false,
        role: user.role.includes("admin") ? "ADMIN" : "STAFF",
      };

      setToken(authToken);
      setUser(currentUser);
      setRole(currentUser.role);

      sessionStorage.setItem("admin-skymeasures-currentUser", JSON.stringify(currentUser));
      sessionStorage.setItem("admin-skymeasures-token", JSON.stringify(authToken));

      return currentUser;
    },
    [setToken, setUser, setRole]
  );

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.login({ email, password });

      if (!res?.status) throw new Error(res?.message || "Error Signing in");
      const authToken = res?.data?.token;
      const user = res?.data?.user;

      if (user) setUserSession(user, authToken);

      if (!user?.is_verified) {
        navigate("/verify-otp");
        toast.success(res?.message || "Login successful. Please verify OTP.");
      } else {
        toast.success(res?.message || "Login successful.");

        navigate("/dashboard");
      }
    } catch (error: any) {
      // null - request made and it failed
      const errorMessage = error?.response?.data?.message;
      let message = "Error signing in";

      console.log("TEST", error);

      if (errorMessage?.includes("These credentials do not match our records")) {
        message = errorMessage;
      } else if (errorMessage?.includes("Bad Credentials")) {
        message = "Incorrect password";
      }

      setToken(null);
      setUser(null);
      setRole(null);
      toast.error(
        <div className="row-flex-start gap-2">
          <Alert className="size-5 text-red-500 self-start" />
          <div className="flex-column gap-0.5">
            <h3>{errorMessage || message}</h3> <p className="">{message}</p>
          </div>
        </div>
      );
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleVerifyOtp = async (otp: number, email: string) => {
    if (!otp || !email) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.verifyOtp({ otp, email });

      if (!res?.status) throw new Error(res?.message || "OTP verification failed");

      const updatedUser = {
        ...(user as User),
        otpVerified: true,
      };

      sessionStorage.setItem("admin-skymeasures-currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success("OTP verified successfully. Redirecting to dashboard...");

      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage || "Failed to verify OTP. Please try again.");
      throw new Error(errorMessage || "Failed to verify OTP.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleResendOtp = async (email: string) => {
    if (!email) return;

    try {
      const res = await authApi.resendOtp();

      if (!res?.status) throw new Error(res?.message || "Failed to resend OTP");
      toast.success("OTP resent successfully");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage || "Failed to resend OTP");
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.forgotPassword({ email });

      if (!res?.status) throw new Error(res?.message || "Error sending reset OTP");

      toast.success(res?.message || "Password reset OTP has been sent successfully");
      navigate("/change-password");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage || "Error sending reset OTP");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleResetPassword = async (email: string, password: string, otp: string) => {
    if (!email || !password || !otp) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.resetPassword({ email, password, otp });

      if (!res?.status) throw new Error(res?.message || "Failed to reset password");

      toast.success("Password reset successful");
      navigate("/change-password/success");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;

      toast.error(errorMessage || "Failed to reset password");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToken(null);
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("admin-skymeasures-currentUser");
      sessionStorage.removeItem("admin-skymeasures-token");

      toast.success("Logged out successfully");
      navigate(routes.LOGIN);
    } catch {
      toast.error(
        <div className="row-flex-start gap-2">
          <Alert className="size-5 text-red-500 self-start" />
          <div className="flex-column gap-0.5">
            <h3>Something went wrong</h3> <p className="">Failed to log out</p>
          </div>
        </div>
      );
    }
  };

  useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config: any) => {
      // if there is a token, add it to the headers of the request, otherwise passs the authorization header that was there before
      config.headers.Authorization =
        !config?._retry && token ? `Bearer ${token}` : config.headers.Authorization;

      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 403 && error?.response?.message === "Unauthorized") {
          originalRequest._retry = true;
          try {
            const response = await authApi.refreshAccessToken();
            setToken(response.data?.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response.data?.accessToken}`;

            return api.request(originalRequest);
          } catch (error) {
            console.error("Failed to refresh token:", error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        isLoadingAuth,
        handleLogin,
        handleLogout,
        handleVerifyOtp,
        handleResendOtp,
        handleForgotPassword,
        handleResetPassword,
      }}
      {...props}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
