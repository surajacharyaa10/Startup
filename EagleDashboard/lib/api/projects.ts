import API_URL from "@/app/api/url";
import type { Project, ProjectInput } from "../types/project";

export const projectsApi = {
    async getProjects(category?: string): Promise<Project[]> {
        const url = category
            ? `${API_URL}/projects?category=${category}`
            : `${API_URL}/projects`;

        const response = await fetch(url, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch projects. Status: ${response.status}`);
        }

        return response.json();
    },

    async getProject(id: string): Promise<Project> {
        const response = await fetch(`${API_URL}/projects/${id}`, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch project. Status: ${response.status}`);
        }

        return response.json();
    },

    async createProject(formData: FormData): Promise<{ success: boolean; data: Project }> {
        const response = await fetch(`${API_URL}/projects`, {
            method: "POST",
            body: formData, // No Content-Type header - browser sets it automatically with boundary
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to create project. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },

    async updateProject(
        id: string,
        formData: FormData
    ): Promise<{ success: boolean; data: Project }> {
        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to update project. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },

    async deleteProject(id: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to delete project. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },
};
