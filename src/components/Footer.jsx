import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-swish-black text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold italic tracking-tighter text-white">
              <span className="text-swish-darkblue">Swish</span>Portal
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The fastest growing logistics network in Africa and Europe. Connecting people, businesses, and communities with speed and reliability.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-swish-accent">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/track" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Track a Package</Link></li>
              <li><Link to="/ship" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Get a Quote</Link></li>
              <li><Link to="/locations" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Find Locations</Link></li>
              <li><Link to="/services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Our Services</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-swish-accent">Support</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {/* UPDATED LINKS BELOW */}
              <li><Link to="/customer-service" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Help Center</Link></li>
              <li><Link to="/services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Customs Guide</Link></li>
              <li><Link to="/locations" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Find a Branch</Link></li>
              <li><Link to="/customer-service" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-swish-accent">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe for shipping updates and offers.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-swish-darkblue transition" 
                />
                <button type="submit" className="bg-swish-darkblue px-5 py-3 rounded-r-lg font-bold hover:bg-blue-600 transition text-white">Go</button>
              </div>
              {subscribed && <p className="text-green-400 text-xs animate-pulse font-bold">✅ Successfully subscribed!</p>}
            </form>
          </div>
        </div>

        {/* Divider with UPDATED LINKS */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 Swish Portal Logistics. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="cursor-pointer hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="cursor-pointer hover:text-white transition">Terms of Use</Link>
            <Link to="/privacy" className="cursor-pointer hover:text-white transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;