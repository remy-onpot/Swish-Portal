import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification 
} from "firebase/auth";

// Background Image URL
const BG_IMAGE = '/warehouse-bg.jpg';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password Validation State
  const [validations, setValidations] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Validate Password as user types
  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password) // Checks for any non-alphanumeric char
    });
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    try {
      if (isLogin) {
        // --- LOGGING IN ---
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
           alert("Warning: Your email is not verified yet. Please check your inbox.");
        }
      } else {
        // --- SIGNING UP ---
        // Client-side check before sending to Firebase
        const allValid = Object.values(validations).every(Boolean);
        if (!allValid) {
          throw new Error("Password does not meet complexity requirements.");
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert(`Account created! A verification link has been sent to ${email}.`);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      const errorMessage = err.message
        .replace("Firebase: ", "")
        .replace("auth/", "")
        .replace(/-/g, " ");
      setError(errorMessage);
      setLoading(false);
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setError("");
    setEmail("");    
    setPassword(""); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url("${BG_IMAGE}")` }}
    >
      <div className="absolute inset-0 bg-swish-black/80"></div>

      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        
        <div className="bg-swish-black p-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Join Swish Portal'}
          </h2>
          <p className="text-swish-lightblue mt-2 text-sm">
            {isLogin ? 'Access your dashboard' : 'Start shipping globally today'}
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 text-sm capitalize">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-swish-darkblue outline-none transition" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required 
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-swish-darkblue outline-none transition" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              {/* PASSWORD REQUIREMENTS LIST (Only show on Sign Up) */}
              {!isLogin && (
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-100">
                  <p className={validations.length ? "text-green-600 font-bold" : ""}>
                    {validations.length ? "✓" : "○"} 8+ Characters
                  </p>
                  <p className={validations.upper ? "text-green-600 font-bold" : ""}>
                    {validations.upper ? "✓" : "○"} Uppercase (A-Z)
                  </p>
                  <p className={validations.lower ? "text-green-600 font-bold" : ""}>
                    {validations.lower ? "✓" : "○"} Lowercase (a-z)
                  </p>
                  <p className={validations.number ? "text-green-600 font-bold" : ""}>
                    {validations.number ? "✓" : "○"} Number (0-9)
                  </p>
                  <p className={validations.special ? "text-green-600 font-bold" : ""}>
                    {validations.special ? "✓" : "○"} Special (@$!%*?&)
                  </p>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full text-white font-bold py-3 rounded-lg transition shadow-lg 
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-swish-darkblue hover:bg-blue-700'}`}
            >
              {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
            </button>

            <div className="mt-6 text-center text-gray-600 text-sm">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={toggleMode} 
                  className="text-swish-darkblue font-bold hover:underline ml-1"
                  type="button"
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;