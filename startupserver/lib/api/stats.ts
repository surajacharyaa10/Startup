import API_URL from "@/app/api/url";
import type { Stats, StatsInput } from "../types/stats";

export const statsApi = {
  async getStats(): Promise<Stats[]> {
    const response = await fetch(`${API_URL}/stats`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stats. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON response for stats");
    }

    return response.json();
  },

  async createStats(payload: StatsInput): Promise<Stats> {
    const response = await fetch(`${API_URL}/stats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create stats. Status: ${response.status}. ${errorText}`
      );
    }

    return response.json();
  },

  async updateStats(id: string, payload: StatsInput): Promise<Stats> {
    const response = await fetch(`${API_URL}/stats/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update stats. Status: ${response.status}. ${errorText}`
      );
    }

    return response.json();
  },
};

