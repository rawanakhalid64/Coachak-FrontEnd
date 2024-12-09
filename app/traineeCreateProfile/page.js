
'use client'
import { useState } from "react";
import Link from "next/link";

export default function Profile() {
  // State for profile data
  const [name, setName] = useState("Rawan");
  const [email, setEmail] = useState("rawan@gmail.com");
  const [gender, setGender] = useState("Female");
  const [weight, setWeight] = useState("60 Kg");
  const [height, setHeight] = useState("170 cm");
  const [goal, setGoal] = useState("Weight loss");
  const [photo, setPhoto] = useState(null);

  // Function to handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Preview the selected photo
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-lg">
  <div className="flex items-center mb-8">
    <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
    <span className="ml-3 text-xl font-semibold">Trainer Profile</span>
  </div>
  <ul className="space-y-4">
    <li>
      <Link href="/profile" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
        Edit Profile
      </Link>
    </li>
    <li>
      <Link href="/statistics" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
        Statistics
      </Link>
    </li>
    <li>
      <Link href="/plans" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
        Subscription Plans
      </Link>
    </li>
    <li>
      <Link href="/reminder" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
        Reminder
      </Link>
    </li>
    <li>
      <Link href="/nutrition" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
        Nutrition Plan
      </Link>
    </li>
    <li>
      <Link href="/logout" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
        Logout
      </Link>
    </li>
  </ul>
</div>


      {/* Main Profile Section */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="grid grid-cols-2 gap-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-start">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300">
                {photo ? (
                  <img src={photo} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <span className="text-white">No Photo</span>
                )}
              </div>
              <label htmlFor="photo" className="mt-4 text-sm font-semibold text-gray-700 cursor-pointer">
                Change Photo
              </label>
              <input
                type="file"
                id="photo"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>

            {/* Personal Information */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">First Name</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
                <button className="ml-2 text-sm text-blue-500">Edit</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <div className="flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
                <button className="ml-2 text-sm text-blue-500">Edit</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Birthday</label>
              <input
                type="date"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Fitness Information */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Gender</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
                <button className="ml-2 text-sm text-blue-500">Edit</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Weight</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
                <button className="ml-2 text-sm text-blue-500">Edit</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Height</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
                <button className="ml-2 text-sm text-blue-500">Edit</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Goal</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
                <button className="ml-2 text-sm text-blue-500">Edit</button>
              </div>
            </div>
          </div>
          <button className="mt-6 bg-red-500 text-white p-2 rounded-md">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
