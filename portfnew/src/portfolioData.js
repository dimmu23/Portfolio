export const profile = {
  name: "Sumit Saraswat",
  email: "sumitsaraswat2308@gmail.com",
  phone: "+91 6350248296",
  github: "https://github.com/dimmu23",
  linkedin: "https://www.linkedin.com/in/sumit2saraswat",
  leetcode: "https://leetcode.com/u/22uec138/",
};

export const projects = [
  {
    name: "Daily-Digest",
    category: "AI-powered UPSC news platform",
    description:
      "Turning official PIB releases into UPSC-focused summaries, GS mappings, and exam-ready notes. Built with an asynchronous pipeline that keeps the news moving.",
    tags: ["Next.js", "PostgreSQL", "Redis", "BullMQ", "Cerebras API"],
    metric: "60s → 2–3s",
    metricLabel: "Sync time after moving to background jobs",
    url: "https://pib-daily-digest.vercel.app",
    theme: "digest",
    logo: "project-logos/daily-digest.svg",
  },
  {
    name: "Paperfy",
    category: "AI research paper assistant",
    description:
      "Upload a paper. Find the insight. A research workspace with AI summaries, document chat, notes, and audio, powered by a context-aware RAG pipeline.",
    tags: ["Next.js", "Gemini", "Qdrant", "Prisma", "Tailwind"],
    metric: "90%+",
    metricLabel: "Reduction in PDF processing wait time",
    url: "https://paperfy-lovat.vercel.app/",
    theme: "paperfy",
    logo: "project-logos/paperfy.png",
  },
  {
    name: "Quizzy",
    category: "AI-based quiz application",
    description:
      "Generate quizzes by topic, difficulty, and question count with Google Gemini. A full-stack quiz platform with authentication, score tracking, quiz history, and performance dashboards.",
    tags: ["React", "Gemini", "Express.js", "MongoDB", "Tailwind CSS"],
    metric: "AI quizzes",
    metricLabel: "Personalized practice with tracked results",
    url: "https://quizzy-black-nine.vercel.app/",
    theme: "quizzy",
    logo: "project-logos/quizzy.png",
  },
  {
    name: "ExpenseEase",
    category: "Full-stack expense tracker",
    description:
      "Track income and expenses with protected, user-specific dashboards. Explore balances and trends, export data to Excel, and upload images using Cloudinary.",
    tags: ["React", "Express.js", "MongoDB", "JWT", "Cloudinary"],
    metric: "Excel export",
    metricLabel: "Expense data ready to download and manage",
    url: "https://expense-ease-silk.vercel.app",
    theme: "expensease",
    logo: "project-logos/expensease.png",
  },
];

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "SQL",
  "MongoDB",
  "Express.js",
  "Node.js",
  "Git",
  "Python",
  "C++",
  "OOP",
];
export const services = [
  {
    title: "Full-stack development",
    text: "Applications built with Next.js, React, Node.js, and TypeScript. From the interface to the API.",
  },
  {
    title: "AI applications",
    text: "Context-aware experiences using RAG, LLMs, embeddings, and Qdrant vector databases.",
  },
  {
    title: "Backend engineering",
    text: "REST APIs and asynchronous background pipelines with Express.js, PostgreSQL, Redis, and BullMQ.",
  },
];
