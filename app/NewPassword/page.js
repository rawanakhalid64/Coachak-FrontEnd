'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function NewPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email'); // Retrieve the email from query parameters

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Validate that email is provided (optional: can also validate format)
    if (!email) {
      setMessage("Email is required.");
      return;
    }

    console.log("Submitting:", { email, password: newPassword, confirmPassword });

    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: newPassword, confirmPassword }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        setMessage("Password changed successfully.");
        
        router.push('/PasswordChanged');  
      } else {
        setMessage(data.error || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md md:flex md:max-w-4xl">
        <div className="md:w-1/2 p-8">
          <img
            src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730749014/Forgot_password-rafiki_1_vcnzbs.webp"
            alt="New Password"
            className="mx-auto"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Create New Password</h2>
          <p className="mb-6">Please enter your new password</p>
          <form onSubmit={handleSubmit}>
            <div className="relative w-full mb-6">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-purple-600"
                required
              />
              <label className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                {newPassword ? '' : 'New Password'}
              </label>
            </div>
            <div className="relative w-full mb-6">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-purple-600"
                required
              />
              <label className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                {confirmPassword ? '' : 'Confirm Password'}
              </label>
            </div>
            <button type="submit" className="w-full py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800">
              Save
            </button>
          </form>
          {message && <p className="mt-4 text-red-600">{message}</p>}
        </div>
      </div>
    </div>
  );
}
