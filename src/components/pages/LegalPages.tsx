import React, { useState } from 'react';
import { COMPANY_INFO, FAQS } from '../../data/companyData';
import { ShieldCheck, HelpCircle, FileText, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface LegalPagesProps {
  pageType: 'privacy-policy' | 'terms-and-conditions' | 'refund-policy' | 'cookie-policy' | 'faq';
}

export const LegalPages: React.FC<LegalPagesProps> = ({ pageType }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const getTitle = () => {
    switch (pageType) {
      case 'privacy-policy': return 'Privacy Policy & Data Security';
      case 'terms-and-conditions': return 'Terms & Conditions of Service';
      case 'refund-policy': return 'Sprint Refund & Satisfaction Guarantee';
      case 'cookie-policy': return 'Cookie & Telemetry Policy';
      case 'faq': return 'Frequently Asked Questions';
    }
  };

  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Legal Compliance & Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{getTitle()}</h1>
          <p className="text-xs text-zinc-400 font-mono">Effective Date: January 1, 2026 | Version 2.4</p>
        </div>

        {/* Content switch */}
        {pageType === 'faq' ? (
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </div>

                {openFaq === idx && (
                  <p className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-zinc-800">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-6 text-xs text-zinc-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white">1. Overview & Commitment</h2>
            <p>
              CodeNexAnkit ("CodeNexAnkit", "we", "us", "our") maintains zero-trust data protection policies across all engineering projects, client cloud repositories, and web applications.
            </p>

            <h2 className="text-lg font-bold text-white">2. Intellectual Property Ownership</h2>
            <p>
              Upon receipt of milestone payments, 100% of the custom source code, design artifacts, database schemas, and AI prompts developed by CodeNexAnkit are transferred to the client.
            </p>

            <h2 className="text-lg font-bold text-white">3. Security & Non-Disclosure</h2>
            <p>
              All client project data is governed by mutual Non-Disclosure Agreements (NDAs). CodeNexAnkit enforces SOC2 Type II and HIPAA compliant infrastructure controls.
            </p>

            <h2 className="text-lg font-bold text-white">4. Contact Legal Operations</h2>
            <p>
              For legal inquiries or data privacy requests, contact our legal counsel at <a href={`mailto:${COMPANY_INFO.contact.email}`} className="text-amber-400 font-mono">{COMPANY_INFO.contact.email}</a>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
