import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/header";
import AdminSideBar from "@/components/admin/sidebar";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <AdminSideBar />
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <AdminHeader />
        <main className="bg-secondary w-full h-full overflow-auto remove-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
