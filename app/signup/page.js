// // pages/signup.js
// 'use client'
// import Link from 'next/link';
// import Image from 'next/image';
// import { useState } from 'react';

// const SignUpPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     dateOfBirth: '',
//     role: 'Trainee'
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };a

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Welcome Section */}
//       <div className="relative flex-1 flex flex-col items-center justify-center bg-[#2E0D44] text-white p-10 space-y-4">
//         <button className="self-start mb-6 text-lg">←</button>
//         <h1 className="text-3xl font-bold">Welcome Back!</h1>

//         {/* Image under "Welcome Back!" */}
//         <div className="w-3/4 mt-4">
//           <Image
//             src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730582563/Welcome-cuate_1_rxxc0c.webp"
//             alt="Welcome"
//             width={300}
//             height={200}
//           />
//         </div>

//         <p className="text-center text-lg">
//           If you already have an account, please click below to log in
//         </p>
//         <Link href="/login">
//           <button
//             className="px-[98px] py-[8px] w-[277px] h-[56px] rounded-md text-white font-semibold transition"
//             style={{
//               backgroundColor: "#E5958E", // Set to the color in the image
//             }}
//           >
//             Login
//           </button>
//         </Link>
//       </div>

//       {/* Right Side - Sign Up Form with Curves */}
//       <div
//         className="relative flex-1 flex flex-col justify-center items-center bg-white p-8 md:p-16"
//         style={{
//           borderTopLeftRadius: "50px",
//           borderBottomLeftRadius: "50px",
//         }}
//       >
//         <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
//           {/* First Name */}
//           <div>
//             <label className="text-gray-700">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               placeholder="Type here"
//               required
//             />
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="text-gray-700">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               placeholder="Type here"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               placeholder="Type here"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               placeholder="Type here"
//               required
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               placeholder="Type here"
//               required
//             />
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded-md p-2 mt-1"
//               placeholder="Type here"
//             />
//           </div>

//           {/* Date of Birth */}
//           <div>
//             <label className="text-gray-700">Date of Birth</label>
//             <input
//               type="date"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded-md p-2 mt-1"
//             />
//           </div>

//           {/* Role Selection */}
//           <div className="flex items-center space-x-4">
//             <label className="text-gray-700">
//               Please choose from the following:
//             </label>
//             <div className="flex space-x-2">
//               <label className="flex items-center space-x-1">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="Trainee"
//                   checked={formData.role === "Trainee"}
//                   onChange={handleInputChange}
//                   className="form-radio"
//                 />
//                 <span>Trainee</span>
//               </label>
//               <label className="flex items-center space-x-1">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="Trainer"
//                   checked={formData.role === "Trainer"}
//                   onChange={handleInputChange}
//                   className="form-radio"
//                 />
//                 <span>Trainer</span>
//               </label>
//             </div>
//           </div>

//           {/* Submit Button with Custom Gradient Color */}
//           <button className="  px-[55px] py-3 font-semibold text-white rounded-md transition-colors bg-custom-gradient">
//             Create Account
//           </button>

//           {/* Social Sign-Up */}
//           <div className="flex justify-center items-center space-x-4 mt-4">
//             <span>Sign Up with</span>
//             <button type="button" className="text-gray-700 text-2xl">
//               G
//             </button>
//             <button type="button" className="text-gray-700 text-2xl">
//               F
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
// pages/signup.js

// pages/signup.js

// 'use client'
// import Link from 'next/link';
// import Image from 'next/image';
// import { useState } from 'react';
// import OtpVerificationForm from '@/components/EmailVerification/OtpVerificationForm';
// OTP Verification Component
// const OtpVerificationForm = ({ email }) => {
//   const [otp, setOtp] = useState('');
//   const [message, setMessage] = useState('');

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3001/api/v1/auth/verify-password-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, otp })
//       });
//       const result = await response.json();

//       if (response.ok) {
//         setMessage("Email verified successfully.");
//       } else {
//         setMessage(result.error || "OTP verification failed.");
//       }
//     } catch (error) {
//       setMessage("An error occurred during OTP verification.");
//     }
//   };

//   return (
//     <div className="mt-4">
//       <h3 className="text-lg font-semibold">Enter the OTP sent to your email</h3>
//       <form onSubmit={handleOtpSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="otp"
//           value={otp}
//           onChange={handleOtpChange}
//           className="w-full border border-gray-300 rounded-md p-2 mt-1"
//           placeholder="Enter OTP"
//           required
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 font-semibold text-white rounded-md bg-custom-gradient"
//         >
//           Verify OTP
//         </button>
//         {message && <p className="text-red-600">{message}</p>}
//       </form>
//     </div>
//   );
// };


'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    role: 'trainee',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (response.ok) {
        setMessage("User registered successfully. An OTP has been sent to your email.");
        
        // Redirect to EmailVerification page with email as a query parameter
        router.push(`/EmailVerification?email=${encodeURIComponent(formData.email)}`);
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
    <div className="min-h-screen flex">
      <div className="relative flex-1 flex flex-col items-center justify-center bg-[#2E0D44] text-white p-10 space-y-4">
        <button className="self-start mb-6 text-lg">←</button>
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <div className="w-3/4 mt-4">
          <Image
            src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730582563/Welcome-cuate_1_rxxc0c.webp"
            alt="Welcome"
            width={300}
            height={200}
          />
        </div>
        <p className="text-center text-lg">
          If you already have an account, please click below to log in
        </p>
        <Link href="/login">
          <button
            className="px-[98px] py-[8px] w-[277px] h-[56px] rounded-md text-white font-semibold transition"
            style={{ backgroundColor: "#E5958E" }}
          >
            Login
          </button>
        </Link>
      </div>

      <div
        className="relative flex-1 flex flex-col justify-center items-center bg-white p-8 md:p-16"
        style={{ borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }}
      >
        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <div>
            <label className="text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Type here"
              required
            />
          </div>
          <div>
            <label className="text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Type here"
              required
            />
          </div>
          <div>
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Type here"
              required
            />
          </div>
          <div>
            <label className="text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Type here"
              required
            />
          </div>
          <div>
            <label className="text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Type here"
              required
            />
          </div>
          <div>
            <label className="text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Type here"
              required
            />
          </div>
          <div>
            <label className="text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            >
              <option value="trainee">Trainee</option>
              <option value="trainer">Trainer</option>
            </select>
          </div>

          <button className="px-[55px] py-3 font-semibold text-white rounded-md transition-colors bg-custom-gradient">
            Create Account
          </button>
          {message && <p className="mt-4 text-red-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
