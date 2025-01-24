import LoginForm from "@/components/auth/form/login";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="flex flex-1 justify-center items-center w-full">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl lg:text-5xl font-bold w-full text-center text-primary">
            Hi, there! Please login First.
          </h1>
          <p className="w-full text-center text-foreground font-semibold text-sm lg:text-[15px]">
            Login to access your account and{" "}
            <span className="text-primary">get start</span> you shopping.
          </p>
        </div>
        <LoginForm />
        <p className="w-full text-center text-foreground font-semibold text-sm">
          Dont't have any account? go to{" "}
          <Link to="/auth/signup" className="text-primary">
            sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
export default Login;
