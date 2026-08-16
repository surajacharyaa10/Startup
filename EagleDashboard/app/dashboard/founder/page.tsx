"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Founder, FounderFormData, SocialLink } from "@/lib/types/founder";
import { founderApi } from "@/lib/api/founder";
import FounderForm from "@/components/founder/FounderForm";
import FounderView from "@/components/founder/FounderView";
import { FiUser } from "react-icons/fi";

export default function FounderPage() {
  const [founder, setFounder] = useState<Founder | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FounderFormData>({
    name: "",
    position: "",
    quote: "",
    details: "",
    socials: [],
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    fetchFounder();
  }, []);

  const fetchFounder = async () => {
    try {
      const data = await founderApi.getFounder();
      if (data.success && data.data) {
        setFounder(data.data);
        setFormData({
          name: data.data.name,
          position: data.data.position,
          quote: data.data.quote,
          details: data.data.details,
          socials: data.data.socials || [],
        });
      } else {
        setIsCreating(true);
      }
    } catch (error) {
      console.error("Error fetching founder:", error);
      setIsCreating(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
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

  const handleSocialChange = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.socials];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, socials: updated };
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const tId = toast.loading("Initializing profile...");
    try {
      const data = await founderApi.createFounder(formData, avatarFile);
      if (data.success) {
        setFounder(data.data);
        setIsCreating(false);
        setAvatarFile(null);
        toast.success("Founder profile initialized!", { id: tId });
      }
    } catch (error: any) {
      toast.error(error.message || "Initialization failed", { id: tId });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!founder) return;
    const tId = toast.loading("Committing changes...");
    try {
      const data = await founderApi.updateFounder(
        founder._id,
        formData,
        avatarFile
      );
      if (data.success) {
        setFounder(data.data);
        setIsEditing(false);
        setAvatarFile(null);
        toast.success("Matrix updated successfully!", { id: tId });
      }
    } catch (error: any) {
      toast.error(error.message || "Update failed", { id: tId });
    }
  };

  const handleDelete = async () => {
    if (!founder) return;

    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-zinc-900 text-sm uppercase font-black italic">
          Purge founder identity from matrix?
        </p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const t2 = toast.loading("Purging identity...");
              try {
                const data = await founderApi.deleteFounder(founder._id);
                if (data.success) {
                  setFounder(null);
                  setIsCreating(true);
                  toast.success("Profile purged.", { id: t2 });
                }
              } catch (error: any) {
                toast.error(error.message || "Purge failed", { id: t2 });
              }
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            CONFIRM PURGE
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-zinc-200 text-zinc-800 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            ABORT
          </button>
        </div>
      </div>
    ));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarFile(null);
    if (founder) {
      setFormData({
        name: founder.name,
        position: founder.position,
        quote: founder.quote,
        details: founder.details,
        socials: founder.socials || [],
        whatsapp: founder.whatsapp || "",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">
          Scanning User Information...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto pb-20 p-4 md:p-8">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">
              Identity
            </h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Command your digital presence. Define the origin point of your
            strategic vision.
          </p>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
        {isCreating || isEditing ? (
          <FounderForm
            formData={formData}
            isCreating={isCreating}
            onSubmit={isCreating ? handleCreate : handleUpdate}
            onChange={handleInputChange}
            onFileChange={handleFileChange}
            onSocialChange={handleSocialChange}
            onAddSocial={handleAddSocial}
            onRemoveSocial={handleRemoveSocial}
            onCancel={!isCreating ? handleCancel : undefined}
          />
        ) : founder ? (
          <FounderView
            founder={founder}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="bg-zinc-950 border-4 border-dashed border-zinc-900 rounded-[4rem] p-32 text-center">
            <div className="w-24 h-24 bg-zinc-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-zinc-800 shadow-2xl">
              <FiUser size={48} className="text-zinc-800" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">
              Origin Missing
            </h3>
            <p className="text-zinc-500 font-bold max-w-sm mx-auto text-sm leading-relaxed uppercase tracking-[0.2em]">
              The system requires a founder identity to establish authority.
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="mt-10 px-10 py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40"
            >
              INITIALIZE ORIGIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
