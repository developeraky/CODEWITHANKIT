import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Search, 
  CheckCircle2, 
  Clock, 
  Filter, 
  ShieldCheck, 
  BarChart3,
  RefreshCw,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import { Lead } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'applications' | 'analytics'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (Array.isArray(data)) {
        setLeads(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(l => {
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-500/20">
              CodeNexAnkit Internal Operations
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Executive CRM & Lead Pipeline</h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchLeads}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex items-center gap-2 text-xs"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Pipeline</span>
            </button>
          </div>
        </div>

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-amber-500/20 space-y-1">
            <span className="text-2xl font-extrabold text-amber-400">{leads.length}</span>
            <span className="text-xs font-bold text-white font-sans block">Total Inbound Leads</span>
            <span className="text-[10px] text-zinc-500 block">Real-time Pipeline</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-blue-500/20 space-y-1">
            <span className="text-2xl font-extrabold text-blue-400">
              ${(leads.length * 22500).toLocaleString()}
            </span>
            <span className="text-xs font-bold text-white font-sans block">Pipeline Value</span>
            <span className="text-[10px] text-zinc-500 block">Est. Sprint Contracts</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-emerald-500/20 space-y-1">
            <span className="text-2xl font-extrabold text-emerald-400">94.2%</span>
            <span className="text-xs font-bold text-white font-sans block">Lead Qualification Rate</span>
            <span className="text-[10px] text-zinc-500 block">Gemini Pre-qualification</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-amber-500/20 space-y-1">
            <span className="text-2xl font-extrabold text-amber-400">&lt; 15 Mins</span>
            <span className="text-xs font-bold text-white font-sans block">Avg Response Time</span>
            <span className="text-[10px] text-zinc-500 block">Architect SLA</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-2 border-b border-zinc-800 pb-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'leads' ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            Inbound Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analytics' ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            Conversion Analytics
          </button>
        </div>

        {/* Leads Table / Pipeline */}
        {activeTab === 'leads' && (
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search lead by name or company..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                />
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-zinc-400">Filter Status:</span>
                {['All', 'New', 'Contacted', 'Proposal Sent', 'Qualified'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                      statusFilter === status ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-950 text-zinc-400'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-400 font-mono text-[10px] uppercase">
                  <tr>
                    <th className="p-3">Client / Contact</th>
                    <th className="p-3">Practice Needed</th>
                    <th className="p-3">Est. Budget</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Received At</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-zinc-950/50">
                      <td className="p-3">
                        <span className="font-bold text-white block">{lead.name}</span>
                        <span className="text-[11px] text-zinc-400 block">{lead.company}</span>
                        <span className="text-[10px] text-zinc-500 block font-mono">{lead.email}</span>
                      </td>
                      <td className="p-3 font-mono text-amber-400">{lead.serviceNeeded}</td>
                      <td className="p-3 font-mono text-emerald-400">{lead.budget}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-400/10 text-amber-400 border border-amber-500/20">
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-3 text-[10px] font-mono text-zinc-500">{lead.createdAt}</td>
                      <td className="p-3 space-x-2">
                        <a
                          href={`mailto:${lead.email}`}
                          className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px] inline-flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" /> Email
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-6">
            <h2 className="text-xl font-bold text-white">System Conversion Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <span className="text-zinc-400 block">Top Inbound Practice</span>
                <span className="text-lg font-bold text-amber-400">Web & AI Engineering (42%)</span>
              </div>

              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <span className="text-zinc-400 block">Primary Regional Lead Traffic</span>
                <span className="text-lg font-bold text-blue-400">United States & UK (68%)</span>
              </div>

              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <span className="text-zinc-400 block">Avg Contract Size</span>
                <span className="text-lg font-bold text-emerald-400">$32,500</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
