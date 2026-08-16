import API_URL from "@/app/api/url";
import type { Testimonial, TestimonialInput } from "../types/testimonial";

export const testimonialsApi = {
    async getTestimonials(featured?: boolean): Promise<Testimonial[]> {
        const url = featured !== undefined
            ? `${API_URL}/testimonials?featured=${featured}`
            : `${API_URL}/testimonials`;

        const response = await fetch(url, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch testimonials. Status: ${response.status}`);
        }

        return response.json();
    },

    async getTestimonial(id: string): Promise<Testimonial> {
        const response = await fetch(`${API_URL}/testimonials/${id}`, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch testimonial. Status: ${response.status}`);
        }

        return response.json();
    },

    async createTestimonial(formData: FormData): Promise<{ success: boolean; data: Testimonial }> {
        const response = await fetch(`${API_URL}/testimonials`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to create testimonial. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },

    async updateTestimonial(
        id: string,
        formData: FormData
    ): Promise<{ success: boolean; data: Testimonial }> {
        const response = await fetch(`${API_URL}/testimonials/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to update testimonial. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },

    async deleteTestimonial(id: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${API_URL}/testimonials/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to delete testimonial. Status: ${response.status}. ${errorText}`
            );
        }

        return response.json();
    },
};
