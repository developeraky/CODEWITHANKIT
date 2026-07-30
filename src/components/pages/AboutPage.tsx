import React from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Briefcase,
  Code
} from 'lucide-react';
import { COMPANY_INFO, TEAM_MEMBERS } from '../../data/companyData';

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
  openContactModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage, openContactModal }) => {
  const timeline = [
    { 
      year: '2022', 
      title: 'Started Learning Programming & Development', 
      desc: 'Began my journey in software development by learning Java, HTML, CSS, JavaScript, and Android Development. Developed a strong interest in creating digital products and solving real-world problems through technology.' 
    },
    { 
      year: '2023', 
      title: 'Android Development & Real-World Projects', 
      desc: 'Worked on Android applications using Java and Kotlin while gaining hands-on experience in API integration, Firebase, SQLite, and modern mobile application development practices.' 
    },
    { 
      year: '2024', 
      title: 'Full-Stack Web Development Expansion', 
      desc: 'Expanded expertise into web development using React.js, Next.js, Node.js, Express.js, Spring Boot, MySQL, and MongoDB. Built responsive websites, business applications, and management systems.' 
    },
    { 
      year: '2025', 
      title: 'Cyber Security & Advanced Software Solutions', 
      desc: 'Strengthened knowledge in Cyber Security, secure coding practices, authentication systems, API security, and application testing while continuing to develop scalable web and mobile solutions.' 
    },
    { 
      year: '2026', 
      title: 'Building CodeNexAnkit', 
      desc: 'Focused on delivering modern Android apps, web applications, business software, and secure digital solutions. Continuously learning emerging technologies, AI tools, and next-generation development frameworks to create innovative products for clients and businesses.' 
    }
  ];

  const values = [
    {
      icon: '🚀',
      title: 'Performance First',
      desc: 'I focus on building fast, responsive, and optimized applications that deliver a smooth user experience across web and mobile platforms.'
    },
    {
      icon: '🔒',
      title: 'Security by Design',
      desc: 'Security is an essential part of every application. From secure authentication to API protection and data privacy, I follow best practices to build reliable and secure solutions.'
    },
    {
      icon: '💡',
      title: 'Continuous Learning',
      desc: 'Technology evolves every day. I continuously learn new frameworks, tools, and industry practices to deliver modern and future-ready solutions.'
    },
    {
      icon: '🎯',
      title: 'Clean & Scalable Development',
      desc: 'I believe in writing clean, maintainable, and scalable code that makes applications easier to manage, upgrade, and grow over time.'
    },
    {
      icon: '🤝',
      title: 'Client-Centric Approach',
      desc: 'Every project is built with a focus on understanding requirements, maintaining clear communication, and delivering solutions that create real business value.'
    },
    {
      icon: '⚡',
      title: 'Quality Over Quantity',
      desc: 'Rather than rushing development, I focus on creating well-structured, tested, and reliable applications that perform efficiently in real-world environments.'
    }
  ];

  const professionalHighlights = [
    {
      icon: '💼',
      title: 'Multi-Company Industry Experience',
      desc: 'Worked with multiple organizations and development teams, gaining hands-on experience in Android Development, Web Development, Software Solutions, and Cyber Security.'
    },
    {
      icon: '📱',
      title: 'Mobile Application Development',
      desc: 'Successfully developed and contributed to Android applications using Java, Kotlin, Firebase, APIs, and modern Android architecture.'
    },
    {
      icon: '🌐',
      title: 'Web Development Expertise',
      desc: 'Built responsive websites, business applications, and management systems using React.js, Next.js, Node.js, Spring Boot, MySQL, and MongoDB.'
    },
    {
      icon: '🔒',
      title: 'Security-Focused Development',
      desc: 'Applied secure coding practices, authentication mechanisms, API security, and cybersecurity principles in real-world projects.'
    },
    {
      icon: '🚀',
      title: 'Continuous Learning & Innovation',
      desc: 'Continuously upgrading skills in AI, Cloud Technologies, Full-Stack Development, and Cyber Security to stay aligned with modern industry standards.'
    },
    {
      icon: '🤝',
      title: 'Client & Business Solutions',
      desc: 'Contributed to projects across different domains including business management, e-commerce, software solutions, and enterprise applications.'
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The CodeNexAnkit Story</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Architecting <span className="text-amber-400">Next-Gen Software</span> Since 2021.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            {COMPANY_INFO.shortDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-zinc-900/90 border border-amber-500/30 space-y-4">
            <div className="p-3 rounded-2xl bg-amber-400/10 text-amber-400 w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              To empower global enterprises and visionary startups with ultra-fast, secure, and visually breathtaking software systems that transform business operations and create multi-million dollar market advantages.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/90 border border-blue-500/30 space-y-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 w-fit">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              To remain the world’s most trusted software engineering firm where sub-second cloud performance, generative AI capabilities, and 3D spatial user interfaces converge seamlessly.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-amber-500/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <img
                src={TEAM_MEMBERS[0].image}
                alt="Ankit Kumar"
                className="w-52 h-52 sm:w-64 sm:h-64 rounded-3xl object-cover mx-auto border-2 border-amber-400 shadow-2xl"
              />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Building Digital Solutions with Code, Creativity & Security
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                <p>
                  "I am Ankit Kumar, a passionate Android Developer, Web Developer, and Cyber Security Enthusiast dedicated to creating modern, secure, and user-friendly digital experiences. My focus is on developing high-performance applications, responsive websites, and scalable software solutions that help businesses grow in the digital world.
                </p>
                <p>
                  With hands-on experience in Android development, web technologies, backend integration, and cybersecurity practices, I believe that great software should not only look impressive but also be reliable, efficient, and secure.
                </p>
                <p>
                  Every project I work on is built with attention to performance, clean architecture, and user experience, ensuring long-term value for clients and users alike."
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800">
                <span className="text-base font-bold text-white block">Ankit Kumar</span>
                <span className="text-xs text-amber-400 font-medium block">
                  Android Developer | Web Developer | Cyber Security Enthusiast
                </span>
                <span className="text-xs text-zinc-400 block font-mono mt-0.5">
                  CodeNexAnkit
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Growth Timeline</h2>
            <p className="text-sm text-amber-400 font-medium">My Journey in Technology & Development</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {timeline.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <span className="text-xl font-bold font-mono text-amber-400">{item.year}</span>
                <h3 className="text-xs font-bold text-white">{item.title}</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Core Development Values</h2>
            <p className="text-xs sm:text-sm text-amber-400 font-medium">The principles that guide every project I build.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 hover:border-amber-500/40 transition-colors">
                <div className="text-2xl">{v.icon}</div>
                <h3 className="text-base font-bold text-white">{v.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Professional Experience</h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Over the years, I have worked with multiple organizations and development teams, gaining hands-on experience in Android Development, Web Development, Software Solutions, API Integration, Database Management, and Cyber Security.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-400" />
              Companies & Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-amber-500/30 transition-colors">
                <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full inline-block">
                  2023 – 2025
                </span>
                <h4 className="text-base font-bold text-white">KBS Pvt. Ltd.</h4>
                <p className="text-xs text-zinc-300 font-medium">Android & Web Developer</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-amber-500/40 bg-gradient-to-b from-amber-500/5 to-transparent space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full inline-block">
                    2025 – Present
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Current</span>
                </div>
                <h4 className="text-base font-bold text-white">ZDS Pvt. Ltd.</h4>
                <p className="text-xs text-zinc-300 font-medium">Software Developer & Cyber Security.</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-amber-500/30 transition-colors">
                <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full inline-block">
                  2022 – 2023
                </span>
                <h4 className="text-base font-bold text-white">P G Tech Pvt. Ltd.</h4>
                <p className="text-xs text-zinc-300 font-medium">Android Development Intern</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800/80">
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-400" />
                Areas of Expertise
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Android App Development (Java & Kotlin)',
                  'Web Development (React.js, Next.js)',
                  'Backend Development (Node.js, Spring Boot)',
                  'API Integration',
                  'MySQL & MongoDB',
                  'Cyber Security',
                  'Software Testing & Deployment'
                ].map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Career Highlights
              </h3>
              <ul className="space-y-3">
                {[
                  'Worked on Android Applications',
                  'Developed Business & Management Systems',
                  'Integrated Payment Gateways & APIs',
                  'Built Responsive Websites & Web Applications',
                  'Experience Across Multiple Industries & Projects'
                ].map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✔</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center flex items-center justify-center gap-2">
            <span>🏆</span>
            <span>Professional Highlights</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalHighlights.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 hover:border-amber-500/40 transition-colors">
                <div className="text-2xl">{item.icon}</div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={openContactModal}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-blue-600 text-zinc-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-transform"
          >
            Schedule a Meeting with Our Leadership Team
          </button>
        </div>

      </div>
    </div>
  );
};
