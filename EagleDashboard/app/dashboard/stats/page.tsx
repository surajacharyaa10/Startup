"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import API_URL from "@/app/api/url";
import { FiActivity, FiUsers, FiTrendingUp, FiClock, FiShield, FiSave, FiLayers, FiCheckCircle } from "react-icons/fi";

type StatsInput = {
  ProjectComplete: number;
  HappyClient: number;
  ClientSatisfaction: number;
  Experience: number;
  Support: string;
};

type Stats = StatsInput & {
  _id: string;
  ProjectComplete: number | { $numberInt: string };
  HappyClient: number | { $numberInt: string };
  ClientSatisfaction: number | { $numberInt: string };
  Experience: number | { $numberInt: string };
};

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [formData, setFormData] = useState<StatsInput>({
    ProjectComplete: 0,
    HappyClient: 0,
    ClientSatisfaction: 0,
    Experience: 0,
    Support: "24/7",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const safeNumberConvert = (value: any): number => {
    if (value && typeof value === "object" && value["$numberInt"]) {
      return Number(value["$numberInt"]);
    }
    return Number(value || 0);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/stats`, { cache: "no-store" });
        if (!response.ok) throw new Error("Connection failed");
        const json = await response.json();
        const data = json.data || (Array.isArray(json) ? json[0] : json);

        if (data) {
          const normalized: StatsInput = {
            ProjectComplete: safeNumberConvert(data.ProjectComplete),
            HappyClient: safeNumberConvert(data.HappyClient),
            ClientSatisfaction: safeNumberConvert(data.ClientSatisfaction),
            Experience: safeNumberConvert(data.Experience),
            Support: data.Support || "24/7",
          };
          setStats(data);
          setFormData(normalized);
        }
      } catch (err: any) {
        toast.error("Telemetry link failed");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "Support") {
      setFormData((prev) => ({ ...prev, Support: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: Number(value) || 0 }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tId = toast.loading("Recalibrating company metrics...");
    setSaving(true);

    try {
      const url = stats ? `${API_URL}/stats/${stats._id}` : `${API_URL}/stats`;
      const response = await fetch(url, {
        method: stats ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Write failed");
      const json = await response.json();
      const result = json.data || json;

      setStats(result);
      toast.success("Metrics synchronized.", { id: tId });
    } catch (err: any) {
      toast.error("Core synchronization failure", { id: tId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Sampling Performance Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1700px] mx-auto pb-20 p-4 md:p-8 space-y-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Telemetry</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Impact assessment. Real-time orchestration of core performance indicators and ecosystem growth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
        {/* Form Control */}
        <div className="xl:col-span-4">
          <div className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-10 lg:p-12 shadow-2xl sticky top-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <FiActivity size={20} />
              </div>
              <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Data Input</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {([
                { key: "ProjectComplete", label: "Completed Assets", icon: <FiLayers size={14} /> },
                { key: "HappyClient", label: "Enthusiastic Partners", icon: <FiUsers size={14} /> },
                { key: "ClientSatisfaction", label: "Satisfaction Quota (%)", icon: <FiTrendingUp size={14} /> },
                { key: "Experience", label: "Legacy (Years)", icon: <FiShield size={14} /> },
                { key: "Support", label: "Uplink Availability", icon: <FiClock size={14} /> },
              ] as const).map(({ key, label, icon }) => (
                <div key={key} className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                    {icon} {label}
                  </label>
                  <input
                    type={key === "Support" ? "text" : "number"}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-xl px-6 text-white font-black uppercase text-[10px] tracking-widest focus:ring-2 focus:ring-white/10 transition-all shadow-inner"
                  />
                </div>
              ))}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full h-20 bg-white hover:bg-zinc-200 text-black rounded-3xl transition-all font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-xl active:scale-95 group"
                >
                  {saving ? (
                    <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSave size={20} />
                      <span>SYNC METRICS</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Visual Preview */}
        <div className="xl:col-span-8 space-y-12">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
              <FiTrendingUp size={24} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Impact Radar</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Assets Built", value: formData.ProjectComplete, color: "from-blue-600 to-indigo-600", desc: "Total successfully deployed modules" },
              { label: "Partner Network", value: formData.HappyClient, color: "from-purple-600 to-pink-600", desc: "Global collective growth" },
              { label: "Quality Quota", value: `${formData.ClientSatisfaction}%`, color: "from-emerald-600 to-teal-600", desc: "Operational standard rating" },
              { label: "Infrastructure Age", value: `${formData.Experience}Y`, color: "from-orange-600 to-red-600", desc: "System maturity level" },
              { label: "Access Protocol", value: formData.Support, color: "from-cyan-600 to-blue-600", desc: "Communication line availability", full: true },
            ].map((stat, i) => (
              <div key={i} className={`group relative bg-zinc-950 border border-zinc-900 rounded-[3rem] p-12 overflow-hidden hover:border-zinc-700 transition-all duration-500 ${stat.full ? 'md:col-span-2' : ''}`}>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity blur-3xl`}></div>

                <div className="relative z-10 flex flex-col h-full justify-between gap-10">
                  <div>
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-4 block">{stat.label}</span>
                    <div className="text-7xl font-black text-white italic tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                      {stat.value}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-zinc-900/50">
                    <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{stat.desc}</p>
                    <FiCheckCircle size={16} className="text-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
