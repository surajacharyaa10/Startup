export interface Testimonial {
    _id: string;
    name: string;
    role: string;
    company?: string;
    image: string;
    content: string;
    rating: number;
    featured: boolean;
    createdAt: string;
}

export interface TestimonialInput {
    name: string;
    role: string;
    company?: string;
    image: string;
    content: string;
    rating?: number;
    featured?: boolean;
}
