import React, { useState } from 'react';
import apiService from '../utils/apiService';

const SecurityManager = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        setErrorMessage('New password and confirm password do not match.');
        return;
      }

      const response = await apiService.put(`/user/update-password`, {
        currentPassword,
        newPassword,
        confirmNewPassword
      });

      setIsPasswordChanged(true);
      setErrorMessage('');
      console.log('Password changed successfully:', response.data.message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error changing password.');
      setIsPasswordChanged(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      {isPasswordChanged && <p className="text-green-500 mb-4">Password changed successfully!</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <div className="mb-4">
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <button type="button" onClick={handlePasswordChange} className="bg-blue-500 text-white px-4 py-2">
        Change Password
      </button>
      
    </div>
  );
};

export default SecurityManager;
