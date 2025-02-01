import React, { useContext, useState } from 'react';
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Profile.css";
import { Usercontext } from '../UserContext';  // Import UserContext
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(Usercontext);  // Get user data from context

  // Modal state for editing user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    phone: user.phone,
    photo: user.photo,
    skills: user.skills,
    wages: user.wages,
    password:user.password,
    roles: user.roles,
    latitude: user.latitude,
    longitude: user.longitude,
    address: user.address,
    experience: user.experience,
    age: user.age,
    gender: user.gender,
    status: user.status,
  });

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle input changes in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/putuser/${user.id}`, updatedUser);
      setUser(response.data);  
      closeModal();  
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Check if user data is available
  if (!user) {
    return <div>Loading...</div>;  // Show loading state if user is not available
  }

  return (
    <div className="profile-container min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="profile-card max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={openModal}
              className="edit-button bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-transform duration-300"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-8 animate-slideIn">
            <div className="flex flex-col items-center">
              <div className="profile-image-container relative">
                <img
                  src={user.photo || "/api/placeholder/150/150"}  // Use user photo if available
                  alt={user.name}
                  className="profile-image w-32 h-32 rounded-full object-cover border-4 border-blue-500 transition-transform duration-300"
                />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h2>
              <span className="mt-1 text-sm text-blue-500 font-medium">
                {user.roles || "No role assigned"}  {/* Show roles or default text */}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="border-t pt-4">
                <h3 className="section-header text-lg font-medium text-gray-900">Contact Details</h3>
                <p className="mt-2 text-gray-600 hover:text-gray-800 transition-colors">Phone: {user.phone}</p>
                <p className="mt-1 text-gray-600 hover:text-gray-800 transition-colors">Address: {user.address}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="section-header text-lg font-medium text-gray-900">Personal Info</h3>
                <p className="mt-2 text-gray-600 hover:text-gray-800 transition-colors">Gender: {user.gender}</p>
                <p className="mt-1 text-gray-600 hover:text-gray-800 transition-colors">Age: {user.age} years</p>
                <p className="mt-1 text-gray-600 hover:text-gray-800 transition-colors">Experience: {user.experience} years</p>
                <p className="mt-1 text-gray-600 hover:text-gray-800 transition-colors">Wages: ₹{user.wages}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="section-header text-lg font-medium text-gray-900">Skills</h3>
                <div className="mt-2">
                  <p className="text-gray-600 hover:text-gray-800 transition-colors">{user.skills || "No skills listed"}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="section-header text-lg font-medium text-gray-900">Location</h3>
                <p className="mt-2 text-gray-600 hover:text-gray-800 transition-colors">Latitude: {user.latitude}</p>
                <p className="mt-1 text-gray-600 hover:text-gray-800 transition-colors">Longitude: {user.longitude}</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={updatedUser.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={updatedUser.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Photo URL</label>
                  <input
                    type="text"
                    name="photo"
                    value={updatedUser.photo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Add other fields for skills, wages, etc. */}
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
