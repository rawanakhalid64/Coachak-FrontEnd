'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CodeVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/verify-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("OTP verified successfully.");
        // Navigate to the New Password page with the email as a query parameter
        router.push(`/NewPassword?email=${email}`);
      } else {
        setMessage(result.error || "OTP verification failed.");
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2E0D44]">
      <h2 className="text-xl font-bold text-white mb-2">Code Verification</h2>
      <p className="text-white mb-6">Please enter the 6-digit code sent to {email}.</p>
      <form onSubmit={handleSubmit} className="w-full max-w-md px-4">
        <div className="relative w-full mb-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Type Here"
            className="w-full border-b border-black bg-[#EFBFBB] text-white py-2 placeholder-transparent focus:outline-none focus:border-[#2E0D44]"
            required
          />
          <label className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 ease-in-out">
            {otp ? '' : 'Type Here'}
          </label>
        </div>
        <button type="submit" className="w-full py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800">
          Continue
        </button>
      </form>
      {message && <p className="mt-4 text-pink-600">{message}</p>}
    </div>
  );
}
