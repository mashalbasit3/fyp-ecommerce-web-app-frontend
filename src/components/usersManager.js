import React, { useState, useEffect } from 'react';
import apiService from '../utils/apiService';

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [view, setView] = useState('list');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiService.get('/user/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleViewDetails = async (userId) => {
    try {
      const response = await apiService.get(`/user/admin/${userId}`);
      setSelectedUser(response.data);
      setView('viewDetails');
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedUser(null);
  };

  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <ul>
              {users.map((user) => (
                <li key={user._id} className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center">
                    <p className="text-lg font-semibold">{`User ID: ${user._id}`}</p>
                    <p className="text-sm ml-2">{`Email: ${user.email}`}</p>
                  </div>
                  <div className="flex items-center">
                    <button type="button" onClick={() => handleViewDetails(user._id)} className="text-blue-500 mx-2">
                      View Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'viewDetails':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{`User Details - ID: ${selectedUser._id}`}</h2>
            <div className="mb-4">
              <p className="text-lg font-semibold">Email: {selectedUser.email}</p>
              <p className="text-lg">First Name: {selectedUser.firstName}</p>
              <p className="text-lg">Last Name: {selectedUser.lastName}</p>
              <p className="text-lg">Phone: {selectedUser.phone || 'N/A'}</p>
              <p className="text-lg">Address: {selectedUser.address || 'N/A'}</p>
              <p className="text-lg">{`Is Admin: ${selectedUser.isAdmin ? 'Yes' : 'No'}`}</p>
            </div>
            <button type="button" onClick={handleBackToList} className="text-blue-500 mt-4">
              Back to List
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderView()}</div>;
};

export default UsersManager;
