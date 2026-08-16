"use client";

import { FiCalendar, FiClock, FiPlus, FiZap } from "react-icons/fi";

interface BulkSlotFormProps {
    bulkForm: {
        startDate: string;
        endDate: string;
        startTime: string;
        endTime: string;
        duration: number;
        excludeWeekends: boolean;
    };
    saving: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

export default function BulkSlotForm({ bulkForm, saving, onChange, onSubmit }: BulkSlotFormProps) {
    return (
        <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent p-10 border-b border-zinc-800/50">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                        <FiZap size={32} className="text-blue-500" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Factory Mode</h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Bulk Temporal Slot Generation</p>
                    </div>
                </div>
            </div>

            <div className="p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                            <FiCalendar size={12} /> Horizon Start
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={bulkForm.startDate}
                            onChange={onChange}
                            className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-black"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                            <FiCalendar size={12} /> Horizon End
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={bulkForm.endDate}
                            onChange={onChange}
                            className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-black"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                            <FiClock size={12} /> Duty Start
                        </label>
                        <input
                            type="time"
                            name="startTime"
                            value={bulkForm.startTime}
                            onChange={onChange}
                            className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-black"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                            <FiClock size={12} /> Duty End
                        </label>
                        <input
                            type="time"
                            name="endTime"
                            value={bulkForm.endTime}
                            onChange={onChange}
                            className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-black"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Quantum Duration (Min)</label>
                        <input
                            type="number"
                            name="duration"
                            value={bulkForm.duration}
                            onChange={onChange}
                            min="15"
                            step="15"
                            className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-black"
                        />
                    </div>

                    <div className="flex items-end pb-1">
                        <label className="group flex items-center gap-4 cursor-pointer py-4 px-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-blue-500/30 transition-all w-full">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="excludeWeekends"
                                    checked={bulkForm.excludeWeekends}
                                    onChange={onChange}
                                    className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                                />
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${bulkForm.excludeWeekends ? "bg-blue-600 border-blue-600" : "bg-zinc-800 border-zinc-700"}`}>
                                    {bulkForm.excludeWeekends && <div className="w-2 h-2 rounded-full bg-white shadow-xl"></div>}
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">Exclude Weekends</span>
                        </label>
                    </div>
                </div>

                <button
                    onClick={onSubmit}
                    disabled={saving}
                    className="w-full h-20 bg-gradient-to-r from-blue-600 to-indigo-700 hover:brightness-110 disabled:grayscale text-white font-black text-sm uppercase tracking-[0.4em] rounded-[2rem] transition-all flex items-center justify-center gap-4 shadow-[0_10px_40px_rgba(37,99,235,0.2)] active:scale-[0.98]"
                >
                    {saving ? (
                        <div className="w-10 h-1 text-white border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <FiPlus size={24} /> Generate Temporal Network
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
