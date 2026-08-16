import API_URL from "./url";

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
}

export const projectsApi = {
    async getProjects(category?: string): Promise<Project[]> {
        const url = category ? `${API_URL}/projects?category=${category}` : `${API_URL}/projects`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
    },

    async getProject(id: string): Promise<Project> {
        const res = await fetch(`${API_URL}/projects/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch project");
        return res.json();
    },
};
