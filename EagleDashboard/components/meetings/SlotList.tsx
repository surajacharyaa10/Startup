"use client";

import { MeetingSlot } from "@/lib/types/meeting";
import { FiClock, FiTrash2, FiUsers, FiCalendar } from "react-icons/fi";

interface SlotListProps {
    slots: MeetingSlot[];
    selectedDate: string;
    datesWithSlots: string[];
    onDateSelect: (date: string) => void;
    onDeleteSlot: (id: string) => void;
}

export default function SlotList({ slots, selectedDate, datesWithSlots, onDateSelect, onDeleteSlot }: SlotListProps) {
    const filteredSlots = slots
        .filter(slot => new Date(slot.date).toISOString().split("T")[0] === selectedDate)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Date Navigation */}
            <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {datesWithSlots.map((date) => {
                    const d = new Date(date);
                    const isSelected = selectedDate === date;
                    return (
                        <button
                            key={date}
                            onClick={() => onDateSelect(date)}
                            className={`shrink-0 flex flex-col items-center gap-2 p-4 min-w-[100px] rounded-3xl border transition-all ${isSelected
                                    ? "bg-blue-600 border-blue-500 shadow-xl shadow-blue-900/40 translate-y-[-4px]"
                                    : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 text-zinc-500"
                                }`}
                        >
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-blue-100" : "text-zinc-500"}`}>
                                {d.toLocaleDateString("en-US", { weekday: "short" })}
                            </span>
                            <span className={`text-2xl font-black ${isSelected ? "text-white" : "text-zinc-300"}`}>
                                {d.toLocaleDateString("en-US", { day: "numeric" })}
                            </span>
                            <span className={`text-[9px] font-bold uppercase tracking-tighter ${isSelected ? "text-blue-200" : "text-zinc-600"}`}>
                                {d.toLocaleDateString("en-US", { month: "short" })}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="bg-zinc-950/40 backdrop-blur-md rounded-[3rem] p-10 border border-zinc-800/50">
                <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-500">
                            <FiCalendar size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Active Matrix</h3>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{filteredSlots.length} Quantized Slots</p>
                        </div>
                    </div>
                </div>

                {filteredSlots.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800 text-zinc-700">
                            <FiClock size={32} />
                        </div>
                        <p className="text-zinc-500 font-black text-sm uppercase tracking-widest">No Temporal Nodes Established</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {filteredSlots.map((slot) => (
                            <div
                                key={slot._id}
                                className={`group relative p-6 rounded-[2rem] border transition-all ${slot.isAvailable
                                        ? "bg-zinc-900/60 border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-800"
                                        : "bg-red-950/10 border-red-900/30 grayscale opacity-60"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-400">
                                        <FiClock size={16} />
                                    </div>
                                    <button
                                        onClick={() => onDeleteSlot(slot._id)}
                                        className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-600 hover:text-red-500 hover:border-red-500/50 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <FiTrash2 size={14} />
                                    </button>
                                </div>

                                <div className="space-y-1 mb-6">
                                    <div className="text-xl font-black text-white tracking-tighter italic">
                                        {slot.startTime}
                                    </div>
                                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                        UNTIL {slot.endTime}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                                    <div className="flex items-center gap-2">
                                        <FiUsers size={12} className="text-zinc-600" />
                                        <span className="text-[11px] font-black text-zinc-400">
                                            {slot.currentBookings} / {slot.maxBookings}
                                        </span>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${slot.isAvailable ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500"}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
