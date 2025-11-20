import React from 'react';

function Privacy() {
  return (
    <div className="pt-20 min-h-screen bg-white font-sans text-gray-800">
      
      {/* Header */}
      <div className="bg-gray-900 py-16 px-4 border-b border-gray-800 text-white">
        <div className="container mx-auto max-w-5xl">
           <div className="flex items-center gap-2 mb-2">
             <span className="bg-green-500 h-2 w-2 rounded-full"></span>
             <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Privacy & Security</p>
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold">Privacy Policy</h1>
           <p className="text-gray-400 mt-4">Effective Date: November 1, 2025</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* SIDEBAR */}
          <div className="md:w-1/4 hidden md:block">
            <div className="sticky top-32 space-y-2 border-l-2 border-gray-100 pl-4">
              <p className="font-bold text-swish-black mb-4">Contents</p>
              {['Data Collection', 'How We Use Data', 'Data Sharing', 'Security', 'Your Rights', 'Cookies'].map((item) => (
                <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} key={item} className="block text-gray-500 hover:text-swish-darkblue hover:border-l-2 hover:border-swish-darkblue -ml-[18px] pl-4 transition text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="md:w-3/4 prose prose-lg prose-blue max-w-none">
            
            <p className="lead text-xl text-gray-600 mb-8">
              At Swish Portal, we take your privacy seriously. This policy describes what personal information we collect and how we use it.
            </p>

            <section id="data-collection" className="mb-12">
              <h3 className="text-2xl font-bold text-swish-black mb-4">1. Data Collection</h3>
              <p className="mb-4">
                We collect information to provide better services to all our users. The types of information we collect include:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <li className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <strong>Personal Info:</strong> Name, email address, phone number.
                </li>
                <li className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <strong>Shipping Data:</strong> Addresses, package contents, value.
                </li>
                <li className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <strong>Device Info:</strong> IP address, browser type, OS.
                </li>
                <li className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <strong>Payment Data:</strong> Transaction history (we do not store card numbers).
                </li>
              </ul>
            </section>

            <section id="how-we-use-data" className="mb-12">
              <h3 className="text-2xl font-bold text-swish-black mb-4">2. How We Use Data</h3>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To process and deliver your shipments.</li>
                <li>To provide customer support and tracking updates.</li>
                <li>To detect and prevent fraud.</li>
                <li>To comply with legal obligations and customs requirements.</li>
              </ul>
            </section>

            <section id="security" className="mb-12">
              <h3 className="text-2xl font-bold text-swish-black mb-4">3. Security</h3>
              <p className="mb-4">
                We work hard to protect Swish Portal and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
              </p>
              <div className="flex items-center gap-4 bg-green-50 p-6 rounded-xl border border-green-100 text-green-800">
                 <span className="text-3xl">🔒</span>
                 <p className="text-sm font-bold">All data is encrypted using SSL/TLS technology during transmission and stored securely on encrypted servers.</p>
              </div>
            </section>

            <section id="cookies" className="mb-12">
              <h3 className="text-2xl font-bold text-swish-black mb-4">4. Cookies</h3>
              <p>
                We use cookies and similar technologies to provide and support our websites and services. You can adjust your browser settings to refuse cookies, but some features of the platform may not function correctly.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;