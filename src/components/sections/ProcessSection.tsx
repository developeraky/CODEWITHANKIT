import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../../data/companyData';

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Engineering Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Our 7-Stage <span className="text-amber-400">Agile Delivery Protocol</span>.
          </h2>

          <p className="text-sm text-zinc-400">
            From initial business discovery to 24/7 post-launch SLA monitoring, every step is executed with precision.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 relative group"
            >
              <span className="text-3xl font-extrabold font-mono text-amber-400/30 group-hover:text-amber-400 transition-colors">
                {step.step}
              </span>

              <h3 className="text-base font-bold text-white mt-2 group-hover:text-amber-400 transition-colors">
                {step.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
