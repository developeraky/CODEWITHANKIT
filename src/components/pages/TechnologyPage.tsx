import React from 'react';
import { TECH_STACK } from '../../data/companyData';
import { Sparkles, Code2, Cpu, Database, Server, Cloud, Brain, ArrowRight } from 'lucide-react';

interface TechnologyPageProps {
  openContactModal: () => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ openContactModal }) => {
  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Interactive Technology Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Built On <span className="text-amber-400">Battle-Tested Stack</span> Standards.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            We reject legacy slow frameworks. CodeNexAnkit uses Next.js 15, React 19, Node.js microservices, PostgreSQL, Docker, AWS, and Gemini AI.
          </p>
        </div>

        {/* Stack Groups */}
        <div className="space-y-12">
          {TECH_STACK.map((group, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-6">
              <div className="flex items-center space-x-3 border-b border-zinc-800 pb-4">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-500/30 text-amber-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{group.category} Engineering</h2>
                  <p className="text-xs text-zinc-400">High-concurrency frameworks optimized for speed and resilience.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">{item.name}</h3>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {item.highlight}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400">{item.desc}</p>

                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mb-1">
                        <span>Production Competency</span>
                        <span className="text-amber-400 font-bold">{item.level}</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-400 to-blue-500 h-full rounded-full" style={{ width: item.level }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-amber-500/30 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Need a Stack Benchmark Consultation?</h2>
          <p className="text-xs text-zinc-400 max-w-lg mx-auto">
            Our Principal Architects perform technical stack audits to help you select between serverless, Docker microservices, or Edge SSR.
          </p>
          <button
            onClick={openContactModal}
            className="px-6 py-3 bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs"
          >
            Request Architecture Review Call
          </button>
        </div>

      </div>
    </div>
  );
};
