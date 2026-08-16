"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCalendar, FiMapPin, FiUsers, FiVideo } from "react-icons/fi";
import { eventsApi, Event } from "@/app/api/events";
import API_URL from "@/app/api/url";

export default function PastEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventsApi
      .getEvents("past")
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getImageUrl = (img: string) =>
    img?.startsWith("/uploads") ? `${API_URL}${img}` : img;

  // Convert common video URLs into embeddable URLs
  const getVideoEmbed = (url?: string) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      const host = u.hostname.replace("www.", "");
      if (host.includes("youtube.com")) {
        const v = u.searchParams.get("v");
        if (v) return `https://www.youtube.com/embed/${v}`;
      }
      if (host === "youtu.be") {
        const id = u.pathname.slice(1);
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      if (host.includes("vimeo.com")) {
        const id = u.pathname.split("/").filter(Boolean).pop();
        if (id) return `https://player.vimeo.com/video/${id}`;
      }
      if (url.match(/\.(mp4|webm|ogg)(\?|$)/)) return url;
      return url;
    } catch (e) {
      return url;
    }
  };

  // Get YouTube thumbnail
  const getYouTubeThumbnail = (url?: string) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      const host = u.hostname.replace("www.", "");
      if (host.includes("youtube.com")) {
        const v = u.searchParams.get("v");
        if (v) return `https://img.youtube.com/vi/${v}/hqdefault.jpg`;
      }
      if (host === "youtu.be") {
        const id = u.pathname.slice(1);
        if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  function useCountdown(target?: any) {
    const toMillis = (t: any): number | undefined => {
      if (t == null) return undefined;
      if (typeof t === "number") return t;
      if (typeof t === "string") {
        const parsed = Date.parse(t);
        if (!isNaN(parsed)) return parsed;
        const asNum = Number(t);
        if (!isNaN(asNum)) return asNum;
        return undefined;
      }
      if (t instanceof Date) return t.getTime();
      if (typeof t === "object") {
        if ("$date" in t && t.$date) {
          const inner = t.$date as any;
          if (typeof inner === "object" && inner.$numberLong) {
            const n = Number(inner.$numberLong);
            if (!isNaN(n)) return n;
          }
          if (typeof inner === "string") {
            const p = Date.parse(inner);
            if (!isNaN(p)) return p;
            const asN = Number(inner);
            if (!isNaN(asN)) return asN;
          }
        }
      }
      return undefined;
    };

    const [timeLeft, setTimeLeft] = useState(() => {
      const ms = toMillis(target);
      if (ms == null) return 0;
      return Math.max(ms - Date.now(), 0);
    });

    useEffect(() => {
      const update = () => {
        const ms = toMillis(target);
        if (ms == null) {
          setTimeLeft(0);
          return;
        }
        setTimeLeft(Math.max(ms - Date.now(), 0));
      };

      if (toMillis(target) == null) return;
      update();
      const id = setInterval(update, 1000);
      return () => clearInterval(id);
    }, [target]);

    const format = (ms: number) => {
      if (ms <= 0) return "00d 00h 00m 00s";
      const s = Math.floor(ms / 1000);
      const days = Math.floor(s / 86400);
      const hours = Math.floor((s % 86400) / 3600);
      const minutes = Math.floor((s % 3600) / 60);
      const seconds = s % 60;
      return `${String(days).padStart(2, "0")}d ${String(hours).padStart(
        2,
        "0"
      )}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(
        2,
        "0"
      )}s`;
    };

    return { timeLeft, formatted: format(timeLeft) };
  }

  function EventCard({ event, index }: { event: Event; index: number }) {
    const countdown = useCountdown(event.date);

    // Helper to safely parse various date shapes (string, number, BSON-like)
    const parseToDate = (t: any): Date | null => {
      if (t == null) return null;
      if (typeof t === "number") return new Date(t);
      if (typeof t === "string") {
        const parsed = Date.parse(t);
        if (!isNaN(parsed)) return new Date(parsed);
        const asNum = Number(t);
        if (!isNaN(asNum)) return new Date(asNum);
        return null;
      }
      if (t instanceof Date) return t;
      if (typeof t === "object") {
        if ("$date" in t && t.$date) {
          const inner = t.$date as any;
          if (typeof inner === "object" && inner.$numberLong) {
            const n = Number(inner.$numberLong);
            if (!isNaN(n)) return new Date(n);
          }
          if (typeof inner === "string") {
            const p = Date.parse(inner);
            if (!isNaN(p)) return new Date(p);
            const asN = Number(inner);
            if (!isNaN(asN)) return new Date(asN);
          }
        }
      }
      return null;
    };

    const parsedDate = parseToDate(event.date);
    const isFuture = parsedDate ? parsedDate.getTime() > Date.now() : false;
    const [showVideo, setShowVideo] = useState(false);

    // Prefer videoUrl, then recordingLink
    const videoEmbed = getVideoEmbed(
      (event as any).videoUrl ||
        (event as any).videoEmbed ||
        event.recordingLink
    );
    const ytThumbnail = getYouTubeThumbnail(event.recordingLink);

    return (
      <motion.div
        key={event._id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group"
      >
        <div className="relative h-40 overflow-hidden bg-gray-800">
          {showVideo && videoEmbed ? (
            <div className="w-full h-full">
              {videoEmbed.match(/\.(mp4|webm|ogg)(\?|$)/) ? (
                <video controls autoPlay className="w-full h-full object-cover">
                  <source src={videoEmbed} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={videoEmbed}
                  title={event.title}
                  frameBorder={0}
                  // FIX: Added 'fullscreen' and 'web-share' to maximize permissions for audio/video playback
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          ) : event.image ? (
            <img
              src={getImageUrl(event.image)}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : ytThumbnail ? (
            <img
              src={ytThumbnail}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setShowVideo(true)}
            />
          ) : null}

          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-gray-600 text-white text-xs font-semibold rounded-full">
              {event.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 text-xs text-white/90 bg-black/40 px-3 py-1 rounded-full">
            {isFuture
              ? `Starts in ${countdown.formatted}`
              : parsedDate
              ? `Ended ${parsedDate.toLocaleDateString()}`
              : ""}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
          <div className="space-y-1 text-gray-400 text-sm mb-3">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-blue-400" />{" "}
              {parsedDate ? parsedDate.toLocaleDateString() : ""}
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-blue-400" /> {event.location}
            </div>
            <div className="flex items-center gap-2">
              <FiUsers className="text-blue-400" /> {event.attendees} attended
            </div>
          </div>

          {!showVideo && videoEmbed && ytThumbnail && (
            <button
              onClick={() => setShowVideo(true)}
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full font-semibold text-white text-sm flex items-center justify-center gap-2"
            >
              <FiVideo /> Watch Recording
            </button>
          )}
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
            Past Events
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Explore our previous events and access recordings.
          </p>
        </motion.div>

        {events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No past events yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <EventCard event={event} index={index} key={event._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
