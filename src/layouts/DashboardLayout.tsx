import { Outlet } from "react-router-dom";
import Sidebar from "@/layouts/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex w-full h-full flex-col md:flex-row">
      <div className="remove-scrollbar overflow-x-hidden border-r border-border relative hidden w-54 overflow-y-auto shadow-sm md:block bg-secondary">
        <Sidebar />
      </div>

      <div className="flex-1 h-full bg-background-100 overflow-x-hidden w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
