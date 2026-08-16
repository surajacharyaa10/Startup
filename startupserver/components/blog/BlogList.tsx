"use client";

import { Blog } from "@/lib/types/blog";
import BlogCard from "./BlogCard";
import { FiFeather, FiTrendingUp } from "react-icons/fi";

interface BlogListProps {
    blogs: Blog[];
    onEdit: (blog: Blog) => void;
    onDelete: (id: string) => void;
}

export default function BlogList({ blogs, onEdit, onDelete }: BlogListProps) {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
            {/* List Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-10">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-4xl shadow-2xl shadow-emerald-500/20">
                        <FiFeather className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            Editorial Central
                        </h2>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em] mt-1">
                            Curate. Publish. Inspire.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-inner">
                    <FiTrendingUp className="text-emerald-500" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">
                        {blogs.length} TOTAL ARTICLES
                    </span>
                </div>
            </div>

            {blogs.length === 0 ? (
                <div className="bg-zinc-950 border-4 border-dashed border-zinc-900 rounded-[4rem] p-32 text-center">
                    <div className="w-24 h-24 bg-zinc-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-zinc-800 shadow-2xl">
                        <FiFeather size={48} className="text-zinc-800" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Your Pen is Silent</h3>
                    <p className="text-zinc-500 font-bold max-w-sm mx-auto text-sm leading-relaxed uppercase tracking-[0.2em]">Start your storytelling journey by creating your first article today.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
