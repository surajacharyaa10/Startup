"use client";

import { FounderFormData, SocialLink } from "@/lib/types/founder";
import { FiSave, FiX, FiUser, FiZap, FiMessageSquare, FiInfo, FiUpload, FiTrash2, FiPlus, FiPhone } from "react-icons/fi";

interface FounderFormProps {
  formData: FounderFormData;
  isCreating: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSocialChange: (index: number, field: keyof SocialLink, value: string) => void;
  onAddSocial: () => void;
  onRemoveSocial: (index: number) => void;
  onCancel?: () => void;
}

export default function FounderForm({
  formData,
  isCreating,
  onSubmit,
  onChange,
  onFileChange,
  onSocialChange,
  onAddSocial,
  onRemoveSocial,
  onCancel,
}: FounderFormProps) {
  // ... (header code remains same) ...

  return (
    <div className="bg-zinc-950 shadow-[0_0_80px_rgba(37,99,235,0.1)] rounded-[3rem] overflow-hidden border border-zinc-800/50 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent px-12 py-10 border-b border-zinc-800/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl">
            <FiUser size={32} className="text-blue-500" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
              {isCreating ? "Establish Origin" : "Update Matrix"}
            </h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
              Founder Profile Identification System
            </p>
          </div>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800 shadow-xl"
          >
            <FiX size={18} /> ABORT RECONFIG
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Core Identity */}
          <div className="space-y-12">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <FiUser size={12} className="text-blue-500" /> Full Legal Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                placeholder="Enter founder full name..."
                className="w-full text-2xl font-black bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-black"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <FiZap size={12} className="text-blue-500" /> Professional Designation
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={onChange}
                required
                placeholder="e.g. CEO & VISIONARY ARCHITECT"
                className="w-full text-lg font-black bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-black uppercase"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <FiPhone size={12} className="text-blue-500" /> WhatsApp / Phone
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp || ""}
                onChange={onChange}
                placeholder="e.g. +977 9800000000"
                className="w-full text-lg font-black bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-black"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <FiMessageSquare size={12} className="text-blue-500" /> Core Vision Statement
              </label>
              <textarea
                name="quote"
                value={formData.quote}
                onChange={onChange}
                required
                rows={3}
                placeholder="Enter an inspirational vision statement..."
                className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-8 py-6 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium leading-relaxed italic"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <FiInfo size={12} className="text-blue-500" /> Detailed Strategic Dossier
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={onChange}
                required
                rows={6}
                placeholder="Comprehensive background and strategic objectives..."
                className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-8 py-6 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium leading-relaxed"
              />
            </div>
          </div>

          {/* Right Column: Transmission & Channels */}
          <div className="space-y-12">
            <div className="space-y-8">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] block text-center">Identity Visual Asset</label>
              <div className="relative group w-full">
                <div className="aspect-[4/5] max-w-sm mx-auto rounded-[3rem] bg-zinc-900 border-4 border-dashed border-zinc-800 group-hover:border-blue-500/50 flex flex-col items-center justify-center transition-all overflow-hidden relative shadow-inner">
                  <div className="flex flex-col items-center gap-5 text-center px-8">
                    <div className="w-20 h-20 rounded-[2rem] bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-800 group-hover:text-blue-500 transition-colors shadow-2xl">
                      <FiUpload size={40} />
                    </div>
                    <span className="text-zinc-700 font-black text-[10px] uppercase tracking-[0.3em] leading-relaxed">DRAG OR DROP NEW IDENTITY VISUAL</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                </div>
              </div>
              <p className="text-center text-[9px] text-zinc-700 font-black uppercase tracking-widest">Supports highly quantized JPG/PNG/WEBP assets</p>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Communication Channels</label>
                <button
                  type="button"
                  onClick={onAddSocial}
                  className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 rounded-lg p-2 transition-colors"
                >
                  <FiPlus size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {formData.socials.map((social, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(e) => onSocialChange(index, "platform", e.target.value)}
                      placeholder="Platform"
                      className="w-1/3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs font-bold uppercase placeholder:text-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    />
                    <input
                      type="text"
                      value={social.url}
                      onChange={(e) => onSocialChange(index, "url", e.target.value)}
                      placeholder="URL / Handle"
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs font-medium placeholder:text-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveSocial(index)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl px-3 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}

                {formData.socials.length === 0 && (
                  <div className="text-center p-6 border border-zinc-800 rounded-2xl bg-zinc-900/50">
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">No active channels</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-10">
              <button
                type="submit"
                className="w-full h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 hover:from-blue-500 hover:to-indigo-500 text-white rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-[0_10px_40px_rgba(37,99,235,0.3)] active:scale-[0.96] group/btn relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                <FiSave size={28} />
                <span className="relative z-10">{isCreating ? "INITIALIZE PROFILE" : "COMMIT CHANGES"}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
