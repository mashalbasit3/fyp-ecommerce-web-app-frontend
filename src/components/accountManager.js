import React, { useState, useEffect } from 'react';
import apiService from '../utils/apiService';

const AccountManager = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await apiService.get(`/user`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleUpdateAccount = async () => {
    try {
      const response = await apiService.put(`/user`, userData);
      setIsDataUpdated(true);
      setErrorMessage('');
      console.log('Account details updated successfully:', response.data.message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error updating account details.');
      setIsDataUpdated(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Account Details</h2>
      {isDataUpdated && <p className="text-green-500 mb-4">Account details updated successfully!</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <div className="mb-4">

        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={userData.firstName}
          onChange={(e) => setUserData((prevData) => ({ ...prevData, firstName: e.target.value }))}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={userData.lastName}
          onChange={(e) => setUserData((prevData) => ({ ...prevData, lastName: e.target.value }))}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={userData.phone}
          onChange={(e) => setUserData((prevData) => ({ ...prevData, phone: e.target.value }))}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={(e) => setUserData((prevData) => ({ ...prevData, email: e.target.value }))}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      
      <button type="button" onClick={handleUpdateAccount} className="bg-blue-500 text-white px-4 py-2">
        Update Account
      </button>
    </div>
  );
};

export default AccountManager;
