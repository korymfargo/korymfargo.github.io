import { useState } from "react";
import Logo from "@assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch, ActionLogin, ActionLogout } from "@store";
import { login, logout } from "@utils";

function Login() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const storeUserName = useSelector((state: RootState) => state.user.name);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(name, email)
      .then((res) => {
        if (res.data === "OK") {
          // success login
          dispatch(
            ActionLogin({
              name,
              email,
            })
          );

          return true;
        }
        return false;
      })
      .catch((err) => {
        console.error("Failed to login", err);
        return false;
      });

    // redirect to search
    if (success) navigate("/search");
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        // remove login information from store
        dispatch(ActionLogout());
      })
      .catch((err) => {
        console.error("Failed to logout", err);
      });
  };

  if (isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-white text-2xl m-3 font-bold">
          You are already authorized as {storeUserName}
        </h2>
        <div className="flex justify-center">
          <button
            className="w-40 bg-blue-500 text-white p-3 m-3 rounded-md cursor-pointer font-bold"
            onClick={() => navigate("/search")}
          >
            Search Dogs
          </button>
          <button
            className="w-40 bg-blue-500 text-white p-3 m-3 rounded-md cursor-pointer font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Logo */}
      <div className="flex flex-col justify-center items-center">
        <img src={Logo} alt="Dog Logo" />
        <h2 className="text-white text-2xl m-3 uppercase">We all love dogs!</h2>
      </div>
      {/* Login Form */}
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
