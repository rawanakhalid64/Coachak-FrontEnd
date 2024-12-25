
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMail, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux/userSlice"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid login credentials.");
      }

      const data = await response.json();

      if (data.data.accessToken && data.data.refreshToken) {
        console.log("Login successful");

        // Save tokens in cookies
        Cookies.set("accessToken", data.data.accessToken, { expires: 1 / 24 }); // Expires in 1 hour
        Cookies.set("refreshToken", data.data.refreshToken, { expires: 7 }); // Expires in 7 days

        // Dispatch user data to Redux
        dispatch(setUserData(data.data.user)); // Storing user data in Redux

        // Navigate based on the role
        if (data.data.user.role === "trainer") {
          router.push("/TrainerDataCreation");
        } else if (data.data.user.role === "trainee") {
          router.push("/traineeProfileUpdated");
        } else {
          router.push("/login");  
        }
      } else {
        setError(data.message || "Invalid login credentials.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred. Please try again.");
    }
  };



  return (
    <div className="flex h-screen md:bg-[#E5958E] bg-white">
      {/* Left Side Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white relative z-10 p-6 rounded-tr-[50px] rounded-br-[50px]">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="relative">
            <label className="block mb-1 text-gray-600 font-semibold">
              Email
            </label>
            <AiOutlineMail
              className="absolute left-3 top-10 text-black"
              size={20}
            />
            <input
              type="email"
              placeholder="Type here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-[#E5958E] outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block mb-1 text-gray-600 font-semibold">
              Password
            </label>
            <FaKey className="absolute left-3 top-10 text-black" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Type here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:border-[#E5958E] outline-none"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-black cursor-pointer"
            >
              {showPassword ? (
                <AiFillEye size={20} />
              ) : (
                <AiFillEyeInvisible size={20} />
              )}
            </span>
          </div>
          <div className="text-right">
            <Link href="/forget-password">
              <span className="text-sm text-gray-500">Forget password?</span>
            </Link>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[277px] bg-[#E5958E] text-white py-3 rounded-lg font-semibold"
            >
              Login
            </button>
          </div>
          <div className="text-center my-4 text-black">
             ———— Login with ————
           </div>
           <div className="flex justify-center  space-x-4">
          <button className=" rounded-full p-4 flex justify-center items-center ">
            {/* Google Icon */}
            <Image
              src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1731261214/google-img-removebg-preview_beoicb.webp"
              alt="Google Icon"
              width={37}
              height={37}
            />
          </button>

          <button className="  rounded-full p-4 flex justify-center items-center ">
            <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#1877F2"
                d="M24 1.5C11 1.5 1 11.5 1 24.5c0 10.8 7.7 19.7 17.8 21.7v-15.3h-5.4v-6.4h5.4v-4.6c0-5.3 3.2-8.3 8-8.3 2.3 0 4.2.2 4.8.3v5.5h-3.3c-2.6 0-3.2 1.2-3.2 3v3.9h6.4l-1 6.4h-5.4v15.3C39.3 44.3 47 35.3 47 24.5c0-13-10-23-23-23z"
              />
            </svg>
          </button>
        </div>
        </form>
      </div>

      {/* Right Side Section */}
      <div className="hidden md:flex w-2/5 flex-col justify-center items-center bg-[#E5958E] p-6">
  <h2 className="text-white text-2xl font-bold mb-4">
    Welcome To Coachak
  </h2>
  <Image
    src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730725463/Sport_family-pana_1_wlszgn.png"
    alt="Welcome Image"
    width={500}
    height={500}
    className="mb-6"
  />
  <p className="text-white text-center mb-4">
    If you don’t have an account, please click below to sign up.
  </p>
  <Link href="/signup">
    <button className="bg-[#2E0D44] text-white font-semibold px-[82px] py-2 rounded-lg">
      Sign Up
    </button>
  </Link>
</div>

    </div>
  );
}
