import API_URL from "@/app/api/url";
import type { Service, ServiceInput } from "../types/services";

export const servicesApi = {
  async getServices(): Promise<Service[]> {
    const response = await fetch(`${API_URL}/services`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch services. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON response for services");
    }

    // Backend returns a plain array: Service[]
    return response.json();
  },

  async createService(payload: ServiceInput): Promise<{ success: boolean; data: Service }> {
    const response = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create service. Status: ${response.status}. ${errorText}`
      );
    }

    return response.json();
  },

  async updateService(
    id: string,
    payload: ServiceInput
  ): Promise<{ success: boolean; data: Service }> {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update service. Status: ${response.status}. ${errorText}`
      );
    }

    return response.json();
  },

  async deleteService(id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete service. Status: ${response.status}. ${errorText}`
      );
    }

    return response.json();
  },
};


