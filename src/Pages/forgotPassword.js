import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../utils/apiService';
import NavBar from '../components/navBar';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const showToast = (message, type = 'success') => {
    toast[type](message);
  };

  const handleForgotPassword = async () => {
    try {
      setIsSubmitting(true);
      const response = await apiService.post('/user/forget-password', { email });
      showToast(response.data.message);
      setOtpSent(true);
      setIsSubmitting(false);

    } catch (error) {
      console.error('Error submitting forgot password request:', error);
      showToast('Error submitting request. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsSubmitting(true);

      const response = await apiService.put('/user/verify-otp', { email, otp });
      showToast(response.data.message);
      setShowResetPassword(true);
      setIsSubmitting(false);

    } catch (error) {
      console.error('Error verifying OTP:', error);
      showToast('Invalid OTP. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsSubmitting(true);
      const response = await apiService.put('/user/reset-password', {
        email,
        newPassword,
        confirmNewPassword,
      });
      showToast(response.data.message);
      setIsSubmitting(false);

      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error('Error resetting password:', error);
      showToast('Error resetting password. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <NavBar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {showResetPassword ? 'Reset Password' : otpSent ? 'Verify OTP' : 'Forgot Password'}
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          {showResetPassword
            ? 'Enter your new password.'
            : otpSent
            ? 'Enter the OTP sent to your email to reset your password.'
            : 'Enter your email address and we will send you a link to reset your password.'}
        </p>
        {!otpSent && !showResetPassword && (
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
        )}
        {otpSent && !showResetPassword && (
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
        )}
        {showResetPassword && (
          <>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
          </>
        )}
        {message && (
          <div className={`text-sm text-center text-${message.type === 'success' ? 'green-500' : 'red-500'} mb-4`}>
            {message.text}
          </div>
        )}
        <ToastContainer />
        <button
          type="button"
          onClick={showResetPassword ? handleResetPassword : otpSent ? handleVerifyOtp : handleForgotPassword}
          className="w-full bg-indigo-500 text-white rounded-md p-2 focus:outline-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : showResetPassword ? 'Reset Password' : otpSent ? 'Verify OTP' : 'Submit'}
        </button>
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;
