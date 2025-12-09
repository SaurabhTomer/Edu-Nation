import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";


export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch()
 


const handleSignUp = async (e) => {
  e.preventDefault();           // 1️⃣ Prevents page reload
  setLoading(true);             // 2️⃣ Shows loading state

  try {
    const result = await axios.post(
      serverUrl + "/api/auth/signup",   // 3️⃣ Sends request to backend
      { name, password, email, role },  // 4️⃣ Data sent in body
      { withCredentials: true }         // 5️⃣ Allows cookies (JWT etc.)
    );

    console.log(result.data);
    dispatch(setUserData(result.data))
    navigate("/");               // 6️⃣ Redirect to home after signup
    toast.success("Signup successfully");
  } catch (error) {
    const msg = error?.response?.data?.message || error?.response?.data || error.message;
    // console.log("signup error:", msg, error);
    toast.error(`Signup error: ${msg}`);
  } finally {
    setLoading(false);           // 7️⃣ Stop loading
  }
};


  

  return (
    <div className="min-h-screen  bg-[#eae7e7] flex items-center justify-center p-8">
      <div className=" max-w-5xl h-auto rounded-2xl shadow-2xl overflow-hidden flex">
        <div className="w-full bg-white p-8 flex items-center justify-center">
          <form className="w-full max-w-md" onSubmit={handleSignUp}>
            <h1 className="text-2xl font-semibold text-black">
              Create your account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign up to get access to all courses
            </p>

            <label className="block mt-6 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full h-10 rounded border border-[#e7e6e6] px-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Your full name"
            />

            <label className="block mt-4 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full h-10 rounded border border-[#e7e6e6] px-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="you@example.com"
            />

            <label className="block mt-4 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="mt-2 w-full h-10 rounded border border-[#e7e6e6] px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Enter a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700">Role</div>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`px-3 py-1 rounded-full cursor-pointer border ${
                    role === "student"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole("educator")}
                  className={`px-3 py-1  cursor-pointer rounded-full border ${
                    role === "educator"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  Educator
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 h-10 rounded bg-black text-white flex items-center justify-center disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <div className="flex items-center gap-3 mt-6">
              <div className="flex-1 h-px bg-[#e3e3e3]" />
              <div className="text-sm text-gray-500">Or continue with</div>
              <div className="flex-1 h-px bg-[#e3e3e3]" />
            </div>

            <button
              type="button"
              // onClick={signupWithGoogle}
              className="w-full mt-4 h-10 rounded border flex items-center justify-center gap-3 cursor-pointer"
            >
              <FaGoogle />
              Continue with Google
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-black underline cursor-pointer">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
