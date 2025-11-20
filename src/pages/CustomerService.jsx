import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CustomerService() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Where is my shipment?",
      answer: "You can track your shipment using the tracking number provided by the sender. Enter it on our Home or Track page for real-time updates. If the status hasn't changed in 48 hours, please contact support."
    },
    {
      question: "When will my shipment be delivered?",
      answer: "Delivery times depend on the service selected. Express shipments typically arrive in 1-3 business days, while Standard can take 5-7 days. Remote areas may require additional time."
    },
    {
      question: "How do I change my delivery address?",
      answer: "If your shipment hasn't been delivered yet, you can request a change via the 'Manage Delivery' tool in your Dashboard or contact support immediately. Note that address changes may incur a fee and delay delivery."
    },
    {
      question: "What are the prohibited items?",
      answer: "We do not ship hazardous materials, illegal substances, currency, or live animals. Please check our Customs Guide for a full list. Attempting to ship prohibited items may result in fines or legal action."
    },
    {
      question: "My package arrived damaged. What do I do?",
      answer: "We are sorry to hear that. Please take photos of the damaged packaging and the item immediately. File a claim within 7 days of delivery through your Dashboard or by emailing claims@swishportal.com."
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50 font-sans">
      
      {/* --- HERO HELP SECTION WITH IMAGE --- */}
      <div className="relative bg-swish-darkblue py-24 px-4 text-center overflow-hidden">
        {/* Background decorative circle */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-swish-accent opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-swish-accent font-bold uppercase tracking-widest text-sm mb-4 block">24/7 Support Center</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
            How can we help you today?
          </h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto shadow-2xl rounded-lg group">
            <input 
              type="text" 
              placeholder="Search for answers (e.g. 'lost package', 'refund')" 
              className="w-full p-5 rounded-lg outline-none text-swish-black text-lg transition-all duration-300 group-hover:ring-4 group-hover:ring-blue-400/30"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-swish-black text-white px-8 rounded-md font-bold hover:bg-gray-800 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* --- TOPICS GRID --- */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: 'Tracking & Delivery', icon: '📦' },
            { title: 'Shipping & Quotes', icon: '✈️' },
            { title: 'Customs & Duties', icon: '🛂' },
            { title: 'Billing & Claims', icon: '💳' }
          ].map((topic, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-transparent hover:border-swish-darkblue cursor-pointer transition transform hover:-translate-y-1 text-center group">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition duration-300 shadow-sm">
                {topic.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-lg group-hover:text-swish-darkblue">{topic.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12">
          
          {/* Left: Text */}
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-swish-black mb-4">Common Questions</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Find quick answers to the most frequent questions asked by our customers. Can't find what you need? Our team is just a click away.
            </p>
            <Link to="/contact" className="text-swish-darkblue font-bold border-b-2 border-swish-darkblue hover:text-blue-700 transition">
              View All FAQs →
            </Link>
          </div>

          {/* Right: Accordion */}
          <div className="md:w-2/3 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`border rounded-lg overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-swish-darkblue shadow-md' : 'border-gray-200'}`}>
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 text-left font-bold text-gray-700 transition"
                >
                  {faq.question}
                  <span className={`text-2xl text-swish-darkblue transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-5 bg-blue-50 text-gray-600 border-t border-gray-100 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CONTACT STRIP --- */}
      <div className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-swish-black rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/3"></div>

            <div className="text-white mb-8 md:mb-0 relative z-10">
              <h2 className="text-3xl font-bold mb-2">Still need help?</h2>
              <p className="text-gray-400">Our support team is available 24/7 to assist you.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <a href="mailto:support@swishportal.com" className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-lg hover:bg-white/20 text-white font-bold transition">
                <span>📧</span> Email Support
              </a>
              <button className="flex items-center justify-center gap-2 bg-swish-accent px-8 py-4 rounded-lg text-swish-black font-bold hover:bg-yellow-400 transition shadow-lg transform hover:-translate-y-1">
                <span>💬</span> Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CustomerService;