"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import instance from "../../utils/axios";

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
    profilePhoto: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await instance.get("/api/v1/users/me");
      console.log("API Response:", response.data);
      if (response.data) {
        setUserData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          birthdate: response.data.dateOfBirth || "",
          profilePhoto: response.data.profilePhoto || "",
          // gender: response.data.gender || "",
          // weight: response.data.weight || "",
          // height: response.data.height || "",
          // fitnessLevel: response.data.fitnessLevel || "",
          // goal: response.data.goal || "",
        });
      } else {
        throw new Error("Invalid user data received");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await instance.patch("/api/v1/users/me", userData);
      setUserData(response.data);
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
        <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden mr-4">
          <Image
            src={
              userData.profilePhoto ||
              "https://res.cloudinary.com/dvgqyejfc/image/upload/v1736201686/Frame_1261155039_nqcfbm.png"
            }
            alt="Profile Picture"
            width={179}
            height={169}
            className="object-cover"
            unoptimized
          />
        </div>
        <div>
          <h2 className="text-lg font-bold">
            {userData.firstName} {userData.lastName}
          </h2>
          <p>{userData.birthdate.split("T")[0]}</p>
          <button className="bg-red-400 text-white px-4 py-2 rounded mt-2">
            Change Photo
          </button>
        </div>
      </div>
      <div className="bg-white p-4 shadow rounded mb-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Personal Information</h3>
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="bg-red-400 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          )}
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
              className="border text-black rounded w-full py-2 px-3 bg-gray-100"
            />
          </div>
          <div>
  <label className="block font-bold mb-1">Birthday</label>
  <input
    type="date"
    name="birthdate"
    value={userData.birthdate ? new Date(userData.birthdate).toISOString().split("T")[0] : ""}
    onChange={handleChange}
    disabled={!isEditing}
    className="border rounded w-full py-2 px-3"
  />
</div>

        </div>
      </div>
      {/* <div className="bg-white p-4 shadow rounded">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Fitness Information</h3>
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
      </div> */}
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
