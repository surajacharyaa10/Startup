"use client";

import { Testimonial } from "@/lib/types/testimonial";
import TestimonialCard from "./TestimonialCard";
import { FiMessageSquare } from "react-icons/fi";

interface TestimonialListProps {
    testimonials: Testimonial[];
    onEdit: (testimonial: Testimonial) => void;
    onDelete: (id: string) => void;
}

export default function TestimonialList({ testimonials, onEdit, onDelete }: TestimonialListProps) {
    if (testimonials.length === 0) {
        return (
            <div className="bg-zinc-950/30 border-2 border-dashed border-zinc-900 rounded-[3rem] p-24 text-center group hover:border-zinc-800 transition-colors">
                <FiMessageSquare size={48} className="mx-auto text-zinc-800 mb-6 group-hover:text-zinc-700 transition-colors" />
                <p className="text-zinc-700 font-black uppercase tracking-[0.3em] text-[10px]">Validation matrix currently devoid of signals.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {testimonials.map((testimonial) => (
                <TestimonialCard
                    key={testimonial._id}
                    testimonial={testimonial}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
