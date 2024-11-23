import { AlignJustify, LogOut, Orbit } from "lucide-react";
import { useAppDispatch } from "@/store/store";
import { setAdminMenu } from "@/store/features/template/slice";
import CustomButton from "../common/CustomButton";
import { logoutUser } from "@/store/features/auth/slice";

const AdminHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <div>
        <div className="flex md:hidden items-center gap-1">
          <Orbit className="text-primary w-6 h-6" />
          <h1 className="font-bold text-lg">
            Admin <span className="text-primary">panel</span>
          </h1>
        </div>
      </div>
      <CustomButton
        className="block md:hidden "
        onClick={() => dispatch(setAdminMenu(false))}
      >
        <AlignJustify />
      </CustomButton>
      <CustomButton
        className="hidden md:flex gap-2"
        onClick={() => dispatch(logoutUser())}
      >
        <LogOut />
        <span className="text-white"> Log out</span>
      </CustomButton>
    </header>
  );
};
export default AdminHeader;
