import { useLocation, useNavigate } from "react-router-dom";
import { adminSidebarMenuItems } from "./index";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { setAdminMenu } from "@/store/features/template/slice";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/store/features/auth/slice";

const MenuItems: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handler = (path: string) => {
    if (window.innerWidth <= 768) dispatch(setAdminMenu(false));
    navigate(path);
  };
  
  const logoutHandler = () => {
    try {
      dispatch(logoutUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="gap-2 flex flex-col h-full justify-between">
      <div className="gap-2 flex flex-col">
        {adminSidebarMenuItems.map((item) => (
          <div
            className={cn(
              `flex items-center text-gray-600 gap-2 rounded-md md:m-2 px-3 py-2 cursor-pointer hover:bg-secondary text-sm font-bold`,
              {
                "text-primary bg-secondary font-extrabold":
                  pathname === item.path,
              }
            )}
            key={item.id}
            onClick={() => handler(item.path)}
          >
            {
              <item.icon
                className={cn(" w-4", {
                  "w-5": pathname === item.path,
                })}
              />
            }
            <span className=""> {item.label}</span>
          </div>
        ))}
      </div>
      <div
        className="md:hidden bg-secondary py-4 px-3 rounded-lg md:rounded-none flex justify-between"
        onClick={logoutHandler}
      >
        <span>Logout</span>
        <LogOut className="text-primary" />
      </div>
    </nav>
  );
};
export default MenuItems;
