import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ChevronDown, 
  Menu as MenuIcon, 
  X, 
  Search, 
  Shield, 
  ArrowRight, 
  Sparkles,
  Briefcase,
  Code2,
  Users,
  Building2,
  BookOpen,
  DollarSign,
  PhoneCall
} from 'lucide-react';
import { SERVICES, INDUSTRIES } from '../../data/companyData';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedServiceSlug?: string;
  setSelectedServiceSlug?: (slug: string) => void;
  openContactModal: () => void;
  openWorkspaceModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  setSelectedServiceSlug,
  openContactModal,
  openWorkspaceModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [industriesDropdown, setIndustriesDropdown] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Services', page: 'services', hasDropdown: true },
    { name: 'Portfolio', page: 'portfolio' },
    { name: 'Tech Stack', page: 'technology' },
    { name: 'Industries', page: 'industries', hasIndDropdown: true },
    { name: 'About', page: 'about' },
    { name: 'Careers', page: 'careers' },
    { name: 'Blog', page: 'blog' },
    { name: 'Pricing', page: 'pricing' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setIndustriesDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (slug: string) => {
    if (setSelectedServiceSlug) {
      setSelectedServiceSlug(slug);
    }
    setCurrentPage('services');
    setServicesDropdown(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/40 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
            : 'bg-white/[0.02] backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FFD700] to-[#FF8C00] flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)] group-hover:scale-105 transition-transform duration-300">
                <Code2 className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tighter text-white font-sans flex items-center gap-1">
                  CODENEXANKIT<span className="text-[#FFD700]">.</span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5 backdrop-blur-lg">
              {navLinks.map((link) => (
                <div key={link.page} className="relative group">
                  {link.hasDropdown ? (
                    <div
                      onMouseEnter={() => setServicesDropdown(true)}
                      onMouseLeave={() => setServicesDropdown(false)}
                      className="relative"
                    >
                      <button
                        onClick={() => handleNavClick('services')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1 ${
                          currentPage === 'services'
                            ? 'text-[#FFD700] bg-white/10 font-bold shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Services
                        <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:rotate-180 transition-transform" />
                      </button>

                      {/* Services Mega Menu */}
                      {servicesDropdown && (
                        <div className="absolute top-full left-0 w-[640px] p-4 bg-[#08080c]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] grid grid-cols-2 gap-2 mt-2 z-50">
                          {SERVICES.slice(0, 10).map((service) => (
                            <div
                              key={service.id}
                              onClick={() => handleServiceSelect(service.slug)}
                              className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-[#FFD700]/30 cursor-pointer transition-all flex items-start space-x-3 group/item"
                            >
                              <div className="p-2 rounded-lg bg-[#FFD700]/10 text-[#FFD700] group-hover/item:bg-[#FFD700] group-hover/item:text-black transition-colors">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-white group-hover/item:text-[#FFD700] transition-colors">
                                  {service.title}
                                </h4>
                                <p className="text-xs text-white/50 line-clamp-1">{service.shortDescription}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : link.hasIndDropdown ? (
                    <div
                      onMouseEnter={() => setIndustriesDropdown(true)}
                      onMouseLeave={() => setIndustriesDropdown(false)}
                      className="relative"
                    >
                      <button
                        onClick={() => handleNavClick('industries')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1 ${
                          currentPage === 'industries'
                            ? 'text-[#FFD700] bg-white/10 font-bold shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Industries
                        <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:rotate-180 transition-transform" />
                      </button>

                      {/* Industries Dropdown */}
                      {industriesDropdown && (
                        <div className="absolute top-full left-0 w-[420px] p-3 bg-[#08080c]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] grid grid-cols-2 gap-1.5 mt-2 z-50">
                          {INDUSTRIES.map((ind) => (
                            <div
                              key={ind.id}
                              onClick={() => handleNavClick('industries')}
                              className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.08] text-xs font-medium text-white/80 hover:text-blue-400 cursor-pointer transition-colors flex items-center space-x-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
                              <span className="truncate">{ind.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.page)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                        currentPage === link.page
                          ? 'text-[#FFD700] bg-white/10 font-bold shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Workspace Sync Button */}
              {openWorkspaceModal && (
                <button
                  onClick={openWorkspaceModal}
                  className="px-3.5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
                  title="Google Workspace Hub (Sheets, Gmail, Chat, Forms)"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Workspace Hub</span>
                </button>
              )}

              {/* Admin Portal Button */}
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-4 py-2 rounded-full border text-xs font-semibold transition-all flex items-center gap-1.5 backdrop-blur-md ${
                  currentPage === 'admin'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
                title="Admin Dashboard & CRM"
              >
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Admin CRM</span>
              </button>

              {/* Get Started CTA */}
              <button
                onClick={openContactModal}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFB900] text-black text-xs font-bold shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="p-2 rounded-xl bg-zinc-900 border border-blue-500/30 text-blue-400"
                title="Admin CRM"
              >
                <Shield className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-2xl pt-24 px-6 pb-8 overflow-y-auto lg:hidden">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-amber-400/10 text-amber-400 border border-amber-500/30'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                {link.name}
              </button>
            ))}

            <div className="pt-4 border-t border-zinc-800 flex flex-col space-y-3">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-3 px-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-300 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Admin & CRM Portal</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openContactModal();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-bold text-center text-sm shadow-lg shadow-amber-500/20"
              >
                Schedule Free Discovery Call
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
