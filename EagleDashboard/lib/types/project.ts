export interface Project {
    _id: string;
    name: string;
    tagline: string;
    description: string;
    image: string;
    category: "sandbox" | "incubating" | "graduated" | "archived";
    version: string;
    maturity: string;
    contributors: number;
    stars: number;
    features: string[];
    techStack: string[];
    status: string;
    roadmap: string;
    license: string;
    createdAt: string;
}

export interface ProjectInput {
    name: string;
    tagline: string;
    description: string;
    image: string;
    category: "sandbox" | "incubating" | "graduated" | "archived";
    version?: string;
    maturity?: string;
    contributors?: number;
    stars?: number;
    features?: string[];
    techStack?: string[];
    status?: string;
    roadmap?: string;
    license?: string;
}
