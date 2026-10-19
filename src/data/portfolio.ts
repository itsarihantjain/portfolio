import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Arihant Jain",
    handle: "@arihantjain",
    title: "Full Stack Developer",
    bio: [
      "I'm a frontend-heavy full stack developer with 5+ years of experience building high-impact web and mobile apps using React, React Native, Next.js, and Node.js. I've built SEO-friendly brand websites, internal dashboards, and cross-platform apps for e-commerce and fintech domains.",
      "My work spans EV charging platforms, quick commerce, fintech wallets, and jewellery e-commerce — always focused on performance, scalability, and great user experience. I believe in using tech to serve communities at a global level with determination, creativity, and heart.",
    ],
    email: "arihantjain.dev@gmail.com",
    location: "Gurugram, India",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/arihantjain-/",
        icon: "Briefcase",
      },
      {
        platform: "Email",
        // Opens Gmail compose in a new tab (mailto: does nothing without a desktop mail app)
        url: "https://mail.google.com/mail/?view=cm&fs=1&to=arihantjain.dev@gmail.com",
        icon: "Mail",
      },
    ],
  },

  skills: [
    // Frontend & Mobile
    { name: "React Native", category: "Frontend" },
    { name: "React.js", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "React Query", category: "Frontend" },
    { name: "SCSS", category: "Frontend" },
    { name: "Responsive Web Apps", category: "Frontend" },
    { name: "Webpack", category: "Frontend" },

    // Backend
    { name: "Node.js", category: "Backend" },
    { name: "MongoDB", category: "Backend" },
    { name: "REST APIs", category: "Backend" },

    // Tools & Design
    { name: "Git", category: "Tools & Design" },
    { name: "OpenLayers", category: "Tools & Design" },
    { name: "Push Notifications", category: "Tools & Design" },
    { name: "Real-time Systems", category: "Tools & Design" },
    { name: "Cross-Platform Development", category: "Tools & Design" },
  ],

  projects: [
    {
      title: "FNP — Rider & Workflow Apps",
      liveUrl: "https://www.fnp.com/",
      brand: "FNP",
      image: "/projects/fnp.webp",
      description:
        "Independently building production React Native apps for Ferns N Petals from 0 to 100 — a Rider/Delivery app with real-time order tracking and live location, and a Workflow app that syncs tasks, progress and BOM updates for florists and chefs with push notifications.",
      techStack: ["React Native", "TypeScript", "Push Notifications", "Real-time Systems"],
      featured: true,
    },
    {
      title: "Spencer Quick Commerce App",
      liveUrl: "https://www.spencers.in/",
      brand: "Jiffy",
      image: "/projects/jiffy-spencer.webp",
      description:
        "Built a full-featured quick commerce mobile application from scratch along with its admin dashboard. Developed under UiX Labs, handling end-to-end architecture, order management, and real-time delivery tracking.",
      techStack: ["React Native", "React.js", "Node.js", "MongoDB"],
      featured: true,
    },
    {
      title: "Eternz Jewellery App",
      liveUrl: "https://www.eternz.com/",
      brand: "Eternz",
      image: "/projects/eternz.webp",
      description:
        "Developed a cross-platform jewellery e-commerce app and its management dashboard. Built rich product catalogs, shopping cart, payment integration, and order management systems.",
      techStack: ["React Native", "React.js", "TypeScript"],
      featured: true,
    },
    {
      title: "Planify — Fintech Platform",
      liveUrl: "https://www.planify.in/",
      brand: "Planify",
      image: "/projects/planify.webp",
      description:
        "Spearheaded the wallet feature development for Planify B2C brand. Built atomic components for web and mobile apps, led a week-long bug sprint clearing all Jira tickets and enhancing platform stability.",
      techStack: ["React Native", "React.js", "TypeScript"],
      featured: true,
    },
    {
      title: "BluCharge & BluPilot",
      liveUrl: "https://www.linkedin.com/company/blu-smart-mobility/",
      brand: "BluSmart",
      image: "/projects/blusmart.jpg",
      imagePosition: "center 70%",
      description:
        "Revamped BluCharge with React Native for seamless EV charging. Built BluPilot — a cross-platform B2B charging app. Reduced app crashes by 99% and optimized the vehicle charging process.",
      techStack: ["React Native", "Node.js", "MongoDB", "OpenLayers"],
      featured: true,
    },
    {
      title: "Altilium — Charging Management System",
      liveUrl: "https://www.linkedin.com/company/blu-smart-mobility/",
      brand: "BluSmart",
      image: "/projects/blusmart.jpg",
      imagePosition: "center 70%",
      description:
        "Built a CMS for BCPL optimizing EV charging resources at hubs across Delhi, Gurgaon, and Bangalore. Streamlined charger allocations, minimized fleet downtime, and maximized ride capacity and revenue.",
      techStack: ["React.js", "Node.js", "OpenLayers", "MongoDB"],
      featured: false,
    },
    {
      title: "UiX Labs Brand Website",
      liveUrl: "https://uixlabs.co/",
      brand: "UiX Labs",
      image: "/projects/uix-labs.webp",
      description:
        "Delivered a modern, responsive, and SEO-friendly brand website for UiX Labs using React.js. Achieved top search ranking and established the company's digital presence.",
      techStack: ["React.js", "SCSS", "Responsive Design"],
      featured: false,
    },
  ],

  experience: [
    {
      company: "Ferns & Petals (FNP)",
      role: "Software Engineer 2",
      startDate: "Aug 2025",
      endDate: "Present",
      companyUrl: "https://www.fnp.com",
      description:
        "Independently developing and scaling production-grade React Native applications from scratch, handling complete mobile architecture, deployment, and feature delivery.",
      highlights: [
        "Built 2 production React Native apps from 0 to 100 — Rider/Delivery App and Workflow Management App",
        "Implemented real-time order tracking, live delivery location updates, image capture, and push notifications",
        "Developed end-to-end order lifecycle management including task assignment, progress tracking, and BOM updates",
        "Eliminated manual refresh for florists/chefs with real-time synchronization and push notification system",
      ],
    },
    {
      company: "BluSmart",
      role: "Software Engineer",
      startDate: "Feb 2023",
      endDate: "Jun 2025",
      companyUrl: "https://www.blusmart.in",
      description:
        "Built and scaled EV charging platforms and cross-platform mobile applications, working across the full stack with React Native and Node.js.",
      highlights: [
        "Revamped BluCharge with React Native, reducing crashes by 99% and streamlining the charging experience",
        "Independently developed BluPilot — a cross-platform B2B charging app with robust, intuitive interface",
        "Built Altilium CMS optimizing charging resources across Delhi, Gurgaon, and Bangalore hubs",
        "Implemented OpenLayers for dynamic hub visualization and interactive mapping",
        "Worked with Node.js and MongoDB for backend services and data management",
      ],
    },
    {
      company: "UiX Labs",
      role: "Software Engineer",
      startDate: "Jun 2022",
      endDate: "Feb 2023",
      companyUrl: undefined,
      description:
        "Delivered multiple products across fintech, e-commerce, and quick commerce — brand websites, mobile apps, and dashboards.",
      highlights: [
        "Built Spencer Quick Commerce App and dashboard from scratch with full e2e architecture",
        "Developed Eternz jewellery e-commerce app and management dashboard",
        "Spearheaded Planify wallet feature using React Native for cross-platform functionality",
        "Delivered a top-ranking, SEO-friendly brand website for the company using React.js",
        "Led a week-long bug sprint at Planify, clearing all Jira tickets and enhancing stability",
      ],
    },
    {
      company: "Wipro",
      role: "Project Engineer",
      startDate: "Jul 2021",
      endDate: "May 2022",
      companyUrl: "https://www.wipro.com",
      description:
        "Analyzed client requirements and developed responsive interfaces with automated data retrieval systems.",
      highlights: [
        "Translated client requirements into comprehensive design documents",
        "Developed responsive interface for customer query logging on data discrepancies",
        "Implemented CRON jobs to automate customer data fetching, optimizing efficiency",
      ],
    },
  ],

  education: [
    {
      institution: "Chitkara University",
      degree: "Bachelor of Engineering — Computer Science",
      startDate: "2017",
      endDate: "2021",
    },
  ],
};
