"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { meetingsApi, MeetingSlot, BookingInput } from "@/app/api/meetings";


function StepPill({ step }: { step: number }) {
  const labels = ["Date", "Time", "Details", "Confirm"];
  return (
    <div className="flex items-center gap-3 mb-6 justify-center">
      {labels.map((label, i) => {
        const active = i <= step - 1;
        return (
          <div key={label} className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition ${active
                ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-300"
                }`}
            >
              {i + 1}
            </div>
            <div className="hidden sm:block text-sm text-gray-300">{label}</div>
          </div>
        );
      })}
    </div>
  );
}

function IconChevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BookMeetingPage() {
  const [step, setStep] = useState<
    "date" | "time" | "details" | "confirmation"
  >("date");
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
  const [loading, setLoading] = useState(false);
  const [bookingCode, setBookingCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [datesWithSlots, setDatesWithSlots] = useState<Date[]>([]);

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
    const fetchDatesWithSlots = async () => {
      const allDates = generateDates();
      const datesAvailable: Date[] = [];

      for (const d of allDates) {
        try {
          const dateStr = d.toISOString().split("T")[0];
          const slots = await meetingsApi.getSlots(dateStr);
          if (slots.length > 0) datesAvailable.push(d);
        } catch (err) {
          // ignore date errors, but continue
        }
      }

      setDatesWithSlots(datesAvailable);
    };

    fetchDatesWithSlots();
  }, []);

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
      if (selectedDate) await fetchSlots(selectedDate);
    } catch (err: any) {
      setError(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // small helper to display formatted date
  const formatDate = (d?: Date | null) =>
    d
      ? d.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
      : "—";

  // step number for StepPill
  const stepNumber =
    step === "date" ? 1 : step === "time" ? 2 : step === "details" ? 3 : 4;

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <div className="bg-linear-to-b from-[#0f172a] via-[#071129] to-[#020617] rounded-2xl p-8 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-3 mt-7">
            Schedule a meeting
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Pick a convenient date & time — meetings are 30 minutes by default.
            You’ll get an email confirmation after booking.
          </p>

          {/* Prominent Track Booking Link */}
          <div className="flex justify-center mb-10">
            <Link
              href="/book-meeting/track"
              className="group relative flex items-center gap-3 px-6 py-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 rounded-full transition-all duration-300"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-blue-300 group-hover:text-blue-200 font-medium">
                Already have a booking? <span className="underline decoration-blue-500/50">Track or Cancel it here</span>
              </span>
              <IconChevron />
            </Link>
          </div>

          <StepPill step={stepNumber} />

          {error && (
            <div className="mb-4 p-3 bg-red-600 text-white rounded-md shadow-sm text-sm text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: date & slots */}
            <div className="space-y-4">
              {/* Date selector */}
              <div className="bg-gray-900/40 p-4 rounded-xl">
                <h2 className="text-lg font-semibold text-white mb-3">
                  Choose a date
                </h2>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                  {datesWithSlots.length === 0 && (
                    <div className="text-gray-400">
                      Loading available dates...
                    </div>
                  )}
                  {datesWithSlots.map((d) => {
                    const selected =
                      selectedDate?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={d.toDateString()}
                        onClick={() => {
                          setSelectedDate(d);
                          setStep("time");
                          fetchSlots(d);
                        }}
                        aria-pressed={selected}
                        className={`p-3 rounded-lg text-center font-medium transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 ${selected
                          ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "bg-gray-800 text-gray-200"
                          }`}
                      >
                        <div className="text-xs text-gray-300">
                          {d.toLocaleString(undefined, { weekday: "short" })}
                        </div>
                        <div className="text-lg font-bold">{d.getDate()}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              <div className="bg-gray-900/30 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    Available slots
                  </h3>
                  <div className="text-sm text-gray-300">
                    {formatDate(selectedDate)}
                  </div>
                </div>

                {step === "time" && (
                  <div>
                    {loading ? (
                      <div className="text-gray-400">Loading slots…</div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-gray-400">
                        No slots available for this date.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {availableSlots.map((slot) => {
                          const isFull =
                            slot.currentBookings >= slot.maxBookings;
                          return (
                            <button
                              key={slot._id}
                              onClick={() => !isFull && handleSlotSelect(slot)}
                              disabled={isFull}
                              className={`w-full p-4 rounded-xl flex items-center justify-between gap-3 transition transform hover:scale-102 ${isFull
                                ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                                : "bg-white/5 text-white hover:bg-linear-to-r from-green-500 to-emerald-500"
                                }`}
                            >
                              <div className="text-left">
                                <div className="text-sm font-semibold">
                                  {slot.startTime} — {slot.endTime}
                                </div>
                                <div className="text-xs text-gray-300">
                                  {slot.currentBookings}/{slot.maxBookings}{" "}
                                  booked
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {!isFull ? (
                                  <div className="text-white/90 text-sm">
                                    Select
                                  </div>
                                ) : (
                                  <div className="text-red-300 text-sm">
                                    Full
                                  </div>
                                )}
                                <IconChevron />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <div className="mt-4">
                      <button
                        onClick={() => setStep("date")}
                        className="px-4 py-2 bg-gray-700 text-white rounded-md"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                )}
                {step !== "time" && (
                  <div className="text-sm text-gray-400">
                    Pick a date to see available time slots.
                  </div>
                )}
              </div>
            </div>

            {/* Right: summary / form / confirmation */}
            <div>
              <div className="bg-linear-to-br from-gray-900/60 to-gray-900/40 p-6 rounded-2xl shadow-inner">
                <div className="mb-4">
                  <div className="text-xs text-gray-400">Selected</div>
                  <div className="mt-1 text-sm text-white">
                    {formatDate(selectedDate)} ·{" "}
                    {selectedSlot
                      ? `${selectedSlot.startTime} - ${selectedSlot.endTime}`
                      : "No time selected"}
                  </div>
                </div>

                {step === "details" && selectedSlot && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="hidden">Name</label>
                      <input
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <input
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        required
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, phone: e.target.value }))
                        }
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            company: e.target.value,
                          }))
                        }
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <textarea
                      placeholder="Purpose"
                      value={formData.purpose}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, purpose: e.target.value }))
                      }
                      required
                      className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                    >
                      {loading ? "Booking…" : "Confirm meeting"}
                    </button>

                    <div className="text-center text-sm text-gray-400">
                      We will send a calendar invite to the email provided.
                    </div>
                  </form>
                )}

                {step === "confirmation" && bookingCode && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">
                      Confirmed
                    </div>
                    <div className="text-sm text-gray-300 mb-4">
                      Booking code{" "}
                      <span className="font-mono text-white">
                        {bookingCode}
                      </span>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-white text-gray-900 rounded-md"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => {
                          setStep("date");
                          setSelectedSlot(null);
                          setBookingCode(null);
                        }}
                        className="px-4 py-2 bg-gray-700 text-white rounded-md"
                      >
                        Book another
                      </button>
                    </div>
                  </div>
                )}

                {step === "date" && (
                  <div className="text-sm text-gray-400">
                    Select a date to begin
                  </div>
                )}
                {step === "time" && (
                  <div className="text-sm text-gray-400">
                    Choose a time slot from the left column
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
