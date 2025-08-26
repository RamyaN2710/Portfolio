import {
  Github,
  Linkedin,
  Trophy,
  Star,
  Zap,
} from "lucide-react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiOracle,
  SiOpenjdk,
  SiPython,
} from "react-icons/si";


export const theme = {
  bg: "bg-slate-950",
  surface: "bg-slate-900/60",
  card: "bg-slate-900/80",
  text: "text-slate-100",
  subtext: "text-slate-400",
  primary: "#7c3aed",
  ring: "focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
};

export const PERSON = {
  name: "Ramya",
  tagline: "I build delightful web experiences.",
  location: "India",
  email: "ramyaanbu@gmail.com",
  achievements: [ 
    {
      id: "fullstack-master",
      title: "Full Stack Master",
      icon: Trophy,
      description: "Completed 10 full-stack projects",
      progress: 100,
    },
    {
      id: "bug-hunter",
      title: "Bug Hunter",
      icon: Zap,
      description: "Fixed 100+ critical bugs",
      progress: 85,
    },
    {
      id: "code-artist",
      title: "Code Artist",
      icon: Star,
      description: "Created 5 popular open source projects",
      progress: 60,
    },
  ],
  socials: [
    { label: "GitHub", icon: Github, href: "https://github.com/RamyaN2710" },
    { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/ramya-kumar-005262257" },
  ],
};

export const SKILLS = [
  { 
    label: "HTML", 
    icon: SiHtml5,
    color: "#E34F26",
  },
  { 
    label: "CSS", 
    icon: SiCss3,
    color: "#1572B6",
  },
  { 
    label: "JavaScript", 
    icon: SiJavascript,
    color: "#F7DF1E",
  },
  { 
    label: "TypeScript", 
    icon: SiTypescript,
    color: "#3178C6",
  },
  { 
    label: "React", 
    icon: SiReact,
    color: "#61DAFB",
  },
  { 
    label: "Next.js", 
    icon: SiNextdotjs,
    color: "#000000",
  },
  { 
    label: "Nest.js", 
    icon: SiNestjs,
    color: "#E0234E",
  },
  { 
    label: "Oracle", 
    icon: SiOracle,
    color: "#F80000",
  },
  { 
    label: "Java", 
    icon: SiOpenjdk,
    color: "#437291",
  },
  { 
    label: "Python", 
    icon: SiPython,
    color: "#3776AB",
  },
];

export const PROJECTS = [
  {
    title: "Food Ordering Platform",
    description: "Full-stack app with Next.js (App Router), NestJS, PostgreSQL, and real-time order status.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Socket.IO"],
    link: "https://example.com/foodapp",
    difficulty: "Advanced", 
    xpEarned: 2500,
    completionRate: 100,
    impact: { users: "10K+", transactions: "100K+" },
  },
  {
    title: "Smart Accessibility Helper (a11y AI)",
    description: "Dev-time a11y scanner for React: highlights contrast, ARIA, and keyboard issues with fix suggestions.",
    tags: ["React", "AI", "ESLint"],
    link: "https://example.com/a11y-ai",
    difficulty: "Intermediate",
    xpEarned: 1800,
    completionRate: 100,
    impact: { users: "5K+", fixes: "50K+" },
  },
  {
    title: "KYC Video Verification",
    description: "Secure VIPV flow: face match, liveness checks, and audit trails. Built with FastAPI + React.",
    tags: ["FastAPI", "React", "WebRTC"],
    link: "https://example.com/kyc",
    difficulty: "Expert",
    xpEarned: 3000,
    completionRate: 95,
    impact: { users: "20K+", verifications: "200K+" },
  },
];

export const TIMELINE = [
  {
    type: "experience",
    title: "Full Stack Developer @ Finstein",
    date: "2024 – Present",
    desc: "Building scalable web apps with Next.js, NestJS, and cloud-native patterns.",
    achievements: [ 
      "Built a web application using React, NestJS, and PostgreSQL.",
      "Reduced deployment time by 60%",
      "Implemented JWT authentication",
    ],
    skillsGained: ["Next.js", "NestJS", "PostgreSQL","Python","React"],
  },
  {
    type: "experience",
    title: "Full Stack Developement Course",
    date: "2023– 2024",
    desc: "Completed a full stack developer course with a focus on building web applications using React,Java, and MySQL.",
    achievements: [
      "Successfully completed the Full Stack Developer Course with certification",
      "Built and deployed full stack projects using React (frontend) and Java Spring Boot (backend)",
      "Designed and managed relational databases with MySQL, including schema creation and query optimization",
    ],
    skillsGained: ["React", "Java", "MySQL","SpringBoot","Manual Testing"],
  },
  {
    type: "education",
    title: "Bachelor of commerce",
    date: "2020 – 2023",
    desc: "Completed my Bachelor of commerce with a focus on accounting and finance.",
    achievements: [
    "Completed an internship on GST billing and tax compliance",
    "Contributed to social projects focused on community development",
    "Presented a research paper on Angel Investment at an academic seminar",
    ],
    skillsGained: ["Accounting", "Finance", "Business"],
  },
];

export const HERO_TITLES = ["Full Stack Developer", "Web Developer","Mobile App Developer"];