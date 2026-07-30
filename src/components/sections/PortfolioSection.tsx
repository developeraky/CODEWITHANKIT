import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { Card3D } from '../3d/Card3D';
import { PROJECTS } from '../../data/companyData';
import { Project } from '../../types';

interface PortfolioSectionProps {
  setCurrentPage: (page: string) => void;
  setSelectedProjectSlug?: (slug: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  setCurrentPage,
  setSelectedProjectSlug
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Applications' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI & Diagnostics' },
    { id: 'saas', label: 'SaaS Platforms' },
    { id: 'erp', label: 'Enterprise ERP' }
  ];

  const filteredProjects = filterCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filterCategory);

  const openCaseStudy = (project: Project) => {
    setSelectedCaseStudy(project);
    if (setSelectedProjectSlug) {
      setSelectedProjectSlug(project.slug);
    }
  };

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Engineering Impact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Featured <span className="text-amber-400">Case Studies</span> & Client Works.
          </h2>

          <p className="text-sm text-zinc-400">
            Explore how CodeNexAnkit engineered high-throughput payment networks, HIPAA medical AI, global supply chain ERPs, and 3D real estate platforms.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  filterCategory === cat.id
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card3D
              key={project.id}
              glowColor={index % 2 === 0 ? 'gold' : 'blue'}
              className="h-full"
            >
              <div className="p-5 flex flex-col justify-between h-full space-y-4">
                <div>
                  {/* Image Container with Hover Zoom */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-zinc-800 group/img">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                    
                    <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase">
                      {project.industry}
                    </span>

                    <button
                      onClick={() => openCaseStudy(project)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-zinc-950/90 text-amber-400 hover:bg-amber-400 hover:text-zinc-950 transition-colors"
                      title="View Case Study"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Key Metrics Badges */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-zinc-900 font-mono text-[11px]">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="bg-zinc-900 p-1.5 rounded-lg text-center border border-zinc-800">
                        <span className="block text-amber-400 font-bold">{m.value}</span>
                        <span className="text-[9px] text-zinc-500 truncate block">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => openCaseStudy(project)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* View All Portfolio CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setCurrentPage('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/30 text-amber-400 hover:text-white font-bold text-sm transition-all"
          >
            Explore All 50+ Case Studies & Projects
          </button>
        </div>

      </div>

      {/* Case Study Deep-Dive Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-zinc-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                  {selectedCaseStudy.industry} Case Study
                </span>
                <h3 className="text-xl font-bold text-white">{selectedCaseStudy.title}</h3>
                <p className="text-xs text-zinc-400">{selectedCaseStudy.client}</p>
              </div>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-300 leading-relaxed">
              <img
                src={selectedCaseStudy.image}
                alt={selectedCaseStudy.title}
                className="w-full h-56 object-cover rounded-2xl border border-zinc-800"
              />

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800 text-center font-mono">
                {selectedCaseStudy.metrics.map((m, idx) => (
                  <div key={idx}>
                    <span className="block text-xl font-bold text-amber-400">{m.value}</span>
                    <span className="text-xs text-zinc-400 font-sans">{m.label}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">
                  The Client Challenge
                </h4>
                <p className="text-xs text-zinc-300 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                  {selectedCaseStudy.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">
                  CodeNexAnkit Engineering Solution
                </h4>
                <p className="text-xs text-zinc-300 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                  {selectedCaseStudy.solution}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Measurable Business Impact
                </h4>
                <p className="text-xs text-zinc-300 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                  {selectedCaseStudy.impact}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-zinc-400 mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.technologies.map((tech, i) => (
                    <span key={i} className="text-xs bg-zinc-900 text-amber-300 px-3 py-1 rounded-lg border border-zinc-800 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
