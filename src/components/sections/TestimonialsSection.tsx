import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  Play, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { TESTIMONIALS } from '../../data/companyData';

export const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextTestimonial = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIdx];

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Executive Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            What <span className="text-amber-400">CTOs & Founders</span> Say About Us.
          </h2>

          <p className="text-sm text-zinc-400">
            Read authentic reviews from enterprise technology leaders across Fintech, HealthTech, PropTech, and SaaS.
          </p>
        </div>

        {/* Testimonial Showcase Card */}
        <div className="max-w-4xl mx-auto bg-zinc-900/90 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
          <Quote className="absolute top-6 right-8 w-20 h-20 text-amber-500/10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Avatar & Result Badge */}
            <div className="md:col-span-4 text-center space-y-4">
              <div className="relative w-28 h-28 mx-auto rounded-full p-1 bg-gradient-to-br from-amber-400 to-blue-600 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <img
                  src={current.avatar}
                  alt={current.clientName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{current.clientName}</h3>
                <span className="block text-xs text-amber-400 font-medium">{current.role}</span>
                <span className="block text-xs text-zinc-400 font-mono">{current.company}</span>
              </div>

              {/* Rating */}
              <div className="flex justify-center space-x-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>

            {/* Quote & Impact Result */}
            <div className="md:col-span-8 space-y-4">
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed italic">
                "{current.quote}"
              </p>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center space-x-3 text-xs font-mono">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">Key Project Achievement</span>
                  <span className="text-amber-400 font-bold">{current.projectResult}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Navigation Arrows */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500">
              Review {activeIdx + 1} of {TESTIMONIALS.length}
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white hover:border-amber-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white hover:border-amber-400 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
