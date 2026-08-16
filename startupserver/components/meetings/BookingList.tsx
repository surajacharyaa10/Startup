"use client";

import { Booking, MeetingSlot } from "@/lib/types/meeting";
import { FiSearch, FiInbox } from "react-icons/fi";
import BookingCard from "./BookingCard";

interface BookingListProps {
    bookings: Booking[];
    searchCode: string;
    onSearchChange: (val: string) => void;
    onUpdateStatus: (id: string, status: "confirmed" | "cancelled") => void;
}

export default function BookingList({ bookings, searchCode, onSearchChange, onUpdateStatus }: BookingListProps) {
    const filteredBookings = bookings.filter(
        (b) =>
            b.bookingCode.toLowerCase().includes(searchCode.toLowerCase()) ||
            b.name.toLowerCase().includes(searchCode.toLowerCase()) ||
            b.email.toLowerCase().includes(searchCode.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* List Search */}
            <div className="bg-zinc-950/40 backdrop-blur-xl border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-500 shadow-inner">
                        <FiInbox size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Request Logs</h3>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{bookings.length} Transmission Pulses</p>
                    </div>
                </div>

                <div className="relative w-full md:w-[400px]">
                    <input
                        type="text"
                        placeholder="Search Protocol (Code, Name, Email)..."
                        value={searchCode}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl pl-14 pr-6 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-sm"
                    />
                    <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
                </div>
            </div>

            {filteredBookings.length === 0 ? (
                <div className="bg-zinc-900/10 border-4 border-dashed border-zinc-900 rounded-[4rem] p-32 text-center">
                    <div className="w-24 h-24 bg-zinc-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-zinc-800 shadow-2xl">
                        <FiInbox size={48} className="text-zinc-800" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Terminal Empty</h3>
                    <p className="text-zinc-500 font-bold max-w-sm mx-auto text-sm leading-relaxed uppercase tracking-[0.2em]">No incoming transmissions match your current filter criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-8 pb-20">
                    {filteredBookings.map((booking) => (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                            onUpdateStatus={onUpdateStatus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
