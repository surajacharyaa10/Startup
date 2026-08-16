import API_URL from "./url";

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string | number | { $date?: { $numberLong?: string } };
  location: string;
  attendees: number;
  image: string;
  category: string;
  featured: boolean;
  type: "upcoming" | "past";
  registrationLink?: string;
  // Optional fields that may be present in some backend documents
  recordingLink?: string;
  videoUrl?: string;
  videoEmbed?: string;
}

export const eventsApi = {
  async getEvents(type?: string): Promise<Event[]> {
    const url = type ? `${API_URL}/events?type=${type}` : `${API_URL}/events`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
  },

  async getEvent(id: string): Promise<Event> {
    const res = await fetch(`${API_URL}/events/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch event");
    return res.json();
  },
};
