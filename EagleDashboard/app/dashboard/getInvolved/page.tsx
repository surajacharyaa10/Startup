"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getInvolvedApi } from "@/lib/api/getInvolved";
import type { GetInvolved, GetInvolvedInput } from "@/lib/types/getInvolved";
import InvolvementForm from "@/components/getInvolved/InvolvementForm";
import InvolvementList from "@/components/getInvolved/InvolvementList";
import { FiPlus, FiBox } from "react-icons/fi";

const involvementTypes = [
  { id: "volunteer", label: "Volunteer", icon: "🙋" },
  { id: "contribute", label: "Contribute", icon: "💻" },
  { id: "careers", label: "Careers", icon: "💼" },
] as const;

const jobTypes = ["Full-time", "Part-time", "Contract"];

export default function GetInvolvedPage() {
  const [options, setOptions] = useState<GetInvolved[]>([]);
  const [formData, setFormData] = useState<GetInvolvedInput>({
    title: "",
    description: "",
    category: "volunteer",
    link: "",
    department: "",
    location: "",
    jobType: "",
    applyLink: "",
    benefits: [],
    requirements: [],
    featured: false,
  });
  const [editingOption, setEditingOption] = useState<GetInvolved | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [benefitsInput, setBenefitsInput] = useState("");
  const [requirementsInput, setRequirementsInput] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const data = await getInvolvedApi.getOptions();
      setOptions(data);
    } catch (err: any) {
      toast.error("Telemetry link failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "volunteer",
      link: "",
      department: "",
      location: "",
      jobType: "",
      applyLink: "",
      benefits: [],
      requirements: [],
      featured: false,
    });
    setEditingOption(null);
    setBenefitsInput("");
    setRequirementsInput("");
    setIconFile(null);
    setIconPreview(null);
    setShowForm(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEdit = (option: GetInvolved) => {
    setEditingOption(option);
    setFormData({
      title: option.title,
      description: option.description,
      category: option.category,
      link: option.link || "",
      department: option.department || "",
      location: option.location || "",
      jobType: option.jobType || "",
      applyLink: option.applyLink || "",
      benefits: option.benefits,
      requirements: option.requirements,
      featured: option.featured,
    });
    setBenefitsInput(option.benefits.join(", "));
    setRequirementsInput(option.requirements.join(", "));
    setIconPreview(option.icon || null);
    setIconFile(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-black text-zinc-900 text-sm uppercase italic">Decouple this opportunity?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const tid = toast.loading("Executing decoupling...");
              try {
                await getInvolvedApi.deleteOption(id);
                setOptions((prev) => prev.filter((o) => o._id !== id));
                toast.success("Opportunity decoupled.", { id: tid });
              } catch (err: any) {
                toast.error("Decoupling failed.", { id: tid });
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
    const tid = toast.loading("Synthesizing opportunity...");
    setSaving(true);

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("category", formData.category);
    fd.append("featured", String(formData.featured));
    fd.append(
      "benefits",
      JSON.stringify(
        benefitsInput
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean)
      )
    );
    fd.append(
      "requirements",
      JSON.stringify(
        requirementsInput
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean)
      )
    );

    if (formData.link) fd.append("link", formData.link);
    if (iconFile) fd.append("iconImage", iconFile);

    if (formData.category === "careers") {
      if (formData.department) fd.append("department", formData.department);
      if (formData.location) fd.append("location", formData.location);
      if (formData.jobType) fd.append("jobType", formData.jobType);
      if (formData.applyLink) fd.append("applyLink", formData.applyLink);
    }

    try {
      if (editingOption) {
        const result = await getInvolvedApi.updateOption(editingOption._id, fd);
        if (result.success) {
          setOptions((prev) =>
            prev.map((o) => (o._id === editingOption._id ? result.data : o))
          );
          toast.success("Opportunity recalibrated.", { id: tid });
        }
      } else {
        const result = await getInvolvedApi.createOption(fd);
        if (result.success) {
          setOptions((prev) => [...prev, result.data]);
          toast.success("Opportunity initialized.", { id: tid });
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
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Mapping Opportunity Grid...</p>
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
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Involvement</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Network expansion. Architect volunteer roles, contributions, and career trajectories within the ecosystem.
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
          {showForm ? "Close Interface" : "New Opportunity"}
        </button>
      </div>

      {showForm && (
        <InvolvementForm
          formData={formData}
          editingOption={editingOption}
          saving={saving}
          benefitsInput={benefitsInput}
          requirementsInput={requirementsInput}
          iconPreview={iconPreview}
          onReset={resetForm}
          onChange={handleChange}
          onIconChange={handleIconChange}
          onBenefitsChange={setBenefitsInput}
          onRequirementsChange={setRequirementsInput}
          onSubmit={handleSubmit}
          types={involvementTypes}
          jobTypes={jobTypes}
        />
      )}

      <InvolvementList
        options={options}
        types={involvementTypes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
