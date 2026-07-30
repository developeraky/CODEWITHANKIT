import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Apple, 
  Code, 
  Layers, 
  Users, 
  CloudLightning, 
  Bot, 
  Brain, 
  ShieldCheck, 
  Cloud, 
  Palette, 
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Card3D } from '../3d/Card3D';
import { SERVICES } from '../../data/companyData';
import { Service } from '../../types';

interface ServicesOverviewSectionProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceSlug: (slug: string) => void;
  openContactModal: () => void;
}

export const ServicesOverviewSection: React.FC<ServicesOverviewSectionProps> = ({
  setCurrentPage,
  setSelectedServiceSlug,
  openContactModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Engineering', 'Enterprise', 'Product', 'AI & Data', 'Infrastructure', 'Design'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Apple': return <Apple className="w-6 h-6" />;
      case 'Code': return <Code className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'CloudLightning': return <CloudLightning className="w-6 h-6" />;
      case 'Bot': return <Bot className="w-6 h-6" />;
      case 'Brain': return <Brain className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Cloud': return <Cloud className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const handleCardClick = (slug: string) => {
    setSelectedServiceSlug(slug);
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-xs font-mono text-[#FFD700] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Software Engineering Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#FFD700]">3D Interactive</span> Services.
          </h2>

          <p className="text-sm sm:text-base text-white/50">
            Hover over any service card to experience mouse-driven 3D depth, specular lighting, and structural specs.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all backdrop-blur-md cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#FFB900] text-black font-bold shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <Card3D
              key={service.id}
              glowColor={index % 2 === 0 ? 'gold' : 'blue'}
              className="h-full"
            >
              <div 
                onClick={() => handleCardClick(service.slug)}
                className="p-6 h-full flex flex-col justify-between cursor-pointer space-y-4 group bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-xl hover:bg-white/[0.06] hover:border-[#FFD700]/30 transition-all"
              >
                <div>
                  {/* Icon & Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 group-hover:scale-110 group-hover:bg-[#FFD700] group-hover:text-black transition-all duration-300">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/50 leading-relaxed mt-2">
                    {service.shortDescription}
                  </p>

                  {/* Feature Bullets */}
                  <div className="mt-4 space-y-1.5">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-[11px] text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Price & CTA */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/40 uppercase block font-mono">Starting From</span>
                    <span className="text-sm font-bold text-[#FFD700] font-mono">{service.startingPrice}</span>
                  </div>

                  <span className="text-xs font-semibold text-white group-hover:text-[#FFD700] flex items-center gap-1">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

      </div>
    </section>
  );
};
