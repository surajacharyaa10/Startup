import API_URL from "@/app/api/url";
import type {
    MeetingSlot,
    MeetingSlotInput,
    BulkSlotInput,
    Booking,
    BookingInput
} from "../types/meeting";

export const meetingsApi = {
    async getSlots(date?: string, available?: boolean): Promise<MeetingSlot[]> {
      const params = new URLSearchParams();
      if (date) params.append("date", date);
      if (available !== undefined) params.append("available", String(available));
      const url = `${API_URL}/meetings/slots${params.toString() ? `?${params}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch slots`);
      return response.json();
    },
  
    async createBulkSlots(payload: BulkSlotInput) {
      const response = await fetch(`${API_URL}/meetings/slots/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Failed to create bulk slots`);
      return response.json();
    },
  
    async deleteSlot(id: string) {
      const response = await fetch(`${API_URL}/meetings/slots/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Failed to delete slot`);
      return response.json();
    },
  
    async getBookings(status?: string): Promise<Booking[]> {
      const url = status
        ? `${API_URL}/meetings/bookings?status=${status}`
        : `${API_URL}/meetings/bookings`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch bookings`);
      return response.json();
    },
  
    async updateBookingStatus(id: string, status: "pending" | "confirmed" | "cancelled") {
      const response = await fetch(`${API_URL}/meetings/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error(`Failed to update booking status`);
      return response.json();
    },
  };
  