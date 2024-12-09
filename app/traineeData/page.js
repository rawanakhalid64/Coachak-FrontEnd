// app/traineeData/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TraineeData() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    picture: null,
    goals: "",
    birthdate: "",
    height: "",
    weight: "",
    fitnessLevel: "Beginner",
    healthConditions: "No",
    allergies: "No",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const handleGoalSelect = (goal) => {
    setFormData({ ...formData, goals: goal });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    router.push("/next-page"); // Replace with the next page route
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-bold mb-6">Trainee Data</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Picture Upload */}
          <div className="flex flex-col items-center space-y-4">
            <label className="text-lg font-medium">Please upload your picture</label>
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              {formData.picture ? (
                <img
                  src={URL.createObjectURL(formData.picture)}
                  alt="Uploaded"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">+</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="picture"
              onChange={handleFileChange}
            />
            <label
              htmlFor="picture"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
            >
              Upload
            </label>
          </div>

          {/* Goals */}
          <div>
            <label className="block text-lg font-medium mb-2">What are your goals?</label>
            <div className="grid grid-cols-3 gap-4">
              {["Lose Weight", "Gain Muscles", "Weight-lifting", "Diet", "Other"].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => handleGoalSelect(goal)}
                  className={`p-4 border rounded-lg text-center ${
                    formData.goals === goal
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-lg font-medium mb-2">What is your age?</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-lg font-medium mb-2">What is your height?</label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="e.g., 170 cm"
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-lg font-medium mb-2">What is your weight?</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="e.g., 65 kg"
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Fitness Level */}
          <div>
            <label className="block text-lg font-medium mb-2">
              What is your current fitness level?
            </label>
            <div className="flex space-x-4">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <label
                  key={level}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="fitnessLevel"
                    value={level}
                    checked={formData.fitnessLevel === level}
                    onChange={handleInputChange}
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Health Conditions */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Do you have any health conditions?
            </label>
            <div className="flex space-x-4">
              {["Yes", "No"].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="healthConditions"
                    value={option}
                    checked={formData.healthConditions === option}
                    onChange={handleInputChange}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Do you have any allergies?
            </label>
            <div className="flex space-x-4">
              {["Yes", "No"].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="allergies"
                    value={option}
                    checked={formData.allergies === option}
                    onChange={handleInputChange}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
