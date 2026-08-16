import API_URL from "@/app/api/url";
import type { TeamDepartment } from "../types/teamDepartment";

const BASE_URL = `${API_URL}/team-department`;

const parseData = async (response: Response): Promise<TeamDepartment> => {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Request failed. Status: ${response.status}. ${text}`);
    }
    const json = await response.json();
    if (json?.data) return json.data;
    if (json?.leadership || json?.departments) return json as TeamDepartment;
    throw new Error("Invalid team/department response format");
};

export const teamDepartmentApi = {
    async get(): Promise<TeamDepartment> {
        const response = await fetch(BASE_URL, { next: { revalidate: 0 } });
        return parseData(response);
    },

    async addLeader(formData: FormData) {
        const response = await fetch(`${BASE_URL}/leadership/add`, {
            method: "POST",
            body: formData,
        });
        return parseData(response);
    },

    async updateLeader(id: string, formData: FormData) {
        const response = await fetch(`${BASE_URL}/leadership/update/${id}`, {
            method: "PUT",
            body: formData,
        });
        return parseData(response);
    },

    async deleteLeader(id: string) {
        const response = await fetch(`${BASE_URL}/leadership/delete/${id}`, {
            method: "DELETE",
        });
        return parseData(response);
    },

    async addDepartment(formData: FormData) {
        const response = await fetch(`${BASE_URL}/departments/add`, {
            method: "POST",
            body: formData,
        });
        return parseData(response);
    },

    async updateDepartment(id: string, formData: FormData) {
        const response = await fetch(`${BASE_URL}/departments/update/${id}`, {
            method: "PUT",
            body: formData,
        });
        return parseData(response);
    },

    async deleteDepartment(id: string) {
        const response = await fetch(`${BASE_URL}/departments/delete/${id}`, {
            method: "DELETE",
        });
        return parseData(response);
    },
};

