import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../../data/companyData';
import { TeamMember } from '../../types';
import { Sparkles, Linkedin, Github, Twitter, Mail, Award } from 'lucide-react';

interface TeamPageProps {
  openContactModal: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ openContactModal }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>World-Class Leadership & Engineers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Meet The <span className="text-amber-400">CodeNexAnkit Minds</span>.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            Our team brings together ex-Silicon Valley tech leads, AI researchers, WebGL 3D artists, and cloud infrastructure specialists.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 space-y-4 text-center cursor-pointer group"
            >
              <div className="relative w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-br from-amber-400 to-blue-600 shadow-xl overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">{member.name}</h3>
                <span className="text-xs text-amber-400 font-medium block">{member.role}</span>
                <span className="text-[10px] text-zinc-500 font-mono block mt-1">{member.department}</span>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2">{member.bio}</p>

              <div className="flex items-center justify-center space-x-3 pt-2 text-zinc-400">
                <Linkedin className="w-4 h-4 hover:text-amber-400" />
                <Github className="w-4 h-4 hover:text-amber-400" />
                <Twitter className="w-4 h-4 hover:text-amber-400" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 text-zinc-400">✕</button>
            <div className="flex items-center space-x-4">
              <img src={selectedMember.image} alt={selectedMember.name} className="w-20 h-20 rounded-full object-cover border-2 border-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-white">{selectedMember.name}</h3>
                <span className="text-xs text-amber-400 block">{selectedMember.role}</span>
                <span className="text-[11px] text-zinc-500 font-mono">{selectedMember.location}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900 p-4 rounded-xl">{selectedMember.bio}</p>
            <div>
              <h4 className="text-xs font-mono text-zinc-400 mb-2">Technical Expertise:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.skills.map((s, i) => (
                  <span key={i} className="text-xs bg-zinc-900 text-amber-300 px-3 py-1 rounded-lg border border-zinc-800 font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
