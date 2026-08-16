export interface GetInvolved {
    _id: string;
    title: string;
    description: string;
    category: "volunteer" | "contribute" | "careers";
    icon?: string; // optional image path
    link?: string; // For volunteer and contribute
    // Careers-specific fields
    department?: string;
    location?: string;
    jobType?: string; // Full-time, Part-time, Contract
    applyLink?: string; // For careers
    benefits: string[];
    requirements: string[];
    featured: boolean;
    createdAt: string;
}

export interface GetInvolvedInput {
    title: string;
    description: string;
    category: "volunteer" | "contribute" | "careers";
    icon?: string;
    link?: string; // For volunteer and contribute
    // Careers-specific fields
    department?: string;
    location?: string;
    jobType?: string;
    applyLink?: string; // For careers
    benefits?: string[];
    requirements?: string[];
    featured?: boolean;
}
