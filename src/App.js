import React from 'react';
import Login from './Pages/Login/Login';
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
import { AuthProvider } from './RoutesAuth/AuthProvider';


function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route
          path='/'
          element={
            <Login />
          }
        />
        <Route
          path='/Dashboard'
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
      </AuthProvider>
  );
}

export default App;
