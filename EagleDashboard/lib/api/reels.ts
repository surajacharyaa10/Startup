import API_URL from "@/app/api/url";
import type { Reel } from "../types/reel";

const BASE_URL = `${API_URL}/reels`;

const parse = async (response: Response): Promise<any> => {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Request failed. Status: ${response.status}. ${text}`);
    }
    return response.json();
};

export const reelsApi = {
    async getAll(): Promise<Reel[]> {
        const res = await fetch(BASE_URL, { next: { revalidate: 0 } });
        const json = await parse(res);
        if (Array.isArray(json)) return json;
        if (Array.isArray(json.data)) return json.data;
        throw new Error("Invalid reels response format");
    },

    async create(form: FormData): Promise<{ success: boolean; data: Reel }> {
        const res = await fetch(BASE_URL, { method: "POST", body: form });
        return parse(res);
    },

    async delete(id: string): Promise<{ success: boolean; message?: string }> {
        const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        return parse(res);
    },
};

