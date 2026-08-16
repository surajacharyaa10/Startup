import API_URL from "./url";

export interface Founder {
    _id: string;
    name: string;
    position: string;
    quote: string;
    details: string;
    avatar: string;
    displaySocials?: boolean;
    socials?: {
        platform: string;
        url: string;
        _id: string;
    }[];
    whatsapp?: string;
    phone?: string;
    socialMedia?: {
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

export const founderApi = {
    async getFounder(): Promise<Founder> {
        const res = await fetch(`${API_URL}/founder`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch founder");
        const data = await res.json();
        return data.data;
    },
};
