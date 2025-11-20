import React, { useState } from 'react';

function TrackingWidget() {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingNumber) {
      console.log("Tracking:", trackingNumber);
    }
  };

  return (
    // Removed the inline background image style.
    // Added 'bg-opacity-90' to make the card slightly transparent.
    <div className="bg-swish-black bg-opacity-90 text-swish-lightblue rounded-xl shadow-2xl max-w-3xl mx-auto p-10 border border-swish-darkblue">
      
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Track Your Shipment
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Real-time updates for your global deliveries.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            className="w-full md:w-2/3 px-6 py-4 rounded-lg text-swish-black font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter Tracking Number (e.g. SWISH-889)"
          />
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-4 bg-swish-darkblue hover:bg-blue-600 text-white font-bold rounded-lg text-lg transition-all shadow-lg"
          >
            Track Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default TrackingWidget;