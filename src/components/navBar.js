import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/authSlice';
import logo from '../assets/logo_transparent.png';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-black sticky top-0 z-[10000]">
      <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:justify-between">
            <Link to="/" className="block text-teal-600">
              <span className="sr-only">Home</span>
              <img className="h-12 mr-4" src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link className="text-white hover:text-gray-500/75" to="/about">
                    About
                  </Link>
                </li>
                {isLoggedIn && (
                  <>
                    <li>
                      {/* Link to the cart route */}
                      <Link to="/cart" className="text-white hover:text-gray-500/75 flex items-center">
                        <span className="mr-2">Cart</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 7a3 3 0 00-3 3 3 3 0 003 3h10a1 1 0 001-1V8a1 1 0 00-1-1h-5l-2-4H6a1 1 0 00-1 1v1M6 18a2 2 0 002 2 2 2 0 002-2"
                          />
                        </svg>
                      </Link>
                    </li>
                  </>
                )}
    
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <li>
                        <Link
                          to="/admin"
                          className="text-white hover:text-gray-500/75"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 focus:outline-none"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="bg-white border border-gray-300 hover:border-gray-500 text-gray-700 hover:text-gray-800 font-semibold rounded-md py-2 px-4"
                      >
                        Profile
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md py-2 px-4"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
