// Résumé content, transcribed from public/resume.pdf (Sathvik_Resume (3).pdf).
// Keep this file and the PDF in sync — the Dock's Résumé app reads from here, and the
// "Download PDF" button hands over the real file.

export const RESUME_PDF = "/resume.pdf";

// Shown in the app header. Remove `phone` if you'd rather not publish a number on a
// public site — the app simply drops the chip when it's empty.
export const RESUME_CONTACT = {
  name: "Sathvik S",
  phone: "+91 6360435044",
  email: "sathvikshankar2005@gmail.com",
  github: "github.com/Sathvik523",
  githubUrl: "https://github.com/Sathvik523",
};

export interface ResumeEducation {
  school: string;
  location: string;
  qualification?: string;
  detail: string;
}

export const RESUME_EDUCATION: ResumeEducation[] = [
  {
    school: "PES University",
    location: "Bangalore, India",
    qualification: "Bachelor of Technology in Computer Science Engineering",
    detail: "Current CGPA: 6.2",
  },
  {
    school: "Alva's PU College",
    location: "Moodbidri, D.K.",
    detail: "Class 12th Percentage: 92.3%",
  },
];

export interface ResumeRole {
  organisation: string;
  role: string;
  points: string[];
}

export const RESUME_EXPERIENCE: ResumeRole[] = [
  {
    organisation: "PESU ISFCR 5G Labs",
    role: "Research Intern",
    points: [
      "Assisted in deploying and configuring a 5G network using Linux systems and Open5GS in a lab environment.",
      "Troubleshot and resolved configuration issues to ensure seamless integration and operation of 5G network components.",
      "Assisted in initial configurations related to 5G network slicing within the Open5GS environment for service differentiation.",
    ],
  },
];

export interface ResumeProject {
  title: string;
  stack: string[];
  points: string[];
}

export const RESUME_PROJECTS: ResumeProject[] = [
  {
    title: "EmoStream: Concurrent Emoji Broadcast over Event-Driven Architecture",
    stack: ["Python", "Spark", "Kafka", "Flask", "Redis"],
    points: [
      "Designed and implemented a scalable system to process millions of real-time emoji reactions during live sporting events using Kafka and Spark Streaming.",
      "Developed an asynchronous Flask API endpoint to handle high-concurrency input from multiple clients per second and stream data to Kafka brokers.",
      "Built a Spark Streaming job for 2-second micro-batch processing, aggregating similar emoji reactions into single representative counts.",
      "Established a Pub-Sub architecture with cluster publishers and subscribers to ensure real-time delivery of aggregated data to thousands of users.",
    ],
  },
  {
    title: "Competitive Exam Rank Automation Platform",
    stack: ["Python", "MySQL", "YAML"],
    points: [
      "Built a Python-based system to generate and manage JEE Mains student data using YAML scripts and MySQL, including registration IDs, scores and ranks.",
      "Designed SQL views for real-time percentile and rank calculations with customizable tie-breaker logic across multiple sessions.",
      "Automated aggregation and analysis of nationwide JEE Mains data, handling duplicates and tracking multiple attempts efficiently.",
    ],
  },
  {
    title: "Hybrid Watermarking Framework with AI-Powered Recovery and Blockchain Ownership Verification",
    stack: ["Python", "Deep Learning", "OpenCV", "Blockchain"],
    points: [
      "Designed a secure digital image watermarking framework integrating AI-based recovery mechanisms for enhanced asset protection.",
      "Implemented blockchain technology to verify ownership, ensuring the immutability and traceability of the watermarked images.",
      "Applied advanced digital image processing and deep learning models to strengthen the watermark's robustness against complex extraction attacks.",
    ],
  },
  {
    title: "Analytic System for Predicting and Reducing Customer Churn",
    stack: ["PowerBI", "Scikit-learn", "OpenCV", "PyTorch", "MongoDB", "FastAPI", "Chart.js/Recharts"],
    points: [
      "Analyzed data to identify key factors influencing churn (e.g. delivery delays, low engagement), while carefully separating correlation from real causal influence.",
      "Estimated the true impact of potential actions (discounts, faster delivery, etc.) on churn probability reduction using causal/uplift modelling.",
      "Compared actions based on business impact and recommended the action delivering the maximum net benefit.",
    ],
  },
];

export const RESUME_SKILLS = [
  {
    label: "Programming Languages",
    items: ["Python", "C/C++", "Java", "JavaScript", "HTML/CSS", "Rust", "SQL"],
  },
  {
    label: "Tools",
    items: ["Docker", "Kubernetes", "Redis", "MongoDB", "PyTorch", "Pandas", "NumPy", "Git", "MySQL", "YAML", "Kafka", "Spark"],
  },
];
