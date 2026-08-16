"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { testimonialsApi } from "@/lib/api/testimonials";
import type { Testimonial } from "@/lib/types/testimonial";
import TestimonialForm from "@/components/testimonials/TestimonialForm";
import TestimonialList from "@/components/testimonials/TestimonialList";
import { FiPlus, FiMessageSquare, FiActivity } from "react-icons/fi";
import API_URL from "@/app/api/url";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState({
    name: "", role: "", company: "", content: "", rating: 5, featured: false,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialsApi.getTestimonials();
      setTestimonials(data);
    } catch (err: any) {
      toast.error("Telemetry link failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", role: "", company: "", content: "", rating: 5, featured: false });
    setEditingTestimonial(null);
    setSelectedImage(null);
    setImagePreview(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name, role: testimonial.role, company: testimonial.company || "",
      content: testimonial.content, rating: testimonial.rating, featured: testimonial.featured,
    });
    if (testimonial.image) {
      setImagePreview(testimonial.image.startsWith('/uploads') ? `${API_URL}${testimonial.image}` : testimonial.image);
    }
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-black text-zinc-900 text-sm uppercase italic">Decommission this testimony?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const tid = toast.loading("Executing decommissioning...");
              try {
                await testimonialsApi.deleteTestimonial(id);
                setTestimonials((prev) => prev.filter((t) => t._id !== id));
                toast.success("Testimony decoupled.", { id: tid });
              } catch (err: any) {
                toast.error("Process aborted.", { id: tid });
              }
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            CONFIRM
          </button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-zinc-200 text-zinc-800 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">ABORT</button>
        </div>
      </div>
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tid = toast.loading("Synthesizing partner feedback...");
    setSaving(true);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => fd.append(key, String(value)));
    if (selectedImage) fd.append("image", selectedImage);

    try {
      if (editingTestimonial) {
        const result = await testimonialsApi.updateTestimonial(editingTestimonial._id, fd);
        if (result.success) {
          setTestimonials((prev) => prev.map((t) => (t._id === editingTestimonial._id ? result.data : t)));
          toast.success("Feedback recalibrated.", { id: tid });
        }
      } else {
        const result = await testimonialsApi.createTestimonial(fd);
        if (result.success) {
          setTestimonials((prev) => [...prev, result.data]);
          toast.success("Feedback synchronized.", { id: tid });
        }
      }
      resetForm();
    } catch (err: any) {
      toast.error("Synthesis failed.", { id: tid });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Harvesting Network Signals...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1700px] mx-auto pb-20 p-4 md:p-8 space-y-24">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Feedback</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Validation matrix. Curate and optimize digital endorsements and partner perspectives from the global network.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`h-20 px-12 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all active:scale-95 flex items-center justify-center gap-5 shadow-2xl border-2 ${showForm
            ? "bg-zinc-950 text-zinc-500 border-zinc-800 hover:bg-zinc-900"
            : "bg-white text-black border-transparent hover:bg-zinc-200"
            }`}
        >
          {showForm ? <FiPlus className="rotate-45" size={24} /> : <FiPlus size={24} />}
          {showForm ? "Close Interface" : "New Testimony"}
        </button>
      </div>

      {showForm && (
        <TestimonialForm
          formData={formData}
          editingTestimonial={editingTestimonial}
          saving={saving}
          imagePreview={imagePreview}
          onReset={resetForm}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          fileInputRef={fileInputRef}
        />
      )}

      <div className="space-y-12">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
            <FiMessageSquare size={24} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Voice Grid</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
          <div className="flex items-center gap-3">
            <FiActivity className="text-zinc-500 animate-pulse" size={16} />
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{testimonials.length} VERIFIED SIGNALS</span>
          </div>
        </div>

        <TestimonialList
          testimonials={testimonials}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
