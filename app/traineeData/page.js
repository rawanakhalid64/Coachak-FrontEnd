'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import instance from "../../utils/axios";
import { useSelector } from "react-redux";
export default function TraineeData() {
  const [formData, setFormData] = useState({
    image: null,
    job: '',
    height: '',
    weight: '',
    goals: [],
    fitnessLevel: '',
    healthCondition: [],
    allergies: [],
    otherGoal: '',
  });
  const [preview, setPreview] = useState(null);
  const [hasHealthCondition, setHasHealthCondition] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [newHealthCondition, setNewHealthCondition] = useState('');
  const [newHealthConditionDescription, setNewHealthConditionDescription] = useState('');
  const [newHealthConditionSeverity, setNewHealthConditionSeverity] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newAllergyDescription, setNewAllergyDescription] = useState('');
  const [healthConditions, setHealthConditions] = useState([]); // Array to store multiple health conditions
  const [allergiesList, setAllergiesList] = useState([]); // Array to store multiple allergies
  const router = useRouter();
// Define goalsList to render goal options
const goalsList = [
  { label: 'Lose Weight', icon: 'https://res.cloudinary.com/dvgqyejfc/image/upload/v1733743102/Frame_1261154795_nhbtvj.png' },
  { label: 'Gain Muscles', icon: 'https://res.cloudinary.com/dvgqyejfc/image/upload/v1733743110/Frame_1261154796_dpnggh.png' },
  { label: 'Weight-lifting', icon: 'https://res.cloudinary.com/dvgqyejfc/image/upload/v1733743118/Frame_1261154797_d1husm.png' },
  { label: 'Diet', icon: 'https://res.cloudinary.com/dvgqyejfc/image/upload/v1733743130/Frame_1261154798_ddkhti.png' },
  { label: 'Other', icon: 'https://res.cloudinary.com/dvgqyejfc/image/upload/v1733743143/other_comp_wbwndw.png' },
];

const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];
const heights = Array.from({ length: 51 }, (_, i) => 150 + i);
const weights = Array.from({ length: 161 }, (_, index) => 40 + index);

const userData = useSelector((state) => state.user.userData);
// Log userData to the console
console.log("User Data from Redux:", userData);
const toggleGoal = (goal) => {
  setFormData((prev) => ({
    ...prev,
    goals: [goal], 
  }));
};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('accessToken');
        if (!userData || !token) {
          console.error("User not logged in or token missing.");
          return;
        }
    
const url = `/api/v1/health-conditions`; 
console.log(`Requesting from: ${url} with token: ${token}`);
const healthResponse = await instance.get(url, {
  headers: { Authorization: `Bearer ${token}` },

        });
        setHealthConditions(healthResponse.data.healthConditions);

        const allergyResponse = await instance.get(`/api/v1/allergies/${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllergiesList(allergyResponse.data.allergies);
      } catch (error) {
        console.error('Error fetching health conditions or allergies:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddHealthCondition = async () => {
    const token = Cookies.get('accessToken');
    if (!newHealthCondition || !newHealthConditionDescription || !newHealthConditionSeverity || !token) return;

    try {
      const newCondition = {
        name: newHealthCondition,
        description: newHealthConditionDescription,
        severity: newHealthConditionSeverity,
      };

      const response = await instance.post(
        '/api/v1/health-conditions',
        newCondition, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setHealthConditions((prev) => [...prev, response.data.healthCondition]);
      setNewHealthCondition('');
      setNewHealthConditionDescription('');
      setNewHealthConditionSeverity('');
    } catch (error) {
      console.error('Error adding new health condition:', error);
    }
  };

  const handleAddAllergy = async () => {
    const token = Cookies.get('accessToken');
    if (!newAllergy || !newAllergyDescription || !token) return;

    try {
      const newAllergyData = {
        name: newAllergy,
        description: newAllergyDescription,
      };

      const response = await instance.post(
        `/api/v1/allergies/${userData._id}`,
        newAllergyData, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

    
      setAllergiesList((prev) => [...prev, response.data.allergy]); // Adjust response key if needed
      setNewAllergy("");
      setNewAllergyDescription("");
    } catch (error) {
      console.error("Error adding allergy:", error);
    }
  };

  const handleSubmit = async () => {
    const token = Cookies.get('accessToken');
  
    if (!token) {
      console.error('No token found in cookies.');
      return;
    }
  
    const payload = {
      profilePic: formData.image || "default-profile-picture-url",
      weight: Number(formData.weight),
      height: Number(formData.height),
      job: formData.job,
      fitnessLevel: formData.fitnessLevel,
      fitnessGoal: formData.goals[0], // Assuming only one goal is allowed
      healthCondition: healthConditions.map((condition) => ({
        name: condition.name,
        description: condition.description || '',
        severity: condition.severity || '',
      })),
      allergy: allergiesList.map((allergy) => ({
        name: allergy.name,
        description: allergy.description || '',
      })),
    };
  
    try {
      const response = await instance.patch('/api/v1/users/me', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Profile updated:', response.data);
      router.push('/traineeProfileUpdated');
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  };
  

  return (
    <div className='p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg'>
      {/* Image Upload Section */}
      <h1 className='text-2xl font-bold mb-6'>Please upload your picture</h1>
      <div className='relative w-32 h-32 mx-auto mb-8 border-2 border-gray-300 rounded-full overflow-hidden'>
        {preview ? (
          <Image src={preview} alt='Preview' fill className='object-cover' />
        ) : (
          <label className='absolute inset-0 flex items-center justify-center cursor-pointer'>
            <span className='text-purple-600 text-5xl'>+</span>
            <input type='file' className='hidden' onChange={handleImageUpload} />
          </label>
        )}
      </div>

      {/* Goals Section */}
      <h2 className='text-lg font-medium mb-2'>What are your goals?</h2>
      <div className='flex flex-wrap gap-4 mb-6'>
        {goalsList.map((goal) => (
          <button
            key={goal.label}
            onClick={() => toggleGoal(goal.label)}
            className={`flex flex-col items-center px-4 py-2 rounded-md border border-gray-300 hover:border-purple-500 
              ${formData.goals.includes(goal.label) ? 'bg-purple-500 text-white' : 'bg-white'}`}>
            {goal.icon && <img src={goal.icon} alt={goal.label} className='w-8 h-8 mb-2' />}
            {goal.label === 'Other' ? (
              <input
                type='text'
                placeholder='Specify goal'
                className='text-center text-black'
                onChange={(e) => setFormData({ ...formData, otherGoal: e.target.value })}
              />
            ) : (
              <span>{goal.label}</span>
            )}
          </button>
        ))}
      </div>

      {/* Personal Information Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div>
          <label className='block text-gray-700'>What is your job?</label>
          <input
            type='text'
            className='mt-1 w-full border-b border-gray-300 focus:border-purple-500 focus:outline-none'
            onChange={(e) => setFormData({ ...formData, job: e.target.value })}
          />
        </div>
        <div>
        <label className='block text-gray-700'>What is your height?</label>
<select
  className='mt-1 w-full border-b border-gray-300 focus:border-purple-500 focus:outline-none'
  value={formData.height} // To keep the selected value
  onChange={(e) => setFormData({ ...formData, height: e.target.value })} // Update the formData when height changes
>
  <option value=''>Choose your height</option>
  {heights.map((h) => (
    <option key={h} value={h}>{`${h} cm`}</option> // Display height options as cm
  ))}
</select>

        </div>
        <div>
          <label className='block text-gray-700'>What is your weight?</label>
          <select
            className='mt-1 w-full border-b border-gray-300 focus:border-purple-500 focus:outline-none'
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}>
            <option value=''>Choose your weight</option>
            {weights.map((w) => (
              <option key={w} value={w}>{`${w} kg`}</option>
            ))}
          </select>
        </div>
      </div>

    

      {/* Fitness Level Section */}
      <h2 className='text-lg font-medium mb-2'>What is your current fitness level?</h2>
      <div className='flex gap-4 mb-6'>
        {fitnessLevels.map((level) => (
          <button
            key={level}
            onClick={() => setFormData({ ...formData, fitnessLevel: level })}
            className={`px-4 py-2 rounded-md border border-gray-300 hover:border-purple-500 
              ${formData.fitnessLevel === level ? 'bg-purple-500 text-white' : 'bg-white'}`}>
            {level}
          </button>
        ))}
      </div>
 {/* Health Condition Section */}
 <div className='mb-6'>
        <h2 className='text-lg font-medium'>Do you have any health conditions?</h2>
        <div className='flex gap-4 mt-2'>
          <button
            onClick={() => setHasHealthCondition(true)}
            className={`px-4 py-2 rounded-md border border-gray-300 ${
              hasHealthCondition ? 'bg-purple-500 text-white' : 'bg-white'
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => setHasHealthCondition(false)}
            className={`px-4 py-2 rounded-md border border-gray-300 ${
              !hasHealthCondition ? 'bg-purple-500 text-white' : 'bg-white'
            }`}
          >
            No
          </button>
        </div>
        {hasHealthCondition && (
          <div className='mt-4'>
            <input
              type='text'
              className='w-full border-b border-gray-300 focus:border-purple-500 focus:outline-none mb-2'
              placeholder='Add health condition'
              value={newHealthCondition}
              onChange={(e) => setNewHealthCondition(e.target.value)}
            />
            <button
              onClick={handleAddHealthCondition}
              className='px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600'
            >
              Add Health Condition
            </button>
          </div>
        )}
      </div>

      {/* Allergies Section */}
      <div className='mb-6'>
        <h2 className='text-lg font-medium'>Do you have any allergies?</h2>
        <div className='flex gap-4 mt-2'>
          <button
            onClick={() => setHasAllergies(true)}
            className={`px-4 py-2 rounded-md border border-gray-300 ${
              hasAllergies ? 'bg-purple-500 text-white' : 'bg-white'
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => setHasAllergies(false)}
            className={`px-4 py-2 rounded-md border border-gray-300 ${
              !hasAllergies ? 'bg-purple-500 text-white' : 'bg-white'
            }`}
          >
            No
          </button>
        </div>
        {hasAllergies && (
          <div className='mt-4'>
            <input
              type='text'
              className='w-full border-b border-gray-300 focus:border-purple-500 focus:outline-none mb-2'
              placeholder='Add allergy'
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
            />
            <button
              onClick={handleAddAllergy}
              className='px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600'
            >
              Add Allergy
            </button>
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className='w-full py-3 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700'>
        Update Profile
      </button>
    </div>
  );
}
