
'use client'
import React, { useState } from 'react';
import instance from "../../utils/axios";
import { useRouter } from 'next/navigation';

const CreateProfileTrainer = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bio: '',
    areasOfExpertise: '',
    availabilityStart: '',
    availabilityEnd: '',
    yearsOfExperience: '',
    profilePic: '',

    certificates: [],
  });

  const [certificate, setCertificate] = useState({
    name: '',
    imageUrl: '',
    url: '',
    expiryDate: '',
    issuingOrganization: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCertificateChange = (e) => {
    const { name, value } = e.target;
    setCertificate({ ...certificate, [name]: value });
  };

  const handleUploadCertificate = async () => {
    try {
      const response = await instance.post('/api/v1/certificates', certificate);
      console.log('Certificate Data:', certificate);

      setFormData((prev) => ({
        ...prev,
        certificates: [...prev.certificates, response.data],
      }));
    } catch (error) {
      console.error('Error uploading certificate:', error.response?.data || error.message);
    }
    
  };

  const handleSave = async () => {
    try {
   
      // const token = Cookies.get('acessToken'); 
  
      const payload = {
        bio: formData.bio,
        areasOfExpertise: formData.areasOfExpertise,
        availableInterval: {
          start: formData.availabilityStart,
          end: formData.availabilityEnd,
        },
        yearsOfExperience: formData.yearsOfExperience,
        profilePic: formData.profilePic,
      };
  
     
  
      await instance.patch('/api/v1/users/me', payload);
      alert('Profile updated successfully!');
      router.push('/TrainerDataUpdated');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Create Profile Trainer</h1>

      <div className="grid grid-cols-2 gap-10">
        {/* Left Side */}
        <div>
          <div className="mb-4">
            <label className="block font-bold">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Type here..."
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Areas of Expertise</label>
            <input
              type="text"
           name="areasOfExpertise"
              value={formData.areasOfExpertise}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="border rounded w-full p-2"/>
          </div>
          <div className="mb-4">
            <label className="block font-bold">Availability</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="availabilityStart"
                value={formData.availabilityStart}
                onChange={handleInputChange}
                className="border rounded p-2"
              />
              <input
                type="date"
                name="availabilityEnd"
                value={formData.availabilityEnd}
                onChange={handleInputChange}
                className="border rounded p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-bold">Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              placeholder="Type here..."
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Profile Picture</label>
            <input
              type="text"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="border rounded w-full p-2"
            />
          </div>
        </div>

        {/* Right Side */}
        <div>
          <div className="mb-4">
            <label className="block font-bold">Certificate Name</label>
            <input
              type="text"
              name="name"
              value={certificate.name}
              onChange={handleCertificateChange}
              placeholder="Type here..."
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Certificate File</label>
            <input
              type="text"
              name="imageUrl"
              value={certificate.imageUrl}
              onChange={handleCertificateChange}
              placeholder="Enter image URL"
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Url (Optional)</label>
            <input
              type="text"
              name="url"
              value={certificate.url}
              onChange={handleCertificateChange}
              placeholder="Type here..."
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={certificate.expiryDate}
              onChange={handleCertificateChange}
              className="border rounded w-full p-2"
            />
          </div>
          <button
            onClick={handleUploadCertificate}
            className="bg-purple-700 text-white px-4 py-2 rounded mt-2"
          >
            Upload Certificate
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-purple-700 text-white px-6 py-2 rounded mt-5 mx-auto block"
      >
        Save
      </button>
    </div>
  );
};

export default CreateProfileTrainer;
