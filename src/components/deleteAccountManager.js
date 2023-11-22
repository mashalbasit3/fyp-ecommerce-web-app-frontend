import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../utils/apiService';

const DeleteAccountManager = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await apiService.delete(`/user`);
      setIsDeleting(false);
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
      <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
      <button
        type="button"
        onClick={handleDeleteAccount}
        className="bg-red-500 text-white px-4 py-2"
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete Account'}
      </button>
    </div>
  );
};

export default DeleteAccountManager;
