import { Link } from "react-router-dom";
import { shoppingHeaderMenu } from "./constants";

interface Props {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShoppingNav: React.FC<Props> = ({ setMenuOpen }) => {
  return (
    <nav className=" flex flex-col lg:flex-row gap-6 font-semibold text-[14px] mt-4 lg:mt-0">
      {shoppingHeaderMenu.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className="bg-secondary lg:bg-transparent text-primary p-2 lg:p-0 lg:rounded"
          onClick={() => setMenuOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
export default ShoppingNav;
