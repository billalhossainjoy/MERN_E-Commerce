import { Orbit } from "lucide-react";
import MenuItems from "./menuItems";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setAdminMenu } from "@/store/features/template/slice";
import { useNavigate } from "react-router-dom";

const AdminSideBar: React.FC = () => {
  const navigate = useNavigate();
  const open = useAppSelector((state) => state.template.adminMenuOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      <Sheet open={open} onOpenChange={(e) => dispatch(setAdminMenu(e))}>
        <SheetContent className="" side={"left"}>
          <div className="flex flex-col gap-4 h-full">
            <SheetHeader>
              <SheetTitle>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/admin")}
                >
                  <Orbit className="text-primary w-6 h-6" />
                  <h1 className="font-bold text-lg">
                    Admin <span className="text-primary">panel</span>
                  </h1>
                </div>
              </SheetTitle>
            </SheetHeader>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r md:flex ">
        <div
          className="flex items-center gap-1 px-4 py-4 border-b cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          <Orbit className="text-primary w-6 h-6" />
          <h1 className="font-bold text-lg">
            Admin <span className="text-primary">panel</span>
          </h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};
export default AdminSideBar;
