"use client";
import { useState } from "react";
import { meetingsApi, Booking } from "@/app/api/meetings";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiCalendar, FiClock, FiUser, FiInfo, FiXCircle, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";

export default function TrackBookingPage() {
    const [code, setCode] = useState("");
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelling, setCancelling] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;

        setLoading(true);
        setError(null);
        setBooking(null);
        setSuccessMsg(null);

        try {
            const data = await meetingsApi.getBookingByCode(code.trim().toUpperCase());
            setBooking(data);
        } catch (err: any) {
            setError(err.message || "Failed to find booking");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!booking) return;

        toast((t) => (
            <div className="flex flex-col gap-3">
                <p className="font-medium text-zinc-900">Are you sure you want to cancel this booking?</p>
                <div className="flex gap-2">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            setCancelling(true);
                            setError(null);
                            try {
                                const result = await meetingsApi.cancelBooking(booking.bookingCode);
                                if (result.success) {
                                    setBooking(result.data);
                                    toast.success("Booking successfully cancelled.");
                                }
                            } catch (err: any) {
                                toast.error(err.message || "Failed to cancel booking");
                                setError(err.message || "Failed to cancel booking");
                            } finally {
                                setCancelling(false);
                            }
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold"
                    >
                        Yes, Cancel
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-zinc-200 text-zinc-800 px-3 py-1 rounded text-sm font-bold"
                    >
                        Keep Booking
                    </button>
                </div>
            </div>
        ), { duration: 6000 });
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-500/10 text-green-400 border-green-500/50";
            case "cancelled":
                return "bg-red-500/10 text-red-400 border-red-500/50";
            default:
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/50";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "confirmed":
                return <FiCheckCircle className="w-5 h-5" />;
            case "cancelled":
                return <FiXCircle className="w-5 h-5" />;
            default:
                return <FiAlertCircle className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-4">
                        Track Your Booking
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Enter your unique booking code to view status or cancel.
                    </p>
                </motion.div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Enter Booking Code (e.g. AB12CD34)"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase tracking-widest"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                        >
                            {loading ? "Searching..." : "Track My Booking"}
                        </button>
                    </form>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-4 flex items-center gap-2"
                        >
                            <FiAlertCircle /> {error}
                        </motion.p>
                    )}

                    {successMsg && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-400 text-sm mt-4 flex items-center gap-2"
                        >
                            <FiCheckCircle /> {successMsg}
                        </motion.p>
                    )}
                </div>

                <AnimatePresence>
                    {booking && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-8">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                                    <div>
                                        <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Booking Code</p>
                                        <h2 className="text-3xl font-mono font-bold text-white tracking-widest">{booking.bookingCode}</h2>
                                    </div>
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusStyles(booking.status)}`}>
                                        {getStatusIcon(booking.status)}
                                        <span className="font-bold uppercase text-sm tracking-widest">{booking.status}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                                                <FiCalendar className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Date</p>
                                                <p className="text-white font-medium">{new Date(booking.slotId.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                                                <FiClock className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Time</p>
                                                <p className="text-white font-medium">{booking.slotId.startTime} - {booking.slotId.endTime}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-400 shrink-0">
                                                <FiUser className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Name</p>
                                                <p className="text-white font-medium">{booking.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-400 shrink-0">
                                                <FiInfo className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Purpose</p>
                                                <p className="text-white font-medium">{booking.purpose}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {booking.status !== "cancelled" && (
                                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <p className="text-gray-400 text-sm max-w-sm">
                                            Need to reschedule? Please cancel this booking first and create a new one.
                                        </p>
                                        <button
                                            onClick={handleCancel}
                                            disabled={cancelling}
                                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {cancelling ? "Cancelling..." : <> <FiXCircle /> Cancel Booking </>}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12 text-center">
                    <Link href="/book-meeting" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                        ← Back to Booking
                    </Link>
                </div>
            </div>
        </div>
    );
}
