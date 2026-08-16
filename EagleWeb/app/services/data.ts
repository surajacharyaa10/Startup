import { FiCode, FiSmartphone, FiCloud, FiCpu, FiLayout, FiTrendingUp, FiShield, FiDatabase } from "react-icons/fi";

export const servicesData = [
    {
        id: "web-development",
        title: "Web Application Development",
        description: "We don't just build websites; we craft digital experiences. From high-performance single-page applications to complex enterprise portals, our web solutions are built to scale, perform, and engage.",
        icon: FiCode,
        features: ["Next.js & React Ecosystem", "Progressive Web Apps (PWA)", "Enterprise-grade Security", "SEO Optimized Architecture"],
        link: "/services/web"
    },
    {
        id: "mobile-development",
        title: "Mobile App Engineering",
        description: "Reach your users wherever they are. We engineer native and cross-platform mobile applications that feel fluid, intuitive, and powerful on every device.",
        icon: FiSmartphone,
        features: ["iOS & Android Native", "React Native & Flutter", "Offline-first Architecture", "Real-time Synchronization"],
        link: "/services/mobile"
    },
    {
        id: "cloud-infrastructure",
        title: "Cloud & DevOps Solutions",
        description: "Build on a foundation that never sleeps. We design resilient, scalable cloud infrastructures that handle traffic spikes with ease and deploy updates with zero downtime.",
        icon: FiCloud,
        features: ["AWS / Azure / GCP", "Kubernetes & Docker", "CI/CD Pipelines", "Infrastructure as Code"],
        link: "/services/cloud"
    },
    {
        id: "ai-solutions",
        title: "AI & Machine Learning",
        description: "Turn data into decision-making power. We integrate cutting-edge AI models to automate workflows, predict trends, and personalize user experiences.",
        icon: FiCpu,
        features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Custom Model Training"],
        link: "/services/ai"
    },
    {
        id: "ui-ux-design",
        title: "Product Design (UI/UX)",
        description: "Design that works as good as it looks. Our user-centric design process ensures your product is not only beautiful but also intuitive and accessible.",
        icon: FiLayout,
        features: ["User Research & Testing", "Wireframing & Prototyping", "Design Systems", "Interaction Design"],
        link: "/services/design"
    },
    {
        id: "consulting",
        title: "Strategic IT Consulting",
        description: "Navigate the digital landscape with confidence. Our experts provide the strategic roadmap you need to modernize legacy systems and adopt new technologies.",
        icon: FiTrendingUp,
        features: ["Digital Transformation", "Tech Stack Audits", "Scalability Planning", "Security Compliance"],
        link: "/services/consulting"
    }
];

export const whyChooseUs = [
    {
        title: "Human-Centric Approach",
        description: "We believe technology should serve people, not the other way around. Every line of code we write is focused on improving the end-user experience.",
        icon: FiUsers
    },
    {
        title: "Transparency First",
        description: "No black boxes. You get full visibility into our process, code, and decision-making from day one.",
        icon: FiShield
    },
    {
        title: "Future-Proof Engineering",
        description: "We don't just solve today's problems. We architect solutions that are ready for tomorrow's challenges.",
        icon: FiDatabase
    }
];

import { FiUsers } from "react-icons/fi";
