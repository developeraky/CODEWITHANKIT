import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const NOTIFICATION_RECIPIENTS = process.env.NOTIFICATION_EMAIL || 'ankitkumar15962@gmail.com, developercybersec@gmail.com';

async function sendNotificationEmail(subjectType: string, payload: Record<string, any>) {
  const recipients = NOTIFICATION_RECIPIENTS.split(',').map(e => e.trim());
  console.log(`[EMAIL DISPATCH] Triggered "${subjectType}" for recipients:`, recipients);

  const tableRows = Object.entries(payload)
    .map(([key, val]) => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #222; color: #ffd700; font-weight: bold; font-size: 13px; text-transform: uppercase;">${key}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #222; color: #ffffff; font-size: 14px;">${val || 'N/A'}</td>
      </tr>
    `).join('');

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #050505; color: #ffffff; padding: 32px 20px; max-width: 650px; margin: 0 auto; border-radius: 16px; border: 1px solid #ff8c00;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffd700; font-size: 24px; font-weight: 800; margin: 0; tracking: -0.5px;">CODENEXANKIT</h1>
        <p style="color: #888888; font-size: 12px; margin-top: 4px;">Software Engineering & AI Solutions - Instant Inquiry Alert</p>
      </div>

      <div style="background-color: #121212; border-radius: 12px; padding: 20px; border: 1px solid #262626; margin-bottom: 24px;">
        <h2 style="color: #60a5fa; font-size: 16px; margin-top: 0; margin-bottom: 16px;">🚀 New ${subjectType} Submitted!</h2>
        <table style="width: 100%; border-collapse: collapse; background-color: #080808; border-radius: 8px; overflow: hidden;">
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>

      <div style="text-align: center; color: #666666; font-size: 11px; line-height: 1.5;">
        This alert was generated automatically by the <strong>CodeNexAnkit</strong> Portal.<br/>
        Address: KBS Private Limited, Sector 69, Noida, Uttar Pradesh 201309 | Phone: +91 9971681065
      </div>
    </div>
  `;

  try {
    let transporter;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      // Create a test ethereal transport or fallback stream
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

    const info = await transporter.sendMail({
      from: '"CodeNexAnkit Inquiries" <noreply@codenexankit.tech>',
      to: recipients.join(', '),
      subject: `[CodeNexAnkit Alert] New ${subjectType}: ${payload['Name'] || payload['Email'] || 'Inquiry'}`,
      html: htmlContent,
      text: Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join('\n')
    });

    console.log(`[EMAIL DISPATCH SUCCESS] Sent ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error(`[EMAIL DISPATCH NOTICE] Email logged locally (SMTP configuration optional):`, err?.message || err);
    return { success: false, error: err?.message };
  }
}

const currentFilename = typeof __filename !== 'undefined' ? __filename : (import.meta && import.meta.url ? fileURLToPath(import.meta.url) : process.cwd());
const currentDirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(currentFilename);

// In-memory persistent arrays for CRM leads, applications, blogs
let LEADS_DB: any[] = [
  {
    id: 'lead-101',
    name: 'Marcus Brody',
    email: 'marcus@fintechhorizon.io',
    phone: '+91 9876543210',
    company: 'Fintech Horizon',
    serviceNeeded: 'Web Development',
    budget: '₹5,00,000 - ₹10,00,000',
    message: 'We need a high-frequency trading dashboard with Next.js and WebSockets.',
    score: 88,
    status: 'Qualified',
    createdAt: '2026-07-28T14:20:00.000Z'
  },
  {
    id: 'lead-102',
    name: 'Dr. Sarah Connor',
    email: 'sconnor@medtechlabs.org',
    phone: '+91 9988776655',
    company: 'MedTech Labs',
    serviceNeeded: 'AI Development',
    budget: '₹10,00,000 - ₹25,00,000',
    message: 'Looking for a RAG medical assistant with Gemini API integration.',
    score: 95,
    status: 'New',
    createdAt: '2026-07-29T09:15:00.000Z'
  }
];

let JOB_APPLICATIONS_DB: any[] = [];

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
} catch (err) {
  console.warn('Gemini AI initialization notice:', err);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Assistant Chat Route (Powered by Gemini API)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (!ai) {
        // Fallback intelligent response if GEMINI_API_KEY is missing
        return res.json({
          reply: `Thank you for reaching out to CodeNexAnkit! Based on your interest in "${message.slice(0, 50)}...", our engineering team can build a custom high-performance solution tailored to your goals. Would you like to schedule a free 15-minute discovery call with our Lead Architect?`,
          leadScoreHint: 75
        });
      }

      const systemInstruction = `
You are "NexaBot", the intelligent AI Business Advisor & Solutions Architect for "CodeNexAnkit".
CodeNexAnkit is a world-class software engineering firm founded by Ankit Kumar.
Company Address: KBS Private Limited, Sector 69, Noida, Uttar Pradesh 201309.
Primary Phone: +91 9971681065
WhatsApp Support: +91 6206246870
Email: developercybersec@gmail.com
LinkedIn: www.linkedin.com/in/ankit-kumar-993b08259
GitHub: https://github.com/developeraky

Key Services:
- Web Development (Next.js 15, React, WebGL)
- Mobile App Development (React Native, Flutter, Swift, Kotlin)
- Custom Software, ERP & CRM Solutions
- SaaS Platform Development
- AI & Machine Learning Solutions (Gemini API, RAG, Fine-Tuned Models)
- Cyber Security & Cloud Engineering (AWS, GCP, Docker, Kubernetes)
- UI/UX Design (3D Spatial UI, Figma)

Prices are strictly quoted in Indian Rupees (INR ₹).
Your Tone: Professional, futuristic, confident, helpful, concise, and focused on value delivery.
Goal: Answer user technical and pricing questions, suggest appropriate CodeNexAnkit services, calculate estimated project budgets in INR (₹), and invite them to submit their inquiry or book a discovery call.
Keep answers under 150 words unless asked for detailed architecture.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          { role: 'user', parts: [{ text: `System context: ${systemInstruction}\nUser message: ${message}` }] }
        ]
      });

      const reply = response.text || 'CodeNexAnkit is ready to engineer your solution. How can we assist you today?';
      
      // Calculate a lead qualification score based on message keywords
      let score = 50;
      const msgLower = message.toLowerCase();
      if (msgLower.includes('budget') || msgLower.includes('cost') || msgLower.includes('price')) score += 15;
      if (msgLower.includes('hire') || msgLower.includes('build') || msgLower.includes('project')) score += 20;
      if (msgLower.includes('urgent') || msgLower.includes('timeline') || msgLower.includes('asap')) score += 15;

      return res.json({ reply, leadScoreHint: score });
    } catch (error: any) {
      console.error('Gemini chat error:', error);
      res.json({
        reply: 'Thank you for contacting CodeNexAnkit. We offer custom web, mobile, AI, cloud, and enterprise software solutions. Feel free to leave your contact email, and our team will get back to you within 2 hours!',
        leadScoreHint: 60
      });
    }
  });

  // Leads CRM API
  app.get('/api/leads', (req, res) => {
    res.json(LEADS_DB);
  });

  app.post('/api/leads', (req, res) => {
    const { name, email, phone, company, serviceNeeded, budget, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // AI score calculation logic
    let score = 60;
    if (budget && budget.includes('50,000')) score += 30;
    else if (budget && budget.includes('25,000')) score += 20;
    else if (budget && budget.includes('10,000')) score += 10;
    if (company) score += 10;

    const newLead = {
      id: `lead-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      company: company || '',
      serviceNeeded: serviceNeeded || 'General Inquiry',
      budget: budget || 'Flexible',
      message: message || '',
      score: Math.min(score, 100),
      status: 'New',
      createdAt: new Date().toISOString()
    };

    LEADS_DB.unshift(newLead);

    // Dispatch real-time email notification to company email
    sendNotificationEmail('Project Consultation Inquiry', {
      'Name': name,
      'Work Email': email,
      'Phone / WhatsApp': phone || 'N/A',
      'Company': company || 'N/A',
      'Service Needed': serviceNeeded || 'General Inquiry',
      'Budget': budget || 'Flexible',
      'Project Message': message || 'No message provided'
    }).catch(err => console.error('Notification dispatch error:', err));

    res.status(201).json({ success: true, lead: newLead, emailNotified: true });
  });

  app.patch('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const lead = LEADS_DB.find(l => l.id === id);
    if (lead && status) {
      lead.status = status;
      return res.json({ success: true, lead });
    }
    res.status(404).json({ error: 'Lead not found' });
  });

  // Careers Application API
  app.get('/api/careers/applications', (req, res) => {
    res.json(JOB_APPLICATIONS_DB);
  });

  app.post('/api/careers/apply', (req, res) => {
    const { jobId, jobTitle, applicantName, email, phone, portfolioUrl, experienceYears, coverLetter } = req.body;
    if (!jobId || !applicantName || !email) {
      return res.status(400).json({ error: 'Missing required application fields' });
    }

    const application = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: jobTitle || 'General Application',
      applicantName,
      email,
      phone: phone || '',
      portfolioUrl: portfolioUrl || '',
      experienceYears: experienceYears || 'N/A',
      coverLetter: coverLetter || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    JOB_APPLICATIONS_DB.unshift(application);

    sendNotificationEmail('Career Job Application', {
      'Applicant Name': applicantName,
      'Position': jobTitle || 'General Position',
      'Email': email,
      'Phone': phone || 'N/A',
      'Portfolio / GitHub': portfolioUrl || 'N/A',
      'Experience': experienceYears || 'N/A',
      'Cover Letter': coverLetter || 'None'
    }).catch(err => console.error('Career application email alert error:', err));

    res.status(201).json({ success: true, application, emailNotified: true });
  });

  // Sitemap.xml Generator
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://codenexa.tech';
    const pages = [
      '',
      '/about',
      '/services',
      '/portfolio',
      '/technology',
      '/industries',
      '/team',
      '/careers',
      '/blog',
      '/pricing',
      '/contact',
      '/faq',
      '/privacy-policy',
      '/terms-and-conditions'
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(p => `
    <url>
      <loc>${baseUrl}${p}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${p === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });

  // Robots.txt Generator
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://codenexa.tech';
    const txt = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;

    res.header('Content-Type', 'text/plain');
    res.send(txt);
  });

  // Vite middleware in dev mode / static serve in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CodeNexa Technologies server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
