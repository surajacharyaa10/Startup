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
  slotId: MeetingSlot | string;
  name: string;
  email: string;
  phone: string;
  address: string;
  purpose: string;
  status: "pending" | "confirmed" | "cancelled";
  bookingCode: string;
  createdAt: string;
}

export interface BulkSlotInput {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  excludeWeekends: boolean;
}

export type MeetingSlotInput = Omit<MeetingSlot, "_id" | "createdAt" | "currentBookings">;
export type BookingInput = Omit<Booking, "_id" | "createdAt" | "bookingCode">;