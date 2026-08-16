"use client";

import { CoreValue } from "@/lib/types/about";
import { FiPlus, FiTrash2, FiStar, FiActivity, FiLayers } from "react-icons/fi";

interface CoreValuesFormProps {
    values: CoreValue[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onChange: (index: number, field: keyof CoreValue, value: string) => void;
}

export default function CoreValuesForm({ values, onAdd, onRemove, onChange }: CoreValuesFormProps) {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500">
                        <FiStar size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Ethical Core</h3>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Principles of Operation</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onAdd}
                    className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
                >
                    <FiPlus /> ADD PRINCIPLE
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                    <div key={index} className="group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-8 transition-all hover:bg-zinc-800/60">
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-600 hover:text-red-500 hover:border-red-500/50 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                        >
                            <FiTrash2 size={16} />
                        </button>

                        <div className="space-y-6">
                            <div className="grid grid-cols-12 gap-4 items-end">
                                <div className="col-span-3 space-y-2">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Icon</label>
                                    <input
                                        type="text"
                                        value={value.icon}
                                        onChange={(e) => onChange(index, "icon", e.target.value)}
                                        className="w-full h-12 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-center text-xl focus:ring-2 focus:ring-emerald-500/30 transition-all"
                                    />
                                </div>
                                <div className="col-span-9 space-y-2">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Identifier</label>
                                    <input
                                        type="text"
                                        value={value.title}
                                        onChange={(e) => onChange(index, "title", e.target.value)}
                                        placeholder="Title"
                                        className="w-full h-12 bg-zinc-950 border border-zinc-800 rounded-xl px-6 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-emerald-500/30 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Definition</label>
                                <textarea
                                    value={value.desc}
                                    onChange={(e) => onChange(index, "desc", e.target.value)}
                                    placeholder="Describe this value..."
                                    rows={2}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-6 py-4 text-zinc-400 text-sm font-medium focus:ring-2 focus:ring-emerald-500/30 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2 flex items-center gap-2">
                                    <FiActivity size={10} /> Visual Signature (CSS)
                                </label>
                                <input
                                    type="text"
                                    value={value.bg}
                                    onChange={(e) => onChange(index, "bg", e.target.value)}
                                    placeholder="e.g. bg-blue-100 text-blue-600"
                                    className="w-full h-12 bg-zinc-950 border border-zinc-800 rounded-xl px-6 text-emerald-500 font-mono text-[10px] uppercase focus:ring-2 focus:ring-emerald-500/30 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
