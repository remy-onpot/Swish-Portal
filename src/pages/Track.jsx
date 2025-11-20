import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SparklesCore } from '../components/Sparkles';

function Track() {
  const [trackingId, setTrackingId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`/track/${trackingId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-0 font-sans">
      
      {/* --- HERO TRACKING SECTION --- */}
      <div className="relative h-[60vh] md:h-[70vh] bg-swish-black flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 w-full h-full">
            <img 
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Logistics Data Center" 
                className="w-full h-full object-cover opacity-20"
            />
        </div>

        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles-track"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#4a78a6" 
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-[10px] md:text-xs font-bold tracking-widest mb-4 md:mb-6 uppercase animate-fade-in">
                Global Tracking Network
            </span>
            
            {/* UPDATED: Smaller on mobile */}
            <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-6 md:mb-8 tracking-tight">
                Where is your shipment?
            </h1>

            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-grow">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg md:text-xl">📦</span>
                        {/* UPDATED: Input size */}
                        <input 
                            type="text" 
                            placeholder="Enter Tracking Number" 
                            className="w-full h-12 md:h-14 pl-10 md:pl-12 pr-4 rounded-lg bg-white text-swish-black font-bold text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 placeholder-gray-400"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                        />
                    </div>
                    {/* UPDATED: Button size */}
                    <button 
                        type="submit"
                        className="h-12 md:h-14 px-8 rounded-lg bg-swish-darkblue hover:bg-blue-600 text-white font-bold text-base md:text-lg transition shadow-lg flex items-center justify-center gap-2"
                    >
                        Track Now <span className="hidden md:inline">🚀</span>
                    </button>
                </form>
            </div>
            
            <p className="text-gray-400 mt-6 text-xs md:text-sm px-4">
                Support multiple formats: Waybill, Consignment ID, or Reference Number.
            </p>
        </div>
      </div>

      {/* --- INFO GRID --- */}
      <div className="container mx-auto px-4 py-16 md:py-20 -mt-16 md:-mt-20 relative z-20">
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border-t-4 border-swish-darkblue hover:translate-y-1 transition duration-300">
                <div className="text-3xl md:text-4xl mb-4">📱</div>
                <h3 className="text-lg md:text-xl font-bold text-swish-black mb-2">Real-Time Alerts</h3>
                <p className="text-gray-600 text-xs md:text-sm">Get automatic SMS or Email updates whenever your package status changes.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border-t-4 border-swish-accent hover:translate-y-1 transition duration-300">
                <div className="text-3xl md:text-4xl mb-4">📍</div>
                <h3 className="text-lg md:text-xl font-bold text-swish-black mb-2">Live Map View</h3>
                <p className="text-gray-600 text-xs md:text-sm">See exactly where your shipment is on the world map in real-time.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border-t-4 border-green-500 hover:translate-y-1 transition duration-300">
                <div className="text-3xl md:text-4xl mb-4">🛡️</div>
                <h3 className="text-lg md:text-xl font-bold text-swish-black mb-2">Secure Chain</h3>
                <p className="text-gray-600 text-xs md:text-sm">Every scan is verified on our secure ledger for maximum transparency.</p>
            </div>
        </div>
      </div>

      {/* --- HELP SECTION --- */}
      <div className="bg-white py-16 md:py-20 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-swish-black mb-4">Having trouble tracking?</h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto text-sm md:text-base">
                  If your tracking number isn't working or your status hasn't updated in 48 hours, our support team can investigate the manifest manually.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition text-sm md:text-base">
                      View Tracking FAQ
                  </button>
                  <button className="px-6 py-3 bg-swish-black text-white rounded-lg font-bold hover:bg-gray-800 transition text-sm md:text-base">
                      Contact Support
                  </button>
              </div>
          </div>
      </div>

    </div>
  );
}

export default Track;