"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { eventsApi } from "@/lib/api/events";
import type { Event } from "@/lib/types/event";
import EventCard from "@/components/events/EventCard";
import EventForm from "@/components/events/EventForm";
import { FiCalendar, FiActivity } from "react-icons/fi";

const eventTypes = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
] as const;

const eventCategories = [
  "Conference",
  "Workshop",
  "Webinar",
  "Meetup",
  "Hackathon",
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    attendees: 0,
    category: "Meetup",
    featured: false,
    type: "upcoming" as "upcoming" | "past",
    registrationLink: "",
    recordingLink: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventsApi.getEvents();
      setEvents(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      attendees: 0,
      category: "Meetup",
      featured: false,
      type: activeTab as any,
      registrationLink: "",
      recordingLink: "",
    });
    setEditingEvent(null);
    setSelectedImage(null);
    setImagePreview(null);
    setShowForm(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16),
      location: event.location,
      attendees: event.attendees,
      category: event.category,
      featured: event.featured,
      type: event.type,
      registrationLink: event.registrationLink || "",
      recordingLink: event.recordingLink || "",
    });
    setActiveTab(event.type);
    if (event.image) {
      setImagePreview(
        event.image.startsWith("/uploads")
          ? `${process.env.NEXT_PUBLIC_API_URL || "https://api.startupnexus.sh"}${event.image}`
          : event.image
      );
    }
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-black text-zinc-900 text-sm uppercase italic">Decommission this coordinate?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const t2 = toast.loading("Suspending protocol...");
              try {
                await eventsApi.deleteEvent(id);
                setEvents((prev) => prev.filter((e) => e._id !== id));
                toast.success("Event offline.", { id: t2 });
              } catch (err: any) {
                toast.error(err.message || "Failed to suspend", { id: t2 });
              }
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            CONFIRM
          </button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-zinc-200 text-zinc-800 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">ABORT</button>
        </div>
      </div>
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tId = toast.loading(`${editingEvent ? "Updating" : "Coordining"} protocol...`);
    setSaving(true);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "recordingLink" && !value) return;
      fd.append(key, String(value));
    });
    if (selectedImage) fd.append("image", selectedImage);

    try {
      if (editingEvent) {
        const result = await eventsApi.updateEvent(editingEvent._id, fd);
        if (result.success) {
          setEvents((prev) =>
            prev.map((ev) => (ev._id === editingEvent._id ? result.data : ev))
          );
          toast.success("Identity updated.", { id: tId });
        }
      } else {
        const result = await eventsApi.createEvent(fd);
        if (result.success) {
          setEvents((prev) => [...prev, result.data]);
          toast.success("Coordinate established.", { id: tId });
        }
      }
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Protocol failure", { id: tId });
    } finally {
      setSaving(false);
    }
  };

  const filteredEvents = events.filter((e) => e.type === activeTab);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Syncing Temporal Grid...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1700px] mx-auto pb-20 p-4 md:p-8 space-y-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Movements</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Command the temporal roadmap. Coordinate conferences, workshops, and strategic meetups within the ecosystem.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="h-20 px-12 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2.5rem] transition-all shadow-2xl shadow-purple-500/20 flex items-center justify-center gap-4"
          >
            COORDINATE NEW PROTOCOL
          </button>
        )}
      </div>

      <div className="space-y-16">
        {showForm && (
          <div className="animate-in fade-in slide-in-from-top-10 duration-500">
            <EventForm
              formData={formData}
              editingEvent={editingEvent}
              saving={saving}
              imagePreview={imagePreview}
              onSubmit={handleSubmit}
              onChange={handleChange}
              onImageChange={handleImageChange}
              onCancel={resetForm}
              categories={eventCategories}
              types={[...eventTypes]}
            />
          </div>
        )}

        {/* Status Indicators */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-zinc-950/50 backdrop-blur-xl border border-zinc-800 rounded-[3rem] p-10">
          <div className="flex flex-wrap gap-4">
            {eventTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`h-16 px-8 rounded-2xl flex items-center gap-4 transition-all border font-black text-[10px] uppercase tracking-widest ${activeTab === t.id
                    ? "bg-purple-600 border-purple-500 text-white shadow-[0_10px_30px_rgba(168,85,247,0.2)]"
                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800"
                  }`}
              >
                {t.label} SECTOR
                <span className={`px-2 py-1 rounded-lg ${activeTab === t.id ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-600"} text-[8px]`}>
                  {events.filter(e => e.type === t.id).length}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <FiActivity className="text-purple-500" size={18} />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Live Temporal Sync Active</span>
          </div>
        </div>

        {/* List Grid */}
        <div className="space-y-10">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-40 bg-zinc-950/30 rounded-[4rem] border-4 border-dashed border-zinc-900/50">
              <FiCalendar size={48} className="mx-auto text-zinc-800 mb-6" />
              <p className="text-zinc-700 font-black uppercase tracking-[0.3em]">No movement signatures detected in this sector.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div key={event._id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <EventCard
                    event={event}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
