import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed w-full z-50 top-0 bg-swish-black/95 backdrop-blur-md border-b border-white/10 shadow-md">
      <div className="container mx-auto px-6 py-4">
        
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold italic tracking-tighter text-white z-50">
            <span className="text-swish-darkblue">Swish</span>Portal
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/track" className="text-gray-300 hover:text-swish-accent transition font-medium text-sm">Track</Link>
            <Link to="/ship" className="text-gray-300 hover:text-swish-accent transition font-medium text-sm">Ship</Link>
            <Link to="/services" className="text-gray-300 hover:text-swish-accent transition font-medium text-sm">Services</Link>
            <Link to="/locations" className="text-gray-300 hover:text-swish-accent transition font-medium text-sm">Locations</Link>
            
            {user ? (
              <Link to="/dashboard" className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition shadow-lg text-sm">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="px-5 py-2 bg-swish-darkblue hover:bg-blue-600 text-white rounded-full font-bold transition shadow-lg text-sm">
                My Account
              </Link>
            )}
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white focus:outline-none z-50 p-2"
          >
            {isOpen ? (
              <span className="text-2xl">✕</span> 
            ) : (
              <span className="text-2xl">☰</span> 
            )}
          </button>
        </div>

        {/* --- MOBILE MENU DROPDOWN (Updated) --- */}
        {/* Removed h-screen, added absolute top-full to sit nicely under the bar */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-swish-black border-t border-white/10 shadow-2xl py-6 px-6 flex flex-col space-y-4 animate-fade-in-down">
            <Link to="/track" className="text-lg text-gray-200 hover:text-swish-accent font-medium border-b border-white/5 pb-2">Track a Package</Link>
            <Link to="/ship" className="text-lg text-gray-200 hover:text-swish-accent font-medium border-b border-white/5 pb-2">Get a Quote</Link>
            <Link to="/services" className="text-lg text-gray-200 hover:text-swish-accent font-medium border-b border-white/5 pb-2">Services</Link>
            <Link to="/locations" className="text-lg text-gray-200 hover:text-swish-accent font-medium border-b border-white/5 pb-2">Find Locations</Link>
            
            <div className="pt-4">
              {user ? (
                <Link to="/dashboard" className="block w-full text-center px-5 py-3 bg-green-600 text-white rounded-lg font-bold shadow-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/login" className="block w-full text-center px-5 py-3 bg-swish-darkblue text-white rounded-lg font-bold shadow-lg">
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;