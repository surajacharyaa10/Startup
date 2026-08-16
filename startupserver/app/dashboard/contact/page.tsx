"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { contactApi } from "@/lib/api/contact";
import type { Contact, ContactInput, SocialLink } from "@/lib/types/contact";
import { FiSave, FiMapPin, FiMail, FiPhone, FiGlobe, FiTrash2, FiPlus, FiLink, FiMessageSquare } from "react-icons/fi";

const SOCIAL_PLATFORMS = [
  "LinkedIn",
  "Twitter",
  "Facebook",
  "Instagram",
  "GitHub",
  "YouTube",
  "Medium",
  "Website"
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactInput>({
    address: "",
    email: "",
    phone: "",
    whatsapp: "",
    socials: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const result = await contactApi.getContact();
      if (result.success && result.data) {
        setFormData({
          address: result.data.address || "",
          email: result.data.email || "",
          phone: result.data.phone || "",
          whatsapp: result.data.whatsapp || "",
          socials: result.data.socials || [],
        });
      }
    } catch (err: any) {
      toast.error("Failed to load contact info");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "LinkedIn", url: "" }],
    }));
  };

  const handleRemoveSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  };

  const handleSocialChange = (index: number, field: keyof SocialLink, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.socials];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, socials: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tId = toast.loading("Updating secure communication channels...");
    setSaving(true);

    try {
      const result = await contactApi.updateContact(formData);
      if (result.success) {
        toast.success("Channels secured successfully!", { id: tId });
      }
    } catch (err: any) {
      toast.error(err.message || "Transmission failed", { id: tId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Establishing Uplink...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto pb-20 p-4 md:p-8 space-y-12">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">Communcations</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic ml-6">
            Manage public-facing contact vectors and digital presence coordinates.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="h-16 px-10 bg-white hover:bg-zinc-200 text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 flex items-center justify-center gap-4 shadow-2xl disabled:opacity-50"
        >
          {saving ? <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin" /> : <FiSave size={20} />}
          {saving ? "SECURING..." : "SAVE COORDINATES"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Contact Info */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-10 space-y-8">
          <div className="flex items-center gap-4 pb-6 border-b border-zinc-900">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-500">
              <FiMapPin size={24} />
            </div>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Physical & Direct</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2">Headquarters Address</label>
              <div className="relative group">
                <FiMapPin className="absolute top-4 left-4 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleFieldChange}
                  rows={3}
                  placeholder="123 Innovation Blvd, Tech City, Sector 7"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 pl-12 text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-900 transition-all font-medium text-sm resize-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2">Official Email Frequency</label>
              <div className="relative group">
                <FiMail className="absolute top-1/2 -translate-y-1/2 left-4 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFieldChange}
                  placeholder="contact@eagleinfotech.com"
                  className="w-full h-14 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 pl-12 text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-900 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2">Direct Line</label>
              <div className="relative group">
                <FiPhone className="absolute top-1/2 -translate-y-1/2 left-4 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFieldChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-14 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 pl-12 text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-900 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2">WhatsApp Line</label>
              <div className="relative group">
                <FiMessageSquare className="absolute top-1/2 -translate-y-1/2 left-4 text-zinc-600 group-focus-within:text-green-500 transition-colors" />
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp || ""}
                  onChange={handleFieldChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-14 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 pl-12 text-white placeholder:text-zinc-700 focus:outline-none focus:border-green-500/50 focus:bg-zinc-900 transition-all font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-10 flex flex-col">
          <div className="flex items-center justify-between pb-6 border-b border-zinc-900 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-500">
                <FiGlobe size={24} />
              </div>
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Digital Uplinks</h3>
            </div>
            <button
              type="button"
              onClick={handleAddSocial}
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-colors flex items-center justify-center"
            >
              <FiPlus />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {formData.socials.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-zinc-900 rounded-2xl text-zinc-600 gap-4">
                <FiLink size={24} />
                <span className="text-xs uppercase tracking-widest font-black">No uplinks active</span>
              </div>
            ) : (
              formData.socials.map((social, index) => (
                <div key={index} className="group flex gap-4 items-start p-4 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-all">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs md:text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50 transition-all font-bold uppercase"
                      placeholder="PLATFORM NAME"
                    />
                    <input
                      type="text"
                      value={social.url}
                      onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                      placeholder="https://"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs md:text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveSocial(index)}
                    className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500 hover:text-red-500 hover:border-red-500/30 transition-all"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
