import API_URL from "@/app/api/url";
import { Contact, ContactInput } from "../types/contact";

export const contactApi = {
    async getContact(): Promise<{ success: boolean; data: Contact | null }> {
        const response = await fetch(`${API_URL}/contact`, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch contact info. Status: ${response.status}`);
        }

        const json = await response.json();
        return {
            success: json.success,
            data: json.data,
        };
    },

    async updateContact(
        payload: ContactInput
    ): Promise<{ success: boolean; data: Contact }> {
        const response = await fetch(`${API_URL}/contact`, {
            method: "POST", // Backend uses POST for upsert
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to update contact. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },
};
