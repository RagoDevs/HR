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
          path='/Dashboard'
          element={
            <RequireHr>
            <Dashboard />
            </RequireHr>
          }
        />
         <Route
          path='/Employee'
          element={
            <RequireHr>
            <Employee />
            </RequireHr>
          }
        />
         <Route
          path='/Leave'
          element={
            <RequireHr>
            
            <Leave />
            </RequireHr>
          }
        />
          <Route
          path='/Payroll'
          element={
            <RequireHr>
            <Payroll />
            </RequireHr>
          }
        />
        <Route
          path='/Calender'
          element={
            <RequireHr>
            <Calender />
            </RequireHr>
          }
        />
        <Route
          path='/Documents'
          element={
            <RequireHr>
            <Documents />
            </RequireHr>
          }
        />
        <Route
          path='/Report'
          element={
            <RequireHr>
            <Report/>
            </RequireHr>
          }
        />
        <Route
          path='/Staff'
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
