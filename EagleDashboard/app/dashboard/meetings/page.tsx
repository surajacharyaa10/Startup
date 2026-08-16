"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { meetingsApi } from "@/lib/api/meetings";
import type { MeetingSlot, Booking } from "@/lib/types/meeting";
import BulkSlotForm from "@/components/meetings/BulkSlotForm";
import SlotList from "@/components/meetings/SlotList";
import BookingList from "@/components/meetings/BookingList";

export default function MeetingsAdminPanel() {
  const [slots, setSlots] = useState<MeetingSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"slots" | "bookings">("slots");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchCode, setSearchCode] = useState("");

  const [bulkForm, setBulkForm] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    startTime: "09:00",
    endTime: "17:00",
    duration: 30,
    excludeWeekends: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [slotsData, bookingsData] = await Promise.all([
        meetingsApi.getSlots(),
        meetingsApi.getBookings(),
      ]);
      setSlots(slotsData);
      setBookings(bookingsData);

      // Select the first available date if current selectedDate has no slots
      const dates = Object.keys(
        slotsData.reduce((acc, slot) => {
          const date = new Date(slot.date).toISOString().split("T")[0];
          acc[date] = true;
          return acc;
        }, {} as Record<string, boolean>)
      ).sort();

      if (dates.length > 0 && !dates.includes(selectedDate)) {
        setSelectedDate(dates[0]);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBulkForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? parseInt(value)
            : value,
    }));
  };

  const handleCreateBulkSlots = async () => {
    setSaving(true);
    try {
      const result = await meetingsApi.createBulkSlots(bulkForm);
      if (result.success) {
        await fetchData();
        toast.success(`Successfully created ${result.count} time slots!`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create slots");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlot = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-zinc-900 text-sm font-bold uppercase tracking-tight italic">Erase this temporal node?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await meetingsApi.deleteSlot(id);
                await fetchData();
                toast.success("Slot erased successfully");
              } catch (err: any) {
                toast.error(err.message || "Failed to delete slot");
              }
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-900/40"
          >
            CONFIRM ERASE
          </button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-zinc-200 text-zinc-800 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">ABORT</button>
        </div>
      </div>
    ));
  };

  const handleUpdateBookingStatus = async (
    id: string,
    status: "confirmed" | "cancelled"
  ) => {
    const toastId = toast.loading(`${status === "confirmed" ? "Authorizing" : "Rescinding"} request...`);
    try {
      const result = await meetingsApi.updateBookingStatus(id, status);
      if (result.success) {
        await fetchData();
        toast.success(`Request ${status === "confirmed" ? "authorized" : "rescinded"}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update booking", { id: toastId });
    }
  };

  const datesWithSlots = Array.from(new Set(
    slots.map(slot => new Date(slot.date).toISOString().split("T")[0])
  )).sort();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Synchronizing Temporal Streams...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto pb-20 p-4 md:p-8">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-blue-600 rounded-full"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Control Panel</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Command the temporal grid. Orchestrate meetings and synchronize global communications.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-2 bg-zinc-950 border border-zinc-800 rounded-[2rem] shadow-2xl">
          {[
            { id: "slots", label: "Temporal Grid" },
            { id: "bookings", label: "Request Stream" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-10 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all ${activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-900/40"
                  : "text-zinc-600 hover:text-zinc-300"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {activeTab === "slots" ? (
          <>
            <BulkSlotForm
              bulkForm={bulkForm}
              saving={saving}
              onChange={handleBulkChange}
              onSubmit={handleCreateBulkSlots}
            />

            <SlotList
              slots={slots}
              selectedDate={selectedDate}
              datesWithSlots={datesWithSlots}
              onDateSelect={setSelectedDate}
              onDeleteSlot={handleDeleteSlot}
            />
          </>
        ) : (
          <BookingList
            bookings={bookings}
            searchCode={searchCode}
            onSearchChange={setSearchCode}
            onUpdateStatus={handleUpdateBookingStatus}
          />
        )}
      </div>
    </div>
  );
}
