"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaUser,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    role: "trainee",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      if (response.ok) {
        setMessage(
          "User registered successfully. An OTP has been sent to your email."
        );
        router.push(
          `/EmailVerification?email=${encodeURIComponent(formData.email)}`
        );
      } else {
        if (result.errors) {
          const errorMessages = Object.values(result.errors)
            .map((err) => err.message)
            .join(", ");
          setMessage(errorMessages);
        } else {
          setMessage(result.error || "Registration failed.");
        }
      }
    } catch (error) {
      setMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="relative min-h-screen flex place-items-center justify-between bg-[#2E0D44] text-white">
      {/* Welcome Section Background */}
      <div className=" inset-0 flex flex-col items-center justify-start p-10">
        <h1
          className="font-bold text-left text-[52px] leading-[62.05px] "
          style={{
            fontFamily: "SF Pro Display, sans-serif",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
          }}
        >
          Welcome Back!
        </h1>
        <div className="w-3/4 mt-4">
          <Image
            src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730582563/Welcome-cuate_1_rxxc0c.webp"
            alt="Welcome"
            width={500}
            height={500}
          />
        </div>
        <p
          className="text-center mt-[32px] font-normal text-[36px] leading-[42.96px] "
          style={{
            fontFamily: "SF Pro Display, sans-serif",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
          }}
        >
          If you already have an account <br /> please click below to log in.
        </p>
        <Link href="/login">
          <button
            className="mt-[56px] px-10 py-2 w-[277px] text-center rounded-xl font-sf-pro-display text-2xl font-extrabold leading-[38.19px] text-left underline decoration-solid decoration-transparent hover:underline"
            style={{ backgroundColor: "#E5958E" }}
          >
            Login
          </button>
        </Link>
      </div>

      {/* Sign Up Section */}
      <div className=" min-h-screen relative z-10 flex flex-col items-center bg-white p-8 md:p-16 w-[60%]  rounded-tl-[50px] rounded-bl-[50px]">
        <h2 className="text-3xl font-bold mb-6 text-black">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6 w-[343px] ">
          <div className="flex flex-col space-y-2">
            <label htmlFor="firstName" className="text-black font-semibold">
              First Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaUser className="text-black" />
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full text-black border-none p-2 ml-2"
                placeholder="Type here"
                required
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="lastName" className="text-black font-semibold">
              Last Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaUser className="text-black" />
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full text-black border-none p-2 ml-2"
                placeholder=" Type here"
                required
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-black font-semibold">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaEnvelope className="text-black" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-black border-none p-2 ml-2"
                placeholder="Type here"
                required
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-black font-semibold">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaLock className="text-black" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full text-black border-none p-2 ml-2"
                placeholder="Type here"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-2"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-black font-semibold"
            >
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaLock className="text-black" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full text-black border-none p-2 ml-2"
                placeholder=" Type here"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="ml-2"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="phoneNumber" className="text-black font-semibold">
              Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaPhoneAlt className="text-black" />
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full text-black border-none p-2 ml-2"
                placeholder="Type here "
                required
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="dateOfBirth" className="text-black font-semibold">
              Date of Birth
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaCalendarAlt className="text-black" />
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full text-black border-none p-2 ml-2"
                required
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="role" className="text-black font-semibold">
              Please choose from the following:
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="trainee"
                  name="role"
                  value="trainee"
                  // checked={formData.role === 'trainee'}
                  onChange={handleInputChange}
                  className="text-black"
                />
                <label htmlFor="trainee" className="ml-2 text-black">
                  Trainee
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="trainer"
                  name="role"
                  value="trainer"
                  // checked={formData.role === 'trainer'}
                  onChange={handleInputChange}
                  className="text-black"
                />
                <label htmlFor="trainer" className="ml-2 text-black">
                  Trainer
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
  <button className="px-[55px] w-[277px] py-3 font-semibold text-white rounded-md transition-colors bg-custom-gradient mt-4">
    Create Account
  </button>
</div>

          {message && <p className="mt-4 text-red-600">{message}</p>}
        </form>
        {/* Social Sign Up Options */}
        <div className="flex items-center my-5 w-[323px]">
          <hr
            className="flex-grow border-t border-gray-400 border-opacity-50"
            style={{ borderWidth: "1px" }}
          />
          <span className="px-3 text-black text-lg font-semibold">
            Sign Up with
          </span>
          <hr
            className="flex-grow border-t border-gray-400 border-opacity-50"
            style={{ borderWidth: "1px" }}
          />
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
      </div>
    </div>
  );
};

export default SignUpPage;
