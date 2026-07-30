import React from 'react';
import { INDUSTRIES } from '../../data/companyData';
import { Sparkles, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

interface IndustriesPageProps {
  openContactModal: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ openContactModal }) => {
  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vertical Domain Expertise</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Transforming <span className="text-amber-400">10+ Global Industries</span>.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            We build domain-specific platforms tailored to regulatory standards (HIPAA, PCI-DSS, SOC2) and specialized workflow automations.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRIES.map((ind) => (
            <div key={ind.id} className="p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-400 font-mono uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-500/20">
                    {ind.metrics}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white">{ind.name}</h2>
                <p className="text-xs text-amber-400/90 font-mono">{ind.headline}</p>
                <p className="text-xs text-zinc-300 leading-relaxed">{ind.description}</p>

                <div>
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Key Solutions Delivered</h3>
                  <div className="space-y-1.5">
                    {ind.keySolutions.map((s, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>Case Study Highlight:</span>
                <span className="text-amber-400 font-bold">{ind.caseStudyHighlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="p-8 rounded-3xl bg-zinc-900 border border-amber-500/30 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Don't See Your Exact Industry Listed?</h2>
          <p className="text-xs text-zinc-400 max-w-lg mx-auto">
            Our custom software engineering framework adapts to any complex enterprise domain. Contact our architects for a specialized consult.
          </p>
          <button
            onClick={openContactModal}
            className="px-6 py-3 bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs"
          >
            Schedule Industry Consultation
          </button>
        </div>

      </div>
    </div>
  );
};
