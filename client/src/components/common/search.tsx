import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/store/store";
import { searchProduct } from "@/store/features/searchSlice";
import { Search as Icon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      searchKeyWord &&
      searchKeyWord.trim() !== "" &&
      searchKeyWord.trim().length > 3
    )
      dispatch(searchProduct(searchKeyWord));
  }, [searchKeyWord, dispatch]);


  useEffect(() => {
    if (pathname === "/shopping/search") setOpen(true);
    else setOpen(false);
  }, [pathname]);

  return (
    <div
      className="flex  justify-center items-center border rounded-lg px-2"
      onClick={() => navigate("/shopping/search")}
    >
      <Input
        value={searchKeyWord}
        onChange={(e) => setSearchKeyWord(e.target.value)}
        className={cn(
          "border-none shadow-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0 w-0 duration-300 transition-all",
          { "w-80 ": open },
          { "p-0": !open }
        )}
      />
      <Icon />
    </div>
  );
};
export default Search;
