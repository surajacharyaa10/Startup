import API_URL from "@/app/api/url";
import type { GetInvolved, GetInvolvedInput } from "../types/getInvolved";

export const getInvolvedApi = {
    async getOptions(category?: string): Promise<GetInvolved[]> {
        const url = category
            ? `${API_URL}/get-involved?type=${category}`
            : `${API_URL}/get-involved`;

        const response = await fetch(url, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch options. Status: ${response.status}`);
        }

        const data = await response.json();
        // Normalize 'type' to 'category' for frontend consistency
        return data.map((item: any) => ({
            ...item,
            category: item.category || item.type
        }));
    },

    async getOption(id: string): Promise<GetInvolved> {
        const response = await fetch(`${API_URL}/get-involved/${id}`, {
            next: { revalidate: 0 },
        });

        const data = await response.json();
        return {
            ...data,
            category: data.category || data.type
        };
    },

    async createOption(formData: FormData): Promise<{ success: boolean; data: GetInvolved }> {
        const response = await fetch(`${API_URL}/get-involved`, {
            method: "POST",
            body: formData,
        });

        const resJson = await response.json();
        if (resJson.data) {
            resJson.data = {
                ...resJson.data,
                category: resJson.data.category || resJson.data.type
            };
        }
        return resJson;
    },

    async updateOption(
        id: string,
        formData: FormData
    ): Promise<{ success: boolean; data: GetInvolved }> {
        const response = await fetch(`${API_URL}/get-involved/${id}`, {
            method: "PUT",
            body: formData,
        });

        const resJson = await response.json();
        if (resJson.data) {
            resJson.data = {
                ...resJson.data,
                category: resJson.data.category || resJson.data.type
            };
        }
        return resJson;
    },

    async deleteOption(id: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${API_URL}/get-involved/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to delete option. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },
};
