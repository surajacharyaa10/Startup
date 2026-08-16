import API_URL from "@/app/api/url";
import type { Blog } from "../types/blog";

const BASE_URL = `${API_URL}/blogs`;

const parse = async (response: Response) => {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Request failed. Status: ${response.status}. ${text}`);
    }
    return response.json();
};

export const blogsApi = {
    async getAll(): Promise<Blog[]> {
        const res = await fetch(BASE_URL, { next: { revalidate: 0 } });
        const json = await parse(res);
        if (Array.isArray(json)) return json;
        if (Array.isArray(json.data)) return json.data;
        throw new Error("Invalid blogs response format");
    },

    async create(form: FormData): Promise<{ success: boolean; data: Blog }> {
        const res = await fetch(BASE_URL, { method: "POST", body: form });
        return parse(res);
    },

    async update(id: string, form: FormData): Promise<{ success: boolean; data: Blog }> {
        const res = await fetch(`${BASE_URL}/${id}`, { method: "PUT", body: form });
        return parse(res);
    },

    async delete(id: string): Promise<{ success: boolean; message?: string }> {
        const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        return parse(res);
    },
};

