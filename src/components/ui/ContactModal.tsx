import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Building2, 
  DollarSign,
  Sparkles,
  Loader2
} from 'lucide-react';

import { collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, getAccessToken } from '../../lib/firebase';
import { createOrGetLeadsSpreadsheet, exportLeadsToSheet } from '../../lib/workspace';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceNeeded: 'Web Development',
    budget: '₹5,00,000 - ₹10,00,000',
    preferredDate: '',
    preferredTime: '10:00 AM IST',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        status: 'New',
        score: Math.floor(Math.random() * 20) + 80,
        createdAt: new Date().toISOString()
      };

      try {
        await addDoc(collection(db, 'leads'), payload);
      } catch (fErr) {
        handleFirestoreError(fErr, OperationType.WRITE, 'leads');
      }

      const token = await getAccessToken();
      if (token) {
        try {
          const sheetId = await createOrGetLeadsSpreadsheet(token);
          await exportLeadsToSheet(token, sheetId, [payload]);
        } catch (sheetErr) {
          console.warn('Auto Google Sheets sync skipped:', sheetErr);
        }
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Lead submission error:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#08080c]/90 border border-white/10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden backdrop-blur-2xl">
        {/* Header */}
        <div className="p-6 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Schedule 15-Min Discovery Call</h3>
              <p className="text-xs text-white/50">Speak directly with a CodeNexAnkit Principal Architect</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Discovery Call Confirmed!</h3>
              <p className="text-sm text-white/60 max-w-md mx-auto">
                Thank you, <span className="text-[#FFD700] font-semibold">{formData.name}</span>. Our engineering lead has reserved your discovery slot and sent calendar details to <span className="text-white">{formData.email}</span>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFB900] text-black font-bold rounded-full text-sm shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              >
                Close & Continue Exploring
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1 font-mono">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Vance"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]/50 backdrop-blur-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1 font-mono">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]/50 backdrop-blur-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1 font-mono">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]/50 backdrop-blur-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1 font-mono">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Fintech Global Inc."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]/50 backdrop-blur-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1 font-mono">Service Needed</label>
                  <select
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFD700]/50"
                  >
                    <option>Web Development</option>
                    <option>Mobile App Development</option>
                    <option>AI & Machine Learning</option>
                    <option>SaaS Development</option>
                    <option>ERP / CRM Custom Platform</option>
                    <option>Cyber Security Audit</option>
                    <option>Cloud Infrastructure</option>
                    <option>UI/UX Spatial Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1 font-mono">Estimated Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFD700]/50"
                  >
                    <option>₹3,00,000 - ₹5,00,000</option>
                    <option>₹5,00,000 - ₹10,00,000</option>
                    <option>₹10,00,000 - ₹25,00,000</option>
                    <option>₹25,00,000+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1 font-mono">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFD700]/50 backdrop-blur-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1 font-mono">Preferred Time Slot</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFD700]/50"
                  >
                    <option>10:00 AM EST</option>
                    <option>02:00 PM EST</option>
                    <option>05:00 PM EST</option>
                    <option>08:00 PM IST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1 font-mono">Project Summary / Goals</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us briefly about your app requirements, target timeline, or tech stack..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]/50 backdrop-blur-md"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-[#FFD700] to-[#FFB900] text-black font-bold rounded-full text-sm shadow-[0_0_20px_rgba(255,215,0,0.35)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Reserving Discovery Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Reserve Call Slot</span>
                    <Send className="w-4 h-4 text-black" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
