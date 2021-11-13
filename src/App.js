import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Dashboard from './Pages/Dashboard'

function App() {
  return (
    <div className='app'>
      {/* does page navigation, new lib 6.0 version */}
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



