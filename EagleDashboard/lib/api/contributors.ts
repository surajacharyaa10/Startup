import API_URL from "@/app/api/url";
import type { Contributor } from "../types/contributor";

export const contributorsApi = {
    async getContributors(): Promise<Contributor[]> {
        const response = await fetch(`${API_URL}/contributors`, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch contributors. Status: ${response.status}`);
        }

        const json = await response.json();

        // Backend may return either an array or an object wrapper { success, data }
        if (Array.isArray(json)) {
            return json;
        }
        if (Array.isArray(json.data)) {
            return json.data;
        }

        // If the shape is unexpected, fail fast for easier debugging
        throw new Error("Invalid contributors response format");
    },

    async createContributor(formData: FormData): Promise<{ success: boolean; data: Contributor }> {
        const response = await fetch(`${API_URL}/contributors/create`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to create contributor. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },

    async updateContributor(
        id: string,
        formData: FormData
    ): Promise<{ success: boolean; data: Contributor }> {
        const response = await fetch(`${API_URL}/contributors/update/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to update contributor. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },

    async deleteContributor(id: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${API_URL}/contributors/delete/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to delete contributor. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },
};

