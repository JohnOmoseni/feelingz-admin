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
import { routes, ssCurrentUser, ssToken } from "@/constants";
import { authApi } from "@/server/actions/auth";
import { NavigateFunction } from "react-router-dom";
import { Alert } from "@/constants/icons";
import { useCallback } from "react";
import { showToast } from "@/lib/utils";
import { extractErrorMessage } from "@/lib/errorUtils";

type AuthContextType = {
  user?: UserType | null;
  token?: string | null;
  handleLogin: (email: string, password: string, returnTo?: string) => Promise<void>;
  handleVerifyOtp: (user_id: string, token: number) => Promise<void>;
  handleResendOtp: (
    email: string,
    user_id: string,
    options?: { signal?: AbortSignal }
  ) => Promise<void>;
  handleForgotPassword: (email: string) => Promise<void>;
  handleVerifyPasswordPin: (token: number, email: string) => Promise<void>;
  handleResetPassword: (email: string, password: string, otp: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  isLoadingAuth?: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderType = PropsWithChildren & {
  navigate: NavigateFunction;
};

export default function AuthProvider({ children, navigate, ...props }: AuthProviderType) {
  const [user, setUser] = useState<UserType | null>();
  const [token, setToken] = useState<string | null>();
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authApi.getAuthUser();

        if (res?.status !== 200)
          throw new Error(res?.message || "Error getting authenticated user");

        const token = sessionStorage.getItem(ssToken);
        let parsedToken = "";
        try {
          parsedToken = token ? JSON.parse(token) : "";
        } catch (parseError) {
          console.error("Token parsing error:", parseError);
          throw new Error("Invalid session token");
        }
        const currentUser = setUserSession(res.data, parsedToken);

        if (!currentUser.is_verified) {
          navigate("/verify-otp");
        } else {
          navigate("/");
        }
      } catch (error: any) {
        const storedUser = sessionStorage.getItem(ssCurrentUser);
        const token = sessionStorage.getItem(ssToken);

        try {
          if (storedUser && token) {
            const currentUser = JSON.parse(storedUser);
            setToken(JSON.parse(token));
            setUser(currentUser);
          } else {
            setToken(null);
            setUser(null);
            navigate("/signin");
          }
        } catch (parseError) {
          console.error("Session storage parsing error:", parseError);
          setToken(null);
          setUser(null);
          navigate("/signin");
        }
      }
    };
    fetchUser();
  }, []);

  const setUserSession = useCallback(
    (user: any, authToken: string): UserType => {
      const currentUser = {
        ...user,
        userId: user.id,
        full_name: `${user.first_name || "Unknown"} ${user.last_name}`,
      };

      setUser(currentUser);
      setToken(authToken);

      sessionStorage.setItem(ssToken, JSON.stringify(authToken));
      sessionStorage.setItem(ssCurrentUser, JSON.stringify(currentUser));

      return currentUser;
    },
    [setToken, setUser]
  );

  const handleLogin = async (email: string, password: string, returnTo?: string) => {
    if (!email || !password) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.login({ email, password });

      if (!res?.data || res?.status !== 200) throw new Error(res?.message || "Error signing in");

      const user = res.data?.user;
      const authToken = res.data?.token;
      const message = "Logged In successfully";

      if (!user) throw new Error("Error signing in");

      setUserSession(user, authToken);

      showToast("success", message);
      navigate(returnTo || "/", { replace: true });
    } catch (error: any) {
      // null - request made and it failed
      let message = "Error signing in";
      message = extractErrorMessage(error);

      setToken(null);
      setUser(null);
      showToast("error", message);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleVerifyOtp = async (user_id: string, token: number) => {
    if (!token || !user_id) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.verifyOtp({ user_id, token });

      if (res?.status !== 200) throw new Error(res?.message || "OTP verification failed");

      const user = res.data?.user;
      const authToken = res.data?.token;

      if (!user) throw new Error("Error signing in");

      setUserSession(user, authToken);
      navigate("/", {
        replace: true,
      });
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to verify OTP. Please try again.";

      showToast("error", errorMessage);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleResendOtp = async (
    email: string,
    user_id: string,
    options?: { signal?: AbortSignal }
  ) => {
    if (!email || !user_id) return;
    try {
      const res = await authApi.resendOtp({ email, user_id }, options?.signal);
      if (res?.status !== 200) throw new Error(res?.message || "Failed to resend OTP");

      const message = res?.message || "OTP resent successfully.";
      showToast("success", message);
    } catch (error: any) {
      if (error.name === "AbortError" || error.name === "CanceledError") {
        console.log("OTP resend request canceled");
        return;
      }
      const errorMessage = error?.message || "Failed to resend OTP";
      showToast("error", errorMessage);
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) return;
    setIsLoadingAuth(true);
    let message;

    try {
      const res = await authApi.forgotPassword({ email });
      if (res?.status !== 200) throw new Error(res?.message || "Failed to reset password");

      message = res?.message || "Email Sent successfully.";
      showToast("success", message, "A 6-digit PIN has been sent to your email.");
      navigate("/verify-pin", { state: { email } });
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to reset password. Please try again.";

      showToast("error", errorMessage);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleVerifyPasswordPin = async (token: number, email: string) => {
    if (!token || !email) return;
    setIsLoadingAuth(true);

    try {
      const res = await authApi.verifyResetPasswordOtp({ token, email });

      if (!res?.data || res?.status !== 200)
        throw new Error(res?.message || "Failed to verify pin");
      const message = res.message || "PIN verified successfully.";
      const reset_token = res.data?.token;

      showToast("success", message);
      navigate("/update-password", {
        state: { reset_token },
      });
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to verify pin. Please try again.";
      showToast("error", errorMessage);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleResetPassword = async (
    password: string,
    password_confirmation: string,
    reset_token: string
  ) => {
    if (!password || !password_confirmation) return;
    setIsLoadingAuth(true);

    let message;

    try {
      const res = await authApi.resetPassword({
        password,
        password_confirmation,
        reset_token,
      });

      if (res?.status !== 200) throw new Error(res?.message || "Failed to reset	password");

      message = res?.message || "Password reset successful.";
      showToast("success", message);
      navigate("/signin");
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to reset password. Please try again.";
      showToast("error", errorMessage);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToken(null);
      setUser(null);
      false;
      sessionStorage.removeItem(ssCurrentUser);
      sessionStorage.removeItem(ssToken);

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
    const userToken = sessionStorage.getItem(ssToken);
    let parsedToken = "";
    try {
      parsedToken = userToken ? JSON.parse(userToken) : "";
    } catch (parseError) {}

    const requestInterceptor = api.interceptors.request.use((config: any) => {
      // if there is a token, add it to the headers of the request, otherwise passs the authorization header that was there before
      config.headers.Authorization =
        !config?._retry && token ? `Bearer ${token || parsedToken}` : config.headers.Authorization;

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
            // const response = await authApi.refreshAccessToken();
            // setToken(response.data?.accessToken);
            // originalRequest.headers.Authorization = `Bearer ${response.data?.accessToken}`;
            // return api.request(originalRequest);
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
        isLoadingAuth,
        handleLogin,
        handleLogout,
        handleVerifyOtp,
        handleResendOtp,
        handleVerifyPasswordPin,
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
