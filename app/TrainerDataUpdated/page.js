"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import instance from "../../utils/axios";

export default function TrainerProfileUpdated() {
  const [trainerData, setTrainerData] = useState({
    bio: "",
    areasOfExpertise: "",
    availabilityStart: "",
    availabilityEnd: "",
    yearsOfExperience: "",
    profilePic: "",
    certificates: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrainerData = async () => {
    try {
      const response = await instance.get("/api/v1/users/me");
      console.log("API Response:", response.data);

      if (response.data && response.data.user) {
        const trainer = response.data.user;

        setTrainerData({
          bio: trainer.bio || "N/A",
          areasOfExpertise: trainer.areasOfExpertise || "Not provided",
          availabilityStart: trainer.availabilityStart || "Not provided",
          availabilityEnd: trainer.availabilityEnd || "Not provided",
          yearsOfExperience: trainer.yearsOfExperience || "Not specified",
          profilePic:
            trainer.profilePic || "https://via.placeholder.com/150",
          certificates: trainer.certificates || [],
        });
      } else {
        throw new Error("Invalid trainer data received");
      }
    } catch (error) {
      console.error("Error fetching trainer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const preparedData = {
        ...trainerData,
        availabilityStart: trainerData.availabilityStart,
        availabilityEnd: trainerData.availabilityEnd,
        yearsOfExperience: trainerData.yearsOfExperience,
      };

      console.log("Prepared Data:", preparedData);

      const response = await instance.patch("/api/v1/users/me", preparedData);

      if (response.data && response.data.user) {
        setTrainerData(response.data.user);
        setIsEditing(false);
      } else {
        throw new Error("Error saving trainer data");
      }
    } catch (error) {
      console.error("Error updating trainer data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchTrainerData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Trainer Profile</h1>
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden mr-4">
          <Image
            src={trainerData.profilePic}
            alt="Trainer Profile Picture"
            width={179}
            height={169}
            className="object-cover"
            unoptimized
          />
        </div>
        <div>
          <h2 className="text-lg font-bold">
            {trainerData.firstName} {trainerData.lastName}
          </h2>
          <button className="bg-red-400 text-white px-4 py-2 rounded mt-2">
            Change Photo
          </button>
        </div>
      </div>
      <div className="bg-white p-4 shadow rounded mb-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Trainer Information</h3>
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
            <label className="block font-bold mb-1">Bio</label>
            <textarea
              name="bio"
              value={trainerData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Areas of Expertise</label>
            <input
              type="text"
              name="areasOfExpertise"
              value={trainerData.areasOfExpertise}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Years of Experience</label>
            <input
              type="text"
              name="yearsOfExperience"
              value={trainerData.yearsOfExperience}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Availability Start</label>
            <input
              type="time"
              name="availabilityStart"
              value={trainerData.availabilityStart}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Availability End</label>
            <input
              type="time"
              name="availabilityEnd"
              value={trainerData.availabilityEnd}
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
