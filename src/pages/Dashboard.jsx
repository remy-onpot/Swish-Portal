import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; 
import { signOut, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myShipments, setMyShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false); 

  // PASTE YOUR REAL UID HERE
  const ADMIN_UID = "N401LLs1RAWiqjr09yGVforM0mz2"; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload(); 
        setUser(currentUser);
        
        let q;
        if (currentUser.uid === ADMIN_UID) {
           q = collection(db, "shipments");
        } else {
           q = query(collection(db, "shipments"), where("userEmail", "==", currentUser.email));
        }

        const querySnapshot = await getDocs(q);
        const shipmentsData = querySnapshot.docs.map(doc => ({
           docId: doc.id,
           ...doc.data()
        }));
        
        setMyShipments(shipmentsData);
        setLoading(false); 
      } else {
        setLoading(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleResendVerification = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        setVerificationSent(true);
        setTimeout(() => setVerificationSent(false), 5000);
      } catch (error) {
        alert("Error sending email: " + error.message);
      }
    }
  };

  // Calculate Stats
  const totalShipments = myShipments.length;
  const deliveredCount = myShipments.filter(s => s.status === 'Delivered').length;
  const inTransitCount = myShipments.filter(s => ['In Transit', 'Out for Delivery'].includes(s.status)).length;
  const pendingCount = myShipments.filter(s => ['Processing', 'Pending Drop-off'].includes(s.status)).length;

  if (loading) return <div className="min-h-screen flex items-center justify-center text-swish-darkblue font-bold animate-pulse">Loading Dashboard...</div>;

  // --- VERIFICATION GATE ---
  if (user && !user.emailVerified && user.uid !== ADMIN_UID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center border-t-4 border-yellow-400 transform transition hover:scale-[1.01]">
          <div className="text-6xl mb-6">📧</div>
          <h1 className="text-2xl font-bold text-swish-black mb-3">Verify Your Email</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We've sent a secure verification link to <strong>{user.email}</strong>.<br/>
            Please check your inbox to activate your shipping capabilities.
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-swish-darkblue text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
            >
              I've Verified! (Refresh)
            </button>
            
            <button 
              onClick={handleResendVerification} 
              disabled={verificationSent}
              className="w-full border border-gray-300 text-gray-600 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
            >
              {verificationSent ? "Link Sent! ✅" : "Resend Verification Email"}
            </button>

            <button 
              onClick={handleLogout} 
              className="text-sm text-red-500 font-bold hover:underline mt-6 block w-full"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      
      {/* 1. TOP HEADER STRIP */}
      <div className="bg-swish-black text-white py-12 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <p className="text-swish-accent font-bold uppercase text-xs tracking-widest mb-2">Overview</p>
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white capitalize">{user?.email?.split('@')[0]}</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Account ID: <span className="font-mono">{user?.uid.slice(0,8)}...</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    {user?.uid !== ADMIN_UID && (
                        <Link to="/ship" className="bg-white text-swish-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg flex items-center gap-2">
                            <span>📦</span> New Shipment
                        </Link>
                    )}
                    <button onClick={handleLogout} className="border border-white/20 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* 2. STATS CARDS (Overlapping the header) */}
      <div className="container mx-auto px-4 max-w-6xl -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Total */}
            <div className="bg-white p-6 rounded-xl shadow-xl border-b-4 border-swish-darkblue hover:transform hover:-translate-y-1 transition duration-300">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-swish-darkblue text-xl">📊</div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Total</span>
                </div>
                <h3 className="text-3xl font-extrabold text-swish-black">{totalShipments}</h3>
                <p className="text-sm text-gray-500">All Shipments</p>
            </div>

            {/* In Transit */}
            <div className="bg-white p-6 rounded-xl shadow-xl border-b-4 border-blue-400 hover:transform hover:-translate-y-1 transition duration-300">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-500 text-xl">🚚</div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Active</span>
                </div>
                <h3 className="text-3xl font-extrabold text-swish-black">{inTransitCount}</h3>
                <p className="text-sm text-gray-500">On the move</p>
            </div>

            {/* Pending */}
            <div className="bg-white p-6 rounded-xl shadow-xl border-b-4 border-yellow-400 hover:transform hover:-translate-y-1 transition duration-300">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600 text-xl">⏳</div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Pending</span>
                </div>
                <h3 className="text-3xl font-extrabold text-swish-black">{pendingCount}</h3>
                <p className="text-sm text-gray-500">Processing / Drop-off</p>
            </div>

            {/* Delivered */}
            <div className="bg-white p-6 rounded-xl shadow-xl border-b-4 border-green-500 hover:transform hover:-translate-y-1 transition duration-300">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-green-50 rounded-lg text-green-600 text-xl">✅</div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Complete</span>
                </div>
                <h3 className="text-3xl font-extrabold text-swish-black">{deliveredCount}</h3>
                <p className="text-sm text-gray-500">Successfully Delivered</p>
            </div>
        </div>

        {/* 3. SHIPMENT LIST */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="font-bold text-xl text-swish-black">Recent Activity</h2>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search tracking ID..." 
                    className="pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-swish-darkblue w-64"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>
          
          {myShipments.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">📦</div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">No shipments found</h3>
              <p className="text-gray-500 mb-6">You haven't created any shipments yet.</p>
              <Link to="/ship" className="text-swish-darkblue font-bold hover:underline">Create your first shipment →</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                    <th className="px-8 py-4 font-bold">Tracking ID</th>
                    <th className="px-8 py-4 font-bold">Destination</th>
                    <th className="px-8 py-4 font-bold">Status</th>
                    <th className="px-8 py-4 font-bold">Date</th>
                    <th className="px-8 py-4 font-bold text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {myShipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-blue-50/50 transition duration-150">
                        <td className="px-8 py-5">
                            <div className="font-bold text-swish-darkblue">{shipment.id}</div>
                            <div className="text-xs text-gray-400">{shipment.type}</div>
                        </td>
                        <td className="px-8 py-5 font-medium text-gray-700">
                            {shipment.receiverCountry}
                        </td>
                        <td className="px-8 py-5">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                ${shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                  shipment.status === 'Pending Drop-off' ? 'bg-yellow-100 text-yellow-700' : 
                                  'bg-blue-100 text-blue-700'}`}>
                                {shipment.status}
                            </span>
                        </td>
                        <td className="px-8 py-5 text-sm text-gray-500">{shipment.dateCreated}</td>
                        <td className="px-8 py-5 text-right">
                        <Link to={`/track/${shipment.id}`} className="text-gray-400 hover:text-swish-darkblue font-bold text-sm border border-gray-200 hover:border-swish-darkblue px-4 py-2 rounded transition">
                            {user?.uid === ADMIN_UID ? "Manage" : "Details"}
                        </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;