import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { ServicesOverviewSection } from '../sections/ServicesOverviewSection';
import { WhyChooseUsSection } from '../sections/WhyChooseUsSection';
import { TechStackSection } from '../sections/TechStackSection';
import { PortfolioSection } from '../sections/PortfolioSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { ProcessSection } from '../sections/ProcessSection';
import { StatsSection } from '../sections/StatsSection';
import { CtaBanner } from '../sections/CtaBanner';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceSlug: (slug: string) => void;
  setSelectedProjectSlug?: (slug: string) => void;
  openContactModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  setSelectedServiceSlug,
  setSelectedProjectSlug,
  openContactModal
}) => {
  return (
    <div className="w-full">
      <HeroSection setCurrentPage={setCurrentPage} openContactModal={openContactModal} />
      <ServicesOverviewSection
        setCurrentPage={setCurrentPage}
        setSelectedServiceSlug={setSelectedServiceSlug}
        openContactModal={openContactModal}
      />
      <WhyChooseUsSection />
      <TechStackSection />
      <PortfolioSection setCurrentPage={setCurrentPage} setSelectedProjectSlug={setSelectedProjectSlug} />
      <TestimonialsSection />
      <StatsSection />
      <ProcessSection />
      <CtaBanner openContactModal={openContactModal} />
    </div>
  );
};
