import React, { useState, useEffect } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../utils/apiService';

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('list');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiService.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleViewDetails = async (order) => {
    try {
      const response = await apiService.get(`/orders/${order._id}`);
      setSelectedOrder(response.data);
      console.log(response.data);
      setView('viewDetails');
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedOrder(null);
  };
  const renderView = () => {
    switch (view) {

      case 'list':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
            <ul>
              {orders.map((order) => (
                <li key={order._id} className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center">
                    <p className="text-lg font-semibold">{`Order #${order.transactionId}`}</p>
                  </div>
                  <div className="flex items-center">
                    <button type="button" onClick={() => handleViewDetails(order)} className="text-blue-500 mx-2">
                      <AiOutlineEye />
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
              <h2 className="text-2xl font-bold mb-4">{`Order Details - #${selectedOrder.transactionId}`}</h2>
              <div className="mb-4">
                <p className="text-lg font-semibold">Order Status: {selectedOrder.orderStatus}</p>
                <p className="text-lg">User Name: {`${selectedOrder.userId.firstName} ${selectedOrder.userId.lastName}`} </p>
                <p className="text-lg">Order Date: {`${selectedOrder.orderDate}`} </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">Products:</p>
                <ul>
                  {selectedOrder.items.map((item) => (
                    <li key={item.productId._id} className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center">
                        <img src={item.productId.productPicUrl} alt={item.productId.title} className="h-12 w-12 mr-4" />
                        <div>
                          <p className="text-lg font-semibold">{item.productId.title}</p>
                          <p className="text-sm text-gray-600">{item.productId.description}</p>
                          <p className="text-sm">{`Price: $${item.productId.price.toFixed(2)}, Quantity: ${item.quantity}`}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-center">{`Total Order Price: Rs. ${selectedOrder.totalOrderPrice}`}</p>
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

  return (
    <div>
      {renderView()}
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
    </div>
  );
};

export default OrdersManager;
