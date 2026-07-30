import React, { useState } from 'react';
import { PROJECTS } from '../../data/companyData';
import { Project } from '../../types';
import { Search, Sparkles, ArrowRight, Maximize2, ExternalLink } from 'lucide-react';

interface PortfolioPageProps {
  setSelectedProjectSlug?: (slug: string) => void;
  openContactModal: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ openContactModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Case Studies & Client Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineering <span className="text-amber-400">Masterpieces</span> & Results.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            Search across our enterprise client projects in FinTech, MedTech, Supply Chain, 3D PropTech, and AI SaaS.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by technology, industry or project name..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {['all', 'web', 'mobile', 'ai', 'saas', 'erp'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Industries' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 space-y-4 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-zinc-800">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-zinc-950/90 text-amber-400 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase border border-amber-500/30">
                    {p.industry}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1">{p.description}</p>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-zinc-900 font-mono text-[11px]">
                  {p.metrics.map((m, i) => (
                    <div key={i} className="bg-zinc-950 p-1.5 rounded-lg text-center border border-zinc-800">
                      <span className="block text-amber-400 font-bold">{m.value}</span>
                      <span className="text-[9px] text-zinc-500 truncate block">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {p.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[9px] bg-zinc-950 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveCaseStudy(p)}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 overflow-y-auto max-h-[90vh] space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs text-amber-400 font-mono uppercase">{activeCaseStudy.industry}</span>
                <h3 className="text-xl font-bold text-white">{activeCaseStudy.title}</h3>
              </div>
              <button onClick={() => setActiveCaseStudy(null)} className="p-2 rounded-xl bg-zinc-900 text-zinc-400">✕</button>
            </div>

            <img src={activeCaseStudy.image} alt={activeCaseStudy.title} className="w-full h-56 object-cover rounded-2xl border border-zinc-800" />

            <div className="grid grid-cols-3 gap-4 bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-center font-mono">
              {activeCaseStudy.metrics.map((m, idx) => (
                <div key={idx}>
                  <span className="block text-xl font-bold text-amber-400">{m.value}</span>
                  <span className="text-xs text-zinc-400 font-sans">{m.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-xs text-zinc-300">
              <div>
                <h4 className="font-bold text-amber-400 uppercase mb-1">Challenge</h4>
                <p className="bg-zinc-900 p-3 rounded-xl">{activeCaseStudy.challenge}</p>
              </div>
              <div>
                <h4 className="font-bold text-blue-400 uppercase mb-1">Solution</h4>
                <p className="bg-zinc-900 p-3 rounded-xl">{activeCaseStudy.solution}</p>
              </div>
              <div>
                <h4 className="font-bold text-emerald-400 uppercase mb-1">Impact</h4>
                <p className="bg-zinc-900 p-3 rounded-xl">{activeCaseStudy.impact}</p>
              </div>
            </div>

            <button onClick={openContactModal} className="w-full py-3 bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs">
              Request Similar Architecture Build
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
