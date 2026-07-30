import React, { useState } from 'react';
import { BLOGS } from '../../data/companyData';
import { Blog } from '../../types';
import { Sparkles, Search, Clock, User, ArrowRight, BookOpen, Bot, Loader2 } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingPost, setReadingPost] = useState<Blog | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);

  const categories = ['All', 'Architecture', 'AI Engineering', 'Mobile', 'UI/UX Design', 'Cloud & DevOps'];

  const filteredPosts = BLOGS.filter(post => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const generateAISummary = async (post: Blog) => {
    setSummarizing(true);
    setAiSummary(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Provide a concise 3-bullet technical executive summary of this engineering article: "${post.title}". Excerpt: ${post.excerpt}`
        })
      });
      const data = await res.json();
      setAiSummary(data.reply || 'Key takeaway: Modern Next.js 15 & Gemini AI architectures reduce infrastructure latency while raising conversion metrics.');
    } catch (err) {
      setAiSummary('Key takeaway: Modern Next.js 15 & Gemini AI architectures reduce infrastructure latency while raising conversion metrics.');
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CodeNexAnkit Engineering Journal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Tech Insights, <span className="text-amber-400">AI & 3D Web</span> Trends.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            Deep technical articles written by our Senior Principal Architects and AI Researchers.
          </p>

          {/* Search */}
          <div className="pt-4 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles by keyword or tag..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 space-y-4 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-zinc-800">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-zinc-950/90 text-amber-400 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase border border-amber-500/30">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-[11px] text-zinc-400 font-mono mb-2">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-amber-400" /> {typeof post.author === 'string' ? post.author : post.author.name}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-zinc-500" /> {post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2 line-clamp-2">{post.excerpt}</p>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-[9px] bg-zinc-950 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setReadingPost(post);
                    setAiSummary(null);
                  }}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {readingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 overflow-y-auto max-h-[90vh] space-y-6">
            <button onClick={() => setReadingPost(null)} className="absolute top-4 right-4 text-zinc-400">✕</button>

            <span className="text-xs font-mono text-amber-400 uppercase">{readingPost.category} • {readingPost.date}</span>
            <h2 className="text-2xl font-bold text-white">{readingPost.title}</h2>

            <div className="flex items-center space-x-4 text-xs text-zinc-400">
              <span>Author: <strong className="text-white">{typeof readingPost.author === 'string' ? readingPost.author : readingPost.author.name}</strong></span>
              <span>•</span>
              <span>{readingPost.readTime}</span>
            </div>

            <img src={readingPost.image} alt={readingPost.title} className="w-full h-60 object-cover rounded-2xl border border-zinc-800" />

            {/* Gemini AI Article Summarizer */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-mono">
                  <Bot className="w-4 h-4" /> NexaBot Gemini AI Article Digest
                </span>
                <button
                  onClick={() => generateAISummary(readingPost)}
                  disabled={summarizing}
                  className="px-3 py-1 bg-amber-400 text-zinc-950 text-[10px] font-bold rounded-lg"
                >
                  {summarizing ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Generate Executive Summary'}
                </button>
              </div>
              {aiSummary && (
                <p className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-zinc-800 whitespace-pre-line">
                  {aiSummary}
                </p>
              )}
            </div>

            <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-4">
              <p>{readingPost.content}</p>
              <p>In modern software engineering, performance and security can never be afterthoughts. By adopting strict server-side hydration models and edge API routing, organizations unlock unprecedented conversion rates.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
