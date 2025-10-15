import { useContext, useState } from "react";
import {
  FaGooglePlusG,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import axios from "axios";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const { url } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const string = isRegister ? "/auth/signup" : "/auth/login";
      const response = await axios.post(url + string, userDetails);

      if (response.status === 200 || response.status === 201) {
        setErrMsg("");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setErrMsg(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 font-montserrat px-4">
      <div
        className={`relative overflow-hidden bg-white rounded-3xl shadow-2xl w-full max-w-[900px] min-h-[500px] flex flex-col md:flex-row transition-all duration-500`}
      >
        {/* Register Form */}
        {isRegister && (
          <div
            className={`w-full md:w-1/2 flex flex-col justify-center items-center transition-all duration-500 ${
              isRegister ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col items-center justify-center w-full h-full px-6 py-8 sm:px-10"
            >
              <h1 className="font-bold text-2xl sm:text-3xl mb-4 text-indigo-700">
                Create Account
              </h1>
              <div className="flex space-x-2 mb-4">
                <button className="border rounded-lg flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-indigo-600">
                  <FaGooglePlusG />
                </button>
                <button className="border rounded-lg flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-indigo-600">
                  <FaFacebookF />
                </button>
                <button className="border rounded-lg flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-indigo-600">
                  <FaGithub />
                </button>
                <button className="border rounded-lg flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-indigo-600">
                  <FaLinkedinIn />
                </button>
              </div>
              <span className="text-xs mb-2 text-gray-500">
                or use your email for registration
              </span>
              <input
                className="bg-gray-200 px-3 py-2 rounded-lg mb-2 w-full text-sm"
                name="name"
                onChange={handleInput}
                type="text"
                placeholder="Name"
              />
              <input
                className="bg-gray-200 px-3 py-2 rounded-lg mb-2 w-full text-sm"
                name="email"
                onChange={handleInput}
                type="email"
                placeholder="Email"
              />
              <input
                className="bg-gray-200 px-3 py-2 rounded-lg mb-2 w-full text-sm"
                name="password"
                onChange={handleInput}
                type="password"
                placeholder="Password"
              />
              <button
                type="submit"
                className="bg-indigo-700 text-white px-8 py-2 rounded-lg uppercase font-semibold mt-2 hover:bg-indigo-800 transition"
              >
                Sign Up
              </button>
              {errMsg && (
                <p className="text-sm text-center text-red-500 mt-2">
                  {errMsg}
                </p>
              )}
            </form>
          </div>
        )}

        {/* Login Form */}
        {!isRegister && (
          <div
            className={`w-full md:w-1/2 flex flex-col justify-center items-center transition-all duration-500 ${
              isRegister ? "translate-x-full" : ""
            }`}
          >
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col items-center justify-center w-full h-full px-6 py-8 sm:px-10"
            >
              <h1 className="font-bold text-2xl sm:text-3xl mb-4 text-indigo-700">
                Sign In
              </h1>
              <div className="flex space-x-2 mb-4">
                <button className="border rounded-lg flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-indigo-600">
                  <FaGooglePlusG />
                </button>
                <button className="border rounded-lg flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-indigo-600">
                  <FaFacebookF />
                </button>
                <button className="border rounded-lg flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-indigo-600">
                  <FaGithub />
                </button>
                <button className="border rounded-lg flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-indigo-600">
                  <FaLinkedinIn />
                </button>
              </div>
              <span className="text-xs mb-2 text-gray-500">
                or use your email and password
              </span>
              <input
                className="bg-gray-200 px-3 py-2 rounded-lg mb-2 w-full text-sm"
                name="email"
                onChange={handleInput}
                type="email"
                placeholder="Email"
              />
              <input
                className="bg-gray-200 px-3 py-2 rounded-lg mb-2 w-full text-sm"
                name="password"
                onChange={handleInput}
                type="password"
                placeholder="Password"
              />
              <a href="#" className="text-indigo-600 text-xs my-2">
                Forget Your Password?
              </a>
              <button
                type="submit"
                className="bg-indigo-700 text-white px-8 py-2 rounded-lg uppercase font-semibold mt-2 hover:bg-indigo-800 transition"
              >
                Sign In
              </button>
              {errMsg && (
                <p className="text-sm text-center text-red-500 mt-2">
                  {errMsg}
                </p>
              )}
            </form>
          </div>
        )}

        {/* Toggle Panel (hidden on small screens) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white items-center justify-center p-8 transition-all duration-500">
          {!isRegister ? (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="font-bold text-2xl mb-4">Hello, Friend!</h1>
              <p className="text-sm mb-4">
                Register with your personal details to use all site features
              </p>
              <button
                className="bg-transparent border border-white px-8 py-2 rounded-lg uppercase font-semibold mt-2 hover:bg-white hover:text-indigo-700 transition"
                onClick={() => setIsRegister(true)}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="font-bold text-2xl mb-4">Welcome Back!</h1>
              <p className="text-sm mb-4">
                Enter your personal details to use all site features
              </p>
              <button
                className="bg-transparent border border-white px-8 py-2 rounded-lg uppercase font-semibold mt-2 hover:bg-white hover:text-indigo-700 transition"
                onClick={() => setIsRegister(false)}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
