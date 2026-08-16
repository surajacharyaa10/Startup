"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";
import { eventsApi, Event } from "@/app/api/events";
import API_URL from "@/app/api/url";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function formatTimeLeft(ms: number): TimeLeft {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    formatTimeLeft(Math.max(targetDate.getTime() - Date.now(), 0))
  );

  useEffect(() => {
    const calculate = () =>
      setTimeLeft(
        formatTimeLeft(Math.max(targetDate.getTime() - Date.now(), 0))
      );
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2 md:p-4 text-center"
        >
          <div className="text-2xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-1">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-gray-400 text-xs uppercase">{unit}</div>
        </div>
      ))}
    </div>
  );
}

// parse backend date formats into JS Date
const parseDate = (v: any): Date => {
  if (!v) return new Date();
  if (v instanceof Date) return v;
  if (typeof v === "string") return new Date(v);
  if (typeof v === "number") return new Date(v);
  if (typeof v === "object") {
    if ("$date" in v) {
      const d = v.$date;
      if (typeof d === "string") return new Date(d);
      if (typeof d === "object" && "$numberLong" in d)
        return new Date(Number(d.$numberLong));
    }
    if ("$numberLong" in v) return new Date(Number(v.$numberLong));
    if ("$numberInt" in v) return new Date(Number(v.$numberInt));
  }
  return new Date(String(v));
};

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const POLL_MS = 15_000; // refresh every 15s

  useEffect(() => {
    let mounted = true;
    const fetchEvents = () => {
      eventsApi
        .getEvents("upcoming")
        .then((data) => {
          if (!mounted) return;
          setEvents(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };
    fetchEvents();
    const id = setInterval(fetchEvents, POLL_MS);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const getImageUrl = (img: string) =>
    img?.startsWith("/uploads") ? `${API_URL}${img}` : img;

  function EventCard({ event, index }: { event: Event; index: number }) {
    const targetDate = parseDate(event.date);

    return (
      <motion.div
        key={event._id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all ${
          event.featured ? "ring-2 ring-blue-500/50" : ""
        }`}
      >
        <div className="grid md:grid-cols-2 gap-0 md:gap-8">
          <div className="relative h-48 md:h-64 overflow-hidden bg-gray-800">
            {event.image && (
              <img
                src={getImageUrl(event.image)}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                {event.category}
              </span>
            </div>
            {event.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-linear-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold rounded-full">
                  Featured
                </span>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {event.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2 mb-4 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-blue-400" />{" "}
                {targetDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-blue-400" />{" "}
                {targetDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-blue-400" /> {event.location}
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="text-blue-400" /> {event.attendees} Expected
                Attendees
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-white font-semibold mb-2 text-sm">
                Event Starts In:
              </h3>
              <CountdownTimer targetDate={targetDate} />
            </div>

            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="group w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-white text-sm">
                <span className="flex items-center justify-center gap-2">
                  Register Now{" "}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 pt-32 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Upcoming Events
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Join us for exciting events, workshops, and conferences.
          </p>
        </motion.div>

        {events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No upcoming events. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {events.map((event, index) => (
              <EventCard event={event} index={index} key={event._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
