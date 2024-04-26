import React from 'react';
import Dashboard from './Pages/Dashboard/Dashboard'
import Employee from './Pages/Employee/Employee';
import Leave from './Pages/Leave/Leave';
import Staff from './Pages/Staff/Staff';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Payroll from './Pages/Payroll/Payroll';
import Calender from './Pages/Calender/Caknder';
import Documents from './Pages/Documents/Documents';
import Report from './Pages/Report/Report';


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
          path='/Payroll'
          element={
            <Payroll />
          }
        />
        <Route
          path='/Calender'
          element={
            <Calender />
          }
        />
        <Route
          path='/Documents'
          element={
            <Documents />
          }
        />
        <Route
          path='/Report'
          element={
            <Report/>
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
