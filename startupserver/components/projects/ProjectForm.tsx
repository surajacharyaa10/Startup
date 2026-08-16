"use client";

import { useRef } from "react";
import { FiSave, FiX, FiCpu, FiTag, FiFileText, FiLayers, FiActivity, FiGlobe, FiClock, FiShield, FiUploadCloud } from "react-icons/fi";

interface ProjectFormProps {
    formData: any;
    featuresInput: string;
    techStackInput: string;
    editingProject: any;
    saving: boolean;
    imagePreview: string | null;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFeaturesChange: (value: string) => void;
    onTechStackChange: (value: string) => void;
    onCancel: () => void;
    categories: any[];
}

export default function ProjectForm({
    formData,
    featuresInput,
    techStackInput,
    editingProject,
    saving,
    imagePreview,
    onSubmit,
    onChange,
    onImageChange,
    onFeaturesChange,
    onTechStackChange,
    onCancel,
    categories,
}: ProjectFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="bg-zinc-950 shadow-[0_0_80px_rgba(16,185,129,0.1)] rounded-[3rem] overflow-hidden border border-zinc-900 animate-in fade-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600/10 via-emerald-600/5 to-transparent px-12 py-10 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl">
                        <FiCpu size={32} className="text-emerald-500" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            {editingProject ? "Re-Engine Module" : "Assemble Project"}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                            Project Infrastructure Configuration
                        </p>
                    </div>
                </div>
                {editingProject && (
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

                    {/* Left Column: Visual & Identity */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiUploadCloud size={12} className="text-emerald-500" /> Schematic Visual
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative h-64 bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500/30 transition-all group overflow-hidden"
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all" />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-zinc-700">
                                        <FiUploadCloud size={48} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Upload Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl">Change Visual</span>
                                </div>
                                <input type="file" ref={fileInputRef} onChange={onImageChange} accept="image/*" className="hidden" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiLayers size={12} className="text-emerald-500" /> Lifecycle Status
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={onChange}
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-emerald-500/30 transition-all appearance-none cursor-pointer"
                            >
                                {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.label}</option>))}
                            </select>
                        </div>
                    </div>

                    {/* Center Column: Core Specs */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiTag size={12} className="text-emerald-500" /> Designation
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                                required
                                placeholder="Module Name"
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-emerald-500/30 transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiActivity size={12} className="text-emerald-500" /> Strategic Tagline
                            </label>
                            <input
                                type="text"
                                name="tagline"
                                value={formData.tagline}
                                onChange={onChange}
                                required
                                placeholder="Short impact statement"
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-zinc-400 font-medium text-xs italic tracking-wide focus:ring-2 focus:ring-emerald-500/30 transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiFileText size={12} className="text-emerald-500" /> Analysis Dossier
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={onChange}
                                required
                                rows={6}
                                placeholder="Detailed project breakdown..."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] px-8 py-6 text-zinc-400 font-medium text-sm leading-relaxed italic focus:ring-2 focus:ring-emerald-500/30 transition-all scrollbar-hide"
                            />
                        </div>
                    </div>

                    {/* Right Column: Technical Grid */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Version</label>
                                <input type="text" name="version" value={formData.version} onChange={onChange} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-xl px-6 text-white font-mono text-[10px]" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Maturity %</label>
                                <input type="text" name="maturity" value={formData.maturity} onChange={onChange} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-xl px-6 text-emerald-500 font-black text-[10px]" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Engineers</label>
                                <input type="number" name="contributors" value={formData.contributors} onChange={onChange} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-xl px-6 text-white font-black text-[10px]" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">License</label>
                                <input type="text" name="license" value={formData.license} onChange={onChange} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-xl px-6 text-zinc-500 font-black text-[10px]" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiGlobe size={12} className="text-emerald-500" /> Technology Stack
                            </label>
                            <input
                                type="text"
                                value={techStackInput}
                                onChange={(e) => onTechStackChange(e.target.value)}
                                placeholder="React, Node.js, AI, etc."
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-emerald-500 font-black text-[10px] uppercase tracking-widest focus:ring-2 focus:ring-emerald-500/30 transition-all"
                            />
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full h-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 hover:from-emerald-500 hover:to-teal-500 text-white rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-[0_10px_40px_rgba(16,185,129,0.3)] active:scale-[0.96] group/btn relative overflow-hidden disabled:grayscale"
                            >
                                {saving ? (
                                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FiSave size={28} />
                                        <span>{editingProject ? "COMMIT PROTOCOL" : "INITIALIZE PROJECT"}</span>
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
