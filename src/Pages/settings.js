import React, { useState } from 'react';
import AccountManager from '../components/accountManager.js';
import SecurityManager from '../components/securityManager.js';
import OrdersHistoryManager from '../components/ordersHistoryManager.js';
import DeleteAccountManager from '../components/deleteAccountManager.js';
import NavBar from '../components/navBar.js';
import Footer from '../components/footer.js';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Account');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return <AccountManager />;
      case 'Security':
        return <SecurityManager />;
      case 'Order History':
        return <OrdersHistoryManager />;
      case 'Delete Account':
        return <DeleteAccountManager />;
      default:
        return null;
    }
  };

  return (
    <>
    <NavBar />
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64">
        <div className="p-4 text-2xl font-bold text-center">Settings</div>
        <nav className="flex flex-col p-2">
          <button
            className={`p-2 hover:bg-gray-700 ${activeTab === 'products' && 'bg-gray-700'}`}
            onClick={() => setActiveTab('Account')}
          >
            Account
          </button>
          <button
            className={`p-2 hover:bg-gray-700 ${activeTab === 'categories' && 'bg-gray-700'}`}
            onClick={() => setActiveTab('Security')}
          >
            Security
          </button>
          <button
            className={`p-2 hover:bg-gray-700 ${activeTab === 'orders' && 'bg-gray-700'}`}
            onClick={() => setActiveTab('Order History')}
          >
            Orders History
          </button>
          <button
            className={`p-2 hover:bg-gray-700 ${activeTab === 'users' && 'bg-gray-700'}`}
            onClick={() => setActiveTab('Delete Account')}
          >
            Delete Account
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-scroll">{renderTabContent()}</div>
    </div>
    <Footer />
    </>
  );
};

export default Settings;
