import React, { useEffect } from 'react';
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
import { RequireHr } from './RoutesAuth/RequireHr';
import { RequireStaff } from './RoutesAuth/RequireStaff';

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
          path='/dashboard'
          element={
            <RequireHr>
            <Dashboard />
            </RequireHr>
          }
        />
         <Route
          path='/employee'
          element={
            <RequireHr>
            <Employee />
            </RequireHr>
          }
        />
         <Route
          path='/leave'
          element={
            <RequireHr>
            
            <Leave />
            </RequireHr>
          }
        />
          <Route
          path='/payroll'
          element={
            <RequireHr>
            <Payroll />
            </RequireHr>
          }
        />
        <Route
          path='/calender'
          element={
            <RequireHr>
            <Calender />
            </RequireHr>
          }
        />
        <Route
          path='/documents'
          element={
            <RequireHr>
            <Documents />
            </RequireHr>
          }
        />
        <Route
          path='/report'
          element={
            <RequireHr>
            <Report/>
            </RequireHr>
          }
        />
        <Route
          path='/staff'
          element={
            <RequireStaff>
            <Staff />
            </RequireStaff>
          }
        />
      </Routes>
      </AuthProvider>
  );
}

export default App;
