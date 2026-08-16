"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { aboutApi } from "@/lib/api/about";
import type {
  About,
  AboutInput,
  CoreValue,
  OfferCategory,
} from "@/lib/types/about";
import { FiEye, FiTarget, FiSave, FiActivity } from "react-icons/fi";
import CoreValuesForm from "@/components/about/CoreValuesForm";
import WhatWeOfferForm from "@/components/about/WhatWeOfferForm";

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [formData, setFormData] = useState<AboutInput>({
    title: "",
    description: "",
    vision: "",
    mission: "",
    coreValues: [],
    whatWeOffer: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const result = await aboutApi.getAbout();
      if (result.success && result.data) {
        setAbout(result.data);
        setFormData({
          title: result.data.title || "",
          description: result.data.description || "",
          vision: result.data.vision,
          mission: result.data.mission,
          coreValues: result.data.coreValues || [],
          whatWeOffer: result.data.whatWeOffer || [],
        });
      }
    } catch (err: any) {
      toast.error("Telemetry link failed");
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

  const handleCoreValueChange = (
    index: number,
    field: keyof CoreValue,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.coreValues];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, coreValues: updated };
    });
  };

  const handleAddCoreValue = () => {
    setFormData((prev) => ({
      ...prev,
      coreValues: [
        ...prev.coreValues,
        { icon: "⭐", title: "", desc: "", bg: "bg-blue-100 text-blue-600" },
      ],
    }));
  };

  const handleRemoveCoreValue = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      coreValues: prev.coreValues.filter((_, i) => i !== index),
    }));
  };

  const handleOfferCategoryChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.whatWeOffer];
      updated[index] = { ...updated[index], section: value };
      return { ...prev, whatWeOffer: updated };
    });
  };

  const handleOfferItemChange = (
    categoryIndex: number,
    itemIndex: number,
    field: "title" | "icon",
    value: string
  ) => {
    setFormData((prev) => {
      const updatedCategories = [...prev.whatWeOffer];
      const updatedItems = [...updatedCategories[categoryIndex].items];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], [field]: value };
      updatedCategories[categoryIndex] = {
        ...updatedCategories[categoryIndex],
        items: updatedItems,
      };
      return { ...prev, whatWeOffer: updatedCategories };
    });
  };

  const handleAddOfferCategory = () => {
    setFormData((prev) => ({
      ...prev,
      whatWeOffer: [
        ...prev.whatWeOffer,
        {
          section: "New Offering",
          items: [{ icon: "✓", title: "Offer detail" }],
        },
      ],
    }));
  };

  const handleRemoveOfferCategory = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      whatWeOffer: prev.whatWeOffer.filter((_, i) => i !== index),
    }));
  };

  const handleAddOfferItem = (categoryIndex: number) => {
    setFormData((prev) => {
      const updatedCategories = [...prev.whatWeOffer];
      const items = [...updatedCategories[categoryIndex].items, { icon: "✓", title: "" }];
      updatedCategories[categoryIndex] = {
        ...updatedCategories[categoryIndex],
        items,
      };
      return { ...prev, whatWeOffer: updatedCategories };
    });
  };

  const handleRemoveOfferItem = (categoryIndex: number, itemIndex: number) => {
    setFormData((prev) => {
      const updatedCategories = [...prev.whatWeOffer];
      const items = updatedCategories[categoryIndex].items.filter(
        (_, i) => i !== itemIndex
      );
      updatedCategories[categoryIndex] = {
        ...updatedCategories[categoryIndex],
        items,
      };
      return { ...prev, whatWeOffer: updatedCategories };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tId = toast.loading("Commiting identity signature...");
    setSaving(true);

    try {
      if (about) {
        const result = await aboutApi.updateAbout(about._id, formData);
        if (result.success) {
          setAbout(result.data);
          toast.success("Vision recalibrated successfully!", { id: tId });
        }
      } else {
        const result = await aboutApi.createAbout(formData);
        if (result.success) {
          setAbout(result.data);
          toast.success("Institutional identity established!", { id: tId });
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Protocol failure", { id: tId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Processing Vision Protocol...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1700px] mx-auto pb-20 p-4 md:p-8 space-y-20">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Institutional</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Architect the fundamental purpose. Calibrate the mission, vision, and identity of your ecosystem.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="h-20 px-12 bg-white hover:bg-zinc-200 text-black rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all active:scale-95 flex items-center justify-center gap-5 shadow-2xl disabled:opacity-50"
        >
          {saving ? <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" /> : <FiSave size={24} />}
          {saving ? "SAVING..." : "COMMIT IDENTITY"}
        </button>
      </div>

      <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-700">
        {/* Hero Credentials */}


        {/* Editor Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Vision Container */}
          <div className="group relative bg-zinc-950/50 backdrop-blur-xl border border-zinc-900 rounded-[3rem] p-12 overflow-hidden hover:border-emerald-500/20 transition-all duration-500 hover:shadow-[0_0_80px_rgba(16,185,129,0.05)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full translate-x-32 -translate-y-32"></div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <FiEye size={24} />
                </div>
                <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">Future Projection</span>
              </div>

              <div className="space-y-4">
                <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-2">Vision Statement Payload</label>
                <textarea
                  name="vision"
                  value={formData.vision}
                  onChange={handleFieldChange}
                  placeholder="Enter the long-term vision of the ecosystem..."
                  rows={4}
                  className="w-full bg-transparent border-none focus:outline-none text-2xl font-black text-white placeholder:text-zinc-900 italic tracking-tight leading-relaxed scrollbar-hide"
                />
              </div>
            </div>
          </div>

          {/* Mission Container */}
          <div className="group relative bg-zinc-950/50 backdrop-blur-xl border border-zinc-900 rounded-[3rem] p-12 overflow-hidden hover:border-emerald-500/20 transition-all duration-500 hover:shadow-[0_0_80px_rgba(16,185,129,0.05)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full translate-x-32 -translate-y-32"></div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <FiTarget size={24} />
                </div>
                <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">Operational Mission</span>
              </div>

              <div className="space-y-4">
                <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-2">Mission Directive Payload</label>
                <textarea
                  name="mission"
                  value={formData.mission}
                  onChange={handleFieldChange}
                  placeholder="Enter the fundamental mission objective..."
                  rows={4}
                  className="w-full bg-transparent border-none focus:outline-none text-2xl font-black text-white placeholder:text-zinc-900 italic tracking-tight leading-relaxed scrollbar-hide"
                />
              </div>
            </div>
          </div>
        </div>

        <CoreValuesForm
          values={formData.coreValues}
          onAdd={handleAddCoreValue}
          onRemove={handleRemoveCoreValue}
          onChange={handleCoreValueChange}
        />

        <WhatWeOfferForm
          categories={formData.whatWeOffer}
          onAddCategory={handleAddOfferCategory}
          onRemoveCategory={handleRemoveOfferCategory}
          onCategoryChange={handleOfferCategoryChange}
          onAddItem={handleAddOfferItem}
          onRemoveItem={handleRemoveOfferItem}
          onItemChange={handleOfferItemChange}
        />

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full h-24 bg-white hover:bg-zinc-100 text-black rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-[0.96] group/btn"
        >
          {saving ? (
            <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
          ) : (
            <>
              <FiSave size={28} />
              <span>{about ? "SYNC ALL MODIFICATIONS" : "ESTABLISH INSTITUTIONAL IDENTITY"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
