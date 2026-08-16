import API_URL from "@/app/api/url";
import type { Event, EventInput } from "../types/event";

export const eventsApi = {
    async getEvents(type?: string): Promise<Event[]> {
        const url = type
            ? `${API_URL}/events?type=${type}`
            : `${API_URL}/events`;

        const response = await fetch(url, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch events. Status: ${response.status}`);
        }

        return response.json();
    },

    async getEvent(id: string): Promise<Event> {
        const response = await fetch(`${API_URL}/events/${id}`, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch event. Status: ${response.status}`);
        }

        return response.json();
    },

    async createEvent(formData: FormData): Promise<{ success: boolean; data: Event }> {
        const response = await fetch(`${API_URL}/events`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to create event. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },

    async updateEvent(
        id: string,
        formData: FormData
    ): Promise<{ success: boolean; data: Event }> {
        const response = await fetch(`${API_URL}/events/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to update event. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },

    async deleteEvent(id: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${API_URL}/events/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to delete event. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },
};
