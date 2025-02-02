import React, { useContext, useState } from 'react';
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Profile.css";
import { Usercontext } from '../UserContext';  
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(Usercontext);  
  const [isLoading, setIsLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    phone: user.phone,
    photo: user.photo,
    skills: user.skills,
    wages: user.wages,
    password: user.password,
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

  const updateStatus = async (newStatus) => {
    const updatedData = { ...updatedUser, status: newStatus };
    setUpdatedUser(updatedData); // Update status in state immediately

    try {
      const response = await axios.put(`http://localhost:8080/putuser/${user.id}`, updatedData);
      setUser(response.data); // Update user context after successful status update
      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleLocationUpdate = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const updatedData = {
          ...updatedUser,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        try {
          const response = await axios.put(`http://localhost:8080/putuser/${user.id}`, updatedData);
          setUser(response.data);  
          alert("User Location updated");
        } catch (error) {
          console.error("Error updating location:", error);
        }
      });
    }
  };

  if (!user) return <div>Loading...</div>;  

  return (
    <div className="profile-container min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="profile-card max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <div className="p-8 animate-slideIn">
            <div className="flex flex-col items-center">
              <div className="profile-image-container relative">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={openModal}
                    className="edit-button bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-transform duration-300"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
                <img
                  src={user.photo || "/api/placeholder/150/150"}
                  alt={user.name}
                  className="profile-image w-32 h-32 rounded-full object-cover border-4 border-blue-500 transition-transform duration-300"
                />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h2>
              <span className="mt-1 text-sm text-blue-500 font-medium">{user.roles || "No role assigned"}</span>
            </div>

            <div className="mt-6 space-y-4">
              {/* Contact Details */}
              <div className="border-t pt-4">
                <h3 className="section-header text-lg font-medium text-gray-900">Contact Details</h3>
                <p className="mt-2 text-gray-600">Phone: {user.phone}</p>
                <p className="mt-1 text-gray-600">Address: {user.address}</p>
              </div>

              {/* Personal Info */}
              <div className="border-t pt-4">
                <h3 className="section-header text-lg font-medium text-gray-900">Personal Info</h3>
                <p className="mt-2 text-gray-600">Gender: {user.gender}</p>
                <p className="mt-1 text-gray-600">Age: {user.age} years</p>
                <p className="mt-1 text-gray-600">Experience: {user.experience} years</p>
                <p className="mt-1 text-gray-600">Wages: ₹{user.wages}</p>
              </div>

              {/* Skills */}
              <div className="border-t pt-4">
                <h3 className="section-header text-lg font-medium text-gray-900">Skills</h3>
                <p className="mt-2 text-gray-600">{user.skills || "No skills listed"}</p>
              </div>

              {/* Location */}
              <div className="border-t pt-4">
                <h3 className="section-header text-lg font-medium text-gray-900">Location</h3>
                <button 
                  className="btn btn-primary" 
                  onClick={handleLocationUpdate}
                >
                  Update Location
                </button>
              </div>

              {/* Status */}
              <div className="mt-4">
                <p>Status: {updatedUser.status || "No status listed"}</p>
                <button 
                  className={`btn ${updatedUser.status === 'online' ? 'btn-danger' : 'btn-success'}`} 
                  onClick={() => updateStatus(updatedUser.status === 'online' ? 'offline' : 'online')}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : (updatedUser.status === 'online' ? 'Go Offline' : 'Go Online')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay2345 p-5">
          <div className="modal-content">
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
                  <label className="block text-sm font-medium text-gray-600">Wages</label>
                  <input
                    type="text"
                    name="wages"
                    value={updatedUser.wages}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button type="button" onClick={closeModal} className="btn btn-primary m-2">Cancel</button>
                  <button type="submit" className="btn btn-primary m-2">Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
