import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';

import Login from './Pages/login.js';
import SignUp from './Pages/signUp.js';
import ForgotPassword from './Pages/forgotPassword.js'
import Home from './Pages/home.js';
import CategoryPage from './Pages/category.js';
import Product from './Pages/product.js';
import Cart from './Pages/cart.js';
import Order from './Pages/order.js';
import CheckoutForm from './Pages/checkoutForm.js';
import AdminDashboard from './Pages/adminDashboard.js';
import SettingsDashboard from './Pages/settings.js';
import OrderPlacedConfirmation from './Pages/orderSuccess.js'

function App() {
return (

  <BrowserRouter>
    <Routes>
      <Route path='/login' element = {<Login/>} />
      <Route path='/register' element = { <SignUp/> } />
      <Route path='/forgot-password' element = {<ForgotPassword/>} />
      
      <Route path='/' element={<Home/>}/>
      <Route path="/category/:categoryName" element={<CategoryPage/>} />
      <Route path="/product/:productId" element={<Product/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<CheckoutForm/>} />
      <Route path="/order" element={<Order/>} />
      <Route path="/admin" element={<AdminDashboard/>} />
      <Route path="/settings" element={<SettingsDashboard/>} />
      <Route path="/order-success" element={<OrderPlacedConfirmation/>} />

    </Routes>
  </BrowserRouter>

  
  );
} 

export default App;
