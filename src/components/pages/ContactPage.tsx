import React, { useState } from 'react';
import { COMPANY_INFO } from '../../data/companyData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  Building2,
  Calendar
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceNeeded: 'Web Development',
    budget: '$10,000 - $25,000',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Principal Architect Contact</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Let's Talk <span className="text-amber-400">Software & AI</span> Engineering.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            Our principal architects review incoming requirements and respond with technical roadmaps within 24 hours.
          </p>
        </div>

        {/* Form & Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-zinc-900/90 border border-amber-500/30 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-3 border-b border-zinc-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-500/30 text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Start a Project Consultation</h2>
                <p className="text-xs text-zinc-400">Fill out your project specifications for a fixed-price sprint quote.</p>
              </div>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Consultation Request Received!</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Thank you, <span className="text-amber-400 font-semibold">{formData.name}</span>. An automated confirmation and calendar invite has been dispatched to <span className="text-white">{formData.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Vance"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="FinTech Global Inc."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Required Practice</label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    >
                      <option>Web Development</option>
                      <option>Mobile App Development</option>
                      <option>AI & Machine Learning</option>
                      <option>SaaS Platform</option>
                      <option>Custom ERP / CRM System</option>
                      <option>Cyber Security Audit</option>
                      <option>Cloud Infrastructure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Estimated Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    >
                      <option>$5,000 - $10,000</option>
                      <option>$10,000 - $25,000</option>
                      <option>$25,000 - $50,000</option>
                      <option>$50,000 - $100,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Project Details / Goals</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current application, target timeline, or tech stack preference..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-blue-600 text-zinc-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Submit Inquiry For Architecture Review</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4">
              <h3 className="text-base font-bold text-white">Direct Communications</h3>

              <div className="space-y-3 text-xs">
                <a href={`tel:${COMPANY_INFO.contact.phone}`} className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between hover:border-amber-400 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="text-[10px] text-zinc-500 block uppercase font-mono">Primary Call Line</span>
                      <span className="text-white font-bold">{COMPANY_INFO.contact.phone}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono">24/7 Available</span>
                </a>

                <a href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between hover:border-emerald-400 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-zinc-500 block uppercase font-mono">WhatsApp Support</span>
                      <span className="text-white font-bold">{COMPANY_INFO.contact.whatsapp}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Instant Chat</span>
                </a>

                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between hover:border-blue-400 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <div>
                      <span className="text-[10px] text-zinc-500 block uppercase font-mono">General Email</span>
                      <span className="text-white font-bold">{COMPANY_INFO.contact.email}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-blue-400 font-mono">Inbound Inquiries</span>
                </a>
              </div>
            </div>

            {/* Offices */}
            <div className="p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4">
              <h3 className="text-base font-bold text-white">Global Offices</h3>
              <div className="space-y-3">
                {COMPANY_INFO.offices.map((office, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{office.city}, {office.country}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">{office.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
