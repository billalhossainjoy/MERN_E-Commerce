import { logoutUser } from "@/store/features/auth/slice";
import { useAppDispatch } from "@/store/store";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/shopping");
    });
  };
  return (
    <div
      className="flex gap-3 font-semibold text-primary bg-secondary justify-center items-center p-2 rounded"
      onClick={() => logoutHandler()}
    >
      Logout
      <span>
        <LogOut className="w-5" />
      </span>
    </div>
  );
};
export default LogoutButton;