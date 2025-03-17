import Logo from "@assets/logo.png";
import { AppDispatch, RootState } from "@store";
import { useDispatch, useSelector } from "react-redux";
import { ActionLogout } from "@store";
import { logout } from "@utils";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const storeUserName = useSelector((state: RootState) => state.user.name);

  const handleLogout = () => {
    logout()
      .then(() => {
        // remove login information from store
        dispatch(ActionLogout());

        navigate("/login");
      })
      .catch((err) => {
        console.error("Failed to logout", err);
      });
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo} alt="Dog Logo 1" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-center m-4 text-blue-600">
          We all love dogs!
        </h1>
      </div>
      <div className="flex items-center font-bold">
        Authorized as {storeUserName}
        <button
          className="text-blue-500 m-4 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
