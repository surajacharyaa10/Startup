"use client";

import { useRef } from "react";
import { FiUploadCloud, FiX, FiVideo, FiTag, FiSave, FiActivity } from "react-icons/fi";

interface ReelFormProps {
    title: string;
    onTitleChange: (val: string) => void;
    onVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    videoPreview: string | null;
    saving: boolean;
    onReset: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function ReelForm({
    title,
    onTitleChange,
    onVideoChange,
    videoPreview,
    saving,
    onReset,
    onSubmit,
}: ReelFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="bg-zinc-950 shadow-[0_0_80px_rgba(59,130,246,0.1)] rounded-[3rem] overflow-hidden border border-zinc-900 animate-in fade-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/10 via-blue-600/5 to-transparent px-12 py-10 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl text-blue-500">
                        <FiVideo size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            Transmit Reel
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                            Short Form Content Pipeline
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onReset}
                    className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800"
                >
                    <FiX size={18} /> RESET STREAM
                </button>
            </div>

            <form onSubmit={onSubmit} className="p-10 lg:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

                    {/* Video Upload Area */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                            <FiUploadCloud size={12} className="text-blue-500" /> Video Payload (Vertical Recommended)
                        </label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="relative aspect-video lg:aspect-[9/16] max-h-[500px] bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/30 transition-all group overflow-hidden"
                        >
                            {videoPreview ? (
                                <video src={videoPreview} className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all" />
                            ) : (
                                <div className="flex flex-col items-center gap-6 text-zinc-700">
                                    <div className="w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-800">
                                        <FiVideo size={32} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Drop MP4 Fragment</span>
                                </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">REPLACE SELECTION</span>
                            </div>
                            <input type="file" ref={fileInputRef} onChange={onVideoChange} accept="video/*" className="hidden" />
                        </div>
                    </div>

                    {/* Configuration Area */}
                    <div className="flex flex-col justify-between space-y-10">
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiTag size={12} className="text-blue-500" /> Identifying Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => onTitleChange(e.target.value)}
                                    required
                                    placeholder="Short impact title..."
                                    className="w-full h-20 bg-zinc-900 border border-zinc-800 rounded-3xl px-8 text-white font-black uppercase text-sm tracking-widest focus:ring-2 focus:ring-blue-500/30 transition-all shadow-inner"
                                />
                            </div>

                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <FiActivity className="text-blue-500" />
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Pipeline Status</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest italic">Signal Ready</span>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving || !videoPreview}
                            className="w-full h-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 hover:from-blue-50 hover:to-indigo-500 text-white rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-6 shadow-[0_15px_50px_rgba(59,130,246,0.3)] active:scale-[0.96] group/btn relative overflow-hidden disabled:grayscale disabled:opacity-50"
                        >
                            {saving ? (
                                <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <FiUploadCloud size={32} className="group-hover/btn:-translate-y-1 transition-transform" />
                                    <span>INITIATE UPLINK</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
