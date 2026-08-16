import API_URL from "./url";

export interface Resource {
    _id: string;
    title: string;
    description: string;
    type: string;
    image?: string;
    link: string;
    tags: string[];
    featured: boolean;
}

export const resourcesApi = {
    async getResources(type?: string): Promise<Resource[]> {
        const url = type ? `${API_URL}/resources?type=${type}` : `${API_URL}/resources`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch resources");
        return res.json();
    },
};
