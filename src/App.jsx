import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Flights from './pages/Flights';
import Packages from './pages/Packages';
import BudgetSearch from './pages/BudgetSearch';
import Login from './pages/Login';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="flights" element={<Flights />} />
            <Route path="packages" element={<Packages />} />
            <Route path="budget" element={<BudgetSearch />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
