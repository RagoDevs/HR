import React from 'react';
import Dashboard from './Pages/Dashboard/Dashboard'
import Employee from './Pages/Employee/Employee';
import Leave from './Pages/Leave/Leave';
import Staff from './Pages/Staff/Staff';
import './App.css';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={
            <Dashboard />
          }
        />
         <Route
          path='/Employee'
          element={
            <Employee />
          }
        />
         <Route
          path='/Leave'
          element={
            <Leave />
          }
        />
        <Route
          path='/Staff'
          element={
            <Staff />
          }
        />
      </Routes>
    </div>
    </>
  );
}

export default App;
