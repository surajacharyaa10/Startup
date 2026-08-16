export interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    attendees: number;
    image: string;
    category: "Conference" | "Workshop" | "Webinar" | "Meetup" | "Hackathon";
    featured: boolean;
    type: "upcoming" | "past";
    registrationLink?: string;
    // Optional recording URL for past events (e.g., YouTube, Loom, etc.)
    recordingLink?: string;
    createdAt: string;
}

export interface EventInput {
    title: string;
    description: string;
    date: string;
    location: string;
    attendees?: number;
    image: string;
    category?: "Conference" | "Workshop" | "Webinar" | "Meetup" | "Hackathon";
    featured?: boolean;
    type: "upcoming" | "past";
    registrationLink?: string;
    recordingLink?: string;
}
