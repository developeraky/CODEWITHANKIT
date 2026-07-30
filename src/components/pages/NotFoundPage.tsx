import React from 'react';
import { ArrowLeft, Home, Sparkles, Code2 } from 'lucide-react';

interface NotFoundPageProps {
  setCurrentPage: (page: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Code2 className="w-10 h-10" />
        </div>

        <span className="text-6xl font-extrabold font-mono text-amber-400 block">404</span>

        <h1 className="text-2xl font-bold text-white">Spatial Architecture Not Found</h1>

        <p className="text-xs text-zinc-400 leading-relaxed">
          The page or route you requested has shifted coordinates or does not exist in our production registry.
        </p>

        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return To CodeNexAnkit Main Engine</span>
        </button>
      </div>
    </div>
  );
};
