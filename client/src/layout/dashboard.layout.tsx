import DashboardSideBar from "@/components/shopping/Dashboard/sideBar";
import { Menu } from "lucide-react";
import {  useRef, useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  
  return (
    <div className="flex w-full h-full overflow-hidden">
      <DashboardSideBar open={openSideNav} ref={sideBarRef} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="bg-secondary w-full overflow-auto remove-scrollbar">
          <div className="text-end block lg:hidden">
            <div
              className="bg-white inline-block p-3 rounded-lg m-3"
              onClick={() => setOpenSideNav((prev) => !prev)}
            >
              <Menu />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
