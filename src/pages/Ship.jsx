import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore'; 
import { SparklesCore } from '../components/Sparkles'; 

// --- WHERE WE HAVE BRANCHES (For Origin) ---
const AVAILABLE_ORIGINS = [
  "Afghanistan",
  "Australia", 
  "Bahrain",
  "China",
  "Germany", 
  "Ghana", 
  "Italy",
  "Japan",
  "Kuwait",
  "Nigeria", 
  "South Africa",
  "South Korea",
  "Spain",
  "Turkey",
  "United Kingdom", 
  "United States"
].sort();

// --- GLOBAL DELIVERY NETWORK (For Destination) ---
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Democratic Republic of the)", "Congo (Republic of the)", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

function Ship() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [quotePrice, setQuotePrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    senderName: '',
    senderCountry: 'United States', // Default must be in AVAILABLE_ORIGINS
    senderAddress: '', 
    receiverName: '',
    receiverCountry: 'United Kingdom', 
    receiverAddress: '', 
    weight: '',
    description: '',
    type: 'Express'
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleGetQuote = (e) => {
    e.preventDefault();
    // Mock Logic: Base $20 + ($10 * Weight). Express is 1.5x multiplier.
    const weightCost = parseFloat(formData.weight) * 10;
    const serviceMultiplier = formData.type === 'Express' ? 1.5 : 1;
    const finalPrice = (20 + weightCost) * serviceMultiplier;
    setQuotePrice(finalPrice.toFixed(2));
    setStep(2);
  };

  const handleProceedToLocation = async () => {
    setLoading(true);
    try {
      const referenceID = "SWISH-" + Math.floor(1000 + Math.random() * 9000);
      
      // CREATE SHIPMENT IN FIRESTORE
      await addDoc(collection(db, "shipments"), {
        id: referenceID,
        ...formData,
        price: quotePrice,
        status: 'Pending Drop-off', 
        dateCreated: new Date().toLocaleDateString(),
        userEmail: auth.currentUser ? auth.currentUser.email : "guest",
        images: [],
        // INITIAL HISTORY LOG
        history: [
            {
                status: 'Pending Drop-off',
                location: formData.senderCountry,
                timestamp: new Date().toLocaleString(),
                note: 'Shipment label created. Waiting for drop-off at service point.'
            }
        ]
      });
      
      alert(`✅ Booking Confirmed!\n\nReference: ${referenceID}\n\nNEXT STEP: Please take your package to the nearest Swish Service Point to finalize dispatch.`);
      
      navigate('/locations'); 
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving shipment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-0 min-h-screen bg-gray-100 font-sans">
      
      {/* --- MODERN HERO SECTION --- */}
      <div className="relative h-[50vh] md:h-[60vh] bg-swish-black flex flex-col items-center justify-center overflow-hidden">
        
        {/* 1. Background Image Layer */}
        <div className="absolute inset-0 w-full h-full">
            <img 
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop" 
                alt="Global Logistics Port" 
                className="w-full h-full object-cover opacity-40" 
            />
        </div>

        {/* 2. Sparkles Layer (Grab Mode = Connections) */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles-ship"
            background="transparent"
            minSize={0.9}
            maxSize={1.8}
            particleDensity={60}
            className="w-full h-full"
            particleColor="#ffbf00" 
            hoverMode="grab" 
          />
        </div>

        {/* 3. Gradient Overlay */}
        <div className="absolute inset-0 bg-swish-black/60 pointer-events-none"></div>

        {/* 4. Text Content */}
        <div className="relative z-10 text-center px-4 mt-10">
            <span className="text-swish-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-2 block animate-fade-in">
                Logistics Management
            </span>
            <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
                Rate Calculator
            </h1>
            <p className="text-gray-200 text-sm md:text-lg max-w-2xl mx-auto font-light">
                Generate a proforma invoice, calculate volumetric weight, and schedule your dispatch instantly.
            </p>
        </div>
      </div>

      {/* --- FORM SECTION --- */}
      <div className="container mx-auto px-4 max-w-3xl -mt-24 md:-mt-32 relative z-20 mb-20">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border-t-4 border-swish-accent">
          
          {step === 1 && (
            <form onSubmit={handleGetQuote} className="space-y-4 md:space-y-6">
              {/* Service Type Selection */}
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-100">
                <label className="block text-sm font-bold text-swish-darkblue mb-2 uppercase">Select Service Level</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center gap-2 cursor-pointer bg-white p-3 rounded border border-blue-200 flex-1 hover:shadow-md transition group">
                    <input type="radio" name="type" value="Express" checked={formData.type === 'Express'} onChange={handleChange} className="accent-swish-darkblue" />
                    <div>
                        <span className="font-bold block text-swish-black group-hover:text-swish-darkblue text-sm md:text-base">Air Express</span>
                        <span className="text-xs text-gray-500">1-3 Days • Priority Handling</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-white p-3 rounded border border-blue-200 flex-1 hover:shadow-md transition group">
                    <input type="radio" name="type" value="Standard" checked={formData.type === 'Standard'} onChange={handleChange} className="accent-swish-darkblue" />
                    <div>
                        <span className="font-bold block text-swish-black group-hover:text-swish-darkblue text-sm md:text-base">Standard Economy</span>
                        <span className="text-xs text-gray-500">5-7 Days • Consolidated Freight</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* ORIGIN (Restricted List) */}
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Origin (Export)</label>
                   <select 
                      name="senderCountry" 
                      value={formData.senderCountry} 
                      onChange={handleChange} 
                      className="w-full border p-3 rounded mt-1 bg-gray-50 font-medium focus:ring-2 focus:ring-swish-darkblue outline-none mb-3 text-sm md:text-base"
                   >
                     {AVAILABLE_ORIGINS.map(country => (
                       <option key={country} value={country}>{country}</option>
                     ))}
                   </select>
                   <input required name="senderAddress" onChange={handleChange} type="text" className="w-full border p-3 rounded bg-white text-sm" placeholder="Street Address, City, Zip" />
                </div>
                
                {/* DESTINATION (Global List) */}
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Destination (Import)</label>
                   <select 
                      name="receiverCountry" 
                      value={formData.receiverCountry} 
                      onChange={handleChange} 
                      className="w-full border p-3 rounded mt-1 bg-gray-50 font-medium focus:ring-2 focus:ring-swish-darkblue outline-none mb-3 text-sm md:text-base"
                   >
                     {COUNTRIES.map(country => (
                       <option key={country} value={country}>{country}</option>
                     ))}
                   </select>
                   <input required name="receiverAddress" onChange={handleChange} type="text" className="w-full border p-3 rounded bg-white text-sm" placeholder="Street Address, City, Zip" />
                </div>
              </div>

              {/* Details */}
              <div>
                <label className="text-xs text-gray-500 uppercase font-bold tracking-wide">Commodity Description</label>
                <textarea required name="description" onChange={handleChange} className="w-full border p-3 rounded mt-1 h-24 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-swish-darkblue outline-none transition text-sm" placeholder="Detailed description of goods (e.g. '20x Cotton T-Shirts, HS Code: 6109.10')" />
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase font-bold tracking-wide">Volumetric Weight (kg)</label>
                <input required name="weight" onChange={handleChange} type="number" step="0.1" className="w-full border p-3 rounded mt-1 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-swish-darkblue outline-none text-sm" placeholder="0.0" />
              </div>

              <button type="submit" className="w-full bg-swish-darkblue text-white py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-blue-800 transition shadow-lg flex justify-center items-center gap-2">
                Calculate Estimated Rate <span>🧮</span>
              </button>
            </form>
          )}

          {/* --- STEP 2: CONFIRMATION --- */}
          {step === 2 && (
            <div className="text-center">
              <p className="text-gray-500 mb-2 text-xs md:text-sm uppercase tracking-widest">Total Estimated Cost (Excl. VAT)</p>
              <h2 className="text-5xl md:text-6xl font-extrabold text-swish-darkblue mb-6 tracking-tighter">${quotePrice}</h2>
              
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg mb-8 text-left border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2 border-b pb-2">Shipment Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><strong>Service:</strong> {formData.type}</p>
                    <p><strong>Weight:</strong> {formData.weight} kg</p>
                    <p><strong>Origin:</strong> {formData.senderAddress || formData.senderCountry}</p>
                    <p><strong>Dest:</strong> {formData.receiverAddress || formData.receiverCountry}</p>
                </div>
                <p className="mt-4 text-xs text-red-500 italic">
                  * Note: Final price subject to customs duties and fuel surcharge adjustments upon physical measurement.
                </p>
              </div>

              <button onClick={handleProceedToLocation} disabled={loading} className="w-full bg-swish-accent text-swish-black py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-yellow-400 transition shadow-lg">
                {loading ? "Generating Manifest..." : "Confirm Booking & Find Drop-off"}
              </button>
              <button onClick={() => setStep(1)} className="w-full mt-4 text-gray-400 text-sm hover:text-swish-darkblue underline">Modify Shipment Details</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Ship;