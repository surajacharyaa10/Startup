import API_URL from "@/app/api/url";
import type { About, AboutInput } from "../types/about";

export const aboutApi = {
  async getAbouts(): Promise<{ success: boolean; data: About[] }> {
    const response = await fetch(`${API_URL}/about`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch abouts. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON response for abouts");
    }

    const json = await response.json();
    return {
      success: json.success ?? true,
      data: Array.isArray(json.data) ? json.data : json.data ? [json.data] : [],
    };
  },

  async getAbout(): Promise<{ success: boolean; data: About | null }> {
    const res = await this.getAbouts();
    return {
      success: res.success,
      data: res.data.length > 0 ? res.data[0] : null,
    };
  },

  async createAbout(payload: AboutInput): Promise<{ success: boolean; data: About }> {
    const response = await fetch(`${API_URL}/about`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create about. Status: ${response.status}. ${errorText}`
      );
    }

    return response.json();
  },

  async updateAbout(
    id: string,
    payload: AboutInput
  ): Promise<{ success: boolean; data: About }> {
    const response = await fetch(`${API_URL}/about/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update about. Status: ${response.status}. ${errorText}`
      );
    }

    return response.json();
  },

  async deleteAbout(id: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_URL}/about/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete about. Status: ${response.status}. ${errorText}`
      );
    }

    return response.json();
  },
};

