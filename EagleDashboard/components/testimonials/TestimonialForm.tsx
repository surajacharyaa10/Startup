"use client";

import { FiSave, FiX, FiUploadCloud, FiUser, FiStar, FiBriefcase, FiZap, FiMessageSquare, FiTrendingUp } from "react-icons/fi";
import API_URL from "@/app/api/url";

interface TestimonialFormProps {
    formData: any;
    editingTestimonial: any;
    saving: boolean;
    imagePreview: string | null;
    onReset: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    fileInputRef: any;
}

export default function TestimonialForm({
    formData,
    editingTestimonial,
    saving,
    imagePreview,
    onReset,
    onChange,
    onImageChange,
    onSubmit,
    fileInputRef,
}: TestimonialFormProps) {
    return (
        <div className="bg-zinc-950 shadow-[0_0_80px_rgba(255,255,255,0.05)] rounded-[3rem] overflow-hidden border border-zinc-900 animate-in fade-in zoom-in-95 duration-500 mb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-zinc-800/10 via-zinc-800/5 to-transparent px-12 py-10 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl text-white">
                        <FiMessageSquare size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            {editingTestimonial ? "Recalibrate Signal" : "Initial Feedback Uplink"}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                            Endorsement Orchestration & Validation Matrix
                        </p>
                    </div>
                </div>
                {editingTestimonial && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-700 text-zinc-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800"
                    >
                        <FiX size={18} /> DISCONTINUE
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="p-10 lg:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

                    {/* Visual Asset & Core Meta */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Partner Identification (Avatar)</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative aspect-square rounded-[3rem] bg-zinc-900 border-4 border-dashed border-zinc-800 hover:border-white/20 transition-all overflow-hidden cursor-pointer group shadow-inner"
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FiUploadCloud size={40} className="text-white mb-2 animate-bounce" />
                                            <span className="text-white font-black text-[10px] uppercase tracking-widest">Swap Visual</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-700 p-8 text-center">
                                        <FiUser size={64} />
                                        <span className="font-black text-[10px] uppercase tracking-widest">Awaiting Capture</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={onImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-zinc-900/50 border border-zinc-900 rounded-[2.5rem] space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FiTrendingUp size={14} className="text-yellow-500" /> Satisfaction Quota (Rating)
                                </label>
                                <select
                                    name="rating"
                                    value={formData.rating}
                                    onChange={onChange}
                                    className="w-full h-16 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 text-yellow-500 font-black text-2xl outline-none appearance-none cursor-pointer"
                                >
                                    {[5, 4, 3, 2, 1].map(num => (
                                        <option key={num} value={num}>{num} ★ SIGNALS</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-2">
                                <label htmlFor="featured" className="flex items-center gap-4 cursor-pointer">
                                    <FiZap size={18} className={formData.featured ? "text-yellow-500 fill-yellow-500" : "text-zinc-700"} />
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Elevate to Featured</span>
                                </label>
                                <input
                                    type="checkbox"
                                    name="featured"
                                    id="featured"
                                    checked={formData.featured}
                                    onChange={onChange}
                                    className="w-6 h-6 rounded-lg bg-zinc-950 border border-zinc-800 checked:bg-white accent-white cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Logic Matrix */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Full Designation (Name)</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={onChange}
                                    required
                                    className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-white/10 outline-none"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Strategic Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={onChange}
                                    required
                                    placeholder="e.g. Chief Tech Officer"
                                    className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-bold uppercase text-xs tracking-widest focus:ring-2 focus:ring-white/10 outline-none italic"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiBriefcase size={12} /> External Node (Company)
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={onChange}
                                placeholder="Core Organization"
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-blue-500 font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-white/10 outline-none"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Transmission Message (Content)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={onChange}
                                required
                                rows={6}
                                placeholder="Transcribe the partner testimony..."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-[2.5rem] px-8 py-8 text-zinc-400 font-medium text-lg leading-relaxed italic focus:ring-2 focus:ring-white/10 outline-none"
                            />
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full h-24 bg-white hover:bg-zinc-100 text-black rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-[0.96] group/btn"
                            >
                                {saving ? (
                                    <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <FiSave size={28} />
                                        <span>{editingTestimonial ? "SYNC FEEDBACK SIGNATURE" : "INITIALIZE UPLINK"}</span>
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
