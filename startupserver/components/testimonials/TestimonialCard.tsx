"use client";

import { Testimonial } from "@/lib/types/testimonial";
import { FiStar, FiEdit2, FiTrash2, FiAward, FiUser, FiBriefcase } from "react-icons/fi";
import API_URL from "@/app/api/url";

interface TestimonialCardProps {
    testimonial: Testimonial;
    onEdit: (testimonial: Testimonial) => void;
    onDelete: (id: string) => void;
}

export default function TestimonialCard({ testimonial, onEdit, onDelete }: TestimonialCardProps) {
    const getImageUrl = (image: string) => {
        if (!image) return null;
        return image.startsWith('/uploads') ? `${API_URL}${image}` : image;
    };

    const avatarUrl = getImageUrl(testimonial.image);

    return (
        <div className="group relative bg-zinc-950 border border-zinc-900 rounded-[3rem] p-10 hover:border-zinc-700 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-2xl">
            {/* Ambient background effect */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 ${testimonial.featured ? 'bg-yellow-500/10' : 'bg-blue-600/10'} blur-[100px] group-hover:opacity-100 transition-opacity duration-700`}></div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Visual Asset & Identity */}
                <div className="flex items-start justify-between mb-10">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt={testimonial.name} className="w-full h-full object-cover" />
                                ) : (
                                    <FiUser size={32} className="text-zinc-800" />
                                )}
                            </div>
                            {testimonial.featured && (
                                <div className="absolute -top-3 -right-3 bg-yellow-500 text-black px-3 py-1 rounded-xl shadow-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                                    <FiAward size={12} className="fill-black" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">
                                {testimonial.name}
                            </h3>
                            <div className="flex items-center gap-3 mt-1 text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">
                                <span className="flex items-center gap-1.5"><FiBriefcase size={10} /> {testimonial.role}</span>
                                {testimonial.company && (
                                    <>
                                        <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                                        <span className="text-blue-500">{testimonial.company}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                        <button
                            onClick={() => onEdit(testimonial)}
                            className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all shadow-xl"
                        >
                            <FiEdit2 size={14} />
                        </button>
                        <button
                            onClick={() => onDelete(testimonial._id)}
                            className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-red-900/20 transition-all shadow-xl"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                </div>

                {/* Rating Display */}
                <div className="flex gap-1.5 mb-8">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`p-1.5 rounded-lg ${i < testimonial.rating ? 'bg-yellow-500/10' : 'bg-zinc-900'}`}>
                            <FiStar
                                className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-800"}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Content Matrix */}
                <div className="relative flex-1">
                    <span className="absolute -top-10 -left-6 text-9xl text-white/5 font-serif italic pointer-events-none">"</span>
                    <p className="text-zinc-400 text-lg leading-relaxed italic font-medium relative z-10 group-hover:text-zinc-200 transition-colors">
                        {testimonial.content}
                    </p>
                </div>

                {/* Verification Bar */}
                <div className="mt-12 pt-8 border-t border-zinc-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Verified Integration</span>
                    </div>
                    <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest italic group-hover:text-zinc-500 transition-colors">
                        SIGNAL STRENGTH: 100%
                    </div>
                </div>
            </div>
        </div>
    );
}
