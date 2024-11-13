'use client'
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const EmailVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Retrieve email from query
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "OTP:", otp); // Debugging log
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/verify-password-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      });
      const result = await response.json();
  
      if (response.ok) {
        setMessage("OTP verified successfully.");
        router.push("/verification-success");
      } else {
        setMessage(result.error || "OTP verification failed.");
      }
    } catch (error) {
      setMessage("An error occurred during OTP verification.");
    }
  };
  
  return (
    <div className="flex flex-col items-center bg-white min-h-screen p-4 md:p-8">
      <h1 className="text-xl md:text-2xl font-bold mt-3 text-center">Email Confirmation</h1>
      <Image 
        src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730836823/Mail_sent-amico_1_nqhdlc.webp" 
        alt="Email Confirmation" 
        width={300} // Adjusted for smaller screens
        height={300}
        className="md:w-[500px] md:h-[500px] object-contain"
      />
      <p className="text-center mt-4 text-sm md:text-base">
        Please check your email {email} and type below the confirmation code you received
      </p>
      <form onSubmit={handleOtpSubmit} className="flex flex-col items-center space-y-4 mt-4 w-full md:w-1/2">
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
          className="w-full md:w-[325px] py-2 mt-6 font-semibold text-white rounded-md "
          style={{
            background: 'linear-gradient(277.62deg, #E5958E 30.69%, #220440 110.35%)'
          }}
        >
          Continue
        </button>
        {message && (
          <p className={`mt-2 text-center ${message === "OTP verified successfully." ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EmailVerification;
