import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Star, 
  Code2, 
  Cpu, 
  Globe2, 
  CheckCircle2,
  X
} from 'lucide-react';
import { HeroGlobeCanvas } from '../3d/HeroGlobeCanvas';
import { COMPANY_INFO } from '../../data/companyData';

interface HeroSectionProps {
  setCurrentPage: (page: string) => void;
  openContactModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setCurrentPage, openContactModal }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#050505] text-white">
      {/* Background Ambient Glows & Perspective Grid */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/5 rounded-full blur-[150px] rotate-45 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-left pt-4">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-widest font-bold text-blue-400 font-mono">Next-Gen Software & AI Engineering</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white uppercase">
              THE FUTURE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FFD700]">OF SOFTWARE.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl font-sans">
              We architect hyper-scale digital ecosystems using Next.js 15, custom AI agents, WebGL 3D engines, and cloud-native microservices for the world's most ambitious brands.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={openContactModal}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFB900] text-black text-sm font-bold shadow-[0_0_20px_rgba(255,215,0,0.35)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Start Project</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-6 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm font-semibold hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-[#FFD700]" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Social Proof Stack */}
            <div className="pt-6 border-t border-white/5 flex items-center gap-6">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-zinc-800 flex items-center justify-center text-xs font-bold text-amber-400">US</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-zinc-700 flex items-center justify-center text-xs font-bold text-blue-400">UK</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-zinc-600 flex items-center justify-center text-xs font-bold text-emerald-400">UAE</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]">500+</div>
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Trusted by Fortune 500</p>
                <p className="text-white/40">Global technology partners</p>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic Globe Canvas in Frosted Frame */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full h-[400px] sm:h-[480px] relative rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(37,99,235,0.15)] flex items-center justify-center overflow-hidden">
              <HeroGlobeCanvas />
              
              {/* Orbiting Frosted Glass Badges */}
              <div className="absolute top-6 right-6 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-[10px] uppercase font-bold text-blue-400 tracking-wider font-mono shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                Quantum Engine
              </div>
              <div className="absolute bottom-6 left-6 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-[10px] uppercase font-bold text-[#FFD700] tracking-wider font-mono shadow-[0_0_12px_rgba(255,215,0,0.3)]">
                Neural Core
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Interface Frosted Cards & Vertical Stats Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
          {/* Service Feature Cards */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-lg hover:border-white/15 transition-all cursor-default space-y-2 group">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Code2 className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Web Architecture</h3>
              <p className="text-[11px] text-white/40 leading-relaxed">High-performance Next.js ecosystems at enterprise scale.</p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-lg hover:border-white/15 transition-all cursor-default space-y-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#FFD700]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Cpu className="w-4 h-4 text-[#FFD700]" />
              </div>
              <h3 className="text-sm font-bold text-white">AI Automation</h3>
              <p className="text-[11px] text-white/40 leading-relaxed">LLM orchestration and intelligent workflow agents.</p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-lg hover:border-white/15 transition-all cursor-default space-y-2 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Cyber Security</h3>
              <p className="text-[11px] text-white/40 leading-relaxed">Zero-trust infrastructure and SOC2 protocol auditing.</p>
            </div>
          </div>

          {/* Vertical Gold Stats Panel */}
          <div className="lg:col-span-3 bg-gradient-to-b from-[#FFD700] to-[#FFA500] rounded-2xl p-5 flex flex-col justify-between text-black shadow-[0_0_25px_rgba(255,215,0,0.25)]">
            <div>
              <p className="text-[10px] uppercase font-black opacity-70 tracking-wider mb-1 font-mono">Efficiency SLA</p>
              <p className="text-3xl font-black italic tracking-tighter">99.99%</p>
            </div>
            <div className="h-[1px] bg-black/15 w-full my-3"></div>
            <div>
              <p className="text-[10px] uppercase font-black opacity-70 tracking-wider mb-1 font-mono">Deployment Speed</p>
              <p className="text-3xl font-black italic tracking-tighter">&lt; 0.4s</p>
            </div>
          </div>
        </div>

        {/* Floating Meta Location Banner */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-[10px] text-white/30 tracking-[0.2em] uppercase font-bold font-mono border-t border-white/5">
          <span>USA</span>
          <span>•</span>
          <span>UNITED ARAB EMIRATES</span>
          <span>•</span>
          <span>UNITED KINGDOM</span>
          <span>•</span>
          <span>SINGAPORE</span>
        </div>

      </div>

      {/* Video Demo Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl bg-[#08080c] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-white/5 flex items-center justify-between border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                CodeNexAnkit - 3D Architecture & Engineering Demo
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-[#050505] flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <Code2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white">Interactive Engineering Preview</h4>
              <p className="text-xs text-white/50 max-w-md">
                Experience our sub-second Next.js SSR architectures, WebGL 3D holographic rendering engines, and real-time Gemini AI integration in action.
              </p>
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  openContactModal();
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFB900] text-black font-bold rounded-full text-xs shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              >
                Schedule Technical Architecture Session
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
