import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full bg-secondary">
      <div className="flex flex-1 items-center justify-center bg-secondary px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
