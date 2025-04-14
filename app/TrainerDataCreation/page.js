'use client'
import React, { useState, useEffect } from 'react';
import instance from "../../utils/axios";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

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

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Check for authentication on component mount
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    
    if (!accessToken && !refreshToken) {
      router.push('/login');
    }
  }, [router]);

  // Add useEffect to log certificates whenever they change
  useEffect(() => {
    console.log("Current certificates array:", formData.certificates);
  }, [formData.certificates]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCertificateChange = (e) => {
    const { name, value } = e.target;
    setCertificate({ ...certificate, [name]: value });
  };

  const resetCertificateForm = () => {
    setCertificate({
      name: '',
      imageUrl: '',
      url: '',
      expiryDate: '',
      issuingOrganization: '',
    });
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleAuthError = (error) => {
    if (error.response?.status === 401 || 
        (error.response?.data?.message && error.response?.data?.message.includes("jwt"))) {
      showNotification("Session expired. Attempting to refresh your session...", "info");
    } else {
      showNotification(error.response?.data?.message || "An error occurred", "error");
    }
  };

  const handleUploadCertificate = async () => {
   
    if (!certificate.name || !certificate.imageUrl || !certificate.issuingOrganization) {
      showNotification('Please fill required certificate fields', 'error');
      return;
    }
    
    try {
      setIsUploading(true);
      
      
      const certificatePayload = {
        name: certificate.name,
        imageUrl: certificate.imageUrl,
        url: certificate.url || '',
        issuingOrganization: certificate.issuingOrganization,
      };
      
      
      if (certificate.expiryDate) {
        certificatePayload.expiryDate = certificate.expiryDate;
      }
      
      
      console.log("Sending certificate payload to API:", certificatePayload);
      
      const response = await instance.post('/api/v1/certificates', certificatePayload);
      
  
      console.log("Certificate API response:", response.data);
      
     
      setFormData((prev) => {
        const updatedCertificates = [...prev.certificates, response.data];
        console.log("Updated certificates array:", updatedCertificates);
        return {
          ...prev,
          certificates: updatedCertificates,
        };
      });
      
      showNotification('Certificate added successfully!', 'success');
      resetCertificateForm();
    } catch (error) {
      console.error('Error uploading certificate:', error.response?.data || error.message);
      console.log("Error details:", error);
      handleAuthError(error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeCertificate = (index) => {
    console.log("Removing certificate at index:", index);
    const certificateToRemove = formData.certificates[index];
    console.log("Certificate being removed:", certificateToRemove);
    
    setFormData(prev => {
      const updatedCertificates = prev.certificates.filter((_, i) => i !== index);
      console.log("Certificates after removal:", updatedCertificates);
      return {
        ...prev,
        certificates: updatedCertificates
      };
    });
    showNotification('Certificate removed', 'info');
  };

  const handleSave = async () => {
    
    if (!formData.bio || !formData.areasOfExpertise || !formData.yearsOfExperience) {
      showNotification('Please fill all required fields', 'error');
      return;
    }
    
    try {
      setIsSaving(true);
      const payload = {
        bio: formData.bio,
        areasOfExpertise: formData.areasOfExpertise,
        availableInterval: {
          start: formData.availabilityStart,
          end: formData.availabilityEnd,
        },
        yearsOfExperience: parseInt(formData.yearsOfExperience, 10) || 0,
        profilePic: formData.profilePic,
      };
  
      // Log the profile data being saved including certificates
      console.log("Saving profile with certificates:", formData.certificates);
      console.log("Profile update payload:", payload);
      
      await instance.patch('/api/v1/users/me', payload);
      showNotification('Profile updated successfully!', 'success');
      
      // Delay redirection to show success message
      setTimeout(() => {
        router.push('/trainer/profile/TrainerProfileUpdated');
      }, 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      handleAuthError(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-700 p-6">
          <h1 className="text-3xl font-bold text-white">Create Trainer Profile</h1>
          <p className="text-purple-100 mt-2">Complete your profile to start training clients</p>
        </div>
        
        {/* Notification */}
        {notification.show && (
          <div className={`p-4 ${
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 
            notification.type === 'error' ? 'bg-red-100 text-red-700' : 
            'bg-blue-100 text-blue-700'
          } mb-4 mx-6 mt-6 rounded-md`}>
            {notification.message}
          </div>
        )}

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Side - Personal Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                <input
                  type="text"
                  name="profilePic"
                  value={formData.profilePic}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                {formData.profilePic && (
                  <div className="mt-2 h-24 w-24 rounded-full overflow-hidden">
                    <img src={formData.profilePic} alt="Profile Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio <span className="text-red-500">*</span></label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell clients about yourself and your training approach..."
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Areas of Expertise <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="areasOfExpertise"
                  value={formData.areasOfExpertise}
                  onChange={handleInputChange}
                  placeholder="E.g., Weight Training, Yoga, Nutrition, Cardio"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="availabilityStart"
                      value={formData.availabilityStart}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                    <input
                      type="date"
                      name="availabilityEnd"
                      value={formData.availabilityEnd}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  placeholder="Enter number of years"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Right Side - Certificates */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">Certificates & Qualifications</h2>
              
              {/* Certificate List */}
              {formData.certificates.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-700 mb-3">Uploaded Certificates</h3>
                  <div className="space-y-3">
                    {formData.certificates.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                        <div>
                          <h4 className="font-medium">{cert.name}</h4>
                          <p className="text-sm text-gray-500">Issued by: {cert.issuingOrganization}</p>
                          {cert.expiryDate && <p className="text-xs text-gray-400">Expires: {new Date(cert.expiryDate).toLocaleDateString()}</p>}
                        </div>
                        <button 
                          onClick={() => removeCertificate(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add Certificate Form */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-md font-medium text-gray-700 mb-3">Add New Certificate</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={certificate.name}
                      onChange={handleCertificateChange}
                      placeholder="E.g., Personal Trainer Certification"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Image URL <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={certificate.imageUrl}
                      onChange={handleCertificateChange}
                      placeholder="Enter image URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="issuingOrganization"
                        value={certificate.issuingOrganization}
                        onChange={handleCertificateChange}
                        placeholder="E.g., ACE, NASM, ISSA"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="date"
                        name="expiryDate"
                        value={certificate.expiryDate}
                        onChange={handleCertificateChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Verification URL (Optional)</label>
                    <input
                      type="text"
                      name="url"
                      value={certificate.url}
                      onChange={handleCertificateChange}
                      placeholder="URL to verify certificate"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <button
                    onClick={handleUploadCertificate}
                    disabled={isUploading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70"
                  >
                    {isUploading ? 'Adding...' : 'Add Certificate'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfileTrainer;