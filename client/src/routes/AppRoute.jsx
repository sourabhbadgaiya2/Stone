import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/auth/Login";
import Dashboard from "../components/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Spinner from "../components/Spinner";

const AppRoute = () => {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading && <Spinner />}
      <Routes>
        {/* Protected route */}
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Dashboard />} />
        </Route>

        {/* Public route */}
        <Route path='/login' element={<Login />} />

        {/* Catch-all route */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
