import API_URL from "@/app/api/url";
import { Founder, FounderFormData } from "../types/founder";

export const founderApi = {
  async getFounder(): Promise<{ success: boolean; data: Founder | null }> {
    const response = await fetch(`${API_URL}/founder`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON response");
    }

    return response.json();
  },

  async createFounder(
    formData: FounderFormData,
    avatarFile: File | null
  ): Promise<{ success: boolean; data: Founder; message: string }> {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("position", formData.position);
    form.append("quote", formData.quote);
    form.append("details", formData.details);
    form.append("whatsapp", formData.whatsapp || "");
    form.append("socials", JSON.stringify(formData.socials));
    if (avatarFile) form.append("avatar", avatarFile);

    const response = await fetch(`${API_URL}/founder/create`, {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create founder");
    }

    return response.json();
  },

  async updateFounder(
    id: string,
    formData: FounderFormData,
    avatarFile: File | null
  ): Promise<{ success: boolean; data: Founder; message: string }> {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("position", formData.position);
    form.append("quote", formData.quote);
    form.append("details", formData.details);
    form.append("whatsapp", formData.whatsapp || "");
    form.append("socials", JSON.stringify(formData.socials));
    if (avatarFile) form.append("avatar", avatarFile);

    const response = await fetch(`${API_URL}/founder/update/${id}`, {
      method: "PUT",
      body: form,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update founder");
    }

    return response.json();
  },

  async deleteFounder(id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_URL}/founder/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete founder");
    }

    return response.json();
  },
};
