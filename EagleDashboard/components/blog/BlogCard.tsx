"use client";

import { Blog } from "@/lib/types/blog";
import { FiEdit2, FiTrash2, FiCalendar, FiUser, FiClock, FiTag, FiExternalLink } from "react-icons/fi";
import API_URL from "@/app/api/url";

interface BlogCardProps {
    blog: Blog;
    onEdit: (blog: Blog) => void;
    onDelete: (id: string) => void;
}

export default function BlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
    const getImageUrl = (path: string) => {
        if (!path) return null;
        return path.startsWith("http") ? path : `${API_URL}/${path}`;
    };

    const articleImage = getImageUrl(blog.image);
    const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] overflow-hidden hover:bg-zinc-800/60 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 flex flex-col h-full">
            {/* Cover Image */}
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-60"></div>
                {articleImage ? (
                    <img
                        src={articleImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <FiGrid size={40} className="text-zinc-700" />
                    </div>
                )}

                {/* Category Badge */}
                {blog.category && (
                    <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                            {blog.category}
                        </span>
                    </div>
                )}

                {/* Type Icon */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="w-8 h-8 rounded-full bg-zinc-950/80 backdrop-blur-md flex items-center justify-center text-white border border-zinc-800">
                        {blog.type === "link" ? <FiExternalLink size={14} /> : <FiClock size={14} />}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                    <span className="flex items-center gap-1.5">
                        <FiCalendar className="text-emerald-500" /> {formattedDate}
                    </span>
                    {blog.readTime && (
                        <span className="flex items-center gap-1.5">
                            <FiClock className="text-emerald-500" /> {blog.readTime}
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight mb-3">
                    {blog.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {blog.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="flex items-center gap-1 px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                            <FiTag size={10} /> {tag}
                        </span>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between border-t border-zinc-800/50 pt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                            <FiUser size={12} className="text-zinc-500" />
                        </div>
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest truncate max-w-[80px]">
                            {blog.author || "Global"}
                        </span>
                    </div>

                    <div className="flex gap-1.5 translate-x-2 group-hover:translate-x-0 transition-transform">
                        <button
                            onClick={() => onEdit(blog)}
                            className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-yellow-400 hover:bg-zinc-700 transition-all"
                            title="Quick Edit"
                        >
                            <FiEdit2 size={14} />
                        </button>
                        <button
                            onClick={() => onDelete(blog._id)}
                            className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-all"
                            title="Delete Permanently"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { FiGrid } from "react-icons/fi";
