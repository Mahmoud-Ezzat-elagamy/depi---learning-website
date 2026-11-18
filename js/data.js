// ========== Mock Data ==========

const COURSES = [
  {
    id: 1,
    title: "Frontend Fundamentals",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80",
    description: "Learn HTML, CSS, and JavaScript from scratch. Build real projects and understand how the web works.",
    duration: "8 weeks",
    level: "Beginner",
    instructor: "Sara Ahmed",
    sections: [
      {
        title: "Getting Started with HTML",
        lessons: [
          { title: "What is HTML?", duration: "12 min" },
          { title: "Tags and Elements", duration: "18 min" },
          { title: "Forms and Inputs", duration: "22 min" },
        ],
      },
      {
        title: "Styling with CSS",
        lessons: [
          { title: "Selectors and Properties", duration: "15 min" },
          { title: "Flexbox Layout", duration: "25 min" },
          { title: "Responsive Design", duration: "30 min" },
        ],
      },
      {
        title: "JavaScript Basics",
        lessons: [
          { title: "Variables and Data Types", duration: "20 min" },
          { title: "Functions and Scope", duration: "28 min" },
          { title: "DOM Manipulation", duration: "35 min" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Backend with Node.js",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    description: "Build scalable server-side apps using Node.js and Express. Connect databases and create REST APIs.",
    duration: "10 weeks",
    level: "Intermediate",
    instructor: "Karim Nour",
    sections: [
      {
        title: "Node.js Core",
        lessons: [
          { title: "How Node.js Works", duration: "20 min" },
          { title: "Modules and npm", duration: "18 min" },
          { title: "File System and Streams", duration: "25 min" },
        ],
      },
      {
        title: "Building APIs with Express",
        lessons: [
          { title: "Routing Basics", duration: "22 min" },
          { title: "Middleware", duration: "20 min" },
          { title: "Error Handling", duration: "15 min" },
        ],
      },
      {
        title: "Databases",
        lessons: [
          { title: "Introduction to MongoDB", duration: "30 min" },
          { title: "CRUD Operations", duration: "35 min" },
          { title: "Authentication with JWT", duration: "40 min" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    category: "ML",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    description: "Understand the core concepts behind machine learning. Work with real datasets and build your first model.",
    duration: "12 weeks",
    level: "Intermediate",
    instructor: "Mona Hassan",
    sections: [
      {
        title: "Math for ML",
        lessons: [
          { title: "Linear Algebra Refresher", duration: "30 min" },
          { title: "Statistics Essentials", duration: "25 min" },
        ],
      },
      {
        title: "Supervised Learning",
        lessons: [
          { title: "Linear Regression", duration: "35 min" },
          { title: "Classification with KNN", duration: "30 min" },
          { title: "Decision Trees", duration: "28 min" },
        ],
      },
      {
        title: "Model Evaluation",
        lessons: [
          { title: "Train/Test Split", duration: "20 min" },
          { title: "Overfitting and Regularization", duration: "30 min" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Deep Learning with Python",
    category: "Deep Learning",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    description: "Dive into neural networks, CNNs, and RNNs. Build models that can see, read, and understand data.",
    duration: "14 weeks",
    level: "Advanced",
    instructor: "Omar Farouk",
    sections: [
      {
        title: "Neural Networks",
        lessons: [
          { title: "Perceptrons and Layers", duration: "35 min" },
          { title: "Backpropagation", duration: "40 min" },
          { title: "Activation Functions", duration: "20 min" },
        ],
      },
      {
        title: "Convolutional Neural Networks",
        lessons: [
          { title: "Image Data Preprocessing", duration: "25 min" },
          { title: "CNN Architecture", duration: "45 min" },
          { title: "Transfer Learning", duration: "38 min" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "AI for Everyone",
    category: "AI",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    description: "A non-technical introduction to AI. Understand what AI is, where it's used, and how to work with AI teams.",
    duration: "4 weeks",
    level: "Beginner",
    instructor: "Dina Ramzy",
    sections: [
      {
        title: "What is AI?",
        lessons: [
          { title: "AI vs ML vs Deep Learning", duration: "15 min" },
          { title: "Real-world Applications", duration: "18 min" },
        ],
      },
      {
        title: "Working with AI",
        lessons: [
          { title: "How to Spot Bias", duration: "20 min" },
          { title: "AI Strategy for Business", duration: "25 min" },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Full-Stack Web Development",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    description: "Combine frontend and backend skills to build complete web applications from start to finish.",
    duration: "16 weeks",
    level: "Intermediate",
    instructor: "Youssef Talaat",
    sections: [
      {
        title: "Project Architecture",
        lessons: [
          { title: "Planning Your App", duration: "20 min" },
          { title: "Folder Structure Best Practices", duration: "15 min" },
        ],
      },
      {
        title: "Frontend & Backend Integration",
        lessons: [
          { title: "Fetch API and AJAX", duration: "25 min" },
          { title: "Authentication Flow", duration: "35 min" },
          { title: "Deploying Your App", duration: "30 min" },
        ],
      },
    ],
  },
];

const QA = [
  {
    question: "Do I need prior experience to enroll?",
    answer: "Not for beginner courses. Each course clearly marks its level, so you can start wherever fits you.",
  },
  {
    question: "Can I access courses on mobile?",
    answer: "Yes, the platform works on any device with a browser.",
  },
  {
    question: "Is there a certificate after completion?",
    answer: "Yes, you'll receive a certificate once you finish all lessons in a course.",
  },
  {
    question: "How long do I have access to a course?",
    answer: "Once subscribed, you have lifetime access to that course's content.",
  },
  {
    question: "What if I fall behind?",
    answer: "There are no deadlines. You learn at your own pace.",
  },
];

