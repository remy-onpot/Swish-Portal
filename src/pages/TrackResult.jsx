import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, auth } from '../firebase'; 
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- FIX LEAFLET ICONS ---
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

// COORDINATES
const CITY_COORDS = {
  "United States": { lat: 37.0902, lng: -95.7129 },
  "United Kingdom": { lat: 55.3781, lng: -3.4360 },
  "Ghana": { lat: 7.9465, lng: -1.0232 },
  "Nigeria": { lat: 9.0820, lng: 8.6753 },
  "Germany": { lat: 51.1657, lng: 10.4515 },
  "China": { lat: 35.8617, lng: 104.1954 },
  "Dubai": { lat: 25.2048, lng: 55.2708 },
  "Turkey": { lat: 38.9637, lng: 35.2433 },
  "South Africa": { lat: -30.5595, lng: 22.9375 },
  "Spain": { lat: 40.4637, lng: -3.7492 },
  "Default": { lat: 20, lng: 0 }
};

function TrackResult() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingLocation, setUpdatingLocation] = useState(false);
  
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // PASTE YOUR REAL UID HERE
  const ADMIN_UID = "N401LLs1RAWiqjr09yGVforM0mz2"; 
  const isAdmin = auth.currentUser?.uid === ADMIN_UID;

  useEffect(() => {
    const fetchShipment = async () => {
      const q = query(collection(db, "shipments"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        setShipment({ firebaseId: docData.id, ...docData.data() });
      }
      setLoading(false);
    };
    fetchShipment();
  }, [id]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 800 * 1024) {
      alert("File too large! Max 800KB.");
      return;
    }
    setUploading(true);
    try {
      const base64Image = await convertToBase64(file);
      const shipmentRef = doc(db, "shipments", shipment.firebaseId);
      await updateDoc(shipmentRef, { images: arrayUnion(base64Image) });
      setShipment(prev => ({ ...prev, images: [...(prev.images || []), base64Image] }));
      alert("Proof of delivery uploaded.");
    } catch (error) {
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if(!window.confirm(`Change status to ${newStatus}?`)) return;
    setUpdatingStatus(true);
    
    try {
        // Create new history event
        const newEvent = {
            status: newStatus,
            location: shipment.currentLocation || shipment.senderCountry,
            timestamp: new Date().toLocaleString(),
            note: `Status updated to ${newStatus}`
        };

        const shipmentRef = doc(db, "shipments", shipment.firebaseId);
        await updateDoc(shipmentRef, { 
            status: newStatus,
            history: arrayUnion(newEvent) // Add to history array
        });

        setShipment(prev => ({ 
            ...prev, 
            status: newStatus,
            history: [...(prev.history || []), newEvent]
        }));

    } catch (error) {
        alert("Could not update status.");
    } finally {
        setUpdatingStatus(false);
    }
  };

  const handleLocationChange = async (newLocation) => {
    if(!window.confirm(`Update location to ${newLocation}?`)) return;
    setUpdatingLocation(true);
    try {
        const newEvent = {
            status: shipment.status,
            location: newLocation,
            timestamp: new Date().toLocaleString(),
            note: `Arrived at ${newLocation} Hub`
        };

        const shipmentRef = doc(db, "shipments", shipment.firebaseId);
        await updateDoc(shipmentRef, { 
            currentLocation: newLocation,
            history: arrayUnion(newEvent)
        });

        setShipment(prev => ({ 
            ...prev, 
            currentLocation: newLocation,
            history: [...(prev.history || []), newEvent]
        }));
    } catch (error) {
        alert("Could not update location.");
    } finally {
        setUpdatingLocation(false);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if(!email) return;
    try {
      const shipmentRef = doc(db, "shipments", shipment.firebaseId);
      await updateDoc(shipmentRef, { subscribers: arrayUnion(email) });
      setSubscribed(true);
      setEmail('');
    } catch (error) {
      alert("Subscription failed.");
    }
  };

  const getCoords = (countryName) => CITY_COORDS[countryName] || CITY_COORDS["Default"];

  const getStatusColor = (status) => {
    switch(status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Exception': return 'bg-red-100 text-red-800';
        case 'On Hold': return 'bg-yellow-100 text-yellow-800';
        case 'Pending Drop-off': return 'bg-gray-100 text-gray-800 border border-gray-300';
        default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) return <div className="min-h-screen pt-32 text-center">Retrieving Logistics Data...</div>;
  if (!shipment) return <div className="min-h-screen pt-32 text-center">Shipment Manifest Not Found.</div>;

  const originCoords = getCoords(shipment.senderCountry);
  const destCoords = getCoords(shipment.receiverCountry);
  const currentCoords = shipment.currentLocation ? getCoords(shipment.currentLocation) : null;

  const routePath = [
    [originCoords.lat, originCoords.lng],
    ...(currentCoords ? [[currentCoords.lat, currentCoords.lng]] : []),
    [destCoords.lat, destCoords.lng]
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/dashboard" className="text-gray-500 hover:text-swish-darkblue mb-4 inline-block font-medium">← Return to Dashboard</Link>
        
        {/* INFO CARD */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-swish-darkblue">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-1">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Waybill / Tracking ID</p>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{shipment.type} Service</span>
              </div>
              <h1 className="text-4xl font-extrabold text-swish-black tracking-tight">{shipment.id}</h1>
              <p className="text-gray-600 mt-4 text-lg border-l-2 border-gray-200 pl-4 italic">"{shipment.description}"</p>
              <div className="mt-4 flex gap-8 text-sm text-gray-500">
                  <div><span className="block font-bold text-gray-700">Origin</span>{shipment.senderAddress || shipment.senderCountry}</div>
                  <div><span className="block font-bold text-gray-700">Destination</span>{shipment.receiverAddress || shipment.receiverCountry}</div>
              </div>
            </div>
            <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full font-bold uppercase text-sm shadow-sm ${getStatusColor(shipment.status)}`}>
              {shipment.status}
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 h-96 border border-gray-200 relative z-0">
           <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} className="w-full h-full">
              <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[originCoords.lat, originCoords.lng]}><Popup>Origin</Popup></Marker>
              <Marker position={[destCoords.lat, destCoords.lng]}><Popup>Destination</Popup></Marker>
              {currentCoords && <Marker position={[currentCoords.lat, currentCoords.lng]}><Popup>Current</Popup></Marker>}
              <Polyline positions={routePath} color="#4a78a6" dashArray="10, 10" weight={3} />
           </MapContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* LEFT COL: TIMELINE & ALERTS */}
            <div className="md:col-span-1 space-y-8">
                {/* NEW: TIMELINE */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="font-bold text-lg mb-4 text-swish-black">Shipment History</h3>
                    <div className="space-y-6 border-l-2 border-gray-200 ml-2 pl-6 relative">
                        {/* Map through history (Reversed to show newest first) */}
                        {shipment.history && [...shipment.history].reverse().map((event, idx) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-[31px] bg-swish-darkblue h-4 w-4 rounded-full border-2 border-white shadow-sm"></div>
                                <p className="font-bold text-sm text-gray-800">{event.status}</p>
                                <p className="text-xs text-gray-500 mb-1">{event.location}</p>
                                <p className="text-[10px] text-gray-400">{event.timestamp}</p>
                            </div>
                        ))}
                        {(!shipment.history || shipment.history.length === 0) && <p className="text-xs text-gray-400">No history available.</p>}
                    </div>
                </div>

                {/* ALERTS */}
                <div className="bg-swish-black text-white p-6 rounded-xl shadow-lg">
                   <h3 className="font-bold text-lg mb-2">🔔 Alerts</h3>
                   {subscribed ? (
                     <div className="bg-green-500/20 text-green-300 p-3 rounded text-sm border border-green-500/50">✅ Subscribed!</div>
                   ) : (
                     <form onSubmit={handleSubscribe} className="space-y-2">
                       <input type="email" required placeholder="Email" className="w-full p-2 rounded bg-gray-800 border-gray-700 text-white text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                       <button type="submit" className="w-full bg-swish-darkblue py-2 rounded font-bold text-sm hover:bg-blue-600 transition">Subscribe</button>
                     </form>
                   )}
                </div>
            </div>

            {/* RIGHT COL: ADMIN & IMAGES */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-swish-black mb-6 border-b pb-4">Proof of Delivery</h3>
              {shipment.images && shipment.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {shipment.images.map((imgUrl, idx) => (
                    <div key={idx} className="block group relative overflow-hidden rounded-lg shadow-md h-32 border border-gray-200">
                      <img src={imgUrl} alt="Shipment" className="w-full h-full object-cover transform transition group-hover:scale-105" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-8"><p className="text-gray-400 italic text-sm">No visuals.</p></div>
              )}

              {isAdmin && (
                <div className="bg-gray-100 p-4 rounded-xl text-gray-800 border border-gray-200">
                  <h4 className="font-bold text-swish-darkblue mb-4 text-sm uppercase tracking-wider">🛡️ Admin Controls</h4>
                  <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Attach Photo</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-swish-darkblue file:text-white hover:file:bg-blue-700" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Update Status (Adds to History)</label>
                            <select onChange={(e) => handleStatusChange(e.target.value)} value={shipment.status} disabled={updatingStatus} className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded p-2 outline-none">
                                <option value="Pending Drop-off">Pending Drop-off</option>
                                <option value="Processing">Processing</option>
                                <option value="Picked Up">Picked Up</option>
                                <option value="In Transit">In Transit</option>
                                <option value="Customs Clearance">Customs Clearance</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Update Location (Adds to History)</label>
                            <select onChange={(e) => handleLocationChange(e.target.value)} value={shipment.currentLocation || ""} disabled={updatingLocation} className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded p-2 outline-none">
                                <option value="">Select Location...</option>
                                {Object.keys(CITY_COORDS).filter(city => city !== "Default").map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default TrackResult;