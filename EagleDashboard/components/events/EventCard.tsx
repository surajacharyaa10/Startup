"use client";

import { Event } from "@/lib/types/event";
import { FiEdit2, FiTrash2, FiCalendar, FiMapPin, FiUsers, FiVideo, FiExternalLink, FiStar } from "react-icons/fi";
import API_URL from "@/app/api/url";

interface EventCardProps {
    event: Event;
    onEdit: (event: Event) => void;
    onDelete: (id: string) => void;
}

export default function EventCard({ event, onEdit, onDelete }: EventCardProps) {
    const getImageUrl = (image: string) =>
        image?.startsWith("/uploads") ? `${API_URL}${image}` : image;

    return (
        <div className="group relative bg-zinc-950 border border-zinc-900 rounded-[3rem] overflow-hidden hover:border-purple-500/20 transition-all duration-500 hover:shadow-[0_0_80px_rgba(168,85,247,0.05)] flex flex-col h-full">
            {/* Featured Badge */}
            {event.featured && (
                <div className="absolute top-6 left-6 z-20">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-2xl">
                        <FiStar className="text-white animate-pulse" />
                        <span className="text-[10px] font-black text-white tracking-[0.2em] uppercase">FEATURED PROTOCOL</span>
                    </div>
                </div>
            )}

            {/* Image Container */}
            <div className="relative h-72 bg-zinc-900 overflow-hidden">
                {event.image ? (
                    <img
                        src={getImageUrl(event.image)}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-800">
                        <FiCalendar size={64} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>

                {/* Date Overlay */}
                <div className="absolute bottom-8 left-8">
                    <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-2xl px-5 py-3 shadow-2xl">
                        <span className="text-purple-500 font-black text-xs uppercase tracking-[0.2em]">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-10 flex flex-col flex-1">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-1.5 h-6 bg-purple-600 rounded-full"></div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">{event.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-4">
                        <div className="flex items-center gap-2">
                            <FiMapPin className="text-purple-500" />
                            <span>{event.location}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                        <span className="text-purple-500">{event.category}</span>
                    </div>
                </div>

                <div className="flex-1 space-y-6">
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed italic line-clamp-2">
                        "{event.description}"
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-900 flex items-center gap-4">
                            <FiUsers className="text-purple-500" />
                            <div className="flex flex-col">
                                <span className="text-white font-black text-lg leading-none">{event.attendees}</span>
                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Registrations</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            {event.registrationLink && (
                                <a
                                    href={event.registrationLink}
                                    target="_blank"
                                    className="h-10 px-4 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-600/20 rounded-xl flex items-center justify-center gap-2 transition-all group/link"
                                >
                                    <span className="text-[8px] font-black text-purple-500 uppercase tracking-widest">Connect</span>
                                    <FiExternalLink className="text-purple-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                </a>
                            )}
                            {event.recordingLink && (
                                <a
                                    href={event.recordingLink}
                                    target="_blank"
                                    className="h-10 px-4 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-600/20 rounded-xl flex items-center justify-center gap-2 transition-all group/link"
                                >
                                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Recording</span>
                                    <FiVideo className="text-emerald-500" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-zinc-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${event.type === 'upcoming' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`}></div>
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{event.type} SECTOR</span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(event)}
                            className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-all shadow-xl active:scale-95"
                        >
                            <FiEdit2 size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(event._id)}
                            className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:bg-red-900/20 hover:border-red-900/20 flex items-center justify-center transition-all shadow-xl active:scale-95"
                        >
                            <FiTrash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
