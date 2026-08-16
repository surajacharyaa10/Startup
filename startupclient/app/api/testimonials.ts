import API_URL from "./url";

export interface Testimonial {
    _id: string;
    name: string;
    role: string;
    company?: string;
    image: string;
    content: string;
    rating: number;
    featured: boolean;
}

export const testimonialsApi = {
    async getTestimonials(featured?: boolean): Promise<Testimonial[]> {
        const url = featured !== undefined
            ? `${API_URL}/testimonials?featured=${featured}`
            : `${API_URL}/testimonials`;

        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`Failed to fetch testimonials.`);
        }

        return response.json();
    },
};
