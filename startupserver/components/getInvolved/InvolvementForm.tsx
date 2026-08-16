"use client";

import { useState } from "react";
import { GetInvolved, GetInvolvedInput } from "@/lib/types/getInvolved";
import API_URL from "@/app/api/url";
import { FiX, FiPlus, FiSave, FiUploadCloud, FiLink, FiCheckCircle, FiSettings, FiGrid, FiFileText, FiTag } from "react-icons/fi";

interface InvolvementFormProps {
    formData: GetInvolvedInput;
    editingOption: GetInvolved | null;
    saving: boolean;
    benefitsInput: string;
    requirementsInput: string;
    iconPreview: string | null;
    onReset: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onIconChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBenefitsChange: (val: string) => void;
    onRequirementsChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    types: readonly { id: string; label: string; icon: string }[];
    jobTypes: string[];
}

export default function InvolvementForm({
    formData,
    editingOption,
    saving,
    benefitsInput,
    requirementsInput,
    iconPreview,
    onReset,
    onChange,
    onIconChange,
    onBenefitsChange,
    onRequirementsChange,
    onSubmit,
    types,
    jobTypes,
}: InvolvementFormProps) {
    return (
        <div className="bg-zinc-950 shadow-[0_0_80px_rgba(255,255,255,0.05)] rounded-[3rem] overflow-hidden border border-zinc-900 animate-in fade-in zoom-in-95 duration-500 mb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-zinc-800/10 via-zinc-800/5 to-transparent px-12 py-10 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl text-white">
                        <FiSettings size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            {editingOption ? "Update Capability" : "Assemble Project"}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                            Resource Allocation & Opportunity Synthesis
                        </p>
                    </div>
                </div>
                {editingOption && (
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

                    {/* Visual Asset & Link Info */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Visual Marker (Icon)</label>
                            <div className="relative group">
                                <div className="w-full aspect-square rounded-[3rem] bg-zinc-900 border-4 border-dashed border-zinc-800 group-hover:border-white/20 transition-all overflow-hidden relative shadow-inner">
                                    {iconPreview ? (
                                        <>
                                            <img
                                                src={iconPreview.startsWith("http") || iconPreview.startsWith("data:") ? iconPreview : `${API_URL}/${iconPreview}`}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all flex-col gap-3">
                                                <FiUploadCloud size={40} className="text-white animate-bounce" />
                                                <span className="text-white font-black text-[10px] uppercase tracking-widest text-center px-4">Change Identification</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-700 p-8 text-center">
                                            <FiPlus size={64} />
                                            <span className="font-black text-[10px] uppercase tracking-widest">Awaiting Capture (1:1 Ratio)</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={onIconChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 bg-zinc-900/50 border border-zinc-900 rounded-2xl">
                                <h4 className="text-[9px] font-black text-white uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <FiLink size={12} /> Reference Uplink (URL)
                                </h4>
                                <input
                                    type="url"
                                    name="link"
                                    value={formData.link}
                                    onChange={onChange}
                                    placeholder="https://..."
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-blue-500 font-mono text-[10px] focus:ring-1 focus:ring-white/10 outline-none"
                                />
                            </div>

                            <div className="p-6 bg-zinc-900/50 border border-zinc-900 rounded-2xl flex items-center gap-4 group hover:border-white/10 transition-colors">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={onChange}
                                        className="w-8 h-8 rounded-xl bg-zinc-950 border border-zinc-800 text-white checked:bg-white transition-all cursor-pointer appearance-none checked:after:content-['✓'] checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-black checked:after:font-black"
                                    />
                                </div>
                                <label htmlFor="featured" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] cursor-pointer group-hover:text-white transition-colors">
                                    Strategic Priority (Featured)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Core Parameters */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Project Designation (Title)</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={onChange}
                                    required
                                    className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-white/10 transition-all"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 font-black">Classification</label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={onChange}
                                        className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-white/10 transition-all appearance-none"
                                    >
                                        {types.map((t) => (
                                            <option key={t.id} value={t.id} className="bg-zinc-950">
                                                {t.label} {t.icon}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                                        <FiGrid size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiFileText size={12} className="text-white" /> Strategic Overview (Description)
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={onChange}
                                rows={4}
                                required
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] px-8 py-6 text-zinc-400 font-medium text-sm leading-relaxed italic focus:ring-2 focus:ring-white/10 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiTag size={12} className="text-white" /> Asset Yields (Benefits)
                                </label>
                                <input
                                    type="text"
                                    value={benefitsInput}
                                    onChange={(e) => onBenefitsChange(e.target.value)}
                                    placeholder="Equity, Remote Access, Health Protocol"
                                    className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-bold text-xs tracking-widest focus:ring-2 focus:ring-white/10 transition-all italic"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiTag size={12} className="text-white" /> Entry Prerequisites (Requirements)
                                </label>
                                <input
                                    type="text"
                                    value={requirementsInput}
                                    onChange={(e) => onRequirementsChange(e.target.value)}
                                    placeholder="Neural Linking, 5Y Exp, React.Core"
                                    className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-bold text-xs tracking-widest focus:ring-2 focus:ring-white/10 transition-all italic"
                                />
                            </div>
                        </div>

                        {formData.category === "careers" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-10 bg-zinc-900/30 border border-zinc-900 rounded-[3rem] animate-in slide-in-from-top-4 duration-500">
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Departmental Unit</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={onChange}
                                        className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-xl px-6 text-white font-bold text-[11px] uppercase tracking-widest focus:ring-1 focus:ring-white/10 transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Geographic Node</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={onChange}
                                        className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-xl px-6 text-white font-bold text-[11px] uppercase tracking-widest focus:ring-1 focus:ring-white/10 transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Temporal Load (Job Type)</label>
                                    <select
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={onChange}
                                        className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-xl px-6 text-white font-bold text-[11px] uppercase tracking-widest focus:ring-1 focus:ring-white/10 transition-all appearance-none"
                                    >
                                        <option value="">Select Protocol</option>
                                        {jobTypes.map((jt) => (
                                            <option key={jt} value={jt} className="bg-zinc-950">{jt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Transmission Link (Apply)</label>
                                    <input
                                        type="url"
                                        name="applyLink"
                                        value={formData.applyLink}
                                        onChange={onChange}
                                        className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-xl px-6 text-blue-500 font-mono text-[10px] focus:ring-1 focus:ring-white/10 transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="pt-10">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full h-24 bg-white hover:bg-zinc-100 text-black rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-[0.96] group/btn"
                            >
                                {saving ? (
                                    <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        {editingOption ? <FiCheckCircle size={28} /> : <FiSave size={28} />}
                                        <span>{editingOption ? "AUTHORIZE UPDATES" : "INITIALIZE OPPORTUNITY"}</span>
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
