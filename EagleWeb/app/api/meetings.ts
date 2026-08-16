import API_URL from "./url";

export interface MeetingSlot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  isAvailable: boolean;
  maxBookings: number;
  currentBookings: number;
  createdAt: string;
}

export interface Booking {
  _id: string;
  slotId: MeetingSlot;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  purpose: string;
  status: "pending" | "confirmed" | "cancelled";
  bookingCode: string;
  createdAt: string;
}

export interface BookingInput {
  slotId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  purpose: string;
}

export const meetingsApi = {
  async getAvailableSlots(date?: string): Promise<MeetingSlot[]> {
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    params.append("available", "true");

    const url = `${API_URL}/meetings/slots?${params}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch slots");
    return response.json();
  },

  // Fetch all slots for a date (including unavailable/booked ones)
  async getSlots(date?: string): Promise<MeetingSlot[]> {
    const params = new URLSearchParams();
    if (date) params.append("date", date);

    const url = `${API_URL}/meetings/slots?${params}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch slots");
    return response.json();
  },

  async bookMeeting(payload: BookingInput): Promise<{ bookingCode: string }> {
    const res = await fetch(`${API_URL}/meetings/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Booking failed");
    }
    return res.json();
  },

  async getBookingByCode(code: string): Promise<Booking> {
    const res = await fetch(`${API_URL}/meetings/bookings/code/${code}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      if (res.status === 404) throw new Error("Booking not found");
      throw new Error("Failed to fetch booking");
    }
    return res.json();
  },

  async cancelBooking(code: string): Promise<{ success: boolean; data: Booking }> {
    const res = await fetch(`${API_URL}/meetings/bookings/cancel/${code}`, {
      method: "PUT",
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to cancel booking");
    }
    return res.json();
  },

  async getUserBookings(email: string): Promise<Booking[]> {
    const response = await fetch(`${API_URL}/meetings/bookings/user/${email}`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to fetch user bookings");
    return response.json();
  },
};

