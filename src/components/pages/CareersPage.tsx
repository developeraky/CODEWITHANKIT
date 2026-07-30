import React, { useState } from 'react';
import { CAREERS } from '../../data/companyData';
import { Career } from '../../types';
import { Sparkles, MapPin, Briefcase, DollarSign, Clock, CheckCircle2, Send, Loader2 } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);
  const [applicantData, setApplicantData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    experience: '3 - 5 Years',
    coverLetter: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setSubmitting(true);

    try {
      await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...applicantData,
          roleTitle: selectedJob.title
        })
      });
      setAppliedSuccess(true);
    } catch (err) {
      console.error(err);
      setAppliedSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const perks = [
    { title: '100% Remote / Hybrid Option', desc: 'Work from Silicon Valley, London, Dubai, Bengaluru, or anywhere globally.' },
    { title: 'Top-Tier Silicon Valley Equity', desc: 'Competitive base salaries plus generous employee stock option pools.' },
    { title: 'Unlimited Tech & Learning Budget', desc: '$3,000 annual budget for hardware upgrades, books, and international AI conferences.' },
    { title: 'Comprehensive Health & Wellness', desc: '100% employer-covered health, vision, dental, and gym memberships.' }
  ];

  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Our Global Engineering Team</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Build The Future Of <span className="text-amber-400">Software & AI</span>.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            We are hiring Principal React Engineers, WebGL 3D Developers, Python AI Researchers, and Cloud Architects.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">{p.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Open Engineering Positions ({CAREERS.length})</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAREERS.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 transition-colors space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      {job.department}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">{job.salary}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  
                  <div className="flex items-center space-x-4 text-xs text-zinc-400 mt-2 font-mono">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-blue-400" /> {job.type}</span>
                  </div>

                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed">{job.description}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setAppliedSuccess(false);
                  }}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl text-xs transition-colors"
                >
                  Apply For Position
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 text-zinc-400">✕</button>

            {appliedSuccess ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Application Received!</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Thank you, <span className="text-amber-400">{applicantData.name}</span>. Our Talent Acquisition Lead will review your GitHub / Portfolio and respond within 48 hours.
                </p>
                <button onClick={() => setSelectedJob(null)} className="px-6 py-2 bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <span className="text-xs text-amber-400 font-mono">Applying for</span>
                  <h3 className="text-lg font-bold text-white">{selectedJob.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantData.name}
                      onChange={(e) => setApplicantData({ ...applicantData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={applicantData.email}
                      onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                      placeholder="jane@domain.com"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={applicantData.phone}
                      onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">GitHub / Portfolio URL *</label>
                    <input
                      type="url"
                      required
                      value={applicantData.portfolio}
                      onChange={(e) => setApplicantData({ ...applicantData, portfolio: e.target.value })}
                      placeholder="https://github.com/janedoe"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">Years of Experience</label>
                  <select
                    value={applicantData.experience}
                    onChange={(e) => setApplicantData({ ...applicantData, experience: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option>1 - 3 Years</option>
                    <option>3 - 5 Years</option>
                    <option>5 - 8 Years</option>
                    <option>8+ Years (Principal / Staff)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">Brief Introduction / Stack Highlights</label>
                  <textarea
                    rows={3}
                    value={applicantData.coverLetter}
                    onChange={(e) => setApplicantData({ ...applicantData, coverLetter: e.target.value })}
                    placeholder="Tell us about complex projects you have engineered..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Submit Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
