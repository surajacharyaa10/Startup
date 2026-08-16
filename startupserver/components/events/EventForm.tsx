"use client";

import { useRef } from "react";
import { FiSave, FiX, FiCalendar, FiMapPin, FiLayers, FiActivity, FiGlobe, FiClock, FiVideo, FiUploadCloud, FiStar, FiShield } from "react-icons/fi";

interface EventFormProps {
    formData: any;
    editingEvent: any;
    saving: boolean;
    imagePreview: string | null;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCancel: () => void;
    categories: string[];
    types: any[];
}

export default function EventForm({
    formData,
    editingEvent,
    saving,
    imagePreview,
    onSubmit,
    onChange,
    onImageChange,
    onCancel,
    categories,
    types,
}: EventFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="bg-zinc-950 shadow-[0_0_80px_rgba(168,85,247,0.1)] rounded-[3rem] overflow-hidden border border-zinc-900 animate-in fade-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600/10 via-purple-600/5 to-transparent px-12 py-10 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl text-purple-500">
                        <FiCalendar size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            {editingEvent ? "Sync Event Signature" : "Coordinate Protocol"}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                            Event Logistics & Strategic Coordination
                        </p>
                    </div>
                </div>
                {editingEvent && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800"
                    >
                        <FiX size={18} /> DISCONTINUE
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="p-10 lg:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

                    {/* Left Column: Visuals & Core Meta */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiUploadCloud size={12} className="text-purple-500" /> Event Visualization
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative h-64 bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/30 transition-all group overflow-hidden"
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all" />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-zinc-700">
                                        <FiUploadCloud size={48} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Transmit Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="bg-purple-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl">Modify Visual</span>
                                </div>
                                <input type="file" ref={fileInputRef} onChange={onImageChange} accept="image/*" className="hidden" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiLayers size={10} /> Sector
                                </label>
                                <select name="type" value={formData.type} onChange={onChange} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-white font-black uppercase text-[10px] tracking-widest appearance-none">
                                    {types.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiActivity size={10} /> Classification
                                </label>
                                <select name="category" value={formData.category} onChange={onChange} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-white font-black uppercase text-[10px] tracking-widest appearance-none">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
                            <label htmlFor="featured" className="flex items-center gap-4 cursor-pointer">
                                <FiStar size={18} className={formData.featured ? "text-yellow-500 fill-yellow-500" : "text-zinc-700"} />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Elevate to Featured</span>
                            </label>
                            <input
                                type="checkbox"
                                name="featured"
                                id="featured"
                                checked={formData.featured}
                                onChange={onChange}
                                className="w-6 h-6 rounded-lg bg-zinc-950 border border-zinc-800 checked:bg-purple-600 accent-purple-600"
                            />
                        </div>
                    </div>

                    {/* Center Column: Logistics */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiActivity size={12} className="text-purple-500" /> Protocol Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={onChange}
                                required
                                placeholder="Strategic Event Name"
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-purple-500/30 transition-all shadow-inner"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiMapPin size={12} className="text-purple-500" /> Coordinate Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={onChange}
                                required
                                placeholder="Global or Virtual Nexus"
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-zinc-400 font-medium text-xs tracking-wide focus:ring-2 focus:ring-purple-500/30 transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiClock size={12} className="text-purple-500" /> Temporal Window
                            </label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={onChange}
                                required
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-mono text-xs uppercase focus:ring-2 focus:ring-purple-500/30 transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiShield size={12} className="text-purple-500" /> Strategy Briefing
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={onChange}
                                required
                                rows={4}
                                placeholder="Detailed event objectives and outcomes..."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] px-8 py-6 text-zinc-400 font-medium text-sm leading-relaxed italic focus:ring-2 focus:ring-purple-500/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Right Column: Dynamic Matrix */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiGlobe size={12} className="text-purple-500" /> Registration Uplink
                            </label>
                            <input
                                type="url"
                                name="registrationLink"
                                value={formData.registrationLink}
                                onChange={onChange}
                                placeholder="https://access-point.sh/..."
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-purple-500 font-mono text-[10px] shadow-inner focus:ring-2 focus:ring-purple-500/30 transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiVideo size={12} className="text-purple-500" /> Recorded Archive Payload
                            </label>
                            <input
                                type="url"
                                name="recordingLink"
                                value={formData.recordingLink}
                                onChange={onChange}
                                placeholder="Archive link (YouTube, etc.)"
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-emerald-500 font-mono text-[10px] shadow-inner focus:ring-2 focus:ring-purple-500/30 transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiActivity size={12} className="text-purple-500" /> Calculated Attendees
                            </label>
                            <input
                                type="number"
                                name="attendees"
                                value={formData.attendees}
                                onChange={onChange}
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black text-sm"
                            />
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full h-24 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 hover:from-purple-500 hover:to-indigo-500 text-white rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-[0_10px_40px_rgba(168,85,247,0.3)] active:scale-[0.96] group/btn relative overflow-hidden disabled:grayscale"
                            >
                                {saving ? (
                                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FiSave size={28} />
                                        <span>{editingEvent ? "UPDATE SIGNATURE" : "DEPLOY COORDINATES"}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
