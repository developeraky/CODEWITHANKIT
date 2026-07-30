import React from 'react';
import { COMPANY_INFO } from '../../data/companyData';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Enterprise Projects Delivered', value: COMPANY_INFO.stats.projectsCompleted, highlight: 'Global Scale' },
    { label: 'Active Retained Clients', value: COMPANY_INFO.stats.activeClients, highlight: 'Long-term Partners' },
    { label: 'Countries & Markets', value: COMPANY_INFO.stats.countriesServed, highlight: 'Silicon Valley, London, Dubai' },
    { label: 'Client Revenue Generated', value: COMPANY_INFO.stats.revenueGenerated, highlight: 'Measurable Value' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center font-mono">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-zinc-950/80 border border-amber-500/20 hover:border-amber-400/60 transition-colors shadow-lg"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 block mb-1">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-white font-sans block mb-1">
                {stat.label}
              </span>
              <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">
                {stat.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
