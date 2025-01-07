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
    weightGoal: '',
    goals: [],
    fitnessLevel: '',
    healthCondition: [],
    allergies: [],
  });
  const [preview, setPreview] = useState(null);
  const [newHealthCondition, setNewHealthCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [healthConditions, setHealthConditions] = useState([]);
  const [allergiesList, setAllergiesList] = useState([]);
  const [hasHealthCondition, setHasHealthCondition] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);
  const router = useRouter();

  const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const heights = Array.from({ length: 51 }, (_, i) => 150 + i);
  const weights = Array.from({ length: 161 }, (_, index) => 40 + index);

  const userData = useSelector((state) => state.user.userData);
  console.log("User Data from Redux:", userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('accessToken');
        if (!userData || !token) {
          console.error("User not logged in or token missing.");
          return;
        }

        const url = `/api/v1/users/me`;
        const response = await instance.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHealthConditions(response.data.healthCondition || []);
        setAllergiesList(response.data.allergy || []);
      } catch (error) {
        console.error('Error fetching data:', error);
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

  const handleAddHealthCondition = () => {
    if (!newHealthCondition) return;
    setHealthConditions((prev) => [...prev, newHealthCondition]);
    setNewHealthCondition('');
  };

  const handleAddAllergy = () => {
    if (!newAllergy) return;
    setAllergiesList((prev) => [...prev, newAllergy]);
    setNewAllergy('');
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
      weightGoal: Number(formData.weightGoal),
      height: Number(formData.height),
      job: formData.job,
      fitnessLevel: formData.fitnessLevel,
      fitnessGoal: formData.goals[0] || '',
      healthCondition: healthConditions,
      allergy: allergiesList,
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

  const goalsList = ['Weight Loss', 'Muscle Gain', 'Improved Stamina', 'General Fitness'];

  return (
    <div className='p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg'>
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

      <h2 className='text-lg font-medium mb-2'>What are your goals?</h2>
      <div className='flex flex-wrap gap-4 mb-6'>
        {goalsList.map((goal) => (
          <button
            key={goal}
            onClick={() => setFormData((prev) => {
              const isSelected = prev.goals.includes(goal);
              const updatedGoals = isSelected
                ? prev.goals.filter((g) => g !== goal)
                : [...prev.goals, goal];
              return { ...prev, goals: updatedGoals };
            })}
            className={`px-4 py-2 rounded-md border border-gray-300 hover:border-purple-500 
              ${formData.goals.includes(goal) ? 'bg-purple-500 text-white' : 'bg-white'}`}>
            {goal}
          </button>
        ))}
      </div>

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
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}>
            <option value=''>Choose your height</option>
            {heights.map((h) => (
              <option key={h} value={h}>{`${h} cm`}</option>
            ))}
          </select>
        </div>
        <div>
          <label className='block text-gray-700'>What is your weight?</label>
          <select
            className='mt-1 w-full border-b border-gray-300 focus:border-purple-500 focus:outline-none'
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}>
            <option value=''>Choose your weight</option>
            {weights.map((w) => (
              <option key={w} value={w}>{`${w} kg`}</option>
            ))}
          </select>
        </div>
      </div>

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

