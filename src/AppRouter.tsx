import { Route, Routes } from "react-router-dom";
import SignIn from "./app/(auth)/signin/page";
import ForgotPassword from "./app/(auth)/forgot-password/page";
import UpdatePassword from "./app/(auth)/forgot-password/update-password";

import LayoutProvider from "./providers/LayoutProvider";

import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import AuthProtectedRoute from "./AuthProtectedRoute";
import ErrorBoundary from "./components/fallback/Error";
import ScrollToTop from "./layouts/ScrollToTop";
import NotFound from "./layouts/NotFound";

import Dashboard from "./app/dashboard/(home)/page";
import Users from "./app/dashboard/users/page";
import Settings from "./app/dashboard/settings/page";
import Contents from "./app/dashboard/contents/page";
import Staffs from "./app/dashboard/staffs/page";
import UserDetails from "./app/dashboard/users/user-details";

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          <Route element={<LayoutProvider />}>
            <Route path="*" element={<NotFound />} />

            <Route
              element={
                <AuthProtectedRoute>
                  <AuthLayout />
                </AuthProtectedRoute>
              }
            >
              <Route path="/signin" element={<SignIn />} />
              <Route path="/recover-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
            </Route>

            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/">
                <Route index element={<Dashboard />} />

                <Route path="/contents">
                  <Route index element={<Contents />} />
                </Route>

                <Route path="/users">
                  <Route index element={<Users />} />
                  <Route path=":user_id" element={<UserDetails />} />
                </Route>

                <Route path="/staffs">
                  <Route index element={<Staffs />} />
                </Route>

                <Route path="/settings">
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
