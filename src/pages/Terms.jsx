import React from 'react';

function Terms() {
  return (
    <div className="pt-20 min-h-screen bg-white font-sans text-gray-800">
      
      {/* Header */}
      <div className="bg-gray-100 py-16 px-4 border-b border-gray-200">
        <div className="container mx-auto max-w-5xl">
           <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Legal</p>
           <h1 className="text-4xl md:text-5xl font-extrabold text-swish-black">Terms of Use</h1>
           <p className="text-gray-500 mt-4">Effective Date: November 1, 2025</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* SIDEBAR NAVIGATION (Sticky) */}
          <div className="md:w-1/4 hidden md:block">
            <div className="sticky top-32 space-y-2 border-l-2 border-gray-100 pl-4">
              <p className="font-bold text-swish-black mb-4">Table of Contents</p>
              {['Introduction', 'Account Registration', 'Shipping Services', 'Prohibited Items', 'Payments & Fees', 'Liability', 'Termination'].map((item) => (
                <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} key={item} className="block text-gray-500 hover:text-swish-darkblue hover:border-l-2 hover:border-swish-darkblue -ml-[18px] pl-4 transition text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="md:w-3/4 prose prose-lg prose-blue max-w-none">
            
            <p className="lead text-xl text-gray-600 mb-8">
              Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the Swish Portal website and services operated by Swish Logistics ("us", "we", or "our").
            </p>

            <section id="introduction" className="mb-12">
              <h3 className="text-2xl font-bold text-swish-black mb-4">1. Introduction</h3>
              <p className="mb-4">
                By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section id="account-registration" className="mb-12">
              <h3 className="text-2xl font-bold text-swish-black mb-4">2. Account Registration</h3>
              <p className="mb-4">
                When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>
            </section>

            <section id="shipping-services" className="mb-12">
              <h3 className="text-2xl font-bold text-swish-black mb-4">3. Shipping Services</h3>
              <p className="mb-4">
                Swish Portal provides logistics intermediary services. We act as an agent to arrange transportation of your shipment. We reserve the right to refuse any shipment at any time. Transit times quoted are estimates based on normal operating conditions.
              </p>
            </section>

            <section id="prohibited-items" className="mb-12">
              <h3 className="text-2xl font-bold text-swish-black mb-4">4. Prohibited Items</h3>
              <p className="mb-4">
                You agree not to ship the following items. This list is not exhaustive:
              </p>
              <ul className="list-disc pl-6 space-y-2 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <li>Explosives, firearms, or weaponry.</li>
                <li>Live animals or perishable goods without prior approval.</li>
                <li>Illegal drugs or narcotics.</li>
                <li>Currency, precious stones, or high-value negotiable instruments.</li>
              </ul>
            </section>

            <section id="payments-fees" className="mb-12">
              <h3 className="text-2xl font-bold text-swish-black mb-4">5. Payments & Fees</h3>
              <p>
                All shipping fees must be paid prior to dispatch unless you have a credit account. We accept major credit cards and bank transfers. Prices are subject to change based on fuel surcharges and currency fluctuations.
              </p>
            </section>

            <div className="bg-blue-50 border-l-4 border-swish-darkblue p-6 mt-12">
              <p className="font-bold text-swish-darkblue">Contact Us</p>
              <p className="text-sm text-gray-600 mt-1">If you have any questions about these Terms, please contact us at legal@swishportal.com.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;