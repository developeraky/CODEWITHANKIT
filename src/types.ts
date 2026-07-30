export interface Service {
  id: string;
  slug: string;
  title: string;
  category: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  startingPrice: string;
  faq: { question: string; answer: string }[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  category: 'web' | 'mobile' | 'ai' | 'saas' | 'erp' | 'cloud' | 'cybersecurity';
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  liveUrl?: string;
  challenge: string;
  solution: string;
  impact: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Internship';
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceNeeded: string;
  budget: string;
  message: string;
  score: number; // AI lead qualification score (0-100)
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Closed';
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  experienceYears: string;
  coverLetter: string;
  status: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Rejected';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Engineering' | 'Design' | 'Marketing' | 'Advisors';
  bio: string;
  image: string;
  linkedin: string;
  github?: string;
  twitter?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  videoUrl?: string;
  projectResult: string;
}

export interface Industry {
  id: string;
  name: string;
  iconName: string;
  headline: string;
  description: string;
  keySolutions: string[];
  caseStudyHighlight: string;
  metrics: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  popular?: boolean;
  features: string[];
  deliverables: string[];
  cta: string;
}

export interface BookingSlot {
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
}
