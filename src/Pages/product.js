import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../utils/apiService.js';
import NavBar from '../components/navBar.js';
import Footer from '../components/footer.js';

function Product() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiService.get(`/products/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity >= 1 ? newQuantity : 1);
  };

  const handleAddToCart = async () => {
    try {
      if (isLoggedIn) {
        const response = await apiService.put('/cart', {
          productId,
          quantity,
        });

        console.log('Cart updated:', response.data.cart);
        toast.success('Added to Cart');
      } else {
        navigate('/login');
      }

    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error adding to Cart');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!productData) {
    return <p>Loading...</p>;
  }

  const { title, description, price, productPicUrl } = productData;

  return (
    <>
      <NavBar />
      <ToastContainer position="bottom-right"/>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="Product"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={productPicUrl}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <svg
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Quantity</span>
                  <select
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border border-gray-300 rounded-md mr-2 focus:outline-none"
                  >
                    {[...Array(10).keys()].map((value) => (
                      <option key={value + 1} value={value + 1}>
                        {value + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex">
        <span className="title-font font-medium text-2xl text-gray-900">
          Rs. {price.toFixed(2)}
        </span>
        <div className="flex ml-auto">
          {isLoggedIn ? (
            <button
              onClick={handleAddToCart}
              className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Add to Cart
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Add to Cart
            </button>
            
          )}
            <button
              onClick={handleGoBack}
              className="flex text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded ml-4"
            >
              Back
            </button>
        </div>
      </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Product;
