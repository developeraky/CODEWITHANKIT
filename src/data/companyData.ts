import { Service, Project, Blog, Career, TeamMember, Testimonial, Industry, PricingPlan } from '../types';
import ankitPhoto from '../assets/images/ankit_kumar_founder_1785360646142.jpg';

export const COMPANY_INFO = {
  name: 'CodeNexAnkit',
  tagline: 'Engineering Next-Gen AI & Enterprise Digital Solutions',
  shortDesc: 'CodeNexAnkit is a global futuristic software engineering firm building scalable web applications, native mobile apps, AI models, cloud infrastructures, and high-performance enterprise systems.',
  foundedYear: 2018,
  stats: {
    projectsCompleted: '450+',
    activeClients: '120+',
    countriesServed: '28',
    revenueGenerated: '₹1,500 Cr+',
    clientRetentionRate: '98.5%',
    teamSize: '160+',
    lighthouseScoreAvg: '99',
  },
  offices: [
    { city: 'KBS PRIVATE LIMITED', country: 'India', address: 'Sector 69, Noida, Uttar Pradesh 201309', phone: '+91 9971681065' },
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-993b08259',
    github: 'https://github.com/developeraky',
    twitter: 'https://twitter.com/developeraky',
    youtube: 'https://youtube.com/@developeraky',
  },
  contact: {
    email: 'developercybersec@gmail.com',
    salesEmail: 'developercybersec@gmail.com',
    supportEmail: 'developercybersec@gmail.com',
    phone: '+91 9971681065',
    whatsapp: '+91 6206246870',
  }
};

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    slug: 'web-development',
    title: 'Web Development',
    category: 'Engineering',
    iconName: 'Globe',
    shortDescription: 'High-speed, SEO-focused, ultra-responsive web applications powered by React, Next.js, and modern WebGL architectures.',
    fullDescription: 'We craft high-performance web applications with sub-second load times, sub-pixel responsive layouts, and modern architecture. Built with Next.js 15, TypeScript, Tailwind, and micro-frontends.',
    features: ['Server-Side Rendering & Edge Caching', 'Interactive 3D & WebGL Experiences', 'Headless CMS Integration', 'Real-Time WebSockets', 'Automated CI/CD Deployment'],
    benefits: ['Sub-second page loading speed', '99+ Lighthouse performance score', 'Seamless multi-device fluidity', 'Maximized search engine visibility'],
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Node.js'],
    startingPrice: '₹3,99,000',
    faq: [
      { question: 'What frontend framework do you recommend?', answer: 'We default to Next.js 15 with React and TypeScript for optimal speed, SSR SEO, and scale.' },
      { question: 'How long does a web project take?', answer: 'Standard web applications take 4 to 8 weeks depending on complexity and features.' }
    ]
  },
  {
    id: 'mobile-dev',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    category: 'Engineering',
    iconName: 'Smartphone',
    shortDescription: 'Cross-platform and native mobile apps built with React Native and Flutter with 60FPS UI and offline sync.',
    fullDescription: 'Architecting ultra-fluid mobile experiences with native performance, biometric security, offline caching, and real-time push engines for millions of users.',
    features: ['Single Codebase Cross-Platform', 'Native Module Integrations', 'Biometric Auth & Local Encryption', 'Background Sync & Push Engine', 'App Store & Play Store Publishing'],
    benefits: ['Reduced 40% development cost', 'Unified user experience across iOS & Android', 'Instant app store compliance'],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'SQLite'],
    startingPrice: '₹5,49,000',
    faq: [
      { question: 'Do you build native or cross-platform apps?', answer: 'We support both Native (Swift/Kotlin) and cross-platform (React Native/Flutter) based on your performance targets.' }
    ]
  },
  {
    id: 'android-dev',
    slug: 'android-development',
    title: 'Android Development',
    category: 'Engineering',
    iconName: 'Cpu',
    shortDescription: 'High-performance Kotlin & Jetpack Compose native Android solutions tailored for Google Play ecosystem.',
    fullDescription: 'Custom native Android apps optimized for diverse hardware specs, foldable screens, tablet viewports, and deep OS level device integrations.',
    features: ['Jetpack Compose UI Engine', 'Background Workers & Alarms', 'Android Wear & TV Extensions', 'Hardware Sensor Bluetooth APIs', 'Play Integrity API Security'],
    benefits: ['Optimized RAM and battery lifecycle', 'Hardware-level security compliance', 'Seamless Android tablet support'],
    technologies: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Hilt', 'Room DB', 'Retrofit'],
    startingPrice: '₹4,99,000',
    faq: [
      { question: 'Can you optimize for low-end Android devices?', answer: 'Yes, we perform rigorous profiling for memory and device compatibility across 100+ device profiles.' }
    ]
  },
  {
    id: 'ios-dev',
    slug: 'ios-development',
    title: 'iOS Development',
    category: 'Engineering',
    iconName: 'Apple',
    shortDescription: 'Premium Swift & SwiftUI applications for iPhone, iPad, Apple Watch, and Vision Pro platforms.',
    fullDescription: 'Bespoke iOS applications leveraging Apple Silicon performance, Metal graphics engine, CoreML artificial intelligence, and Apple Wallet integrations.',
    features: ['SwiftUI & Combine Framework', 'Apple Vision Pro Spatial UI', 'CoreML On-Device AI', 'WidgetKit & Live Activities', 'In-App Purchase & Apple Pay'],
    benefits: ['Sleek Human Interface Guidelines design', 'Ultra-secure Keychain storage', 'High conversion user flows'],
    technologies: ['Swift', 'SwiftUI', 'CoreData', 'CoreML', 'Metal', 'Xcode'],
    startingPrice: '₹5,49,000',
    faq: [
      { question: 'Do you assist with Apple App Store approval?', answer: 'Yes, our team handles complete App Store submissions, metadata optimization, and guideline compliance.' }
    ]
  },
  {
    id: 'software-dev',
    slug: 'software-development',
    title: 'Software Development',
    category: 'Enterprise',
    iconName: 'Code',
    shortDescription: 'Mission-critical enterprise software, desktop solutions, and custom backend engines built for scale.',
    fullDescription: 'Robust software engineering tailored for complex business logic, legacy modernization, microservices architecture, and distributed processing.',
    features: ['Distributed Microservices Architecture', 'High-Throughput Queue Processing', 'Legacy System Migration', 'Automated Testing Suites', 'Multi-tenant Data Isolation'],
    benefits: ['99.99% operational uptime', 'Scalable to millions of requests/sec', 'Zero-downtime hot deployments'],
    technologies: ['Java / Spring Boot', 'Node.js', 'Go', 'Python / Django', 'Docker', 'Kubernetes'],
    startingPrice: '₹7,99,000',
    faq: [
      { question: 'Can you modernize our 10-year-old legacy system?', answer: 'Yes, we specialize in strangler-fig pattern modernizations that replace legacy modules with zero downtime.' }
    ]
  },
  {
    id: 'erp-dev',
    slug: 'erp-development',
    title: 'ERP Development',
    category: 'Enterprise',
    iconName: 'Layers',
    shortDescription: 'Custom Enterprise Resource Planning platforms integrating inventory, HR, finance, and supply chain.',
    fullDescription: 'Unified enterprise platforms that eliminate operational silos, automate workflow approvals, and present executive real-time business intelligence dashboards.',
    features: ['Supply Chain & Logistics Tracking', 'Automated Financial Reconciliation', 'HR, Payroll & Attendance Engine', 'Warehouse Inventory RFID Sync', 'Custom Role-Based Access Control'],
    benefits: ['35% reduction in operational cost', 'Real-time financial visibility', 'Elimination of manual spreadsheets'],
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'React', 'D3.js', 'Docker'],
    startingPrice: '₹11,99,000',
    faq: [
      { question: 'Can the ERP integrate with our existing accounting software?', answer: 'Yes, we create bi-directional connectors for QuickBooks, SAP, Xero, and custom ledgers.' }
    ]
  },
  {
    id: 'crm-dev',
    slug: 'crm-development',
    title: 'CRM Development',
    category: 'Enterprise',
    iconName: 'Users',
    shortDescription: 'Intelligent Customer Relationship Management platforms with automated lead scoring and pipeline management.',
    fullDescription: 'Empower sales and customer support teams with AI-driven pipeline tracking, automated email cadences, phone dialers, and predictive deal forecasting.',
    features: ['Visual Kanban Pipeline', 'AI Lead Qualification Scoring', 'Omnichannel Communication Hub', 'Automated Follow-up Sequences', 'Sales Performance Analytics'],
    benefits: ['2.5x increase in sales close rate', 'Automated lead assignment', 'Zero lead dropouts'],
    technologies: ['React', 'Express', 'PostgreSQL', 'Gemini AI', 'Twilio', 'SendGrid'],
    startingPrice: '₹6,99,000',
    faq: [
      { question: 'Can we migrate contacts from Salesforce or HubSpot?', answer: 'Yes, we provide 1-click data migration scripts for all major CRM providers.' }
    ]
  },
  {
    id: 'saas-dev',
    slug: 'saas-development',
    title: 'SaaS Development',
    category: 'Product',
    iconName: 'CloudLightning',
    shortDescription: 'Cloud-native multi-tenant SaaS platforms with automated billing, usage tracking, and tenant isolation.',
    fullDescription: 'Turn product ideas into recurring revenue software with scalable multi-tenancy, Stripe usage billing, team workspaces, feature gating, and analytics.',
    features: ['Multi-Tenant Database Architecture', 'Stripe & PayPal Subscription Engine', 'Team Workspaces & Role Management', 'Usage-Based API Metering', 'Automated Onboarding Flow'],
    benefits: ['Rapid time-to-market in under 60 days', 'Ready-to-scale subscription engine', 'Low churn user experience'],
    technologies: ['Next.js', 'Node.js', 'Stripe API', 'Supabase / PostgreSQL', 'Redis'],
    startingPrice: '₹8,99,000',
    faq: [
      { question: 'Do you build billing and team management into the SaaS?', answer: 'Yes, full subscription management, tier upgrades, invoices, and team permissions are built-in.' }
    ]
  },
  {
    id: 'ai-dev',
    slug: 'ai-development',
    title: 'AI Development',
    category: 'AI & Data',
    iconName: 'Bot',
    shortDescription: 'Custom Large Language Models, RAG knowledge bots, autonomous agents, and AI workflow automation.',
    fullDescription: 'Harness the power of generative AI, vector search databases, fine-tuned models, and intelligent agent orchestrators to automate human workflows.',
    features: ['Enterprise RAG Knowledge Graphs', 'Autonomous Agentic Workflows', 'Fine-Tuned LLMs (Gemini, Claude, Llama)', 'Vector Database Search (Pinecone, Qdrant)', 'AI Agent Function Calling'],
    benefits: ['90% faster internal query resolutions', '24/7 automated customer interaction', 'Proprietary knowledge security'],
    technologies: ['Gemini API', 'Python', 'LangChain', 'LlamaIndex', 'Pinecone', 'FastAPI'],
    startingPrice: '₹9,99,000',
    faq: [
      { question: 'Is our company data kept private when using AI?', answer: 'Yes, we implement enterprise-grade zero-retention API configurations and isolated vector storage.' }
    ]
  },
  {
    id: 'ml-dev',
    slug: 'machine-learning',
    title: 'Machine Learning',
    category: 'AI & Data',
    iconName: 'Brain',
    shortDescription: 'Predictive analytics algorithms, computer vision systems, recommendation engines, and neural networks.',
    fullDescription: 'Transform raw enterprise data into competitive intelligence using custom deep learning models, anomaly detection, predictive forecasting, and object recognition.',
    features: ['Predictive Forecasting Models', 'Computer Vision & Facial Recognition', 'Natural Language Processing (NLP)', 'Recommendation System Engines', 'Anomaly & Fraud Detection'],
    benefits: ['98%+ prediction accuracy', 'Automated visual quality control', 'Reduced fraudulent transactions'],
    technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Pandas', 'Python'],
    startingPrice: '₹11,99,000',
    faq: [
      { question: 'How much training data do we need to start?', answer: 'We can work with synthetic data or clean existing historical sets starting from a few thousand records.' }
    ]
  },
  {
    id: 'cyber-sec',
    slug: 'cyber-security',
    title: 'Cyber Security',
    category: 'Infrastructure',
    iconName: 'ShieldCheck',
    shortDescription: 'Penetration testing, code audit, threat vulnerability assessment, SOC2, and zero-trust security architecture.',
    fullDescription: 'Protect enterprise assets with zero-trust network setups, continuous vulnerability scanning, automated penetration testing, and regulatory compliance audits.',
    features: ['Ethical Hacking & Pen Testing', 'SOC2 / HIPAA / GDPR Compliance Audits', 'Zero-Trust Architecture Setup', 'Continuous Threat Monitoring', 'DDoS Mitigation & WAF Configuration'],
    benefits: ['100% security audit compliance', 'Zero data breach exposure', 'Immediate incident response SLA'],
    technologies: ['Kali Linux', 'Burp Suite', 'Cloudflare WAF', 'Vault', 'OWASP ZAP', 'AWS GuardDuty'],
    startingPrice: '₹5,99,000',
    faq: [
      { question: 'Do you provide security certifications for our software?', answer: 'Yes, we provide full security audit documentation and remediation certificates.' }
    ]
  },
  {
    id: 'cloud-dev',
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    category: 'Infrastructure',
    iconName: 'Cloud',
    shortDescription: 'AWS, GCP & Azure cloud infrastructure, DevOps pipelines, Kubernetes orchestration, and serverless architectures.',
    fullDescription: 'Build self-healing, auto-scaling cloud architectures with Infrastructure-as-Code, Terraform, multi-region failover, and optimized cloud spend.',
    features: ['AWS / GCP / Azure Infrastructure', 'Infrastructure as Code (Terraform)', 'Kubernetes & Docker Clusters', 'CI/CD Pipeline Automation', 'Cost Optimization Audits'],
    benefits: ['Up to 45% savings on monthly cloud bills', 'Auto-scaling for massive traffic spikes', 'Disaster recovery failover'],
    technologies: ['AWS', 'Google Cloud', 'Azure', 'Terraform', 'Kubernetes', 'Docker'],
    startingPrice: '₹4,99,000',
    faq: [
      { question: 'Can you help reduce our monthly AWS/GCP bill?', answer: 'Yes! Our cloud audit frequently identifies 30-50% wasteful resource allocation.' }
    ]
  },
  {
    id: 'ui-ux',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Design',
    iconName: 'Palette',
    shortDescription: 'Ultra-modern 3D UI, design systems, interactive prototypes, and conversion-optimized user journeys.',
    fullDescription: 'Crafting memorable, human-centric visual interfaces that combine mathematical typography scales, fluid micro-interactions, dark mode elegance, and seamless usability.',
    features: ['3D Motion & Visual Prototypes', 'Enterprise Design Systems', 'User Research & Journey Mapping', 'Conversion Rate Optimization (CRO)', 'Accessibility (WCAG 2.1 AAA)'],
    benefits: ['Higher user engagement duration', 'Strong visual brand differentiation', 'Design-to-code component parity'],
    technologies: ['Figma', 'Spline', 'Framer', 'Three.js', 'Principle', 'Adobe CC'],
    startingPrice: '₹3,99,000',
    faq: [
      { question: 'Do you deliver interactive Figma prototypes?', answer: 'Yes, fully clickable, high-fidelity prototypes complete with micro-interaction specs.' }
    ]
  },
  {
    id: 'digital-transform',
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    category: 'Enterprise',
    iconName: 'Zap',
    shortDescription: 'End-to-end digital modernization of traditional business processes into modern cloud-first automation.',
    fullDescription: 'Helping legacy businesses reshape operations, digitize paper workflows, adopt cloud systems, and implement AI-driven decision engines.',
    features: ['Process Digitization & Automation', 'Legacy Technology Replacement', 'Data Analytics Integration', 'Change Management Training', 'Executive Strategy Consulting'],
    benefits: ['3x operational throughput speed', 'Paperless eco-friendly workflows', 'Future-proof tech stack'],
    technologies: ['Cloud APIs', 'Microservices', 'BI Analytics', 'AI Automation', 'Mobile Portals'],
    startingPrice: '₹15,99,000',
    faq: [
      { question: 'How do you train our internal staff during digital transformation?', answer: 'We conduct hands-on workshops, build internal video knowledge bases, and provide 6 months post-launch support.' }
    ]
  }
];

export const TECH_STACK = [
  {
    category: 'Frontend',
    icon: 'Layout',
    items: [
      { name: 'React 19', desc: 'Component Engine', level: '98%', highlight: 'Concurrent Mode' },
      { name: 'Next.js 15', desc: 'Fullstack SSR / App Router', level: '99%', highlight: 'TurboPack & SSR' },
      { name: 'Vue.js 3', desc: 'Progressive Framework', level: '92%', highlight: 'Composition API' },
      { name: 'Angular 18', desc: 'Enterprise Web', level: '88%', highlight: 'Signals Engine' },
      { name: 'Three.js / WebGL', desc: 'Interactive 3D Visuals', level: '95%', highlight: 'Shader Acceleration' },
      { name: 'Tailwind CSS v4', desc: 'Utility Design System', level: '100%', highlight: 'JIT Compiler' }
    ]
  },
  {
    category: 'Backend',
    icon: 'Server',
    items: [
      { name: 'Node.js', desc: 'Event-driven Async Runtime', level: '99%', highlight: 'V8 Engine' },
      { name: 'Express.js', desc: 'Fast Minimalist APIs', level: '98%', highlight: 'Middleware Pipeline' },
      { name: 'Spring Boot', desc: 'Enterprise Java Engine', level: '94%', highlight: 'Microservices Security' },
      { name: 'Python / Django', desc: 'AI-Ready Backend Engine', level: '96%', highlight: 'ORM & Security' },
      { name: 'Go (Golang)', desc: 'High-Concurrency Services', level: '91%', highlight: 'Goroutines' },
      { name: 'Laravel PHP', desc: 'Elegantly Structured Web', level: '90%', highlight: 'Eloquent ORM' }
    ]
  },
  {
    category: 'Mobile',
    icon: 'Smartphone',
    items: [
      { name: 'Kotlin', desc: 'Native Android Language', level: '97%', highlight: 'Coroutines' },
      { name: 'Swift', desc: 'Native Apple Language', level: '96%', highlight: 'SwiftUI' },
      { name: 'Flutter', desc: 'Google UI Toolkit', level: '95%', highlight: 'Dart Engine' },
      { name: 'React Native', desc: 'JavaScript Cross-Platform', level: '98%', highlight: 'Fabric Architecture' }
    ]
  },
  {
    category: 'Database',
    icon: 'Database',
    items: [
      { name: 'PostgreSQL', desc: 'Relational ACID Storage', level: '99%', highlight: 'JSONB & Indexing' },
      { name: 'MongoDB', desc: 'Document NoSQL Engine', level: '95%', highlight: 'Aggregation Pipeline' },
      { name: 'MySQL', desc: 'High Performance SQL', level: '94%', highlight: 'InnoDB Engine' },
      { name: 'Redis', desc: 'In-Memory Key-Value Caching', level: '98%', highlight: 'Sub-millisecond Latency' }
    ]
  },
  {
    category: 'Cloud & DevOps',
    icon: 'Cloud',
    items: [
      { name: 'AWS Cloud', desc: 'Amazon Web Infrastructure', level: '98%', highlight: 'EC2, S3, Lambda, ECS' },
      { name: 'Google Cloud Platform', desc: 'GCP AI & Cloud Run Services', level: '97%', highlight: 'BigQuery, Vertex AI' },
      { name: 'Microsoft Azure', desc: 'Enterprise Hybrid Cloud', level: '92%', highlight: 'Azure DevOps' },
      { name: 'Kubernetes & Docker', desc: 'Container Orchestration', level: '95%', highlight: 'Auto-Scaling Pods' }
    ]
  },
  {
    category: 'AI & Data',
    icon: 'Brain',
    items: [
      { name: 'Gemini 3.6', desc: 'Google GenAI SDK Engine', level: '99%', highlight: 'Multimodal Reasoning' },
      { name: 'OpenAI GPT-4o', desc: 'Conversational LLMs', level: '97%', highlight: 'Function Calling' },
      { name: 'Claude 3.5', desc: 'Long-Context Reasoning', level: '96%', highlight: 'Artifact Coding' },
      { name: 'LangChain & Vector DBs', desc: 'AI RAG Orchestration', level: '95%', highlight: 'Pinecone / Qdrant' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'AeroPay Global FinTech Platform',
    slug: 'aeropay-fintech-platform',
    client: 'AeroPay Financial Group (London, UK)',
    industry: 'Finance',
    category: 'web',
    description: 'A multi-currency global payment processing platform handling over ₹350 Cr daily transactions with sub-50ms latency and AI fraud protection.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Daily Volume', value: '₹350 Cr+' },
      { label: 'Latency', value: '42ms' },
      { label: 'Fraud Detection', value: '99.98%' }
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS Cloud', 'Stripe Connect'],
    liveUrl: 'https://example.com/aeropay',
    challenge: 'AeroPay suffered from legacy architecture bottlenecks that caused transaction timeouts during peak trading hours and high chargeback risk.',
    solution: 'CodeNexAnkit engineered a microservices-based transaction core with in-memory Redis lock pipelines, sub-second ledger reconciliation, and AI fraud analysis.',
    impact: 'Increased transaction throughput by 340%, reduced payment processing costs by 28%, and eliminated fraudulent chargeback spikes.'
  },
  {
    id: 'p2',
    title: 'PulseHealth AI Patient Diagnostics Portal',
    slug: 'pulsehealth-ai-diagnostics',
    client: 'PulseHealth Network (Boston, USA)',
    industry: 'Healthcare',
    category: 'ai',
    description: 'HIPAA-compliant medical imaging AI assistant that analyzes X-ray scans and MRI data to assist radiologists with early triage.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Diagnostic Accuracy', value: '98.7%' },
      { label: 'Analysis Speed', value: '3.2 Sec' },
      { label: 'Hospitals Active', value: '45+' }
    ],
    technologies: ['Python', 'TensorFlow', 'Gemini AI', 'React', 'FastAPI', 'AWS HealthLake'],
    liveUrl: 'https://example.com/pulsehealth',
    challenge: 'Radiologists faced severe workload backlogs causing delays in urgent trauma image evaluations.',
    solution: 'Built a custom computer vision model fine-tuned on 200,000 anonymized medical scans, integrated into an intuitive web workstation for clinicians.',
    impact: 'Reduced image review triage time from 4 hours down to 12 minutes while maintaining strict HIPAA compliance.'
  },
  {
    id: 'p3',
    title: 'OmniFreight Supply Chain ERP',
    slug: 'omnifreight-supply-chain-erp',
    client: 'OmniFreight Logistics (Rotterdam, Netherlands)',
    industry: 'Logistics',
    category: 'erp',
    description: 'Next-generation maritime freight ERP with real-time IoT container location tracking, automated customs filings, and automated dispatching.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Shipments Tracked', value: '1.2M+' },
      { label: 'Fuel Saved', value: '18%' },
      { label: 'Customs Speed', value: '5x Faster' }
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Google Maps API', 'IoT MQTT'],
    liveUrl: 'https://example.com/omnifreight',
    challenge: 'Manual customs documentation and disconnected route scheduling created port congestion and expensive demurrage fees.',
    solution: 'Designed a unified cloud ERP that aggregates GPS container telematics, auto-generates customs forms, and dynamically re-routes trucks around port delays.',
    impact: 'Cut port demurrage penalties by 82% and saved the client ₹50 Cr in annual logistics overhead.'
  },
  {
    id: 'p4',
    title: 'ZenithFlow SaaS Enterprise Productivity Platform',
    slug: 'zenithflow-saas-platform',
    client: 'Zenith Tech (Austin, TX)',
    industry: 'SaaS',
    category: 'saas',
    description: 'A collaborative real-time workspace featuring interactive whiteboard canvases, task automation engines, and document intelligence.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Active Users', value: '250K+' },
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Monthly Growth', value: '35%' }
    ],
    technologies: ['Next.js', 'TypeScript', 'WebSockets', 'Tailwind', 'Stripe Billing', 'PostgreSQL'],
    liveUrl: 'https://example.com/zenithflow',
    challenge: 'The client needed a frictionless collaborative tool to compete against legacy software, demanding instantaneous multi-user canvas synchronization.',
    solution: 'Engineered a operational transformation (CRDT) engine over WebSockets with zero latency rendering and automated team workspace provisioning.',
    impact: 'Acquired 250,000 active monthly users within 6 months of launching on Product Hunt and TechCrunch.'
  },
  {
    id: 'p5',
    title: 'Luxestate 3D Virtual Real Estate Marketplace',
    slug: 'luxestate-3d-marketplace',
    client: 'Luxestate Properties (Dubai, UAE)',
    industry: 'Real Estate',
    category: 'web',
    description: 'Immersive 3D real estate platform offering spatial virtual walkthroughs, floor plan customization, and smart contract booking.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Properties Listed', value: '₹17,000 Cr+' },
      { label: 'Tour Duration', value: '+350%' },
      { label: 'Inquiries', value: '4.2x' }
    ],
    technologies: ['Three.js', 'Next.js', 'Spline 3D', 'Tailwind', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://example.com/luxestate',
    challenge: 'High-net-worth international buyers required an ultra-realistic remote viewing experience before committing to luxury property site visits.',
    solution: 'Created a WebGL 3D architectural viewer with ambient lighting controls, material customization, and instant agent video calls inside the browser.',
    impact: 'Boosted international luxury home sales by ₹1,150 Cr in year one.'
  },
  {
    id: 'p6',
    title: 'EduSphere Interactive AI Learning Campus',
    slug: 'edusphere-learning-campus',
    client: 'EduSphere Global (Singapore)',
    industry: 'Education',
    category: 'mobile',
    description: 'Personalized AI tutoring mobile app that adapts learning paths, generates interactive quizzes, and tracks student mastery in real-time.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Students Active', value: '1.8M' },
      { label: 'Grade Improvement', value: '+24%' },
      { label: 'App Store Rating', value: '4.9 ★' }
    ],
    technologies: ['Flutter', 'Gemini AI', 'Node.js', 'Firebase', 'GraphQL', 'AWS S3'],
    liveUrl: 'https://example.com/edusphere',
    challenge: 'Standard online video courses suffered from high drop-out rates due to passive learning and lack of individualized feedback.',
    solution: 'Built an interactive Flutter app powered by Gemini AI that converse with students, explains complex formulas step-by-step, and gamifies achievements.',
    impact: 'Achieved an extraordinary 78% 30-day student retention rate compared to the industry average of 14%.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Alexander Vance',
    role: 'Chief Technology Officer',
    company: 'AeroPay Financial UK',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'CodeNexAnkit completely transformed our financial architecture. Their mastery of microservices and low-latency systems is unmatched. They delivered our core platform 2 weeks ahead of schedule with 99.99% uptime.',
    projectResult: 'Handled ₹350 Cr daily transaction volume with sub-50ms latency.'
  },
  {
    id: 't2',
    clientName: 'Dr. Sarah Jenkins, MD',
    role: 'VP of Clinical Innovation',
    company: 'PulseHealth Network',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'The AI computer vision portal developed by CodeNexAnkit has become an indispensable tool for our radiology department. Their deep understanding of HIPAA security and machine learning is exceptional.',
    projectResult: '98.7% diagnostic triage accuracy across 45+ hospitals.'
  },
  {
    id: 't3',
    clientName: 'Tariq Al-Mansoor',
    role: 'Managing Director',
    company: 'Luxestate Properties Dubai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'CodeNexAnkit engineered a 3D web experience that redefined real estate luxury in the Middle East. Our international buyers can now experience multi-million dollar villas seamlessly inside their browser.',
    projectResult: '₹1,150 Cr in remote luxury sales generated in the first year.'
  },
  {
    id: 't4',
    clientName: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'ZenithFlow Productivity',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'Working with CodeNexAnkit was the single best decision we made for our SaaS startup. Their engineering execution, 3D design flair, and speed allowed us to raise our ₹100 Cr Series A with confidence.',
    projectResult: 'Reached 250,000 active workspace users in 6 months.'
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    iconName: 'Activity',
    headline: 'HIPAA-Compliant AI, Telemedicine & Medical Imaging Solutions',
    description: 'Building secure healthcare portals, AI medical diagnostics, electronic health record (EHR) sync, and remote patient monitoring devices.',
    keySolutions: ['Medical Imaging AI Triage', 'HIPAA/GDPR Telemedicine Apps', 'EHR / HL7 FHIR Interoperability', 'Remote Patient IoT Monitoring'],
    caseStudyHighlight: 'PulseHealth AI Diagnostic Assistant',
    metrics: '98.7% Diagnostic Triage Accuracy'
  },
  {
    id: 'finance',
    name: 'FinTech & Banking',
    iconName: 'CreditCard',
    headline: 'Low-Latency Payment Engines, Crypto & Fraud Analytics',
    description: 'Empowering financial institutions with PCI-DSS compliant payment gateways, algorithmic trading engines, AI fraud detection, and open banking APIs.',
    keySolutions: ['High-Throughput Payment Core', 'AI Fraud Detection Engine', 'Crypto Wallet & Smart Contracts', 'Open Banking ISO20022 APIs'],
    caseStudyHighlight: 'AeroPay Global FinTech',
    metrics: '₹350 Cr+ Daily Transaction Processing'
  },
  {
    id: 'e-commerce',
    name: 'E-Commerce & Retail',
    iconName: 'ShoppingBag',
    headline: 'Sub-Second Headless Commerce & 3D Visual Shopping',
    description: 'Scalable online stores with AR product preview, personalized AI recommendation engines, multi-currency checkout, and real-time inventory.',
    keySolutions: ['Headless Shopify / Next.js Storefronts', 'AR/3D Product Viewers', 'AI Personalized Product Feeds', 'Multi-Warehouse Inventory Sync'],
    caseStudyHighlight: 'Global StyleHub Marketplace',
    metrics: '3.4x Conversion Increase'
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    iconName: 'Truck',
    headline: 'IoT Telematics, Automated Freight Dispatch & Port ERP',
    description: 'Optimizing global supply chains through automated customs documentation, dynamic route planning, fleet tracking, and warehouse robotics.',
    keySolutions: ['Custom Maritime & Road ERP', 'GPS Telematics Fleet Tracking', 'Automated Customs Filing', 'Warehouse RFID Scanning'],
    caseStudyHighlight: 'OmniFreight Supply Chain',
    metrics: '82% Reduction in Demurrage Penalties'
  },
  {
    id: 'real-estate',
    name: 'Real Estate & PropTech',
    iconName: 'Home',
    headline: 'Interactive 3D Virtual Tours, Property CRM & Smart Contracts',
    description: 'Transforming property sales with immersive 3D WebGL walkthroughs, automated tenant portals, automated rent collection, and fractional investment.',
    keySolutions: ['WebGL 3D Architectural Viewer', 'Tenant Management Portals', 'Automated Lease Engine', 'PropTech AI Valuation'],
    caseStudyHighlight: 'Luxestate Dubai',
    metrics: '+350% Increase in Remote Buyer Engagement'
  },
  {
    id: 'education',
    name: 'Education & EdTech',
    iconName: 'GraduationCap',
    headline: 'Gamified AI Learning Platforms, Virtual Classrooms & LMS',
    description: 'Empowering global learners with adaptive AI tutors, live video classrooms, automated grading systems, and gamified student progression.',
    keySolutions: ['Adaptive AI Tutoring Agents', 'Virtual Video Classrooms', 'Gamified Student Dashboards', 'Proctored Exam Software'],
    caseStudyHighlight: 'EduSphere Global Campus',
    metrics: '1.8 Million Active Learners'
  },
  {
    id: 'manufacturing',
    name: 'Smart Manufacturing',
    iconName: 'Factory',
    headline: 'Industry 4.0 IoT Sensors, Quality Inspection & Predictive Maintenance',
    description: 'Digitizing factory floors with real-time machine telematics, computer vision defect inspection, and predictive maintenance alerts.',
    keySolutions: ['Computer Vision Defect Audit', 'IoT Vibration Sensor Analytics', 'Factory Resource ERP', 'Supply Shortage Forecaster'],
    caseStudyHighlight: 'Apex Auto Manufacturing',
    metrics: '42% Reduction in Factory Downtime'
  },
  {
    id: 'travel',
    name: 'Travel & Hospitality',
    iconName: 'Plane',
    headline: 'Dynamic Flight/Hotel Booking Engines & Itinerary AI',
    description: 'Building custom travel marketplaces, GDS flight integrations, dynamic pricing algorithms, and interactive AI travel planners.',
    keySolutions: ['GDS / Amadeus Flight Engines', 'Dynamic AI Itinerary Generator', 'Hotel Booking & RMS Portals', 'Luggage Tracking Modules'],
    caseStudyHighlight: 'SkyJet Global Travel',
    metrics: '120K Monthly Bookings'
  },
  {
    id: 'food-delivery',
    name: 'Food & Quick Commerce',
    iconName: 'Utensils',
    headline: 'Hyper-Local Delivery Dispatch, Kitchen ERP & Customer Apps',
    description: 'Powering quick-commerce networks with real-time courier matching, dark kitchen order routing, and instant push notification ordering.',
    keySolutions: ['Real-Time Driver Dispatch Engine', 'Kitchen Display Systems (KDS)', 'Customer Ordering Mobile App', 'Dynamic Radius Surge Pricing'],
    caseStudyHighlight: 'BiteSpeed 15-Min Delivery',
    metrics: '14-Min Average Order Fulfillment'
  },
  {
    id: 'transport',
    name: 'Transport & Mobility',
    iconName: 'Navigation',
    headline: 'Ride-Hailing Engines, EV Charging Networks & Fleet Management',
    description: 'Architecting scalable mobility platforms with real-time surge routing, EV charging station maps, payment splitting, and driver safety checks.',
    keySolutions: ['Ride-Hailing Dispatch System', 'EV Charger Station Telematics', 'Driver Face Recognition Security', 'Automated Fleet Maintenance'],
    caseStudyHighlight: 'NeoDrive EV Fleet',
    metrics: '500K+ Monthly Trips'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Ankit Kumar',
    role: 'Founder & CEO | Android Developer | Web Developer | Cyber Security Enthusiast',
    department: 'Leadership',
    bio: 'Dedicated to creating modern, secure, and user-friendly digital experiences. Specializing in high-performance applications, responsive websites, and scalable software solutions.',
    image: ankitPhoto,
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-993b08259',
    github: 'https://github.com/developeraky',
    twitter: 'https://twitter.com/developeraky'
  },
  {
    id: 'tm2',
    name: 'Dr. Evelyn Reed',
    role: 'Chief Technology Officer (CTO)',
    department: 'Leadership',
    bio: 'PhD in Computer Science from MIT. Pioneer in distributed databases and generative AI model training with 12 published research papers.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-993b08259',
    github: 'https://github.com/developeraky'
  },
  {
    id: 'tm3',
    name: 'Marcus Sterling',
    role: 'VP of AI & Machine Learning',
    department: 'Engineering',
    bio: 'Ex-DeepMind research lead specializing in Large Language Models, RAG agent orchestrations, and neural computer vision.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-993b08259',
    github: 'https://github.com/developeraky'
  },
  {
    id: 'tm4',
    name: 'Sophia Chen',
    role: 'Head of Product & 3D UI UX',
    department: 'Design',
    bio: 'Awwwards site-of-the-day winning designer with a focus on WebGL 3D canvas micro-interactions and high-converting enterprise software.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-993b08259'
  },
  {
    id: 'tm5',
    name: 'Rohan Sharma',
    role: 'Director of Cloud & DevOps',
    department: 'Engineering',
    bio: 'AWS Certified Solutions Architect Fellow with expertise in Kubernetes, zero-downtime microservices, and Terraform Infrastructure as Code.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-993b08259',
    github: 'https://github.com/developeraky'
  },
  {
    id: 'tm6',
    name: 'Claire Dupont',
    role: 'Global Marketing & Brand Director',
    department: 'Marketing',
    bio: 'B2B technology marketing strategist who scaled 3 unicorn SaaS companies from zero through data-driven positioning.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-993b08259'
  },
  {
    id: 'tm7',
    name: 'Vikramaditya Rao',
    role: 'Senior Cyber Security Strategist',
    department: 'Engineering',
    bio: 'CISSP & Certified Ethical Hacker. Lead security reviewer who has safeguarded core banking systems against zero-day exploits.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-993b08259'
  },
  {
    id: 'tm8',
    name: 'Sir David Harrington',
    role: 'Board Advisor & Enterprise Growth',
    department: 'Advisors',
    bio: 'Former Fortune 500 Managing Director advising CodeNexAnkit on global enterprise partnerships and capital expansion.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-993b08259'
  }
];

export const BLOGS: Blog[] = [
  {
    id: 'b1',
    title: 'The Future of Web Development in 2026: Next.js 15, WebGL 3D, and AI Co-Runners',
    slug: 'future-of-web-dev-2026',
    category: 'Engineering',
    excerpt: 'Explore how sub-second edge computing, WebGL 3D rendering, and server-side AI model integration are reshaping modern enterprise web applications.',
    content: `
The landscape of web development has evolved dramatically. Today, users expect web applications to load instantaneously, render 60fps 3D graphics inside the browser, and provide real-time AI capabilities without exposing sensitive credentials.

### Key Pillars of Modern Web Engineering
1. **Server-Side Rendered Edge Architectures**: Next.js 15 and server components ensure zero cumulative layout shift (CLS) and sub-50ms Time to First Byte (TTFB).
2. **WebGL & GPU Acceleration**: Modern browsers leverage WebGL2 and WebGPU shaders to display interactive 3D product models, spatial data maps, and fluid UI canvas elements.
3. **Server-Side AI Proxies**: Keeping generative AI API calls strictly on secure Node.js servers protects corporate IP while streaming instant responses back to client devices.

At CodeNexAnkit, we integrate these three pillars into every enterprise web application we architect.
    `,
    author: {
      name: 'Ankit Kumar',
      role: 'CEO & Founder',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
    },
    date: '2026-07-15',
    readTime: '6 min read',
    tags: ['Next.js', 'WebGL', 'AI', 'Web Performance'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'b2',
    title: 'Building Enterprise RAG Architectures with Gemini 3.6 and Vector Databases',
    slug: 'enterprise-rag-gemini-vector-db',
    category: 'AI & Data',
    excerpt: 'A technical deep-dive into constructing zero-retention Retrieval-Augmented Generation systems for internal company knowledge bases.',
    content: `
Enterprise organizations hold vast reserves of unstructured knowledge in PDF reports, Slack channels, and database schemas. Standard generative AI models lack context regarding private company records.

### The Solution: RAG Architecture
By indexing internal documents into dense vector embeddings stored inside Pinecone or PostgreSQL pgvector, and connecting them via Gemini 3.6's reasoning engine, companies can build context-aware AI assistants that answer employee questions with 100% citation accuracy.

Key security benefits include:
- Zero model training on private records
- Role-based document access control
- Sub-second vector search indexing
    `,
    author: {
      name: 'Dr. Evelyn Reed',
      role: 'Chief Technology Officer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
    },
    date: '2026-07-02',
    readTime: '8 min read',
    tags: ['Generative AI', 'Gemini API', 'RAG', 'Vector Search'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'b3',
    title: 'Microservices vs Monoliths in 2026: When to Scale Your System Architecture',
    slug: 'microservices-vs-monoliths-2026',
    category: 'Architecture',
    excerpt: 'How to determine the exact inflection point when transitioning a growing monolithic application into distributed Docker microservices.',
    content: `
Many startups rush into microservices prematurely, incurring heavy network overhead and deployment complexity. Conversely, established enterprises suffer when legacy monoliths slow down deployment velocity.

### The CodeNexAnkit Modular Monolith Approach
We advocate starting with a tightly scoped Modular Monolith. When clear domain boundaries emerge (e.g., payment processing or video transcoding), extract those specific units into isolated Docker microservices behind an API Gateway.
    `,
    author: {
      name: 'Rohan Sharma',
      role: 'Director of Cloud',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
    },
    date: '2026-06-20',
    readTime: '7 min read',
    tags: ['Architecture', 'Microservices', 'Docker', 'AWS'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'b4',
    title: 'Designing for the Eye: 3D Micro-Interactions and Spatial Typography',
    slug: '3d-micro-interactions-spatial-typography',
    category: 'Design',
    excerpt: 'How subtle depth, lighting physics, and responsive typography elevate user trust and engagement on SaaS landing pages.',
    content: `
Design is not merely aesthetic—it is functional psychological signaling. High-value clients judge software security and quality based on spatial refinement, color contrast ratios, and interactive hover depth.

### Principles of Premium Digital Craftsmanship
- **Mathematical Scale Ratios**: Using a 1.25+ type scale ensures effortless visual hierarchy.
- **Subtle Specular Lighting**: Ray-traced hover lighting creates tangible tactile feedback.
- **Glassmorphism Elegance**: Subtle backdrop blur filters maintain background context without causing visual clutter.
    `,
    author: {
      name: 'Sophia Chen',
      role: 'Head of Product Design',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    date: '2026-06-11',
    readTime: '5 min read',
    tags: ['UI UX', 'Design System', '3D Graphics', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
  }
];

export const CAREERS: Career[] = [
  {
    id: 'c1',
    title: 'Senior Full-Stack Next.js Architect',
    department: 'Engineering',
    location: 'Sector 69, Noida / Remote',
    type: 'Full-time',
    experience: '5+ Years',
    salary: '₹15,00,000 - ₹25,00,000 / yr',
    description: 'Lead the architecture and execution of high-speed enterprise web platforms using Next.js 15, TypeScript, Tailwind, and Node.js microservices.',
    requirements: [
      '5+ years of production experience with React, Next.js, and TypeScript',
      'Strong mastery of Node.js Express/Fastify server-side development',
      'Proven track record of optimizing page load speeds for 99+ Lighthouse scores',
      'Experience with WebGL, Three.js, or Framer Motion is a plus'
    ],
    responsibilities: [
      'Architect client web applications for maximum scalability and performance',
      'Mentor junior software engineers and conduct thorough code reviews',
      'Collaborate directly with product designers and client CTOs'
    ]
  },
  {
    id: 'c2',
    title: 'AI Machine Learning Engineer (Gemini & LLMs)',
    department: 'AI & Data',
    location: 'Sector 69, Noida / Remote',
    type: 'Full-time',
    experience: '3+ Years',
    salary: '₹12,00,000 - ₹20,00,000 / yr',
    description: 'Design and deploy production-grade GenAI agentic workflows, fine-tuned models, and vector database RAG architectures.',
    requirements: [
      '3+ years experience with Python, PyTorch, LangChain, or LLM fine-tuning',
      'Solid expertise with Google GenAI SDK (@google/genai) and Gemini models',
      'Experience deploying vector search indices in Pinecone, Qdrant, or PostgreSQL pgvector',
      'Strong understanding of model evaluation, hallucination suppression, and prompt engineering'
    ],
    responsibilities: [
      'Develop custom enterprise AI pipelines for enterprise clients',
      'Build autonomous multi-modal agent workflows with tool calling capabilities',
      'Ensure zero data leak security protocols across all model endpoints'
    ]
  },
  {
    id: 'c3',
    title: 'Principal 3D UI/UX Product Designer',
    department: 'Design',
    location: 'Sector 69, Noida / Remote',
    type: 'Full-time',
    experience: '4+ Years',
    salary: '₹10,00,000 - ₹18,00,000 / yr',
    description: 'Create world-class visual design systems, 3D interactive prototypes, and modern spatial web interfaces for flagship clients.',
    requirements: [
      'Expertise in Figma, Spline 3D, Framer, and modern design tokens',
      'Strong portfolio showcasing high-end dark/light luxury UI designs',
      'Understanding of HTML/CSS capabilities and Framer Motion code handoff'
    ],
    responsibilities: [
      'Lead design sprints for web and mobile software projects',
      'Build reusable enterprise design component libraries',
      'Conduct user testing and conversion rate optimization audits'
    ]
  },
  {
    id: 'c4',
    title: 'Cyber Security & DevSecOps Lead',
    department: 'Engineering',
    location: 'Sector 69, Noida / Hybrid',
    type: 'Full-time',
    experience: '5+ Years',
    salary: '₹14,00,000 - ₹22,00,000 / yr',
    description: 'Oversee code security audits, vulnerability scanning, SOC2 compliance, and zero-trust cloud infrastructure for enterprise clients.',
    requirements: [
      'CISSP, CEH, or AWS Security Specialty certification',
      'Deep knowledge of OWASP Top 10, penetration testing, and WAF setups',
      'Experience with Terraform, Vault, Kubernetes security, and Docker image scanning'
    ],
    responsibilities: [
      'Perform continuous security code audits across client codebases',
      'Implement zero-trust network configurations and secret management',
      'Lead incident response drills and regulatory compliance certifications'
    ]
  },
  {
    id: 'c5',
    title: 'Software Engineering Intern (Summer 2026 / Fall 2026)',
    department: 'Engineering',
    location: 'Global Remote',
    type: 'Internship',
    experience: '0-1 Years',
    salary: '₹500 - ₹1,000 / hour',
    description: 'Hands-on 12-week internship working alongside Senior Architects on real production web apps, mobile solutions, and AI features.',
    requirements: [
      'Currently pursuing or recently completed BS/MS in CS, Software Engineering, or related field',
      'Strong proficiency in JavaScript/TypeScript, React, or Python',
      'Passionate about clean code, unit testing, and modern UI'
    ],
    responsibilities: [
      'Ship real production features under mentorship of Senior Engineers',
      'Participate in daily engineering standups and sprint planning',
      'Present an end-of-internship capstone project to executive leadership'
    ]
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Sprint',
    tagline: 'Ideal for early-stage startups needing rapid MVP delivery in 3-4 weeks.',
    priceMonthly: 399000,
    priceYearly: 299000,
    features: [
      'Custom Responsive Web or Mobile App',
      'Up to 6 Primary App Views / Screens',
      'Next.js / React Native Modern Stack',
      'Full Source Code Ownership',
      'SEO & Performance Optimization (95+ score)',
      'Basic CMS or Database Integration',
      '30 Days Post-Launch Warranty Support'
    ],
    deliverables: ['Production App Bundle', 'Figma Design Tokens', 'CI/CD Setup'],
    cta: 'Launch Starter Sprint'
  },
  {
    id: 'professional',
    name: 'Professional Scale',
    tagline: 'For growing businesses requiring custom AI features, custom CRM/ERP or SaaS engines.',
    priceMonthly: 799000,
    priceYearly: 599000,
    popular: true,
    features: [
      'Full-Stack Web & Mobile Architecture',
      'Unlimited App Views & Custom Workflows',
      'Custom Gemini AI Assistant & RAG Integration',
      'Advanced Database & Real-Time Sync',
      'Payment Gateway & Billing Integration',
      '3D Visual Interactions & Custom Animations',
      'Role-Based Admin Dashboard',
      '90 Days Post-Launch Dedicated Support'
    ],
    deliverables: ['Full Source Code', 'Cloud Infrastructure Setup', 'Admin Portal', 'AI Vector Search Index'],
    cta: 'Build Professional Solution'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Transformation',
    tagline: 'For global enterprises demanding zero-downtime microservices, SOC2 compliance & custom AI.',
    priceMonthly: 1599000,
    priceYearly: 1199000,
    features: [
      'Bespoke Enterprise Software Architecture',
      'Dedicated Team of 6+ Senior Engineers & Lead Architect',
      '24/7 Incident Response & SLA Guarantees',
      'Fine-Tuned LLMs & Proprietary AI Models',
      'Multi-Region AWS/GCP Cloud Failover',
      'Full SOC2 / HIPAA / GDPR Security Audit',
      'Custom ERP / CRM / Legacy Migration',
      'Unlimited Support & Ongoing Modernization'
    ],
    deliverables: ['Dedicated Scrum Pod', 'Zero-Trust Architecture', 'Compliance Documentation', '24/7 Monitoring'],
    cta: 'Schedule Executive Consultation'
  }
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Discovery & Scope', desc: 'In-depth analysis of business objectives, user personas, technical requirements, and target metrics.' },
  { step: '02', title: 'Architecture & Planning', desc: 'Designing system schemas, security protocols, cloud topology, and sprint roadmap milestones.' },
  { step: '03', title: '3D UI/UX Design', desc: 'Crafting interactive prototypes, visual style guides, micro-interactions, and spatial design systems.' },
  { step: '04', title: 'Agile Engineering', desc: 'Writing modular TypeScript code with continuous integration, automated testing, and bi-weekly build demos.' },
  { step: '05', title: 'Security & QA Audit', desc: 'Rigorous penetration testing, multi-device cross-browser audit, load testing, and Lighthouse optimization.' },
  { step: '06', title: 'Deployment & Launch', desc: 'Zero-downtime cloud provisioning, DNS propagation, CDN caching, and search console indexing.' },
  { step: '07', title: 'Sustained Growth', desc: '24/7 SLA monitoring, feature iteration, AI model retraining, and proactive infrastructure scaling.' }
];

export const FAQS = [
  { question: 'Why choose CodeNexAnkit over traditional agencies?', answer: 'CodeNexAnkit combines senior engineering talent with 3D UI design precision, server-side AI integration, and zero-compromise speed performance.' },
  { question: 'How do you guarantee project delivery timelines?', answer: 'We operate on transparent 2-week agile sprints with daily standups and live staging previews, guaranteeing milestones.' },
  { question: 'Do we own 100% of the source code and IP?', answer: 'Yes! Upon project completion, full intellectual property rights, GitHub repositories, and cloud credentials belong 100% to you.' },
  { question: 'How do you handle security and data privacy?', answer: 'We implement zero-trust security architectures, enterprise encryption, OWASP guidelines, and HIPAA/GDPR compliance across all applications.' },
  { question: 'Can CodeNexAnkit provide long-term maintenance after launch?', answer: 'Absolutely. We offer flexible post-launch SLA maintenance plans including 24/7 server monitoring, feature additions, and security upgrades.' }
];
