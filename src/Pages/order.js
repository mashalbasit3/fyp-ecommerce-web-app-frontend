import React, { useEffect, useState } from 'react';
import apiService from '../utils/apiService.js';
import Footer from '../components/footer.js';
import NavBar from '../components/navBar.js';

const Order = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await apiService.get('/orders');
        setOrderData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []);

  if (!orderData) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <NavBar />
    <section className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Order History</h1>

      {orderData.map((order, index) => (
        <div
          key={order._id}
          className={`${
            index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
          } p-4 rounded-md mb-4 shadow-md`}
        >
          <div>
            <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
            <p>Order ID: {order._id}</p>
            <p>Order Status: {order.orderStatus}</p>
            <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
          </div>

          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img
                  src={item.productId.productPicUrl}
                  alt={item.productId.title}
                  className="h-16 w-16 rounded object-cover"
                />
                <div>
                  <h3 className="text-sm text-gray-900">{item.productId.title}</h3>
                  <p className="text-xs text-gray-600">{`Quantity: ${item.quantity}`}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end border-t border-gray-300 pt-4">
            <div className="w-full max-w-lg space-y-4">
              <p>Total Order Price: {order.totalOrderPrice}</p>
              <p>
                Shipping Address: {order.shippingAddress.city}, {order.shippingAddress.country}
              </p>
              <p>Payment Method: {order.paymentMethod}</p>
            </div>
          </div>
          
        </div>
      ))}
    </section>
    <Footer />
    </>
  );
};

export default Order;
