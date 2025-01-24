import { useNavigate } from "react-router-dom";
import { shoppingHeaderMenu } from "./constants";
import { Label } from "../ui/label";

interface Props {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShoppingNav: React.FC<Props> = ({ setMenuOpen }) => {
  const navigate = useNavigate();

  const handleNavigateFilter = (filter: string) => {
    if (filter == "home") return navigate("/shopping");
    if (filter == "search") return navigate("/shopping/search");
    sessionStorage.removeItem("Filters");
    const currentFilter = {
      Category: [filter],
      Brand: [],
    };
    console.log(currentFilter);
    sessionStorage.setItem("Filters", JSON.stringify(currentFilter));
    navigate(`/shopping/listing?category=${filter}&brand=`);
    setMenuOpen(false);
  };

  return (
    <nav className=" flex flex-col lg:flex-row gap-6 font-semibold text-[14px] mt-4 lg:mt-0">
      {shoppingHeaderMenu.map((item) => (
        <Label
          key={item.id}
          className="bg-secondary lg:bg-transparent text-primary p-2 lg:p-0 lg:rounded cursor-pointer"
          onClick={() => handleNavigateFilter(item.id)}
        >
          {item.label}
        </Label>
      ))}

    </nav>
  );
};
export default ShoppingNav;
