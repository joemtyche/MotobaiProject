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

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

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
      <div className="fixed w-screen h-screen left-0 top-0 z-10 backdrop-blur-sm bg-black bg-opacity-60 ">
        <div
          className={`absolute inset-0 w-fit h-fit m-auto bg-mainColor rounded-lg z-10
            `}
        >
          <div className={`bg-mainColor w-1/2 rounded-l-lg`}>
            <img
              className="max-w-16 rounded-l-xl"
              src={Logo}
              alt="Motobai-Logo"
            />
          </div>
          <form onSubmit={handleSubmit} className="min-w-[20vw]">
            <div
              className={`bg-gray-100 py-10 px-8 h-[40vh] rounded-b-lg flex flex-col gap-4`}
            >
              <h1 className="font-bold text-2xl">{name}</h1>
              {method === "login" && (
                <div className="bg-yellow-50 border border-yellow-300 rounded p-3 text-sm text-yellow-800 space-y-1">
                  <p>⚠️ This site is still a work in progress and may undergo changes.</p>
                  <p>📝 To get started, please create an account by registering first.</p>
                  <p>🔄 Note that displayed data may not be regularly refreshed or up to date.</p>
                </div>
              )}
              <input
                className="text-lg p-2 min-w-[450px]"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                className="text-lg p-2 min-w-[450px]"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <div className="flex justify-center mt-12">
                <button
                  className={`shadow-md bg-white border-2 border-red-700 rounded px-6 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 items-center w-fit text-xl font-semibold`}
                  type="submit"
                >
                  {name}
                </button>
              </div>
              <div className="flex justify-center mt-4">
                {method === "login" ? (
                  <p className="text-sm">
                    Don't have an account?{" "}
                    <span
                      className="text-red-700 cursor-pointer hover:underline"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </span>
                  </p>
                ) : (
                  <p className="text-sm">
                    Already have an account?{" "}
                    <span
                      className="text-red-700 cursor-pointer hover:underline"
                      onClick={() => navigate("/login")}
                    >
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
