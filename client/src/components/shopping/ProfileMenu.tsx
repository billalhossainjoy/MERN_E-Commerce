import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/store/features/auth/slice";
import { resetCart } from "@/store/features/cart/cart.slice";

interface Props {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu: React.FC<Props> = ({ setMenuOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutUser()).then(() => {
      dispatch(resetCart());
      navigate("/shopping");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!outline-none">
        <div className="bg-primary rounded-full w-8 h-8 text-white flex justify-center items-center !border-none">
          {user?.data?.username[0].toUpperCase()}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" mx-5">
        <DropdownMenuLabel>Logn as {user?.data.username}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            navigate("/shopping/dashboard/account");
            setMenuOpen(false);
          }}
        >
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator className="hidden lg:block" />
        <DropdownMenuItem
          onClick={logoutHandler}
          className="text-destructive hidden lg:block"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileMenu;
