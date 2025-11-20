import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { SparklesCore } from '../components/Sparkles';

// --- FIX LEAFLET ICONS IN REACT ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

const allLocations = [
  { id: 1, city: "Accra", lat: 5.6037, lng: -0.1870, name: "Swish Accra Mall", address: "Spintex Road, Accra, Ghana", hours: "Mon-Sat: 8am - 8pm", type: "Drop-off & Pickup", phone: "+233 50 000 0000", manager: "Kwame A." },
  { id: 2, city: "Accra", lat: 5.6055, lng: -0.1670, name: "Kotoka Airport Hub", address: "Cargo Village, KIA", hours: "24/7 Service", type: "Express Center", phone: "+233 20 999 9999", manager: "Sarah O." },
  { id: 3, city: "London", lat: 51.4700, lng: -0.4543, name: "Swish Heathrow", address: "Terminal 5 Cargo, London, UK", hours: "Mon-Sun: 6am - 10pm", type: "Logistics Hub", phone: "+44 20 7946 0000", manager: "James B." },
  { id: 4, city: "London", lat: 51.5154, lng: -0.1419, name: "Oxford Street Locker", address: "120 Oxford St, London, UK", hours: "24/7 Access", type: "Self-Service Locker", phone: "N/A", manager: "Automated" },
  { id: 5, city: "New York", lat: 40.6413, lng: -73.7781, name: "JFK International", address: "Building 75, Jamaica, NY", hours: "24/7 Service", type: "Express Center", phone: "+1 212 555 0199", manager: "Linda M." },
  { id: 6, city: "Lagos", lat: 6.6018, lng: 3.3515, name: "Ikeja City Mall", address: "Obafemi Awolowo Way, Ikeja", hours: "Mon-Sat: 9am - 9pm", type: "Drop-off Point", phone: "+234 800 111 2222", manager: "Chidi N." },
  { id: 7, city: "Madrid", lat: 40.4168, lng: -3.7038, name: "Swish Madrid Centro", address: "Gran Vía 24, Madrid, Spain", hours: "Mon-Sat: 9am - 8pm", type: "Retail Point", phone: "+34 91 123 4567", manager: "Elena R." },
  { id: 8, city: "Kuwait City", lat: 29.3759, lng: 47.9774, name: "Kuwait Towers Hub", address: "Arabian Gulf St, Kuwait City", hours: "Sun-Thu: 8am - 5pm", type: "Regional Office", phone: "+965 2200 1111", manager: "Ahmed K." },
  { id: 9, city: "Istanbul", lat: 41.0082, lng: 28.9784, name: "Swish Bosphorus", address: "Istiklal Cad. 55, Istanbul, Turkey", hours: "Mon-Sat: 8:30am - 7pm", type: "Drop-off Point", phone: "+90 212 555 1234", manager: "Mehmet Y." },
  { id: 10, city: "Manama", lat: 26.2285, lng: 50.5860, name: "Bahrain World Trade", address: "King Faisal Hwy, Manama, Bahrain", hours: "Sun-Thu: 9am - 6pm", type: "Corporate Center", phone: "+973 1700 0000", manager: "Fatima A." },
  { id: 11, city: "Sydney", lat: -33.8688, lng: 151.2093, name: "Sydney Harbour Logistics", address: "George St, The Rocks, Sydney, Australia", hours: "Mon-Fri: 8am - 6pm", type: "Ocean Freight Hub", phone: "+61 2 9000 1234", manager: "Liam S." },
  { id: 12, city: "Tokyo", lat: 35.6762, lng: 139.6503, name: "Swish Ginza", address: "Chuo City, Ginza 4, Tokyo, Japan", hours: "Daily: 10am - 9pm", type: "Express Locker", phone: "+81 3 1234 5678", manager: "Kenji T." },
  { id: 13, city: "Berlin", lat: 52.5200, lng: 13.4050, name: "Berlin Alexanderplatz", address: "Alexanderstraße 1, Berlin, Germany", hours: "Mon-Sat: 8am - 8pm", type: "Distribution Center", phone: "+49 30 9999 8888", manager: "Klaus W." },
  { id: 14, city: "Seoul", lat: 37.5665, lng: 126.9780, name: "Seoul Station Hub", address: "Hangang-daero, Yongsan-gu, Seoul", hours: "Mon-Fri: 9am - 7pm", type: "Tech & Logistics", phone: "+82 2 888 7777", manager: "Ji-oo P." },
  { id: 15, city: "Rome", lat: 41.9028, lng: 12.4964, name: "Roma Termini Point", address: "Via Marsala 29, Rome, Italy", hours: "Mon-Sat: 8am - 7pm", type: "Tourist Drop-off", phone: "+39 06 1234 5678", manager: "Marco D." },
  { id: 16, city: "Cape Town", lat: -33.9249, lng: 18.4241, name: "Table Bay Logistics", address: "V&A Waterfront, Cape Town, South Africa", hours: "Mon-Sun: 9am - 6pm", type: "Port Office", phone: "+27 21 444 5555", manager: "Thabo M." },
  { id: 17, city: "Kabul", lat: 34.5553, lng: 69.2075, name: "Kabul City Center", address: "Shahr-e Naw, Kabul, Afghanistan", hours: "Sat-Thu: 8am - 4pm", type: "Service Point", phone: "+93 70 111 2222", manager: "Rahim Z." },
  { id: 18, city: "Shanghai", lat: 31.2304, lng: 121.4737, name: "Shanghai Bund Center", address: "Yan'an East Rd, Huangpu, China", hours: "Mon-Sat: 8:30am - 8:30pm", type: "Global Freight Hub", phone: "+86 21 6666 8888", manager: "Wei L." }
];

function MapController({ selectedLocation }) {
  const map = useMap();
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 13, {
        duration: 2.5
      });
    }
  }, [selectedLocation, map]);
  return null;
}

function Locations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(allLocations);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const results = allLocations.filter(loc => 
      loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length > 0) {
      setFilteredLocations(results);
      setNoResults(false);
      setSelectedLocation(results[0]);
    } else {
      setNoResults(true);
      setFilteredLocations(allLocations.slice(0, 5));
      setSelectedLocation(null);
    }
  };

  const getCardClasses = (id) => {
    const baseClasses = "p-6 rounded-xl shadow-sm border cursor-pointer transition-all duration-200 group";
    if (selectedLocation?.id === id) {
      return `${baseClasses} bg-blue-50 border-swish-darkblue ring-2 ring-swish-darkblue transform scale-[1.02]`;
    }
    return `${baseClasses} bg-white border-gray-100 hover:border-swish-darkblue`;
  };

  return (
    // Added pt-24 to push content down so Navbar doesn't cover it
    <div className="pt-24 min-h-screen bg-gray-50">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-auto py-20 md:h-[50vh] bg-swish-black flex flex-col items-center justify-center overflow-hidden">
        
        {/* 1. Background Image Layer */}
        <div className="absolute inset-0 w-full h-full">
            <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                alt="Global Network Map" 
                className="w-full h-full object-cover opacity-40"
            />
        </div>

        {/* 2. Sparkles Layer */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles-loc"
            background="transparent"
            minSize={1}
            maxSize={2.5}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#4a78a6"
            hoverMode="repulse"
            speed={0.4}              
            interactionDistance={60}  
          />
        </div>

        {/* Search Content */}
        <div className="relative z-10 w-full px-4 max-w-3xl text-center">
          <span className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-2 block">Global Network</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">Find a Service Point</h1>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-lg shadow-2xl transform transition hover:scale-[1.01]">
             <input 
               type="text" 
               placeholder="Search City or Country..." 
               className="flex-1 p-4 rounded-md outline-none text-swish-black text-base md:text-lg"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
             <button type="submit" className="bg-swish-darkblue text-white font-bold px-8 py-3 rounded-md hover:bg-blue-700 transition">
               Search
             </button>
          </form>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="container mx-auto px-4 py-12 h-auto md:h-[800px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          
          {/* LIST (Left on Desktop, Top on Mobile) */}
          <div className="lg:col-span-1 space-y-4 h-[500px] md:h-full overflow-y-auto pr-2 custom-scrollbar order-2 lg:order-1">
            <div className="sticky top-0 bg-gray-50 pb-4 z-10">
               {/* CONDITIONAL HEADER */}
               {noResults ? (
                   <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm mb-2">
                       <p className="font-bold text-yellow-800 text-sm">Oops! We haven't opened there yet.</p>
                       <p className="text-xs text-yellow-700 mt-1">
                         However, here are our major hubs in your region:
                       </p>
                   </div>
               ) : (
                   <div className="flex justify-between items-center">
                       <h2 className="text-xl font-bold text-gray-700">{filteredLocations.length} Locations</h2>
                       {searchTerm && (
                         <button onClick={() => {
                             setSearchTerm(''); 
                             setFilteredLocations(allLocations);
                             setNoResults(false);
                         }} className="text-sm text-swish-darkblue underline font-bold">Clear Search</button>
                       )}
                   </div>
               )}
            </div>
            
            {filteredLocations.map((loc) => (
              <div key={loc.id} onClick={() => setSelectedLocation(loc)} className={getCardClasses(loc.id)}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-swish-darkblue text-lg">{loc.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{loc.address}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase h-fit">{loc.city}</span>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
                  <span className="text-green-600 font-semibold flex items-center">🕒 {loc.hours}</span>
                </div>
                <button className={`w-full mt-4 py-2 rounded font-bold text-sm transition-colors ${selectedLocation?.id === loc.id ? 'bg-swish-darkblue text-white' : 'border border-swish-darkblue text-swish-darkblue hover:bg-blue-50'}`}>
                  {selectedLocation?.id === loc.id ? 'Locating...' : 'View on Map'}
                </button>
              </div>
            ))}
          </div>

          {/* MAP (Right on Desktop, Bottom on Mobile) */}
          <div className="lg:col-span-2 order-1 lg:order-2 h-[400px] md:h-full bg-gray-200 rounded-xl overflow-hidden shadow-2xl border-4 border-white relative z-0">
             <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true} className="w-full h-full">
                <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapController selectedLocation={selectedLocation} />
                {filteredLocations.map(loc => (
                  <Marker key={loc.id} position={[loc.lat, loc.lng]} eventHandlers={{click: () => setSelectedLocation(loc)}}>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-swish-darkblue text-lg">{loc.name}</h3>
                        <p className="text-sm text-gray-600">{loc.address}</p>
                        <p className="text-xs font-bold mt-2 text-green-600">{loc.hours}</p>
                        <div className="mt-2 pt-2 border-t text-xs text-gray-500">Manager: {loc.manager}<br/>{loc.phone}</div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
             </MapContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Locations;