import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Logo from "../assets/Logo.png";
import "./pages.css";
import Swal from 'sweetalert2'

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";
  const serverOffline = import.meta.env.VITE_SERVER_OFFLINE === "true";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (serverOffline) {
      Swal.fire({
        title: "Server Offline",
        text: "The backend server is currently unavailable. Please try again later.",
        icon: "error",
      });
      setLoading(false);
      return;
    }
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        Swal.fire({
          title: "Logged in!",
          icon: "success",
          timer: 1000,
        }).then((result) => {
          navigate("/accounts");
        });
      } else {
        Swal.fire({
          title: "Account Created!",
          icon: "success",
          timer: 1000,
        }).then((result) => {
          navigate("/login");
        });

      }
    } catch (error) {
      Swal.fire({
        title: "Login Error!",
        text: `${error}`,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="fixed w-screen h-screen left-0 top-0 z-10 backdrop-blur-sm bg-black bg-opacity-60">
        <div className="absolute inset-0 w-fit h-fit m-auto bg-mainColor rounded-lg z-10">
          <div className="bg-mainColor px-6 py-4 rounded-t-lg flex items-center gap-3">
            <img className="max-w-10 rounded-xl" src={Logo} alt="Motobai-Logo" />
            <span className="text-white text-lg font-medium">Motobai</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-100 py-8 px-8 rounded-b-lg flex flex-col gap-4 w-[90vw] max-w-md">
              <h1 className="font-bold text-2xl">{name}</h1>
              {serverOffline && (
                <div className="bg-yellow-50 border border-yellow-400 rounded p-3 text-sm text-yellow-800 space-y-1">
                  <p>Server is currently offline. Login and registration are unavailable.</p>
                  <p>This site is still a work in progress and may undergo changes.</p>
                  <p>Displayed data may not be regularly refreshed or up to date.</p>
                </div>
              )}
              <input
                className="text-lg p-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                disabled={serverOffline || loading}
              />
              <input
                className="text-lg p-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                disabled={serverOffline || loading}
              />
              <button
                className="shadow-md bg-white border-2 border-red-700 rounded px-6 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 text-xl font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={serverOffline || loading}
              >
                {name}
              </button>
              <div className="flex justify-center">
                {method === "login" ? (
                  <p className="text-sm">
                    Don't have an account?{" "}
                    <span className="text-red-700 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
                      Register
                    </span>
                  </p>
                ) : (
                  <p className="text-sm">
                    Already have an account?{" "}
                    <span className="text-red-700 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
                      Login
                    </span>
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Form;
