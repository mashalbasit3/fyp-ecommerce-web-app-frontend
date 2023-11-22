import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImage from '../assets/loginImage.webp';
import apiService from '../utils/apiService';
import NavBar from '../components/navBar';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      const response = await apiService.post('/user/register', formData);

      if (response.status === 201) {

        const createCartResponse = await apiService.post('/cart', {userId: response.data.User._id});

        if (createCartResponse.status === 200) {
    
          toast.success('Registration successful. Redirecting to login page...', {
            autoClose: 3000,
            onClose: () => {
              navigate('/login');
            },
          });

          setErrorMessage('');
        } else {
          console.error('Cart creation failed:', createCartResponse.data.message);
        }
        
      } else {
        setErrorMessage(response.data.message || 'Error registering user.');
        console.error('User registration failed:', response.data.message);
      }

    } catch (error) {

      setErrorMessage(error.response?.data?.message || 'Error registering user.');
      console.error('Error registering user:', error);
    }
  };

  return (
    <>
    <NavBar />
    <section className="bg-gray-100">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img alt="login" src={loginImage} className="absolute inset-0 h-full w-full object-cover" />
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-semibold">Register</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-gray-600">First Name</label>
                <input
                  type="text"
                  id="FirstName"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-gray-600">Last Name</label>
                <input
                  type="text"
                  id="LastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-6">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-gray-600">Password</label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-6">
                {errorMessage && (
                  <p className="text-red-500 text-sm mb-4">
                    <strong>Error:</strong> {errorMessage}
                  </p>
                )}

                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-gray-700 underline">
                    terms and conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-500 underline">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </section>
    </>
  );
}

export default SignUp;
