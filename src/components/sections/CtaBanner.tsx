import React from 'react';
import { ArrowRight, Calendar, PhoneCall, Sparkles, ShieldCheck } from 'lucide-react';

interface CtaBannerProps {
  openContactModal: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ openContactModal }) => {
  return (
    <section className="py-20 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-amber-500/40 shadow-[0_20px_60px_rgba(255,215,0,0.15)] relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-500/30 text-xs font-mono text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready To Transform Your Architecture?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Let's Build Your <span className="text-amber-400">Next-Gen Software Engine</span> Today.
              </h2>

              <p className="text-sm text-zinc-300 max-w-xl">
                Schedule a 15-minute discovery call with our Lead Architects. We provide a full technical scope roadmap, fixed-price estimate, and team allocation within 24 hours.
              </p>

              <div className="flex items-center space-x-4 text-xs font-mono text-zinc-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  100% IP Ownership
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  NDA Guaranteed
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-3">
              <button
                onClick={openContactModal}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-blue-600 hover:from-amber-300 hover:to-blue-500 text-zinc-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Free Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+18009028321"
                className="w-full py-3.5 px-6 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-white font-semibold text-xs text-center flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Direct: +1 (800) 902-8321</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
