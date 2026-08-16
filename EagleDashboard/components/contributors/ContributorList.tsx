"use client";

import { Contributor } from "@/lib/types/contributor";
import ContributorCard from "./ContributorCard";
import { FiActivity } from "react-icons/fi";

interface ContributorListProps {
    contributors: Contributor[];
    onEdit: (contributor: Contributor) => void;
    onDelete: (id: string) => void;
}

export default function ContributorList({ contributors, onEdit, onDelete }: ContributorListProps) {
    if (contributors.length === 0) {
        return (
            <div className="bg-zinc-950/30 border-2 border-dashed border-zinc-900 rounded-[3rem] p-24 text-center group hover:border-zinc-800 transition-colors">
                <FiActivity size={48} className="mx-auto text-zinc-800 mb-6 group-hover:text-zinc-700 transition-colors" />
                <p className="text-zinc-700 font-black uppercase tracking-[0.3em] text-[10px]">Ecosystem currently devoid of contributors.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {contributors.map((contributor) => (
                <ContributorCard
                    key={contributor._id}
                    contributor={contributor}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
