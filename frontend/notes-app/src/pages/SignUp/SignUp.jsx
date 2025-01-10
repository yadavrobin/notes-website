import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!name) {
      setError("Please enter name");
      return;
    }
    if (!email) {
      setError("Please enter email");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError(""); // Clear previous error message

    try {
      console.log("Sending data:", { fullName: name, email, password });
      
      // API Request
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      console.log("API response:", response.data); // Log the response

      // Check for backend response errors
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      // Check for successful response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("API call failed:", error); // Log the error details

      // Handle API errors or unexpected issues
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Backend error message
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 via-blue-400 to-purple-600 p-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-7 md:p-10">
          <h2 className="text-black text-xl font-bold uppercase text-center mb-6 tracking-widest">
            SignUp
          </h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition"
            >
              Create Account
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
