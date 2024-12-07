import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./app/(auth)/signin/page";
import VerifyOTP from "./app/(auth)/verify/page";
import ForgotPassword from "./app/(auth)/forgot-password/page";
import ChangePassword from "./app/(auth)/change-password/page";
import SuccessPage from "./app/(auth)/change-password/success-page";

import LayoutProvider from "./providers/LayoutProvider";

import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import AuthProtectedRoute from "./AuthProtectedRoute";
import ErrorBoundary from "./components/fallback/Error";
import ScrollToTop from "./layouts/ScrollToTop";
import NotFound from "./layouts/NotFound";

import Dashboard from "./app/dashboard/page";
import Listing from "./app/dashboard/listing/page";
import Users from "./app/dashboard/users/page";
import Complaints from "./app/dashboard/complaints/page";
import Category from "./app/dashboard/category/page";
import Settings from "./app/dashboard/settings/page";

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          <Route element={<LayoutProvider />}>
            <Route path="/" element={<Navigate to={"/dashboard"} />} />
            <Route path="*" element={<NotFound />} />

            <Route
              element={
                <AuthProtectedRoute>
                  <AuthLayout />
                </AuthProtectedRoute>
              }
            >
              <Route path="/signin" element={<SignIn />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/recover-password" element={<ForgotPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/change-password/success" element={<SuccessPage />} />
            </Route>

            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard">
                <Route index element={<Dashboard />} />

                <Route path="listings">
                  <Route index element={<Listing />} />
                </Route>

                {/* <Route path="vehicle-listings">
                  <Route index element={<VehicleListing />} />
                </Route> */}

                <Route path="users">
                  <Route index element={<Users />} />
                </Route>

                <Route path="category">
                  <Route index element={<Category />} />
                </Route>

                {/* <Route path="analytics">
                  <Route index element={<Analytics />} />
                </Route> */}

                <Route path="complaints">
                  <Route index element={<Complaints />} />
                </Route>

                <Route path="category">
                  <Route index element={<Category />} />
                </Route>

                <Route path="settings">
                  <Route index element={<Settings />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default AppRouter;
