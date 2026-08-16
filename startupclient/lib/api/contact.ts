import API_URL from "@/app/api/url";
import { ContactInfo } from "@/lib/types/contact";

export const contactApi = {
    getContact: async (): Promise<{ success: boolean; data: ContactInfo }> => {
        try {
            const response = await fetch(`${API_URL}/contact`, {
                next: { revalidate: 0 },
            });
            if (!response.ok) throw new Error("Failed to fetch contact");
            return await response.json();
        } catch (error) {
            console.error("Error fetching contact info:", error);
            return {
                success: false,
                data: {
                    address: "Loading...",
                    email: "Loading...",
                    phone: "Loading...",
                    socials: []
                }
            };
        }
    },
};
