"use client";

import { Booking, MeetingSlot } from "@/lib/types/meeting";
import { FiUser, FiInfo, FiMail, FiPhone, FiCalendar, FiClock, FiCheck, FiX, FiActivity } from "react-icons/fi";

interface BookingCardProps {
    booking: Booking;
    onUpdateStatus: (id: string, status: "confirmed" | "cancelled") => void;
}

export default function BookingCard({ booking, onUpdateStatus }: BookingCardProps) {
    const slot = booking.slotId as MeetingSlot;

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "confirmed":
                return { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: <FiCheck /> };
            case "cancelled":
                return { color: "text-red-500", bg: "bg-red-900/10", border: "border-red-900/20", icon: <FiX /> };
            default:
                return { color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20", icon: <FiActivity /> };
        }
    };

    const status = getStatusConfig(booking.status);

    return (
        <div className="group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-[2.5rem] p-8 hover:bg-zinc-800/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Section: User Identity */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-zinc-700 shadow-xl overflow-hidden">
                            <FiUser size={30} className="text-zinc-600" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">
                                {booking.name}
                            </h4>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.color} border ${status.border}`}>
                                {status.icon} {booking.status}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                <FiMail className="text-blue-500" /> Electronic Address
                            </span>
                            <span className="text-sm font-bold text-zinc-300 truncate">{booking.email}</span>
                        </div>
                        {booking.phone && (
                            <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                    <FiPhone className="text-blue-500" /> Voice Protocol
                                </span>
                                <span className="text-sm font-bold text-zinc-300">{booking.phone}</span>
                            </div>
                        )}
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800">
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2 mb-2">
                            <FiInfo className="text-blue-500" /> Transmission Purpose
                        </span>
                        <p className="text-sm font-medium text-zinc-400 leading-relaxed italic">
                            "{booking.purpose}"
                        </p>
                    </div>
                </div>

                {/* Right Section: Slot Data & Status Logic */}
                <div className="md:w-64 space-y-6">
                    <div className="p-6 rounded-[2rem] bg-zinc-900/80 border border-zinc-700/50 shadow-inner text-center space-y-4">
                        <div className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">Temporal Node</div>

                        <div className="flex flex-col items-center">
                            <FiCalendar size={24} className="text-zinc-600 mb-2" />
                            <span className="text-lg font-black text-white uppercase italic tracking-tighter">
                                {slot?.date ? new Date(slot.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Void"}
                            </span>
                        </div>

                        <div className="flex flex-col items-center">
                            <FiClock size={24} className="text-zinc-600 mb-2" />
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-white">{slot?.startTime}</span>
                                <span className="text-[10px] font-bold text-zinc-700">→</span>
                                <span className="text-sm font-black text-white">{slot?.endTime}</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">Code: {booking.bookingCode}</span>
                        </div>
                    </div>

                    {booking.status === "pending" && (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => onUpdateStatus(booking._id, "confirmed")}
                                className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2"
                            >
                                <FiCheck size={18} /> Authorize
                            </button>
                            <button
                                onClick={() => onUpdateStatus(booking._id, "cancelled")}
                                className="w-full h-14 rounded-2xl bg-zinc-800 hover:bg-red-600 hover:text-white text-zinc-400 font-black text-xs uppercase tracking-widest transition-all border border-zinc-700 hover:border-transparent flex items-center justify-center gap-2"
                            >
                                <FiX size={18} /> Rescind
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
