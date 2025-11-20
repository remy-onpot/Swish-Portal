import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SparklesCore } from '../components/Sparkles'; 
import { auth } from '../firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

function Home() {
  const [activeTab, setActiveTab] = useState('track');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingNumber) navigate(`/track/${trackingNumber}`);
  };

  return (
    <div className="w-full font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-swish-black pt-20 pb-12 md:pt-0 md:pb-0">
        
        {/* 2. BASE LAYER */}
        <div className="absolute inset-0 w-full h-full">
           <img 
             src="/warehouse-bg.jpg" 
             alt="Logistics Background" 
             className="w-full h-full object-cover opacity-20" 
           />
        </div>

        {/* 3. ANIMATION LAYER */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={70}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        <div className="absolute inset-0 bg-swish-black/30 pointer-events-none"></div>
        
        {/* 4. HERO CONTENT */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-16 pointer-events-none">
          
          {/* Left Text */}
          <div className="flex-1 text-white space-y-4 md:space-y-6 pointer-events-auto text-center md:text-left mt-4 md:mt-0">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs md:text-sm text-swish-accent font-medium animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-swish-accent animate-pulse"></span>
              New: Global Hub in Lagos
            </div>
            
            {/* UPDATED: Smaller text for mobile (3xl), larger for desktop (6xl/7xl) */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Shipping <br/> made <span className="text-transparent bg-clip-text bg-gradient-to-r from-swish-lightblue to-swish-darkblue">Simple.</span>
            </h1>
            
            {/* UPDATED: Base text size for mobile, larger for desktop */}
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-lg mx-auto md:mx-0 font-medium leading-relaxed drop-shadow-lg">
              Connect your business to the world with the most reliable logistics partner in Africa and Europe.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 pt-2">
              <Link to="/ship" className="bg-swish-darkblue px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-sm md:text-lg hover:bg-blue-600 transition shadow-lg shadow-blue-900/20 border border-transparent hover:border-blue-400">
                Start Shipping
              </Link>
              <Link to="/services" className="bg-transparent border border-gray-600 px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-sm md:text-lg text-gray-300 hover:bg-white/5 hover:text-white hover:border-white transition">
                View Services
              </Link>
            </div>
          </div>

          {/* Right Widget */}
          <div className="flex-1 w-full max-w-md pointer-events-auto mb-8 md:mb-0">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden transform transition hover:-translate-y-1 duration-300 border border-white/20">
              <div className="flex border-b border-gray-200">
                <button 
                  onClick={() => setActiveTab('track')}
                  className={`flex-1 py-4 md:py-5 font-bold text-base md:text-lg transition ${activeTab === 'track' ? 'bg-white text-swish-black border-t-4 border-swish-darkblue' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  Track
                </button>
                <button 
                  onClick={() => setActiveTab('quote')}
                  className={`flex-1 py-4 md:py-5 font-bold text-base md:text-lg transition ${activeTab === 'quote' ? 'bg-white text-swish-black border-t-4 border-swish-darkblue' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  Get Quote
                </button>
              </div>

              <div className="p-6 md:p-8">
                {activeTab === 'track' ? (
                  <form onSubmit={handleTrack} className="flex flex-col gap-4 md:gap-6">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase mb-2 block tracking-wider">Tracking Number</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full border-2 border-gray-200 rounded-lg p-3 md:p-4 pl-10 md:pl-12 text-base md:text-lg focus:border-swish-darkblue focus:ring-0 outline-none transition bg-gray-50 focus:bg-white"
                          placeholder="SWISH-XXXXX"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                        <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl">📦</span>
                      </div>
                    </div>
                    <button type="submit" className="bg-swish-black text-white w-full py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-800 transition flex justify-center items-center gap-2 shadow-lg">
                      Track Shipment <span>→</span>
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col gap-4 md:gap-6 text-center py-2 md:py-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-2xl md:text-3xl">
                      💰
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-swish-black">Calculate Shipping Cost</h3>
                      <p className="text-gray-500 text-sm mt-2">Get an estimated price for your delivery in seconds.</p>
                    </div>
                    <Link to="/ship" className="bg-swish-darkblue text-white w-full py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-blue-700 transition">
                      Launch Calculator
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS STRIP --- */}
      <div className="bg-swish-darkblue py-10 border-t border-white/10 relative z-20">
         <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white divide-x divide-white/10">
            {/* UPDATED: Smaller text for stats on mobile */}
            <div>
              <p className="text-3xl md:text-5xl font-extrabold mb-1 tracking-tight">220+</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-70 font-medium">Countries</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-extrabold mb-1 tracking-tight">15M</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-70 font-medium">Delivered</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-extrabold mb-1 tracking-tight">24/7</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-70 font-medium">Support</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-extrabold mb-1 tracking-tight">99%</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-70 font-medium">On-Time</p>
            </div>
         </div>
      </div>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-swish-black mb-4">Why the World Chooses Swish</h2>
            <p className="text-gray-600 text-sm md:text-lg">We don't just move boxes; we move your business forward with technology and care.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Cards optimized for mobile */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 group-hover:bg-blue-100 transition rounded-lg flex items-center justify-center text-2xl md:text-3xl mb-6">🚀</div>
              <h3 className="text-lg md:text-xl font-bold text-swish-black mb-3">Speed & Reliability</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">Our optimized air and road networks ensure your package arrives exactly when we say it will.</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 group-hover:bg-green-100 transition rounded-lg flex items-center justify-center text-2xl md:text-3xl mb-6">🛡️</div>
              <h3 className="text-lg md:text-xl font-bold text-swish-black mb-3">Secure Handling</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">From pickup to delivery, your items are tracked, insured, and handled by certified professionals.</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-50 group-hover:bg-yellow-100 transition rounded-lg flex items-center justify-center text-2xl md:text-3xl mb-6">📱</div>
              <h3 className="text-lg md:text-xl font-bold text-swish-black mb-3">Real-Time Tech</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">Track your shipment on the map in real-time and get instant SMS updates on status changes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 md:py-20 bg-swish-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-swish-darkblue rounded-full filter blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-swish-accent rounded-full filter blur-3xl opacity-10 -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
           <h2 className="text-2xl md:text-5xl font-bold mb-6">
             {user ? "Ready to ship again?" : "Ready to get started?"}
           </h2>
           <p className="text-gray-400 text-sm md:text-lg mb-10 max-w-xl mx-auto">
             {user ? "Jump back into your dashboard and manage your global logistics." : "Create a free account today and save up to 20% on your first international shipment."}
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             {user ? (
               <Link to="/dashboard" className="bg-swish-accent text-swish-black px-8 py-4 rounded-lg font-bold text-base md:text-lg hover:bg-yellow-400 transition shadow-lg shadow-yellow-900/20">
                 Go to Dashboard
               </Link>
             ) : (
               <Link to="/login" className="bg-swish-accent text-swish-black px-8 py-4 rounded-lg font-bold text-base md:text-lg hover:bg-yellow-400 transition shadow-lg shadow-yellow-900/20">
                 Create Account
               </Link>
             )}
             <Link to="/services" className="border border-white/30 px-8 py-4 rounded-lg font-bold text-base md:text-lg hover:bg-white/10 transition">Explore Services</Link>
           </div>
        </div>
      </section>
    </div>
  );
}

export default Home;