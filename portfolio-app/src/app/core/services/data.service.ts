import { Injectable } from '@angular/core';

export interface Experience {
  role: string;
  company: string;
  companyLink?: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  description: string;
  highlights: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; url: string }[];
  imageIcon: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public get personalInfo() {
    return {
      name: 'Khalaf Hussein',
      title: 'Full Stack Developer (MEAN Stack) | Backend AI Engineer',
      subtitle: '< Hello World />',
      email: 'khalafhussien8@gmail.com',
      phone: '+201110153836',
      location: 'Sohag, Egypt',
      socials: {
        linkedin: 'https://www.linkedin.com/in/khalaf-hussein-492b3a338',
        github: 'https://github.com/khalaf-droid',
        instagram: 'https://www.instagram.com/khalafhusseinkhalaf',
        facebook: 'https://web.facebook.com/khalaf.khan.50/'
      },
      stats: [
        { number: '4+', label: 'Internships' },
        { number: '6+', label: 'Projects' },
        { number: '15+', label: 'Technologies' }
      ]
    };
  }

  public get experience(): Experience[] {
    return [
      {
        role: 'Backend AI Engineer Trainee',
        company: 'FlyRank AI',
        companyLink: 'https://internship.flyrank.ai/',
        period: 'July 2026 - Present',
        location: 'Chicago, Illinois, United States (Remote)',
        description: 'Contributing to AI-powered backend systems while gaining hands-on experience in production AI engineering.',
        highlights: [
          'Building and integrating REST APIs for AI-powered services',
          'Working with LLM integration and RAG workflows',
          'Implementing AI agents and Prompt Engineering pipelines',
          'Following software engineering best practices with Git/GitHub'
        ],
        tags: ['REST APIs', 'LLM Integration', 'RAG', 'AI Agents', 'Prompt Engineering', 'Git/GitHub']
      },
      {
        role: 'MEAN Stack Developer Trainee',
        company: 'National Telecommunication Institute (NTI)',
        period: 'January 2026 - May 2026',
        location: 'Qena, Egypt (Offline)',
        description: 'Completed intensive training program in MEAN Stack building production-ready applications.',
        highlights: [
          'Built production-ready applications with clean architecture and security best practices',
          'Implemented RESTful APIs with JWT authentication and role-based access control',
          'Optimized MongoDB queries using indexing and .lean() methods for better performance',
          'Developed scalable backend systems following MVC and separation of concerns principles',
          'Collaborated with team members on real-world projects using Git version control'
        ],
        tags: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'JWT', 'RBAC']
      },
      {
        role: 'Building LLM Applications With Prompt Engineering',
        company: 'NVIDIA Deep Learning Institute',
        companyLink: 'https://drive.google.com/file/d/144tll68TT4PG3KcU8ceoEgCXruOEVFd3/view?usp=drive_link',
        period: 'November 2025 - December 2025',
        location: 'Online',
        description: 'Completed an advanced LangChain workshop focused on building reliable LLM applications.',
        highlights: [
          'Mastered LLM Agents and the Tool Calling paradigm for complex reasoning',
          'Expertise in generating Structured Output using Pydantic models',
          'Implementing Chain-of-Thought (CoT) for reliable AI reasoning',
          'Leveraging System Message for robust, production-ready AI pipelines'
        ],
        tags: ['LangChain', 'LLM Agents', 'Pydantic', 'CoT', 'Prompt Engineering']
      },
      {
        role: 'Microsoft SC-900: Security, Compliance, and Identity Fundamentals',
        company: 'Microsoft',
        companyLink: 'https://drive.google.com/file/d/1ICzt2yB35zQLVn1X41rSkD2kLphQPN4I/view?usp=sharing',
        period: 'July 2025 - September 2025',
        location: 'Online + EELU Qena Examination Center',
        description: 'Completed Microsoft SC-900 training through Microsoft Learn. Achieved a Very Good grade.',
        highlights: [
          'Zero Trust Architecture, Microsoft Entra ID, MFA, Conditional Access',
          'Microsoft Defender XDR and Microsoft Sentinel (SIEM/SOAR)',
          'Microsoft Priva and privacy compliance principles',
          'Completed voucher-based final assessment at EELU examination center'
        ],
        tags: ['Zero Trust', 'Azure AD', 'Defender XDR', 'Sentinel', 'Compliance']
      }
    ];
  }

  public get education(): Education[] {
    return [
      {
        degree: 'Bachelor\'s Degree in Information Technology',
        institution: 'Egyptian E-Learning University (EELU), Qena, Egypt',
        period: 'October 2023 - Present',
        grade: 'Currently: Fourth Year (Undergraduate)',
        description: 'Comprehensive study in Information Technology with a focus on software development, algorithms, data structures, and modern web technologies.',
        highlights: [
          'Focus Areas: Web Development, Data Structures & Algorithms, Database Systems, Networking',
          'Relevant Coursework: Object-Oriented Programming, Software Engineering, Computer Networks',
          'Maintaining strong academic performance',
          'Building real-world projects to apply learned concepts'
        ]
      }
    ];
  }

  public get projects(): Project[] {
    return [
      {
        title: 'To-Do-App-Nodejs',
        description: 'A simple REST API for managing todos, built with Node.js, Express, and MongoDB. Features environment variables, cross-origin support, and input validation.',
        imageIcon: '📝',
        tags: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
        links: [
          { label: 'GitHub', url: 'https://github.com/khalaf-droid/To-Do-App-Nodejs' }
        ]
      },
      {
        title: 'Aqario Luxe – Enterprise Real Estate Platform',
        description: 'Production-ready real estate platform with Node.js, Express 5, MongoDB, JWT authentication, Google OAuth, Email OTP, RBAC, Redis, Socket.IO, Cloudinary, Paymob, PayPal, and audit logging. Built 23+ data models and 20 API modules. Complete Admin & User Dashboards in Angular.',
        imageIcon: '🏠',
        tags: ['Angular', 'Node.js', 'Express 5', 'MongoDB', 'Redis', 'Socket.IO', 'JWT', 'RBAC'],
        links: [
          { label: 'Live Demo', url: 'https://aqario-luxe.vercel.app/' },
          { label: 'Frontend', url: 'https://github.com/khalaf-droid/luxe-estates.git' },
          { label: 'Backend', url: 'https://github.com/lkjhgfdds/Real-Estate-Backend-.git' }
        ]
      },
      {
        title: 'Nexus – YouTube Clone Platform',
        description: 'Scalable YouTube-inspired platform built from scratch with MEAN Stack. Features Creator Studio, Analytics Dashboard, Role-Based Admin Panel, Google Auth, Email OTP, JWT, Cloudinary Media Pipeline, Playlists, Watch History, Comments, Likes, Subscriptions, Notifications, and Search. Built with Angular 20, Signals, Tailwind CSS, and Angular Material.',
        imageIcon: '🎬',
        tags: ['Angular 20', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Tailwind CSS', 'JWT'],
        links: [
          { label: 'Live Demo', url: 'https://khalaf-droid.github.io/Nexus-Youtube-Clone/' },
          { label: 'Full Stack Repo', url: 'https://github.com/khalaf-droid/Nexus-Youtube-Clone.git' },
          { label: 'Video Demo', url: 'https://www.tiktok.com/@khalaf_hussein/video/7662588550793170184' }
        ]
      },
      {
        title: 'Quran Streaming Platform',
        description: 'A production-hardened Quran audio streaming platform built on the MEAN Stack with security as a core requirement — strict validation, rate-limiting, atomic DB operations, and a persistent audio player experience with custom Islamic-inspired design system.',
        imageIcon: '🕌',
        tags: ['Angular 19', 'Express.js', 'MongoDB', 'Security', 'Rate Limiting'],
        links: [
          { label: 'Source Code', url: 'https://github.com/khalaf-droid/quran-streaming-platform-mean' }
        ]
      },
      {
        title: 'YouTube API Backend',
        description: 'A scalable backend simulating YouTube\'s architecture using Node.js, Express.js, MongoDB, and Cloudinary, with Clean Architecture and REST APIs. Features secure authentication system with JWT, role-based access control, and comprehensive video management APIs.',
        imageIcon: '📡',
        tags: ['Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Clean Architecture'],
        links: [
          { label: 'Source Code', url: 'https://github.com/khalaf-droid/Youtube-Api' }
        ]
      }
    ];
  }

  public get skills(): SkillCategory[] {
    return [
      {
        title: 'Backend Development',
        icon: '⚙️',
        skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Mongoose', 'Laravel (PHP)', 'API Design']
      },
      {
        title: 'Frontend Development',
        icon: '🎨',
        skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Angular', 'Angular Material', 'Tailwind CSS', 'Responsive Design']
      },
      {
        title: 'Database Management',
        icon: '🗄️',
        skills: ['MongoDB', 'Mongoose ODM', 'MySQL', 'Database Design', 'Query Optimization', 'Indexing']
      },
      {
        title: 'AI & Emerging Technologies',
        icon: '🤖',
        skills: ['LLM Applications', 'LangChain', 'Prompt Engineering', 'RAG Workflows', 'AI Agents', 'Pydantic', 'AI Tools Integration']
      },
      {
        title: 'Networking & Security',
        icon: '🔐',
        skills: ['CCNA', 'Network Support', 'Cybersecurity', 'Cloud Security (SC-900)', 'Zero Trust', 'Azure AD']
      },
      {
        title: 'Tools & Technologies',
        icon: '🛠️',
        skills: ['Git & GitHub', 'VS Code', 'Postman', 'npm', 'Linux', 'Docker (Learning)']
      }
    ];
  }
}
