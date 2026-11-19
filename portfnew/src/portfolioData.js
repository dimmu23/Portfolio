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
