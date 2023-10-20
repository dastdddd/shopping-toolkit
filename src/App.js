import React from 'react';
import './App.css';
import { Routes,  Route } from 'react-router-dom';
import AppBar from './components/appbar/appBar';
import Home from './pages/home/home';
import Cart from './pages/cart/cart';

const App = () => {
  return (
    <div>
      <AppBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  );
};

export default App;