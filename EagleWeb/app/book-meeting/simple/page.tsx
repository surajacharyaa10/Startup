"use client";
import { useState, useEffect } from "react";
import {
  meetingsApi,
  MeetingSlot,
  Booking,
  BookingInput,
} from "../../api/meetings";
import { toast } from "react-hot-toast";

type Step = "date" | "time" | "details" | "confirmation";

export default function BookMeeting() {
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<MeetingSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<MeetingSlot | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [formData, setFormData] = useState<Omit<BookingInput, "slotId">>({
    name: "",
    email: "",
    phone: "",
    company: "",
    purpose: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingCode, setBookingCode] = useState<string | null>(null);

  // generate next 14 days
  const generateDates = () => {
    const dates: Date[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  useEffect(() => {
    if (selectedDate) fetchSlots(selectedDate);
  }, [selectedDate]);

  const fetchSlots = async (date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const dateStr = date.toISOString().split("T")[0];
      const slots = await meetingsApi.getSlots(dateStr);
      setAvailableSlots(slots);
    } catch (err: any) {
      setError("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    if (!userEmail) return setUserBookings([]);
    setLoadingBookings(true);
    setError(null);
    try {
      const bookings = await meetingsApi.getUserBookings(userEmail);
      let filtered = bookings;
      if (userName)
        filtered = filtered.filter((b) =>
          b.name.toLowerCase().includes(userName.toLowerCase())
        );
      if (userPhone)
        filtered = filtered.filter((b) => (b.phone || "").includes(userPhone));
      setUserBookings(filtered);
    } catch (err: any) {
      setError("Failed to load bookings");
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleSlotSelect = (slot: MeetingSlot) => {
    setSelectedSlot(slot);
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setLoading(true);
    setError(null);
    try {
      const res = await meetingsApi.bookMeeting({
        ...formData,
        slotId: selectedSlot._id,
      });
      setBookingCode(res.bookingCode);
      setStep("confirmation");
      await fetchUserBookings();
      if (selectedDate) await fetchSlots(selectedDate);
    } catch (err: any) {
      setError(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (code: string) => {
    const booking = userBookings.find((b) => b.bookingCode === code);
    if (!booking) return;

    const slotObj: any =
      typeof booking.slotId === "string" ? null : booking.slotId;
    const slotDateStr = slotObj?.date || booking.createdAt;
    const startTime = slotObj?.startTime || "00:00";
    const meetingDate = new Date(slotDateStr);
    const [hh, mm] = startTime.split(":").map((s: string) => parseInt(s) || 0);
    meetingDate.setHours(hh, mm, 0, 0);
    const msUntil = meetingDate.getTime() - Date.now();
    if (msUntil <= 24 * 60 * 60 * 1000) {
      setError("Cannot cancel booking within 24 hours of meeting");
      return;
    }

    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-zinc-900">Are you sure you want to cancel this booking?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              setLoading(true);
              setError(null);
              try {
                await meetingsApi.cancelBooking(code);
                toast.success("Booking successfully cancelled.");
                await fetchUserBookings();
                if (selectedDate) await fetchSlots(selectedDate);
              } catch (err: any) {
                toast.error(err.message || "Failed to cancel booking");
                setError("Failed to cancel booking");
              } finally {
                setLoading(false);
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold"
          >
            Yes, Cancel
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-zinc-200 text-zinc-800 px-3 py-1 rounded text-sm font-bold"
          >
            Keep Booking
          </button>
        </div>
      </div>
    ), { duration: 6000 });
  };

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-white mb-6">Book a Meeting</h1>

      {/* User Booking Search */}
      <div className="mb-8 p-4 bg-white/5 rounded text-white space-y-4">
        <h2 className="text-lg font-semibold">View Your Bookings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="p-2 rounded bg-white/10"
          />
          <input
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="p-2 rounded bg-white/10"
          />
          <input
            placeholder="Phone"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="p-2 rounded bg-white/10"
          />
          <button
            onClick={fetchUserBookings}
            className="px-4 py-2 bg-blue-600 rounded"
            disabled={loadingBookings}
          >
            {loadingBookings ? "Loading..." : "Load Bookings"}
          </button>
        </div>

        {userBookings.length > 0 ? (
          <div className="mt-4 space-y-2">
            {userBookings.map((b) => {
              const slotObj: any =
                typeof b.slotId === "string" ? null : b.slotId;
              const startTime = slotObj?.startTime || "00:00";
              const endTime = slotObj?.endTime || "00:00";
              const dateStr = slotObj?.date || b.createdAt;
              const meetingDate = new Date(dateStr);
              const [hh, mm] = startTime
                .split(":")
                .map((s: string) => parseInt(s) || 0);
              meetingDate.setHours(hh, mm, 0, 0);
              const canCancel =
                meetingDate.getTime() - Date.now() > 24 * 60 * 60 * 1000;

              return (
                <div
                  key={b._id}
                  className="flex justify-between p-2 bg-white/10 rounded"
                >
                  <div>
                    <p>
                      <strong>{b.name}</strong> — {startTime} - {endTime} on{" "}
                      {meetingDate.toDateString()}
                    </p>
                    <p className="text-xs text-gray-300">Status: {b.status}</p>
                  </div>
                  {b.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancelBooking(b.bookingCode)}
                      disabled={!canCancel}
                      className={`px-3 py-1 rounded text-white text-sm ${canCancel
                        ? "bg-red-600"
                        : "bg-gray-600 cursor-not-allowed"
                        }`}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 mt-2">No bookings found</p>
        )}
      </div>

      {/* Step 1: Date selection */}
      {step === "date" && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Select Date</h2>
          <div className="grid grid-cols-7 gap-2">
            {generateDates().map((d) => (
              <button
                key={d.toDateString()}
                onClick={() => {
                  setSelectedDate(d);
                  setStep("time");
                }}
                className={`p-2 rounded ${selectedDate?.toDateString() === d.toDateString()
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-white"
                  }`}
              >
                {d.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Time slots */}
      {step === "time" && selectedDate && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">
            Select Time Slot
          </h2>
          {loading ? (
            <p className="text-gray-300">Loading...</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {availableSlots.map((slot) => {
                const bookedByUser = userBookings.some(
                  (b) =>
                    (typeof b.slotId === "string"
                      ? b.slotId
                      : (b.slotId as any)?._id) === slot._id &&
                    b.status !== "cancelled"
                );

                const classes = bookedByUser
                  ? "bg-blue-600 text-white"
                  : slot.currentBookings >= slot.maxBookings
                    ? "bg-red-600 text-white cursor-not-allowed"
                    : "bg-green-600 text-white";

                return (
                  <button
                    key={slot._id}
                    disabled={
                      slot.currentBookings >= slot.maxBookings && !bookedByUser
                    }
                    onClick={() => handleSlotSelect(slot)}
                    className={`p-2 rounded ${classes}`}
                  >
                    {slot.startTime} ({slot.currentBookings}/{slot.maxBookings})
                  </button>
                );
              })}
            </div>
          )}
          <button
            onClick={() => setStep("date")}
            className="mt-3 px-4 py-2 bg-white/10 text-white rounded"
          >
            Back
          </button>
        </div>
      )}

      {/* Step 3: Booking details */}
      {step === "details" && selectedSlot && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">
            Enter Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-2 rounded bg-white/10 text-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-2 rounded bg-white/10 text-white"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full p-2 rounded bg-white/10 text-white"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, company: e.target.value }))
              }
              className="w-full p-2 rounded bg-white/10 text-white"
            />
            <textarea
              name="purpose"
              placeholder="Purpose"
              value={formData.purpose}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, purpose: e.target.value }))
              }
              className="w-full p-2 rounded bg-white/10 text-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === "confirmation" && bookingCode && (
        <div className="p-4 bg-green-600 rounded text-white">
          <h2 className="font-semibold text-lg">Booking Confirmed!</h2>
          <p>Code: {bookingCode}</p>
          <p>
            Slot: {selectedSlot?.startTime} - {selectedSlot?.endTime} on{" "}
            {selectedDate?.toDateString()}
          </p>
          <p>Name: {formData.name}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-white text-green-600 rounded"
          >
            Done
          </button>
        </div>
      )}
    </section>
  );
}
