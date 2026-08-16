"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { blogsApi } from "@/lib/api/blogs";
import type { Blog } from "@/lib/types/blog";
import BlogForm from "@/components/blog/BlogForm";
import BlogList from "@/components/blog/BlogList";
import { FiPlus } from "react-icons/fi";
import API_URL from "@/app/api/url";

/* ---------------------------
   NORMALIZE MONGO EXTENDED JSON
---------------------------- */
function normalizeBlog(raw: any): Blog {
  return {
    _id: raw._id?.$oid || raw._id,
    title: raw.title,
    content: raw.content,
    image: raw.image,
    publicId: raw.publicId,
    author: raw.author,
    slug: raw.slug,
    tags: raw.tags || [],
    category: raw.category,
    readTime: raw.readTime,
    views: raw.views || 0,
    type: raw.type || "standard",
    externalUrl: raw.externalUrl || "",
    createdAt:
      raw.createdAt?.$date || raw.createdAt || new Date().toISOString(),
  };
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    slug: "",
    category: "",
    readTime: "",
    type: "standard",
    externalUrl: "",
  });

  const [tagsInput, setTagsInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ---------------------------
      LOAD BLOGS
  ---------------------------- */
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await blogsApi.getAll();
      const normalized = data.map((b: any) => normalizeBlog(b));
      setBlogs(normalized);
    } catch (err: any) {
      toast.error(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------
      RESET FORM
  ---------------------------- */
  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      author: "",
      slug: "",
      category: "",
      readTime: "",
      type: "standard",
      externalUrl: "",
    });
    setTagsInput("");
    setImageFile(null);
    setImagePreview(null);
    setEditingBlog(null);
    setShowForm(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  /* ---------------------------
      FORM CHANGE HANDLERS
  ---------------------------- */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* ---------------------------
      EDIT BLOG
  ---------------------------- */
  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author || "",
      slug: blog.slug || "",
      category: blog.category || "",
      readTime: blog.readTime || "",
      type: blog.type || "standard",
      externalUrl: blog.externalUrl || "",
    });

    setTagsInput((blog.tags || []).join(", "));
    setImagePreview(blog.image || null);
    setImageFile(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (fileRef.current) fileRef.current.value = "";
  };

  /* ---------------------------
      DELETE BLOG
  ---------------------------- */
  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-zinc-900 text-sm">Delete this blog?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await blogsApi.delete(id);
                setBlogs((prev) => prev.filter((b) => b._id !== id));
                toast.success("Blog deleted successfully");
              } catch (err: any) {
                toast.error(err.message || "Failed to delete blog");
              }
            }}
            className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold"
          >
            Delete
          </button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-zinc-200 text-zinc-800 px-3 py-1 rounded text-xs font-bold">Cancel</button>
        </div>
      </div>
    ));
  };

  /* ---------------------------
      SUBMIT (CREATE / UPDATE)
  ---------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingBlog && !imageFile) {
      toast.error("Image is required");
      return;
    }

    setSaving(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    if (tagsInput.trim()) {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      form.append("tags", JSON.stringify(tags));
    }

    if (imageFile) form.append("image", imageFile);

    try {
      let result;
      if (editingBlog) {
        result = await blogsApi.update(editingBlog._id, form);
      } else {
        result = await blogsApi.create(form);
      }

      if (result.success) {
        const normalized = normalizeBlog(result.data);
        setBlogs((prev) =>
          editingBlog
            ? prev.map((b) => (b._id === editingBlog._id ? normalized : b))
            : [...prev, normalized]
        );
        toast.success(editingBlog ? "Blog updated successfully!" : "Blog created successfully!");
      }
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Processing Narratives...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto pb-20 p-4 md:p-8">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-20">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-emerald-600 rounded-full"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Blogposts</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Architect your brand voice. Design narratives that resonate across the digital frontier.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`h-20 px-12 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all active:scale-95 flex items-center justify-center gap-5 shadow-2xl border-2 ${showForm
              ? "bg-zinc-950 text-zinc-500 border-zinc-800 hover:bg-zinc-900"
              : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-transparent hover:brightness-110 shadow-emerald-500/20"
            }`}
        >
          {showForm ? <FiPlus className="rotate-45" size={24} /> : <FiPlus size={24} />}
          {showForm ? "Close Press" : "New Narrative"}
        </button>
      </div>

      {showForm && (
        <BlogForm
          formData={formData}
          editingBlog={editingBlog}
          saving={saving}
          tagsInput={tagsInput}
          imagePreview={imagePreview}
          onReset={resetForm}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onTagsChange={setTagsInput}
          onSubmit={handleSubmit}
          fileRef={fileRef}
        />
      )}

      <BlogList
        blogs={blogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
