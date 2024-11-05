// // pages/EmailVerification.js
// 'use client'
// import { useState } from "react";
// import Image from "next/image";


// const EmailVerification = ({ email }) => {
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
//     <div className="flex flex-col items-center ">
//       <h1 className="text-2xl font-bold mt-3">Email Confirmation</h1>
//       <Image src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730836823/Mail_sent-amico_1_nqhdlc.webp" alt="Email Confirmation" width={500} height={500} />
//       <p className="text-center mt-4">Please check your email {email} and type below the confirmation code you received</p>
//       <form onSubmit={handleOtpSubmit} className="space-y-4 mt-4 w-1/2   ">
//         <input
//           type="text"
//           name="otp"
//           value={otp}
//           onChange={handleOtpChange}
//           className="w-full border-b border-gray-400 p-2 text-center placeholder-gray-500"
//           placeholder="Code"
//           required
//         />
//         <button
//           type="submit"
//           className=" flex items-center justify-center mt-[40px] ml-[220px] w-[325px] py-2 font-semibold text-white bg-[#2E0D44] rounded-md"
//         >
//           Continue
//         </button>
//         {message && (
//           <p className={`mt-2 ${message === "Email verified successfully." ? 'text-green-600' : 'text-red-600'}`}>
//             {message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default EmailVerification;

'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const EmailVerification = ({ email }) => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      });
      const result = await response.json();
  
      if (response.ok) {
        setMessage("Email verified successfully.");
        router.push("/verification-success");
      } else {
        setMessage(result.error || "OTP verification failed.");
      }
    } catch (error) {
      setMessage("An error occurred during OTP verification.");
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-2xl font-bold mt-3">Email Confirmation</h1>
      <Image src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730836823/Mail_sent-amico_1_nqhdlc.webp" alt="Email Confirmation" width={500} height={500} />
      <p className="text-center mt-4">Please check your email {email} and type below the confirmation code you received</p>
      <form onSubmit={handleOtpSubmit} className="space-y-4 mt-4 w-1/2">
        <input
          type="text"
          name="otp"
          value={otp}
          onChange={handleOtpChange}
          className="w-full border-b border-gray-400 p-2 text-center placeholder-gray-500"
          placeholder="Code"
          required
        />
        <button
          type="submit"
          className="flex items-center justify-center mt-[40px] ml-[220px] w-[325px] py-2 font-semibold text-white bg-[#2E0D44] rounded-md"
        >
          Continue
        </button>
        {message && (
          <p className={`mt-2 ${message === "Email verified successfully." ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EmailVerification;
