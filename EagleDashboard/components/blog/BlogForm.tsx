"use client";

import { Blog } from "@/lib/types/blog";
import { FiX, FiSave, FiUpload, FiCheckCircle, FiType, FiPenTool, FiHash, FiImage, FiSettings, FiExternalLink } from "react-icons/fi";
import API_URL from "@/app/api/url";
import MarkdownEditor from "./MarkdownEditor";

interface BlogFormProps {
    formData: {
        title: string;
        content: string;
        author: string;
        slug: string;
        category: string;
        readTime: string;
        type: string;
        externalUrl: string;
    };
    editingBlog: Blog | null;
    saving: boolean;
    tagsInput: string;
    imagePreview: string | null;
    onReset: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTagsChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    fileRef: React.RefObject<HTMLInputElement | null>;
}

export default function BlogForm({
    formData,
    editingBlog,
    saving,
    tagsInput,
    imagePreview,
    onReset,
    onChange,
    onImageChange,
    onTagsChange,
    onSubmit,
    fileRef,
}: BlogFormProps) {
    const getImageUrl = (path: string) => {
        if (!path) return null;
        return path.startsWith("http") || path.startsWith("blob:") ? path : `${API_URL}/${path}`;
    };

    const previewSrc = imagePreview ? getImageUrl(imagePreview) : null;

    return (
        <div className="relative bg-zinc-950 shadow-[0_0_80px_rgba(16,185,129,0.1)] rounded-[3rem] overflow-hidden border border-zinc-800/50 mb-20 animate-in fade-in zoom-in-95 duration-500">
            {/* Dynamic Header */}
            <div className="bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-transparent px-12 py-10 border-b border-zinc-800/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl">
                        <FiPenTool size={32} className="text-emerald-500" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            {editingBlog ? "Refine Article" : "Draft Article"}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                            {editingBlog ? `REVISITING CONTEXT: ${editingBlog.title}` : "Establishing a New Narrative Axis"}
                        </p>
                    </div>
                </div>
                {editingBlog && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800 shadow-xl"
                    >
                        <FiX size={18} /> DISCARD DRAFT
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Content Columns */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Title Section */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiType size={12} className="text-emerald-500" /> Article Headline
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={onChange}
                                required
                                placeholder="Enter a compelling title..."
                                className="w-full text-3xl font-black bg-transparent border-b-2 border-zinc-800 focus:border-emerald-500/50 pb-4 text-white placeholder:text-zinc-800 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Manuscript Body</label>
                            <MarkdownEditor
                                value={formData.content}
                                onChange={(val) => onChange({ target: { name: 'content', value: val } } as any)}
                                placeholder="Write your story here... (Supports Markdown)"
                            />
                        </div>

                        {/* Secondary Config */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiHash size={12} /> Taxonomic Tags
                                </label>
                                <input
                                    type="text"
                                    value={tagsInput}
                                    onChange={(e) => onTagsChange(e.target.value)}
                                    placeholder="Tech, Future, Design"
                                    className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-7 py-5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-bold"
                                />
                                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest ml-2 italic">Separated by individual commas</p>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiSettings size={12} /> Publication Format
                                </label>
                                <div className="relative">
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={onChange}
                                        className="w-full appearance-none rounded-2xl bg-zinc-900 border border-zinc-800 px-7 py-5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-black"
                                    >
                                        <option value="standard">Standard Article</option>
                                        <option value="link">External Resource</option>
                                    </select>
                                    <div className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                                        ▼
                                    </div>
                                </div>
                            </div>
                        </div>

                        {formData.type === "link" && (
                            <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiExternalLink size={12} className="text-blue-500" /> Redirect Protocol (URL)
                                </label>
                                <input
                                    type="url"
                                    name="externalUrl"
                                    value={formData.externalUrl}
                                    onChange={onChange}
                                    placeholder="https://external-resource.com/post"
                                    className="w-full rounded-2xl bg-zinc-900 border-2 border-blue-500/20 px-7 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold"
                                />
                            </div>
                        )}
                    </div>

                    {/* Sidebar Columns */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Image Port */}
                        <div className="space-y-6">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] block text-center">Hero Visual</label>
                            <div className="relative group w-full">
                                <div className="aspect-[16/10] rounded-[2.5rem] bg-zinc-900 border-4 border-dashed border-zinc-800 group-hover:border-emerald-500/50 flex flex-col items-center justify-center transition-all overflow-hidden relative shadow-inner">
                                    {previewSrc ? (
                                        <>
                                            <img
                                                src={previewSrc}
                                                alt="Hero Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-zinc-950/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all flex-col gap-3 backdrop-blur-md">
                                                <FiImage className="text-white text-5xl animate-pulse" />
                                                <span className="text-white font-black text-[11px] uppercase tracking-[0.3em]">SWAP HERO ASSET</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-5 text-center px-6">
                                            <div className="w-20 h-20 rounded-[2rem] bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-800 group-hover:text-emerald-500 transition-colors shadow-2xl">
                                                <FiImage size={40} />
                                            </div>
                                            <span className="text-zinc-700 font-black text-[10px] uppercase tracking-[0.3em] leading-relaxed">DRAG OR DROP HERO VISUAL ASSET</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileRef}
                                        onChange={onImageChange}
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Metadata Cluster */}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Author Token</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={onChange}
                                    placeholder="System Admin"
                                    className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-6 py-4 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-bold text-xs"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Canonical Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={onChange}
                                    placeholder="automated-slug-gen"
                                    className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-6 py-4 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-bold text-xs"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={onChange}
                                        placeholder="Tech"
                                        className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-6 py-4 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-bold text-xs"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Estimation</label>
                                    <input
                                        type="text"
                                        name="readTime"
                                        value={formData.readTime}
                                        onChange={onChange}
                                        placeholder="5 min"
                                        className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-6 py-4 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-bold text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Launchpad */}
                        <div className="pt-10 border-t border-zinc-800/50">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full h-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 hover:from-emerald-500 hover:to-teal-500 disabled:from-zinc-900 disabled:to-zinc-900 active:scale-[0.96] text-white rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-[0_10px_40px_rgba(16,185,129,0.3)] relative group/btn"
                            >
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                {saving ? (
                                    <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        {editingBlog ? <FiCheckCircle size={28} /> : <FiSave size={28} />}
                                        <span className="relative z-10">{editingBlog ? "COMMIT UPDATE" : "PUBLISH MANUSCRIPT"}</span>
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
