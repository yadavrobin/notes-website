import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid Email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }

    setError(""); // Clear any previous error
    setIsLoading(true); // Set loading to true

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      } else {
        setError("Invalid login credentials");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Reset loading state after API request is complete
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 via-blue-400 to-purple-600 p-8">
        <div className="w-96 bg-white shadow-lg border border-gray-300 rounded-lg p-7 md:p-10">
          <h2 className="text-black text-xl font-bold uppercase text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading} // Disable input when loading
              />
            </div>
            <div>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading} // Disable input when loading
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? "Logging in..." : "Login"} {/* Show loading text */}
            </button>

            <p className="text-center text-sm mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
