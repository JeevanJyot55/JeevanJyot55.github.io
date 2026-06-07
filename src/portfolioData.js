export const portfolioData = {
  personal: {
    name: "Jeevan Jyot Singh",
    title: "CS/Economics student at UW-Madison and Software Engineering Intern at Google",
    slogan: "Designed to build. Built to inspire.",
    subSlogan: "Building AI-integrated Android features, data systems, and full-stack projects with a focus on practical customer impact.",
    resumeUrl: "/JeevanJyot_Singh_Resume.pdf",
    socials: {
      github: "https://github.com/JeevanJyot55",
      linkedin: "https://linkedin.com/in/jeevanjyotsingh",
      email: "mailto:jeevanjsingh5125@gmail.com",
      twitter: "https://github.com/JeevanJyot55"
    }
  },
  
  projects: [
    {
      id: "optistocks",
      title: "OptiStocks",
      subtitle: "Risk-aware stock recommendations and portfolio simulation.",
      description: "A stock recommender and allocation simulator built around financial analysis, risk budgeting, and fast portfolio testing.",
      longDescription: "OptiStocks evaluates market data and portfolio allocations to support data-driven investment testing. It back-tested strategies over five years, simulated 100+ portfolios in under two seconds, and integrated Yahoo Finance data streams for fast ticker monitoring and alerts.",
      tech: ["TypeScript", "Python", "Yahoo Finance API", "Financial Analysis"],
      accentColor: "#30d158", // Green
      imageType: "stock",
      isHero: true,
      sourceUrl: "https://github.com/JeevanJyot55/OptiStocks",
      liveUrl: "https://github.com/JeevanJyot55/OptiStocks",
      metrics: {
        return: "~13% annualized 5-year back-test",
        simulation: "100+ portfolios in <2s",
        data: "500+ tickers/min with <1s alerts"
      }
    },
    {
      id: "legacy-translator",
      title: "Legacy Code Translator",
      subtitle: "ML-assisted C-to-Python modernization.",
      description: "A machine-learning translator that converts legacy C patterns into Python using NLP, Transformers, and PyTorch.",
      longDescription: "Legacy Code Translator benchmarks C and Python code pairs, runs a tokenization pipeline with CI checks, and improves translation quality for developer reuse. The project reached about 70% translation accuracy while improving throughput and reducing syntax errors during model iteration.",
      tech: ["Python", "Transformers", "NLP", "PyTorch"],
      accentColor: "#ff9f0a", // Orange
      imageType: "ml",
      isHero: false,
      sourceUrl: "https://github.com/JeevanJyot55/LegacyCodeTranslator",
      liveUrl: "https://github.com/JeevanJyot55/LegacyCodeTranslator",
      metrics: {
        accuracy: "~70% C-to-Python translation accuracy",
        throughput: "~15% tokenization throughput gain",
        quality: "~8% syntax error reduction"
      }
    },
    {
      id: "futuregram",
      title: "FutureGram",
      subtitle: "Time-locked social posting for mobile-first communities.",
      description: "A React and Firebase social app where users create posts that unlock over time, designed for stronger engagement loops.",
      longDescription: "FutureGram paired a mobile-first React interface with Firebase authentication and sync to support time-locked social posting. The beta reached 100+ users, increased average session length by about 25%, and reduced login errors by roughly 90% during QA through stronger auth and data-sync reliability.",
      tech: ["React", "JavaScript", "Node.js", "Firebase"],
      accentColor: "#ff2d55",
      imageType: "futuregram",
      isHero: false,
      sourceUrl: "https://github.com/JeevanJyot55",
      liveUrl: "https://github.com/JeevanJyot55",
      metrics: {
        users: "100+ beta users",
        engagement: "~25% longer average sessions",
        reliability: "~90% fewer login errors in QA"
      }
    },
    {
      id: "cinerank",
      title: "CineRank",
      subtitle: "Immersive movies dashboard catalog.",
      description: "A dynamic movie rating and reviews directory showing review trends, rating aggregators, sorting indices, and rich caching systems.",
      longDescription: "CineRank aggregates film data across external REST endpoints, establishing client-side caching matrices to prevent api limits, rendering fluid animation filter grids, and managing rating index systems.",
      tech: ["JavaScript", "React", "Vanilla CSS", "TMDB Engine"],
      accentColor: "#bf5af2", // Purple
      isHero: false,
      imageType: "movie",
      sourceUrl: "https://github.com/JeevanJyot55/CineRank",
      liveUrl: "https://github.com/JeevanJyot55/CineRank",
      metrics: {
        search: "Instant search indexing",
        caching: "Local SessionStorage matrices",
        framerate: "60 FPS scroll performance"
      }
    },
    {
      id: "auth-encryption",
      title: "authEncryption",
      subtitle: "Zero-knowledge cryptographic suite.",
      description: "A lightweight cryptographic manager and payload encryption suite implementing AES-GCM and asymmetric key pairings in TypeScript.",
      longDescription: "authEncryption uses the Web Crypto API to implement client-side encryption. Encrypts sensitive fields with AES-256-GCM tokens before network transit, generating local keypairs and managing token authorizations securely.",
      tech: ["TypeScript", "Web Crypto API", "JWT Auth", "AES-GCM"],
      accentColor: "#4285f4", // Blue
      imageType: "security",
      isHero: true,
      sourceUrl: "https://github.com/JeevanJyot55/authEncryption",
      liveUrl: "https://github.com/JeevanJyot55/authEncryption",
      metrics: {
        security: "AES-256-GCM standards",
        latency: "< 2ms local encryption speed",
        privacy: "100% zero-knowledge model"
      }
    },
    {
      id: "uw-cs-coursework",
      title: "UW-Madison CS Coursework",
      subtitle: "Academic systems, data structures, and Java application builds.",
      description: "A collection of course projects spanning enrollment systems, games, recursive selection, custom ADTs, trees, graphs, and JavaFX apps.",
      longDescription: "Through UW-Madison Computer Science coursework, built a course enrollment system with ArrayLists and exception handling, an OOP Frog-Bug game, a recursive TA hiring system, custom ADTs including linked lists, queues, and trees, plus Red-Black Tree and graph-based JavaFX applications. Source code cannot be shared publicly due to university privacy and academic integrity restrictions.",
      tech: ["Java", "Data Structures", "OOP", "JavaFX"],
      accentColor: "#ffcc00",
      imageType: "laptop",
      isHero: false,
      sourceUrl: null,
      liveUrl: null,
      restricted: true,
      restrictionReason: "Cannot share due to university privacy restrictions.",
      metrics: {
        structures: "Linked lists, queues, trees, graphs",
        algorithms: "Recursion, Red-Black Trees, navigation graphs",
        testing: "Exception handling and comprehensive tests"
      }
    }
  ],

  skills: {
    chip: "Full-stack Systems Core",
    description: "Built around production UI work, scalable data tooling, distributed systems coursework, and AI/ML experimentation.",
    categories: [
      {
        title: "Languages",
        score: "94%",
        specs: [
          { name: "Java / Kotlin / Python / C / C++", value: "Android, systems, AI, and algorithmic programming across internships, coursework, and projects." },
          { name: "TypeScript / JavaScript / SQL", value: "Full-stack application work, typed frontend flows, API integration, and database-backed features." },
          { name: "Swift", value: "Mobile-oriented language exposure through SwiftUI learning projects." }
        ]
      },
      {
        title: "Frameworks",
        score: "91%",
        specs: [
          { name: "React / Angular / Jetpack Compose", value: "Frontend and Android interfaces, reusable UI components, and workflow-focused product experiences." },
          { name: "Node.js / FastAPI", value: "REST APIs, service endpoints, and backend logic for application features." },
          { name: "Django / Flask", value: "Python web services and rapid backend prototyping." }
        ]
      },
      {
        title: "Systems & Data",
        score: "93%",
        specs: [
          { name: "Linux / Docker / Kafka / Spark", value: "Big Data teaching, debugging, container workflows, and distributed processing concepts." },
          { name: "PostgreSQL / Firebase / AWS / gRPC", value: "Database-backed applications, cloud infrastructure, auth/sync flows, and service communication." },
          { name: "PyTorch / TensorFlow / Scikit-learn", value: "ML model work, evaluation scripts, inference optimization, and data science tooling." }
        ]
      }
    ]
  },

  experience: [
    {
      period: "May 2026 - Present",
      role: "Software Engineer Intern",
      company: "Google (Mountain View, CA)",
      highlights: [
        "Google Photos - Summer 2026 internship based in Mountain View, California.",
        "Working with AI integration in Android development for customer-facing product impact.",
        "Tech stack includes Kotlin, Java, and Jetpack Compose."
      ]
    },
    {
      period: "Jan 2026 - May 2026",
      role: "Undergraduate Teaching Assistant",
      company: "University of Wisconsin-Madison",
      highlights: [
        "Peer Mentor for CS 544: Big Data Systems, supporting students through weekly office hours and online Q&A.",
        "Helped debug course projects and assisted the Grad TA with project creation and maintenance, including GitLab workflows.",
        "Responded to student questions on Piazza/email and helped proctor exams for smooth and fair assessments."
      ]
    },
    {
      period: "Jun 2025 - Jan 2026",
      role: "Artificial Intelligence Intern",
      company: "Anvian Innovations (Remote / Dover, DE)",
      highlights: [
        "Designed and deployed AI agents integrated with large language models to automate workflows and improve efficiency.",
        "Collaborated with cross-functional teams on cloud-based applications, research, and client-ready demos.",
        "Monitored and optimized system performance while staying current with AI and machine learning techniques."
      ]
    },
    {
      period: "Aug 2024 - May 2026",
      role: "Learning Community Program Assistant",
      company: "University of Wisconsin - Division of Housing",
      highlights: [
        "Organized and led weekly events for 550+ students across residential learning communities.",
        "Built interpersonal relationships and a stronger sense of community through consistent student programming.",
        "Practiced adaptable, client-oriented problem solving in a dynamic on-campus environment."
      ]
    },
    {
      period: "Jun 2025 - Jul 2025",
      role: "Teaching Assistant - Micro Economics",
      company: "University of Wisconsin-Madison",
      highlights: [
        "Led interactive polls and group discussions for 50+ students to improve engagement and performance.",
        "Held three weekly one-hour discussion sections and office hours to help students clarify course concepts.",
        "Partnered with faculty to organize field trips and streamline materials serving about 200 students weekly."
      ]
    }
  ],

  education: [
    {
      school: "University of Wisconsin-Madison",
      degree: "Bachelor of Science in Computer Science & Economics",
      location: "Madison, WI",
      period: "Sep 2023 - May 2027",
      gpa: "3.72 / 4.00",
      logo: "/uw_logo.png",
      highlights: [
        "Coursework: Data Structures & Algorithms, Database Management Systems, Intro to Big Data, Matrix Methods in Machine Learning.",
        "Economics coursework includes Intermediate Microeconomic Theory (Honors) and Intermediate Macroeconomics Theory (Honors)."
      ]
    },
    {
      school: "University of California, Berkeley",
      degree: "Undergraduate Summer Course, Computer Science",
      location: "Berkeley, CA",
      period: "Jun 2022 - Aug 2022",
      gpa: null,
      logo: "/uc_logo.png",
      highlights: [
        "Completed Structure and Interpretation of Computer Programs - Python (CS61A).",
        "Completed The Beauty and Joy of Computing (CS10).",
        "Built early CS foundations in Python, abstraction, algorithms, and computational thinking."
      ]
    }
  ],

  linkedinHighlights: {
    profile: {
      location: "Madison, Wisconsin, United States",
      followers: "1K followers",
      connections: "500+ connections"
    },
    certifications: [
      { title: "Introduction to Cloud Computing", issuer: "IBM", date: "Issued Jul 2024" },
      { title: "Regular Expressions in Python", issuer: "Coursera", date: "Issued Sep 2022" },
      { title: "Programming Fundamentals", issuer: "Coursera", date: "Issued Feb 2022" },
      { title: "COVID-19 Training for Healthcare Workers", issuer: "Coursera", date: "Issued Nov 2021" }
    ],
    organizations: [
      "Capital Management Club",
      "Google Developer Group",
      "Badminton Club",
      "LeetCode Club",
      "Economics Student Association"
    ],
    courses: [
      { title: "Data Structures & Algorithms", code: "COMP SCI 577", school: "University of Wisconsin-Madison" },
      { title: "Database Management Systems", code: "COMP SCI 564", school: "University of Wisconsin-Madison" },
      { title: "Intro to Big Data", code: "COMP SCI 544", school: "University of Wisconsin-Madison" },
      { title: "Matrix Methods in Machine Learning", code: "COMP SCI 532", school: "University of Wisconsin-Madison" },
      { title: "Programming II", code: "COMP SCI 400", school: "University of Wisconsin-Madison" },
      { title: "Programming I", code: "COMP SCI 300", school: "University of Wisconsin-Madison" },
      { title: "Structure, Interpretation of Computer Programs - Python", code: "CS61A", school: "University of California, Berkeley" },
      { title: "The Beauty and Joy of Computing", code: "CS10", school: "University of California, Berkeley" },
      { title: "International Macroeconomics", code: "ECON 461", school: "University of Wisconsin-Madison" },
      { title: "Advanced Econometrics", code: "ECON 410L", school: "University of Wisconsin-Madison" },
      { title: "Intermediate MacroEconomics Theory (Honors)", code: "ECON 312", school: "University of Wisconsin-Madison" },
      { title: "Intermediate MicroEconomic Theory (Honors)", code: "ECON 311", school: "University of Wisconsin-Madison" },
      { title: "Introduction to Finance", code: "FINANCE 300", school: "University of Wisconsin-Madison" },
    ],
    languages: [
      "Hindi - native or bilingual proficiency",
      "English - native or bilingual proficiency",
      "Spanish - elementary proficiency"
    ]
  },

  arcade: {
    highScores: [
      { name: "JJY", score: 180 },
      { name: "GOO", score: 150 },
      { name: "DEV", score: 120 }
    ]
  }
};
