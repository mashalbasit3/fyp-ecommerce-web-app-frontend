import React, { useState } from 'react';
import ProductsManager from '../components/productsManager.js';
import CategoriesManager from '../components/categoriesManager.js';
import OrdersManager from '../components/ordersManager.js';
import UsersManager from '../components/usersManager.js';
import Footer from '../components/footer.js';
import NavBar from '../components/navBar.js';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'orders':
        return <OrdersManager />;
      case 'users':
        return <UsersManager />;
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

          <div className="p-4 text-2xl font-bold">Admin Dashboard</div>

          <nav className="flex flex-col p-2">
            <button
              className={`p-2 hover:bg-gray-700 ${activeTab === 'products' && 'bg-gray-700'}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>

            <button
              className={`p-2 hover:bg-gray-700 ${activeTab === 'categories' && 'bg-gray-700'}`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>

            <button
              className={`p-2 hover:bg-gray-700 ${activeTab === 'orders' && 'bg-gray-700'}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>

            <button
              className={`p-2 hover:bg-gray-700 ${activeTab === 'users' && 'bg-gray-700'}`}
              onClick={() => setActiveTab('users')}
            >
              Users
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

export default AdminDashboard;
