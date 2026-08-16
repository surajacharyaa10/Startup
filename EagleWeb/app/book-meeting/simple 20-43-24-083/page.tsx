"use client";
import { useEffect, useState } from "react";
import {
  meetingsApi,
  MeetingSlot,
  BookingInput,
  Booking,
} from "../../api/meetings";

type Step = "date" | "time" | "details" | "confirmation";

export default function BookMeeting() {
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<MeetingSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<MeetingSlot | null>(null);
  const [formData, setFormData] = useState<Omit<BookingInput, "slotId">>({
    name: "",
    email: "",
    phone: "",
    company: "",
    purpose: "",
  });
  const [bookingCode, setBookingCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      const slots = await meetingsApi.getAvailableSlots(dateStr);
      setAvailableSlots(slots);
    } catch (err: any) {
      setError(err.message || "Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  const handleSlotSelect = (slot: MeetingSlot) => {
    if (!slot.isAvailable) return;
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-16 px-6">
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {step === "date" && (
        <div>
          <h2 className="text-white mb-4 text-xl">Select Date</h2>
          <div className="grid grid-cols-7 gap-2">
            {generateDates().map((d) => (
              <button
                key={d.toDateString()}
                onClick={() => setSelectedDate(d)}
                className={`p-2 rounded ${
                  selectedDate?.toDateString() === d.toDateString()
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

      {step === "time" && selectedDate && (
        <div>
          <h2 className="text-white mb-4 text-xl">
            Select Time ({selectedDate.toDateString()})
          </h2>
          {loading ? (
            <p className="text-gray-300">Loading slots...</p>
          ) : availableSlots.length === 0 ? (
            <p className="text-gray-400">No slots available</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot._id}
                  onClick={() => handleSlotSelect(slot)}
                  disabled={!slot.isAvailable}
                  className={`p-2 rounded ${
                    slot.isAvailable
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {slot.startTime} ({slot.currentBookings}/{slot.maxBookings})
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => setStep("date")}
            className="mt-4 px-4 py-2 bg-white/10 text-white rounded"
          >
            Back
          </button>
        </div>
      )}

      {step === "details" && selectedSlot && (
        <div>
          <h2 className="text-white mb-4 text-xl">Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-2 rounded bg-white/10 text-white"
            />
            <input
              required
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-2 rounded bg-white/10 text-white"
            />
            <input
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full p-2 rounded bg-white/10 text-white"
            />
            <input
              placeholder="Company"
              name="company"
              value={formData.company}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, company: e.target.value }))
              }
              className="w-full p-2 rounded bg-white/10 text-white"
            />
            <textarea
              required
              placeholder="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, purpose: e.target.value }))
              }
              className="w-full p-2 rounded bg-white/10 text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
          <button
            onClick={() => setStep("time")}
            className="mt-4 px-4 py-2 bg-white/10 text-white rounded"
          >
            Back
          </button>
        </div>
      )}

      {step === "confirmation" && (
        <div className="bg-white/10 p-6 rounded text-white">
          <h2 className="text-xl mb-2">Booking Confirmed!</h2>
          <p>
            <strong>Code:</strong> {bookingCode}
          </p>
          <p>
            <strong>Slot:</strong> {selectedSlot?.startTime} -{" "}
            {selectedSlot?.endTime} ({selectedDate?.toDateString()})
          </p>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-600 rounded"
          >
            Done
          </button>
        </div>
      )}
    </section>
  );
}
