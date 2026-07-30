import React, { useState } from 'react';
import { 
  Layout, 
  Server, 
  Smartphone, 
  Database, 
  Cloud, 
  Brain,
  Code2,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { TECH_STACK } from '../../data/companyData';

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  const categories = TECH_STACK.map(t => t.category);

  const activeGroup = TECH_STACK.find(t => t.category === activeCategory) || TECH_STACK[0];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend': return <Layout className="w-4 h-4" />;
      case 'Backend': return <Server className="w-4 h-4" />;
      case 'Mobile': return <Smartphone className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Cloud & DevOps': return <Cloud className="w-4 h-4" />;
      case 'AI & Data': return <Brain className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Modern Technology Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Battle-Tested <span className="text-amber-400">Enterprise Tech Stack</span>.
          </h2>

          <p className="text-sm text-zinc-400">
            We engineer high-throughput systems using industry-standard frameworks, zero-trust security pipelines, and AI orchestrations.
          </p>

          {/* Filter Tabs */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tech Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeGroup.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/30 transition-all duration-300 space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {item.highlight}
                </span>
              </div>

              <p className="text-xs text-zinc-400">{item.desc}</p>

              {/* Competency Level Bar */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mb-1">
                  <span>Production Mastery</span>
                  <span className="text-amber-400 font-bold">{item.level}</span>
                </div>
                <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-blue-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: item.level }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
