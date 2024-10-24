import googleIcon from "/icons/google.svg";
import facebookIcon from "/icons/facebook.svg";

const AuthProviders: React.FC = () => {
  return (
    <div className="flex gap-3 w-full justify-between">
      <div className="p-1 flex justify-center items-center text-primary border border-primary rounded w-full shadow-sm shadow-primary cursor-pointer">
        <img src={googleIcon} alt="Google" className="w-8" />
      </div>
      <div className="p-1 flex justify-center items-center text-primary border border-primary rounded w-full shadow-sm shadow-primary cursor-pointer">
        <img src={facebookIcon} alt="facebook" className="w-8" />
      </div>
    </div>
  );
};
export default AuthProviders;
