import SignUpForm from "@/components/auth/form/signup";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <div className="flex flex-1 justify-center items-center w-full">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl lg:text-5xl font-bold w-full text-center text-primary px-3">
            Welcome to open paradox.
          </h1>
          <p className="w-full text-center text-foreground font-semibold text-sm lg:text-[15px]">
            create an account to <span className="text-primary">get start</span>{" "}
            shopping.
          </p>
        </div>
        <SignUpForm />
        <p className="w-full text-center text-foreground font-semibold text-sm ">
          Have already an account?{" "}
          <Link to="/auth" className="text-primary">
            login
          </Link>{" "}
          Free!
        </p>
      </div>
    </div>
  );
};
export default SignUp;
