import React from 'react';
import { Link } from 'react-router-dom';

const OrderPlacedConfirmation = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl text-green-500 font-bold mb-4">Order Placed</h1>
        <p className="text-gray-700 mb-8">
          Your order has been successfully placed and will be delivered in 2-5 working days.
        </p>
        <Link to="/" className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600">
          Shop More
        </Link>
      </div>
    </div>
  );
};

export default OrderPlacedConfirmation;
