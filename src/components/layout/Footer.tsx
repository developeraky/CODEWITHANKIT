import React, { useState } from 'react';
import { 
  Code2, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  Twitter, 
  Youtube,
  Shield,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  openContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, openContactModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      const emailToSubmit = newsletterEmail;
      setNewsletterEmail('');
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Newsletter Subscriber',
            email: emailToSubmit,
            serviceNeeded: 'Newsletter Subscription',
            message: 'User subscribed to monthly tech & AI newsletter'
          })
        });
      } catch (err) {
        console.error(err);
      }
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 text-white/60 pt-16 pb-12 overflow-hidden backdrop-blur-2xl">
      {/* Background ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navTo('home')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FFD700] to-[#FF8C00] flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)] overflow-hidden">
                <Code2 className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white tracking-tighter font-sans">
                CODENEXANKIT<span className="text-[#FFD700]">.</span>
              </span>
            </div>
            
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              CodeNexAnkit is a software engineering firm architecting sub-second web applications, mobile apps, custom AI models, and cloud infrastructure.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 font-mono">
                Subscribe to Tech & AI Engineering Insights
              </h4>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs text-[#FFD700] font-medium bg-[#FFD700]/10 p-3 rounded-2xl border border-[#FFD700]/30 backdrop-blur-md">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed! You will receive our monthly tech newsletter.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter business email..."
                    required
                    className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700]/50 backdrop-blur-md w-full"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#FFD700] to-[#FFB900] text-black font-bold px-5 py-2 rounded-full text-xs transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] shrink-0 cursor-pointer"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>

            {/* Live Operational Status */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span>All Systems Operational (99.99% Uptime SLA)</span>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h3 className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-4 font-mono">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-xs">
              {['Web Development', 'Mobile App Development', 'AI & ML Engineering', 'SaaS Development', 'ERP & CRM Systems', 'Cyber Security', 'Cloud & DevOps'].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navTo('services')}
                    className="hover:text-white transition-colors flex items-center gap-1 group text-white/60"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#FFD700] transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-4 font-mono">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'About CodeNexAnkit', page: 'about' },
                { label: 'Case Studies', page: 'portfolio' },
                { label: 'Technology Stack', page: 'technology' },
                { label: 'Industries Served', page: 'industries' },
                { label: 'Leadership & Team', page: 'team' },
                { label: 'Careers (We\'re Hiring)', page: 'careers' },
                { label: 'Blog & Insights', page: 'blog' },
                { label: 'Pricing Plans', page: 'pricing' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navTo(item.page)}
                    className="hover:text-white transition-colors text-white/60"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Global Hubs & Legal */}
          <div>
            <h3 className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-4 font-mono">
              Professional Journey & Experience
            </h3>
            <div className="space-y-3 text-xs">
              {COMPANY_INFO.offices.map((office, idx) => (
                <div key={idx} className="border-b border-white/5 pb-2">
                  <div className="font-semibold text-white/90 flex items-center justify-between">
                    <span>{office.city}, {office.country}</span>
                  </div>
                  <p className="text-[11px] text-white/40 line-clamp-1">{office.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <div>
            © 2026 CodeNexAnkit. All rights reserved. Architected with Next.js & 3D WebGL.
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <button onClick={() => navTo('faq')} className="hover:text-white">FAQ</button>
            <button onClick={() => navTo('privacy-policy')} className="hover:text-white">Privacy Policy</button>
            <button onClick={() => navTo('terms-and-conditions')} className="hover:text-white">Terms & Conditions</button>
            <button onClick={() => navTo('refund-policy')} className="hover:text-white">Refund Policy</button>
            <button onClick={() => navTo('cookie-policy')} className="hover:text-white">Cookie Policy</button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-2">
            <a href={COMPANY_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#FFD700] border border-white/10 transition-all">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href={COMPANY_INFO.socials.github} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#FFD700] border border-white/10 transition-all">
              <Github className="w-3.5 h-3.5" />
            </a>
            <a href={COMPANY_INFO.socials.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#FFD700] border border-white/10 transition-all">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href={COMPANY_INFO.socials.youtube} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#FFD700] border border-white/10 transition-all">
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
