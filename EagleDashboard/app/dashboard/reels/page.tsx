"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { reelsApi } from "@/lib/api/reels";
import type { Reel } from "@/lib/types/reel";
import ReelCard from "@/components/reels/ReelCard";
import ReelForm from "@/components/reels/ReelForm";
import { FiVideo, FiActivity } from "react-icons/fi";

export default function ReelsPage() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadReels();
  }, []);

  const loadReels = async () => {
    try {
      const data = await reelsApi.getAll();
      setReels(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load reels");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setVideoFile(null);
    setVideoPreview(null);
    setShowForm(false);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      toast.error("MISSING DATA FRAGMENT: SELECT VIDEO");
      return;
    }
    const tId = toast.loading("INITIATING CONTENT STREAM...");
    setSaving(true);

    const form = new FormData();
    form.append("title", title);
    form.append("video", videoFile);

    try {
      const result = await reelsApi.create(form);
      if (result.success) {
        setReels((prev) => [...prev, result.data]);
        toast.success("TRANSMISSION COMPLETE.", { id: tId });
        resetForm();
      }
    } catch (err: any) {
      toast.error(err.message || "UPLINK FAILED", { id: tId });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-black text-zinc-900 text-sm uppercase italic">Purge this data fragment?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const t2 = toast.loading("Executing purge...");
              try {
                await reelsApi.delete(id);
                setReels((prev) => prev.filter((r) => r._id !== id));
                toast.success("Data purged.", { id: t2 });
              } catch (err: any) {
                toast.error(err.message || "Purge failed", { id: t2 });
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Scanning Content Database...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1700px] mx-auto pb-20 p-4 md:p-8 space-y-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Fragments</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Short-form strategic content. Manage high-impact video reels for the global network.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="h-20 px-12 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2.5rem] transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-4"
          >
            INITIALIZE UPLINK
          </button>
        )}
      </div>

      <div className="space-y-16">
        {showForm && (
          <div className="animate-in fade-in slide-in-from-top-10 duration-500">
            <ReelForm
              title={title}
              onTitleChange={setTitle}
              onVideoChange={handleVideoChange}
              videoPreview={videoPreview}
              saving={saving}
              onReset={resetForm}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {/* Dynamic Controls / Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-zinc-950/50 backdrop-blur-xl border border-zinc-900 rounded-[3rem] p-10">
          <div className="flex items-center gap-6">
            <div className="h-16 px-8 rounded-2xl bg-blue-600 flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/10">
              ACTIVE FRAGMENTS
              <span className="px-2 py-1 bg-white/20 rounded-lg text-[8px]">{reels.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiActivity className="text-blue-500" size={18} />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Signal Continuity: 100%</span>
          </div>
        </div>

        {/* Reels Grid */}
        <div className="space-y-10">
          {reels.length === 0 ? (
            <div className="text-center py-40 bg-zinc-950/30 rounded-[4rem] border-4 border-dashed border-zinc-900/50">
              <FiVideo size={48} className="mx-auto text-zinc-800 mb-6" />
              <p className="text-zinc-700 font-black uppercase tracking-[0.3em]">No fragment signatures detected.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {reels.map((reel) => (
                <div key={reel._id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <ReelCard
                    reel={reel}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

