import React from 'react';
import { SparklesCore } from '../components/Sparkles'; // Import

function Services() {
  return (
    <div className="pt-0 min-h-screen bg-gray-50 font-sans">
      
      {/* --- HERO SECTION --- */}
      <div 
        className="relative bg-gray-900 h-[50vh] md:h-[60vh] flex items-center justify-center text-center overflow-hidden"
      >
        {/* 1. Image Layer */}
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Air Cargo" 
                className="w-full h-full object-cover opacity-40"
            />
        </div>

        {/* 2. Sparkles Layer */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles-serv"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#ffffff"
          />
        </div>

        {/* 3. Content Layer */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-swish-accent font-bold uppercase tracking-widest text-[10px] md:text-sm mb-4 block animate-fade-in">Global Logistics Solutions</span>
          {/* UPDATED: Smaller title for mobile */}
          <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 md:mb-6 leading-tight drop-shadow-2xl">
            Supply Chain Optimization <br/> & Freight Forwarding
          </h1>
          <p className="text-gray-200 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            From last-mile delivery to complex cross-border freight, we provide the infrastructure for your business to scale globally.
          </p>
        </div>
      </div>

      {/* --- SERVICES GRID --- */}
      <div className="container mx-auto px-4 py-12 md:py-20 -mt-16 md:-mt-20 relative z-20">
        
        {/* Express Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-12 border-l-8 border-swish-darkblue flex flex-col md:flex-row">
          <div className="p-6 md:p-10 flex-1">
            <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-swish-darkblue p-2 rounded-lg text-2xl">✈️</span>
                <h2 className="text-2xl md:text-3xl font-bold text-swish-darkblue">Swish Air Express</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-lg mb-6 leading-relaxed">
              Our flagship time-critical service. Utilizing priority cargo space on commercial and dedicated freighter aircraft to ensure your shipment arrives on the next possible business day.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-gray-700 text-sm">
              <li className="flex items-center">✅ <strong>Next-Day</strong> to Major Hubs</li>
              <li className="flex items-center">✅ <strong>DDP/DDU</strong> Incoterms Support</li>
              <li className="flex items-center">✅ <strong>Priority</strong> Customs Brokerage</li>
              <li className="flex items-center">✅ <strong>Real-time</strong> Telemetry Tracking</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 md:p-10 md:w-1/3 flex flex-col justify-center items-center text-center border-l border-gray-100">
            <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">Urgent Consignment?</h3>
            <p className="mb-6 text-gray-500 text-xs md:text-sm">Best for documents, electronics, and perishables.</p>
            <button className="bg-swish-darkblue text-white px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition w-full shadow-lg text-sm md:text-base">
              Book Air Freight
            </button>
          </div>
        </div>

        {/* eCommerce Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-l-8 border-swish-accent flex flex-col md:flex-row">
          <div className="p-6 md:p-10 flex-1">
            <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 p-2 rounded-lg text-2xl">🚢</span>
                <h2 className="text-2xl md:text-3xl font-bold text-swish-black">Ocean & Ground Economy</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-lg mb-6 leading-relaxed">
              Cost-effective logistics for bulk shipments and non-urgent parcels. We leverage consolidated shipping containers (LCL) to reduce your overhead costs while maintaining full chain-of-custody visibility.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-gray-700 text-sm">
              <li className="flex items-center">✅ <strong>FCL / LCL</strong> Container Loads</li>
              <li className="flex items-center">✅ <strong>Warehousing</strong> & Distribution</li>
              <li className="flex items-center">✅ <strong>Bulk</strong> Break-bulk Services</li>
              <li className="flex items-center">✅ <strong>7-21 Day</strong> Transit Times</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 md:p-10 md:w-1/3 flex flex-col justify-center items-center text-center border-l border-gray-100">
            <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">Volume Shipping?</h3>
            <p className="mb-6 text-gray-500 text-xs md:text-sm">Best for retail inventory and heavy machinery.</p>
            <button className="bg-swish-black text-white px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition w-full shadow-lg text-sm md:text-base">
              Get Economy Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Services;