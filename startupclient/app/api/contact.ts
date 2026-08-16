import API_URL from "./url";

export interface ContactData {
    _id: string;
    address: string;
    email: string;
    phone: string;
    whatsapp: string;
    socials: {
        platform: string;
        url: string;
        _id: string;
    }[];
}

export const contactApi = {
    async getContact(): Promise<ContactData | null> {
        const res = await fetch(`${API_URL}/contact`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch contact");
        const data = await res.json();
        return data.data;
    },
};
