import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import apiService from '../utils/apiService.js';
import Footer from '../components/footer.js';
import NavBar from '../components/navBar.js';
import { v4 as uuidv4 } from 'uuid';

function CheckoutForm() {
    const navigate = useNavigate();
  
    const [cartData, setCartData] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
      area: "",
      city: "",
      postalcode: "",
      country: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("");
  
    useEffect(() => {
      const fetchCartData = async () => {
        try {
          const response = await apiService.get('/cart');
          setCartData(response.data);
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      };
  
      fetchCartData();
    }, []);
  
    const handlePlaceOrder = async () => {
      try {
        if (!shippingAddress.area || !shippingAddress.city || !shippingAddress.postalcode || !shippingAddress.country || !paymentMethod) {
          alert("Please fill in all the shipping address details and select a payment method.");
          return;
        }

        const orderData = {
          items: cartData.items,
          totalOrderPrice: cartData.totalCartPrice,
          shippingAddress,
          paymentMethod,
          transactionId: generateTransactionId(),
        };
  
        const response = await apiService.post('/orders', orderData);
  
        console.log('Order created successfully:', response);
  
        // Reset the form
        setShippingAddress({
          area: "",
          city: "",
          postalCode: "",
          country: "",
        });
        setPaymentMethod("");

        if (response.status===200){
          // Navigate to a success page
          navigate('/order-success');
          await apiService.delete('/cart');
        }

      } catch (error) {
        console.error('Error creating order:', error);
        alert('Error placing the order. Please try again.');
      }
    };
  
    const generateTransactionId = () => {
      return 'T' + uuidv4().replace(/-/g, '').slice(0, 8);
    };
  
    const handleShippingAddressChange = (field, value) => {
      setShippingAddress((prevAddress) => ({
        ...prevAddress,
        [field]: value,
      }));
    };
  
    const handlePaymentMethodChange = (e) => {
      setPaymentMethod(e.target.value);
    };
  
    if (!cartData) {
      return <p>Loading...</p>;
    }
  
    const { items, totalCartPrice } = cartData;

  return (
    <>
      <NavBar />
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And add a shipping address.
          </p>

          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {items.map((item) => (
              <div key={item._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item.productId.productPicUrl}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.productId.title}</span>
                  <span className="float-right text-gray-400">{`Quantity: ${item.quantity}`}</span>
                  <p className="text-lg font-bold">{`Rs ${item.totalPrice.toFixed(2)}`}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="mt-5 grid gap-6">
          {/* Shipping Address Form */}
            <div className="mt-6 pb-10 border-t border-b py-2">
              <p className="text-lg font-medium">Shipping Address</p>

              <form className="grid gap-6 mt-6">

                  <div className="relative flex-shrink-0 sm:w-full">
                  <input
                      type="text"
                      id="shipping-area"
                      name="shipping-area"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Area"
                      onChange={(e) => handleShippingAddressChange('area', e.target.value)}
                  />
                  </div>

                  <div className="relative flex-shrink-0 sm:w-full">
                  <input
                      type="text"
                      id="shipping-city"
                      name="shipping-city"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="City"
                      onChange={(e) => handleShippingAddressChange('city', e.target.value)}
                  />
                  </div>

                  <div className="relative flex-shrink-0 sm:w-full">
                  <input
                      type="text"
                      id="shipping-postalcode"
                      name="shipping-postalcode"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Postal Code"
                      onChange={(e) => handleShippingAddressChange('postalcode', e.target.value)}
                  />
                  </div>

                  <div className="relative flex-shrink-0 sm:w-full">
                  <input
                      type="text"
                      id="shipping-country"
                      name="shipping-country"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Country"
                      onChange={(e) => handleShippingAddressChange('country', e.target.value)}
                  />
                  </div>

              </form>
            </div>

            </form>
        </div>

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <div className="">
          <div className="mt-20 border-t border-b py-2">
            <p className="text-lg font-medium">Payment Type</p>

            <form className="grid gap-4">

                <div className="flex items-center">
                  <input
                      type="radio"
                      id="cash-on-delivery"
                      name="payment-type"
                      className="mr-2"
                      onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="cash-on-delivery">
                      <div className="flex items-center">
                        <img
                            className="w-6 h-6 mr-2"
                            src="/icons/cash-icon.png"
                            alt="Cash on Delivery"
                        />
                        <span className="text-sm font-medium text-gray-900">Cash on Delivery</span>
                      </div>
                  </label>
                </div>

                <div className="flex items-center">
                <input
                    type="radio"
                    id="online-bank-transfer"
                    name="payment-type"
                    className="mr-2"
                    onChange={handlePaymentMethodChange}
                />
                <label htmlFor="online-bank-transfer">
                    <div className="flex items-center">
                    <img
                        className="w-6 h-6 mr-2"
                        src="/icons/bank-transfer-icon.png"
                        alt="Online Bank Transfer"
                    />
                    <span className="text-sm font-medium text-gray-900">Online Bank Transfer</span>
                    </div>
                </label>
                </div>

                <div className="flex items-center">
                <input
                    type="radio"
                    id="visa-master-card"
                    name="payment-type"
                    className="mr-2"
                    onChange={handlePaymentMethodChange}
                />
                <label htmlFor="visa-master-card">
                    <div className="flex items-center">
                    <img
                        className="w-6 h-6 mr-2"
                        src="/icons/visa-mastercard-icon.png"
                        alt="Visa/MasterCard"
                    />
                    <span className="text-sm font-medium text-gray-900">Visa/MasterCard</span>
                    </div>
                </label>
                </div>
                
            </form>
            </div>

            <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium">Total Cart Price</p>
                <p className="font-semibold text-gray-900">{`Rs ${totalCartPrice.toFixed(2)}`}</p>
            </div>
            </div>

            {/* Place Order Button */}
            <div className="mt-6 flex items-center justify-end">
            <button 
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
            onClick={handlePlaceOrder}
            >
                Place Order
            </button>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </>
  );
}

export default CheckoutForm;
