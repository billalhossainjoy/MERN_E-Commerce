
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  auth: boolean;
  user: any;
  children: React.ReactNode;
}

const Protected: React.FC<Props> = ({ auth, user, children }) => {
  const { pathname } = useLocation();

  if (!auth && !pathname.includes("/auth")) return <Navigate to="/auth" />;

  if (auth && pathname.includes("/auth")) {
    if (user.data.role === "ADMIN") return <Navigate to="/admin" />;
    else return <Navigate to="/shopping" />;
  }

  if (auth && pathname.includes("/admin") && user?.data?.role !== "ADMIN")
    return <Navigate to="/shopping" />;

  if (auth && !pathname.includes("/admin") && user?.data?.role === "ADMIN")
    return <Navigate to="/admin" />;

  return <>{children}</>;
};

export default Protected;
