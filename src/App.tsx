import React, { useState, useEffect } from 'react';
import { Global3DBackground } from './components/3d/Global3DBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AIChatWidget } from './components/ai/AIChatWidget';
import { ContactModal } from './components/ui/ContactModal';
import { WorkspaceIntegrationsModal } from './components/ui/WorkspaceIntegrationsModal';

import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { PortfolioPage } from './components/pages/PortfolioPage';
import { TechnologyPage } from './components/pages/TechnologyPage';
import { IndustriesPage } from './components/pages/IndustriesPage';
import { TeamPage } from './components/pages/TeamPage';
import { CareersPage } from './components/pages/CareersPage';
import { BlogPage } from './components/pages/BlogPage';
import { PricingPage } from './components/pages/PricingPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminDashboardPage } from './components/pages/AdminDashboardPage';
import { LegalPages } from './components/pages/LegalPages';
import { NotFoundPage } from './components/pages/NotFoundPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>('web-development');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string>('aeropay-global');
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState<boolean>(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            setSelectedServiceSlug={setSelectedServiceSlug}
            setSelectedProjectSlug={setSelectedProjectSlug}
            openContactModal={() => setContactModalOpen(true)}
          />
        );
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} openContactModal={() => setContactModalOpen(true)} />;
      case 'services':
        return (
          <ServicesPage
            selectedServiceSlug={selectedServiceSlug}
            openContactModal={() => setContactModalOpen(true)}
          />
        );
      case 'portfolio':
        return (
          <PortfolioPage
            setSelectedProjectSlug={setSelectedProjectSlug}
            openContactModal={() => setContactModalOpen(true)}
          />
        );
      case 'technology':
        return <TechnologyPage openContactModal={() => setContactModalOpen(true)} />;
      case 'industries':
        return <IndustriesPage openContactModal={() => setContactModalOpen(true)} />;
      case 'team':
        return <TeamPage openContactModal={() => setContactModalOpen(true)} />;
      case 'careers':
        return <CareersPage />;
      case 'blog':
        return <BlogPage />;
      case 'pricing':
        return <PricingPage openContactModal={() => setContactModalOpen(true)} />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'privacy-policy':
      case 'terms-and-conditions':
      case 'refund-policy':
      case 'cookie-policy':
      case 'faq':
        return <LegalPages pageType={currentPage as any} />;
      default:
        return <NotFoundPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-amber-400 selection:text-zinc-950 relative overflow-hidden">
      {/* Interactive Site-Wide 3D Canvas Background */}
      <Global3DBackground />

      <div className="relative z-10">
        {/* Global Navbar */}
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSelectedServiceSlug={setSelectedServiceSlug}
          openContactModal={() => setContactModalOpen(true)}
          openWorkspaceModal={() => setWorkspaceModalOpen(true)}
        />

        {/* Page Body View */}
        <main className="min-h-screen">
          {renderPage()}
        </main>

        {/* Global Footer */}
        <Footer
          setCurrentPage={setCurrentPage}
          openContactModal={() => setContactModalOpen(true)}
        />

        {/* Global Floating AI Assistant Widget */}
        <AIChatWidget openContactModal={() => setContactModalOpen(true)} />

        {/* Global Discovery Call / Contact Modal */}
        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />

        {/* Global Google Workspace Hub Modal */}
        <WorkspaceIntegrationsModal
          isOpen={workspaceModalOpen}
          onClose={() => setWorkspaceModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
