import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Ship from './pages/Ship';
import Services from './pages/Services';
import Locations from './pages/Locations';
import Login from './pages/Login';
import Track from './pages/Track'; // <--- 1. NEW IMPORT
import TrackResult from './pages/TrackResult';
import Dashboard from './pages/Dashboard';
import CustomerService from './pages/CustomerService';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <div className="font-sans text-swish-black flex flex-col min-h-screen">
        
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<Track />} /> {/* <--- 2. NEW ROUTE */}
            <Route path="/track/:id" element={<TrackResult />} />
            <Route path="/ship" element={<Ship />} />
            <Route path="/services" element={<Services />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Support Routes */}
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;