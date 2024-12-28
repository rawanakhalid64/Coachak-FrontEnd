// 'use client'
// import { useState } from "react";
// import Link from "next/link";

// export default function Profile() {
//   // State for profile data
//   const [name, setName] = useState("Rawan");
//   const [email, setEmail] = useState("rawan@gmail.com");
//   const [gender, setGender] = useState("Female");
//   const [weight, setWeight] = useState("60 Kg");
//   const [height, setHeight] = useState("170 cm");
//   const [goal, setGoal] = useState("Weight loss");
//   const [photo, setPhoto] = useState(null);

//   // Function to handle photo change
//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhoto(URL.createObjectURL(file)); // Preview the selected photo
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white p-6 shadow-lg">
//   <div className="flex items-center mb-8">
//     <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
//     <span className="ml-3 text-xl font-semibold">Trainer Profile</span>
//   </div>
//   <ul className="space-y-4">
//     <li>
//       <Link href="/profile" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
//         Edit Profile
//       </Link>
//     </li>
//     <li>
//       <Link href="/statistics" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
//         Statistics
//       </Link>
//     </li>
//     <li>
//       <Link href="/plans" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
//         Subscription Plans
//       </Link>
//     </li>
//     <li>
//       <Link href="/reminder" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
//         Reminder
//       </Link>
//     </li>
//     <li>
//       <Link href="/nutrition" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
//         Nutrition Plan
//       </Link>
//     </li>
//     <li>
//       <Link href="/logout" className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer">
//         Logout
//       </Link>
//     </li>
//   </ul>
// </div>

//       {/* Main Profile Section */}
//       <div className="flex-1 p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>
//         <div className="bg-white p-6 shadow-lg rounded-lg">
//           <div className="grid grid-cols-2 gap-6">
//             {/* Profile Picture Section */}
//             <div className="flex flex-col items-start">
//               <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300">
//                 {photo ? (
//                   <img src={photo} alt="Profile" className="object-cover w-full h-full" />
//                 ) : (
//                   <span className="text-white">No Photo</span>
//                 )}
//               </div>
//               <label htmlFor="photo" className="mt-4 text-sm font-semibold text-gray-700 cursor-pointer">
//                 Change Photo
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 onChange={handlePhotoChange}
//                 className="hidden"
//               />
//             </div>

//             {/* Personal Information */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700">First Name</label>
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                 />
//                 <button className="ml-2 text-sm text-blue-500">Edit</button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Email</label>
//               <div className="flex items-center">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                 />
//                 <button className="ml-2 text-sm text-blue-500">Edit</button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Birthday</label>
//               <input
//                 type="date"
//                 className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//               />
//             </div>

//             {/* Fitness Information */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Gender</label>
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                 />
//                 <button className="ml-2 text-sm text-blue-500">Edit</button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Weight</label>
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   value={weight}
//                   onChange={(e) => setWeight(e.target.value)}
//                   className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                 />
//                 <button className="ml-2 text-sm text-blue-500">Edit</button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Height</label>
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   value={height}
//                   onChange={(e) => setHeight(e.target.value)}
//                   className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                 />
//                 <button className="ml-2 text-sm text-blue-500">Edit</button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Goal</label>
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   value={goal}
//                   onChange={(e) => setGoal(e.target.value)}
//                   className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                 />
//                 <button className="ml-2 text-sm text-blue-500">Edit</button>
//               </div>
//             </div>
//           </div>
//           <button className="mt-6 bg-red-500 text-white p-2 rounded-md">Save Changes</button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

export default function TraineeProfileUpdated() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    gender: "",
    weight: "",
    height: "",
    fitnessLevel: "",
    goal: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      throw new Error("User token is missing");
    }
    try {
      const response = await fetch("http://localhost:3001/api/v1/users/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log("Fetched user data:", data); // Log the response to inspect its structure

      if (data && data.firstName && data.lastName) {
        setUserData(data); // Ensure the API returns these properties
      } else {
        throw new Error("Invalid user data received");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = Cookies.get("accessToken");

    try {
      const response = await fetch("http://localhost:3001/api/v1/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mr-4">
          <Image
            src={userData.profilePic || "/default-avatar.png"}
            alt="Profile Picture"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold">
            {userData.firstName} {userData.lastName}
          </h2>
          <p>{userData.birthdate}</p>
          <button className="bg-red-400 text-white px-4 py-2 rounded mt-2">
            Change Photo
          </button>
        </div>
      </div>
      <div className="bg-white p-4 shadow rounded mb-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Personal Information</h3>
          <button
            onClick={handleEditClick}
            className="bg-red-400 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-bold mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              disabled
              className="border rounded w-full py-2 px-3 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Birthday</label>
            <input
              type="date"
              name="birthdate"
              value={new Date(userData.birthdate).toLocaleDateString()} 
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Fitness Information</h3>
          <button
            onClick={handleEditClick}
            className="bg-red-400 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-bold mb-1">Gender</label>
            <input
              type="text"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Weight</label>
            <input
              type="text"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Height</label>
            <input
              type="text"
              name="height"
              value={userData.height}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Fitness Level</label>
            <input
              type="text"
              name="fitnessLevel"
              value={userData.fitnessLevel}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Goal</label>
            <input
              type="text"
              name="goal"
              value={userData.goal}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
        </div>
      </div>
      {isEditing && (
        <button
          onClick={handleSave}
          className="mt-4 bg-red-400 text-white px-6 py-2 rounded block mx-auto"
        >
          Save
        </button>
      )}
    </div>
  );
}
