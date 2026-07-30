import React, { useState } from 'react';
import { 
  SERVICES 
} from '../../data/companyData';
import { Service } from '../../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  DollarSign, 
  Code2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface ServicesPageProps {
  selectedServiceSlug?: string;
  openContactModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  selectedServiceSlug,
  openContactModal
}) => {
  const [activeSlug, setActiveSlug] = useState<string>(
    selectedServiceSlug || SERVICES[0].slug
  );

  const activeService = SERVICES.find(s => s.slug === activeSlug) || SERVICES[0];

  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Service Catalog</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Enterprise <span className="text-amber-400">Services & Solutions</span>.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            Explore detailed architectures, benefits, tech stacks, and transparent pricing across all 14 core engineering practices.
          </p>
        </div>

        {/* Service Sub-Nav Selector */}
        <div className="flex overflow-x-auto gap-2 pb-2 border-b border-zinc-800 no-scrollbar">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSlug(s.slug)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSlug === s.slug
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Active Service Deep Dive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Detail Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-8 rounded-3xl bg-zinc-900/90 border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {activeService.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Starting at <span className="text-amber-400 font-bold text-sm">{activeService.startingPrice}</span>
                </span>
              </div>

              <h2 className="text-3xl font-extrabold text-white">{activeService.title}</h2>
              <p className="text-sm text-zinc-300 leading-relaxed">{activeService.fullDescription}</p>

              {/* Benefits */}
              <div className="pt-4">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Key Business Benefits</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.benefits.map((b, i) => (
                    <div key={i} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Features */}
              <div className="pt-4">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>Architectural Capabilities</span>
                </h3>
                <div className="space-y-2">
                  {activeService.features.map((f, i) => (
                    <div key={i} className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300 flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{f}</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="pt-4">
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {activeService.technologies.map((t, i) => (
                    <span key={i} className="text-xs bg-zinc-950 text-amber-300 px-3 py-1 rounded-lg border border-zinc-800 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>Frequently Asked Questions ({activeService.title})</span>
              </h3>
              <div className="space-y-3">
                {activeService.faq.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <h4 className="text-xs font-bold text-white">{item.question}</h4>
                    <p className="text-xs text-zinc-400">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA & Instant Scope Calculator */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/30 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white">Need Custom Scope & Proposal?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Book a 15-minute consultation with our Principal Architect to receive a fixed-price roadmap for {activeService.title}.
              </p>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Starting Price</span>
                  <span className="text-amber-400 font-bold font-mono">{activeService.startingPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Avg Delivery Time</span>
                  <span className="text-white font-mono">4 - 6 Weeks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Source Ownership</span>
                  <span className="text-emerald-400 font-bold">100% Guaranteed</span>
                </div>
              </div>

              <button
                onClick={openContactModal}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>Schedule Discovery Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
