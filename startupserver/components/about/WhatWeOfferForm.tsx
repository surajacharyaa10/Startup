"use client";

import { OfferCategory } from "@/lib/types/about";
import { FiPlus, FiTrash2, FiBox, FiCheckCircle, FiMinus } from "react-icons/fi";

interface WhatWeOfferFormProps {
    categories: OfferCategory[];
    onAddCategory: () => void;
    onRemoveCategory: (index: number) => void;
    onCategoryChange: (index: number, value: string) => void;
    onAddItem: (index: number) => void;
    onRemoveItem: (catIndex: number, itemIndex: number) => void;
    onItemChange: (catIndex: number, itemIndex: number, field: "title" | "icon", value: string) => void;
}

export default function WhatWeOfferForm({
    categories,
    onAddCategory,
    onRemoveCategory,
    onCategoryChange,
    onAddItem,
    onRemoveItem,
    onItemChange,
}: WhatWeOfferFormProps) {
    return (
        <div className="space-y-10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {categories.map((category, catIndex) => (
                    <div key={catIndex} className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-[3rem] p-10 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-8 gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Section Identifier</label>
                                <input
                                    type="text"
                                    value={category.section}
                                    onChange={(e) => onCategoryChange(catIndex, e.target.value)}
                                    className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 text-white font-black uppercase text-sm tracking-[0.2em] focus:ring-2 focus:ring-blue-500/30 transition-all shadow-inner"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => onRemoveCategory(catIndex)}
                                className="mt-6 w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-600 hover:text-red-500 hover:border-red-500/50 flex items-center justify-center transition-all shadow-xl"
                            >
                                <FiTrash2 size={18} />
                            </button>
                        </div>

                        <div className="flex-1 space-y-4">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Quantized Features</label>
                            <div className="space-y-3">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="group relative bg-zinc-950 border border-zinc-800 rounded-2xl p-4 transition-all hover:border-blue-500/30">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12">
                                                <label className="text-[7px] font-black text-zinc-700 uppercase tracking-widest block mb-1 text-center">Icon</label>
                                                <input
                                                    type="text"
                                                    value={item.icon || "✓"}
                                                    onChange={(e) => onItemChange(catIndex, itemIndex, "icon", e.target.value)}
                                                    className="w-full h-8 bg-zinc-900 border border-zinc-800 rounded-lg text-center text-sm focus:ring-1 focus:ring-blue-500/30 transition-all"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-[7px] font-black text-zinc-700 uppercase tracking-widest block mb-1">Feature Label</label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => onItemChange(catIndex, itemIndex, "title", e.target.value)}
                                                    placeholder="Feature description..."
                                                    className="w-full h-8 bg-transparent border-none focus:outline-none text-zinc-400 text-xs font-bold transition-all px-0"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => onRemoveItem(catIndex, itemIndex)}
                                                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <FiMinus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => onAddItem(catIndex)}
                                className="w-full mt-6 h-12 rounded-xl border border-zinc-800 border-dashed text-zinc-600 hover:text-zinc-400 hover:border-zinc-700 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <FiPlus /> APPEND FEATURE
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
