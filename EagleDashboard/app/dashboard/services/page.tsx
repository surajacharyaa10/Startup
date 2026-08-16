"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { servicesApi } from "@/lib/api/services";
import type { Service, ServiceInput } from "@/lib/types/services";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceForm from "@/components/services/ServiceForm";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState<ServiceInput>({
    icon: "💻",
    title: "",
    desc: "",
    bg: "from-blue-500 to-cyan-500",
  });
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await servicesApi.getServices();
      setServices(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      icon: "💻",
      title: "",
      desc: "",
      bg: "from-blue-500 to-cyan-500",
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      icon: service.icon,
      title: service.title,
      desc: service.desc,
      bg: service.bg,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-zinc-900 text-sm font-black uppercase italic">Decommission this module?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const t2 = toast.loading("Decommissioning...");
              try {
                await servicesApi.deleteService(id);
                setServices((prev) => prev.filter((s) => s._id !== id));
                toast.success("Module decommissioned.", { id: t2 });
              } catch (err: any) {
                toast.error(err.message || "Decommissioning failed", { id: t2 });
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
    const tId = toast.loading(`${editingService ? "Updating" : "Integrating"} module...`);
    setSaving(true);

    try {
      if (editingService) {
        const result = await servicesApi.updateService(
          editingService._id,
          formData
        );
        if (result.success) {
          setServices((prev) =>
            prev.map((s) => (s._id === editingService._id ? result.data : s))
          );
          toast.success("Module reconfigured successfully!", { id: tId });
        }
      } else {
        const result = await servicesApi.createService(formData);
        if (result.success) {
          setServices((prev) => [...prev, result.data]);
          toast.success("Service integrated successfully!", { id: tId });
        }
      }
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Failed to save service", { id: tId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Synchronizing Service Grid...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto pb-20 p-4 md:p-8 space-y-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Capabilities</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Command the service ecosystem. Deploy and maintain the technological modules that define your value proposition.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="h-20 px-12 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2.5rem] transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-4"
          >
            INTEGRATE NEW MODULE
          </button>
        )}
      </div>

      <div className="space-y-16">
        {showForm && (
          <div className="animate-in fade-in slide-in-from-top-10 duration-500">
            <ServiceForm
              formData={formData}
              editingService={editingService}
              saving={saving}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={resetForm}
            />
          </div>
        )}

        {/* List / Grid */}
        <div className="space-y-10">
          <div className="flex items-center gap-4 border-b border-zinc-900 pb-8">
            <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.5em]">Active Infrastructure Grid</span>
            <div className="h-0.5 flex-1 bg-zinc-900"></div>
            <span className="text-xl font-black text-zinc-800 italic uppercase">[{services.length} Nodes Online]</span>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-32 bg-zinc-950/50 rounded-[4rem] border-4 border-dashed border-zinc-900">
              <p className="text-zinc-600 font-black uppercase tracking-[0.3em]">No modules detected in the service grid.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service._id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <ServiceCard
                    service={service}
                    onEdit={handleEdit}
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
