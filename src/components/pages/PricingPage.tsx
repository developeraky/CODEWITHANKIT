import React, { useState } from 'react';
import { PRICING_PLANS } from '../../data/companyData';
import { Sparkles, CheckCircle2, ArrowRight, Calculator, ShieldCheck, DollarSign } from 'lucide-react';

interface PricingPageProps {
  openContactModal: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ openContactModal }) => {
  const [billingCycle, setBillingCycle] = useState<'fixed' | 'monthly'>('fixed');

  // Interactive Project Cost Estimator State
  const [appType, setAppType] = useState('Web & Mobile App');
  const [teamSize, setTeamSize] = useState('3 Engineers + 1 Architect');
  const [aiIncluded, setAiIncluded] = useState(true);
  const [securityTier, setSecurityTier] = useState('SOC2 & HIPAA');

  const calculateEstimate = () => {
    let base = 12500;
    if (appType === 'Enterprise SaaS / AI Platform') base += 10000;
    if (appType === 'Custom ERP & Logistics Platform') base += 15000;
    if (teamSize.includes('5 Engineers')) base += 8000;
    if (aiIncluded) base += 4500;
    return `$${base.toLocaleString()}`;
  };

  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Investment Models</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Simple, <span className="text-amber-400">Fixed-Price & Sprint</span> Plans.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            No surprise billing, no hidden fees. Every sprint includes full source code ownership, QA testing, and 24/7 SLA monitoring.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center space-x-4">
            <span className={`text-xs ${billingCycle === 'fixed' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>
              Fixed-Price Milestones
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'fixed' ? 'monthly' : 'fixed')}
              className="w-12 h-6 rounded-full bg-zinc-900 border border-amber-500/30 p-1 transition-colors relative"
            >
              <div
                className={`w-4 h-4 rounded-full bg-amber-400 transition-transform ${
                  billingCycle === 'monthly' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs ${billingCycle === 'monthly' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>
              Monthly Retainer Pods <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded ml-1">Save 15%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((tier) => (
            <div
              key={tier.id}
              className={`p-8 rounded-3xl bg-zinc-900/90 border ${
                tier.popular ? 'border-amber-400 shadow-[0_0_30px_rgba(255,215,0,0.15)] relative' : 'border-zinc-800'
              } flex flex-col justify-between space-y-6`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-zinc-950 text-[10px] font-bold font-mono px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular For Scaleups
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{tier.tagline}</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                    ${billingCycle === 'fixed' ? tier.priceMonthly.toLocaleString() : tier.priceYearly.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-500 block mt-1">
                    {billingCycle === 'fixed' ? 'per 4-week sprint' : 'per month (billed annually)'}
                  </span>
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-800">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={openContactModal}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                  tier.popular
                    ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-950 hover:bg-zinc-800 text-white border border-zinc-800'
                }`}
              >
                Select {tier.name}
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Cost Estimator Calculator */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-amber-500/30 space-y-6">
          <div className="flex items-center space-x-3 border-b border-zinc-800 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-500/30 text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Interactive Scope Cost Estimator</h2>
              <p className="text-xs text-zinc-400">Configure your technical requirements to generate an instant sprint budget estimate.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2">Project Type</label>
              <select
                value={appType}
                onChange={(e) => setAppType(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white"
              >
                <option>Web & Mobile App</option>
                <option>Enterprise SaaS / AI Platform</option>
                <option>Custom ERP & Logistics Platform</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2">Engineering Pod Size</label>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white"
              >
                <option>3 Engineers + 1 Architect</option>
                <option>5 Engineers + 1 Architect + QA</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2">Gemini AI / RAG Integration</label>
              <button
                onClick={() => setAiIncluded(!aiIncluded)}
                className={`w-full p-3 rounded-xl text-xs font-bold border ${
                  aiIncluded ? 'bg-amber-400 text-zinc-950 border-amber-400' : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                {aiIncluded ? '✓ Included (Gemini AI)' : 'x Excluded'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 text-center flex flex-col justify-center">
              <span className="text-[10px] text-zinc-500 uppercase font-mono">Estimated Sprint Investment</span>
              <span className="text-2xl font-extrabold text-amber-400 font-mono mt-1">{calculateEstimate()}</span>
              <span className="text-[10px] text-zinc-400 font-sans mt-1">4-Week Delivery Sprint</span>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={openContactModal}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-bold rounded-xl text-xs"
            >
              Reserve Dedicated Pod & Lock In Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
