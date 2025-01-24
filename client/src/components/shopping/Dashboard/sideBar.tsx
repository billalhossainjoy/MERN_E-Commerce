import { useLocation, useNavigate } from "react-router-dom";
import { DashboardSideNavItem } from ".";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface Props {
  open: boolean;

}
const DashboardSideBar = forwardRef<HTMLDivElement, Props>(({ open }, ref) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      ref={ref}
      className={cn(
        "h-screen bg-primary w-80 absolute lg:relative -left-80 lg:left-0 duration-300",
        { "left-0": open }
      )}
    >
      <ul className="flex flex-col gap-3 p-4">
        {DashboardSideNavItem.map((item, index) => (
          <li
            key={index}
            className={`${
              pathname.includes(item.path)
                ? "bg-gray-700 font-bold"
                : "bg-gray-800"
            } text-white rounded p-3`}
            onClick={() => navigate("/shopping/dashboard/" + item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
});

DashboardSideBar.displayName = "DashboardSideBar";

export default DashboardSideBar;
