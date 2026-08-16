"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { contributorsApi } from "@/lib/api/contributors";
import type { Contributor } from "@/lib/types/contributor";
import ContributorForm from "@/components/contributors/ContributorForm";
import ContributorList from "@/components/contributors/ContributorList";
import { FiPlus, FiUsers, FiActivity } from "react-icons/fi";
import API_URL from "@/app/api/url";

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    contributions: 0,
    github: "",
    linkedin: "",
    twitter: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [editingContributor, setEditingContributor] =
    useState<Contributor | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchContributors();
  }, []);

  const fetchContributors = async () => {
    try {
      const data = await contributorsApi.getContributors();
      setContributors(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast.error("Telemetry link failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      contributions: 0,
      github: "",
      linkedin: "",
      twitter: "",
    });
    setAvatarFile(null);
    setAvatarPreview(null);
    setEditingContributor(null);
    setShowForm(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "contributions" ? Number(value) || 0 : value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (contributor: Contributor) => {
    setEditingContributor(contributor);
    setFormData({
      name: contributor.name,
      role: contributor.role,
      contributions: contributor.contributions,
      github: contributor.github || "",
      linkedin: contributor.linkedin || "",
      twitter: contributor.twitter || "",
    });
    setAvatarPreview(contributor.avatar || null);
    setAvatarFile(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-black text-zinc-900 text-sm uppercase italic">Purge this digital legacy?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const tid = toast.loading("Executing data purge...");
              try {
                await contributorsApi.deleteContributor(id);
                setContributors((prev) => prev.filter((c) => c._id !== id));
                toast.success("Legacy purged.", { id: tid });
              } catch (err: any) {
                toast.error("Purge failure.", { id: tid });
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
    const tid = toast.loading("Recording community brilliance...");
    setSaving(true);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("role", formData.role);
    payload.append("contributions", String(formData.contributions ?? 0));
    if (formData.github) payload.append("github", formData.github);
    if (formData.linkedin) payload.append("linkedin", formData.linkedin);
    if (formData.twitter) payload.append("twitter", formData.twitter);
    if (avatarFile) payload.append("avatar", avatarFile);

    try {
      if (editingContributor) {
        const result = await contributorsApi.updateContributor(
          editingContributor._id,
          payload
        );
        if (result.success) {
          setContributors((prev) =>
            prev.map((c) =>
              c._id === editingContributor._id ? result.data : c
            )
          );
          toast.success("Identity recalibrated.", { id: tid });
        }
      } else {
        const result = await contributorsApi.createContributor(payload);
        if (result.success) {
          setContributors((prev) => [...prev, result.data]);
          toast.success("Legacy recorded.", { id: tid });
        }
      }
      resetForm();
    } catch (err: any) {
      toast.error("Process failure", { id: tid });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Sampling Ecosystem Talent...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1700px] mx-auto pb-20 p-4 md:p-8 space-y-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Legacy</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Network orchestration. Manage the community brilliance and digital fingerprints driving the ecosystem forward.
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
          {showForm ? "Close Interface" : "New Talent"}
        </button>
      </div>

      {showForm && (
        <ContributorForm
          formData={formData}
          editingContributor={editingContributor}
          saving={saving}
          avatarPreview={avatarPreview}
          onReset={resetForm}
          onChange={handleChange}
          onAvatarChange={handleAvatarChange}
          onSubmit={handleSubmit}
        />
      )}

      <div className="space-y-12">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
            <FiUsers size={24} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Talent Grid</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
          <div className="flex items-center gap-3">
            <FiActivity className="text-zinc-500 animate-pulse" size={16} />
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{contributors.length} ACTIVE NODES</span>
          </div>
        </div>

        <ContributorList
          contributors={contributors}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
