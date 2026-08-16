"use client";

import { GetInvolved } from "@/lib/types/getInvolved";
import InvolvementCard from "./InvolvementCard";
import { FiActivity } from "react-icons/fi";

interface InvolvementListProps {
    options: GetInvolved[];
    types: readonly { id: string; label: string; icon: string }[];
    onEdit: (option: GetInvolved) => void;
    onDelete: (id: string) => void;
}

export default function InvolvementList({ options, types, onEdit, onDelete }: InvolvementListProps) {
    return (
        <div className="space-y-32">
            {types.map((type) => {
                const typeOptions = options.filter((o) => o.category === type.id);

                return (
                    <div key={type.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="flex items-center gap-6 mb-12">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shadow-2xl">
                                <span className="text-xl">{type.icon}</span>
                            </div>
                            <div className="flex items-baseline gap-4">
                                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                                    {type.label}
                                </h2>
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{typeOptions.length} ENTRIES</span>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
                        </div>

                        {typeOptions.length === 0 ? (
                            <div className="bg-zinc-950/30 border-2 border-dashed border-zinc-900 rounded-[3rem] p-24 text-center group hover:border-zinc-800 transition-colors">
                                <FiActivity size={48} className="mx-auto text-zinc-800 mb-6 group-hover:text-zinc-700 transition-colors" />
                                <p className="text-zinc-700 font-black uppercase tracking-[0.3em] text-[10px]">Sector currently devoid of opportunities.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                                {typeOptions.map((option) => (
                                    <InvolvementCard
                                        key={option._id}
                                        option={option}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
