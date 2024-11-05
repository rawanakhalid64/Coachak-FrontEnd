// pages/login.js
import Image from "next/image";
import Link from "next/link";
// import { FaEnvelope } from 'react-icons/fa";
// import { LockClosedIcon } from "@heroicons/react/24/outline";
// import { MailIcon, LockClosedIcon } from "@heroicons/react/outline";

export default function Login() {
  return (
    <div className="flex h-screen">
      {/* Right Side Section */}

      {/* Left Side Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <Link href="/" legacyBehavior>
          <a className="self-start mb-6 text-gray-600">←</a>
        </Link>
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form className="w-full max-w-sm space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-[#E5958E] outline-none"
            />
            {/* <MailIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-[#E5958E] outline-none"
            />
            {/* <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
          </div>
          <div className="text-right">
            <Link href="/forget-password">
              <span className="text-sm text-gray-500">Forget password?</span>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-[#E5958E] text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>
          <div className="text-center my-4 text-gray-500">
            ———— Login with ————
          </div>
          <div className="flex justify-center space-x-4">
            <button className="text-gray-500">G</button>
            <button className="text-gray-500">F</button>
          </div>
        </form>
      </div>

      <div className="w-2/5 flex flex-col justify-center items-center bg-[#E5958E] p-6 rounded-l-[50px]">
        <h2 className="text-white text-2xl font-bold mb-4">
          Welcome To Coachak
        </h2>
        <Image
          src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730725463/Sport_family-pana_1_wlszgn.png" // replace with your local image path
          alt="Welcome Image"
          width={500}
          height={500}
          className="mb-6"
        />
        <p className="text-white text-center mb-4">
          If you don’t have an account please click below to signup
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
