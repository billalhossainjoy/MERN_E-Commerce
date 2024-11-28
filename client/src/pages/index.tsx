import { Orbit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppHomePage: React.FC = () => {
	const navigate = useNavigate()
	setTimeout(() => {
		navigate("/shopping")
	}, 2000);
  return (
    <div>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex items-center">
          <Orbit className="text-primary w-6 h-6" />
          <h1 className="font-bold text-lg">
            Tech <span className="text-primary">shop</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
export default AppHomePage;
