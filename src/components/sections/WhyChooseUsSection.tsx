import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Lock,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Sub-Second Edge Performance',
      description: 'We optimize every bundle for 99+ Lighthouse speed scores, sub-50ms TTFB, and zero Cumulative Layout Shift.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      title: 'SOC2 & HIPAA Compliant',
      description: 'Zero-trust network architectures, client secret encryption, OWASP penetration testing, and regulatory certifications.'
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: '100% IP & Source Code Ownership',
      description: 'Full intellectual property, clean GitHub repositories, Dockerized deployments, and cloud credentials belong 100% to you.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      title: 'Guaranteed 3.4x ROI Impact',
      description: 'Our software engineering directly drives conversion growth, reduces server infrastructure overhead, and automates manual workflows.'
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Stats & Achievements */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering Excellence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Why Global Industry Leaders Rely On <span className="text-amber-400">CodeNexAnkit</span>.
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed">
              We bridge the gap between complex software engineering and high-converting 3D spatial user interfaces. No junior handoffs, no delayed deadlines.
            </p>

            {/* Achievement Counters Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 font-mono">
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/20">
                <span className="text-2xl font-bold text-amber-400">98.5%</span>
                <span className="block text-xs text-zinc-400 font-sans mt-1">Client Retention Rate</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-blue-500/20">
                <span className="text-2xl font-bold text-blue-400">42ms</span>
                <span className="block text-xs text-zinc-400 font-sans mt-1">Avg API Response Time</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-blue-500/20">
                <span className="text-2xl font-bold text-blue-400">28</span>
                <span className="block text-xs text-zinc-400 font-sans mt-1">Countries Served</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/20">
                <span className="text-2xl font-bold text-amber-400">0</span>
                <span className="block text-xs text-zinc-400 font-sans mt-1">Security Incidents</span>
              </div>
            </div>
          </div>

          {/* Right Side: Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 space-y-3 group"
              >
                <div className="p-3 rounded-xl bg-zinc-950 w-fit border border-zinc-800 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
