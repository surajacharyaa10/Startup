"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { teamDepartmentApi } from "@/lib/api/teamDepartment";
import type {
  TeamDepartment,
  Leader,
  Department,
} from "@/lib/types/teamDepartment";
import API_URL from "@/app/api/url";
import LeaderCard from "@/components/team/LeaderCard";
import DepartmentCard from "@/components/team/DepartmentCard";
import LeaderForm from "@/components/team/LeaderForm";
import DepartmentForm from "@/components/team/DepartmentForm";
import { FiPlus, FiActivity, FiUsers, FiAward } from "react-icons/fi";

export default function TeamPage() {
  const [data, setData] = useState<TeamDepartment>({
    leadership: [],
    departments: [],
  });
  const [loading, setLoading] = useState(true);
  const [savingLeader, setSavingLeader] = useState(false);
  const [savingDept, setSavingDept] = useState(false);
  const [showLeaderForm, setShowLeaderForm] = useState(false);
  const [showDeptForm, setShowDeptForm] = useState(false);

  const [leaderForm, setLeaderForm] = useState({
    name: "",
    role: "",
    bio: "",
    linkedin: "",
    twitter: "",
    email: "",
  });
  const [deptForm, setDeptForm] = useState({
    name: "",
    members: 0,
    color: "",
    iconText: "",
  });
  const [leaderFile, setLeaderFile] = useState<File | null>(null);
  const [leaderPreview, setLeaderPreview] = useState<string | null>(null);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const leaderFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const payload = await teamDepartmentApi.get();
      setData({
        leadership: payload.leadership || [],
        departments: payload.departments || [],
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to load team data");
    } finally {
      setLoading(false);
    }
  };

  const resetLeaderForm = () => {
    setLeaderForm({
      name: "",
      role: "",
      bio: "",
      linkedin: "",
      twitter: "",
      email: "",
    });
    setLeaderFile(null);
    setLeaderPreview(null);
    setEditingLeader(null);
    setShowLeaderForm(false);
    if (leaderFileRef.current) leaderFileRef.current.value = "";
  };

  const resetDeptForm = () => {
    setDeptForm({
      name: "",
      members: 0,
      color: "",
      iconText: "",
    });
    setEditingDept(null);
    setShowDeptForm(false);
  };

  const handleLeaderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLeaderForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeptForm((prev) => ({
      ...prev,
      [name]: name === "members" ? Number(value) || 0 : value,
    }));
  };

  const handleLeaderFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLeaderFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLeaderPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEditLeader = (leader: Leader) => {
    setEditingLeader(leader);
    setLeaderForm({
      name: leader.name,
      role: leader.role,
      bio: leader.bio || "",
      linkedin: leader.linkedin || "",
      twitter: leader.twitter || "",
      email: leader.email || "",
    });
    setLeaderPreview(leader.avatar || null);
    setLeaderFile(null);
    setShowLeaderForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditDept = (dept: Department) => {
    setEditingDept(dept);
    setDeptForm({
      name: dept.name,
      members: dept.members,
      color: dept.color || "",
      iconText: dept.icon || "",
    });
    setShowDeptForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteLeader = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-black text-zinc-900 text-sm uppercase italic">Purge this leader signature?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const tid = toast.loading("Executing purge...");
              try {
                const result = await teamDepartmentApi.deleteLeader(id);
                setData({
                  leadership: result.leadership || [],
                  departments: result.departments || [],
                });
                toast.success("Signature purged.", { id: tid });
              } catch (err: any) {
                toast.error(err.message || "Failed to purge", { id: tid });
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

  const handleDeleteDept = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-black text-zinc-900 text-sm uppercase italic">Dissolve this unit?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const tid = toast.loading("Executing dissolution...");
              try {
                const result = await teamDepartmentApi.deleteDepartment(id);
                setData({
                  leadership: result.leadership || [],
                  departments: result.departments || [],
                });
                toast.success("Unit dissolved.", { id: tid });
              } catch (err: any) {
                toast.error(err.message || "Failed to dissolve", { id: tid });
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

  const submitLeader = async (e: React.FormEvent) => {
    e.preventDefault();
    const tid = toast.loading("Syncing leadership matrix...");
    setSavingLeader(true);

    const form = new FormData();
    form.append("name", leaderForm.name);
    form.append("role", leaderForm.role);
    if (leaderForm.bio) form.append("bio", leaderForm.bio);
    if (leaderForm.linkedin) form.append("linkedin", leaderForm.linkedin);
    if (leaderForm.twitter) form.append("twitter", leaderForm.twitter);
    if (leaderForm.email) form.append("email", leaderForm.email);
    if (leaderFile) form.append("avatar", leaderFile);

    try {
      const result = editingLeader
        ? await teamDepartmentApi.updateLeader(editingLeader._id, form)
        : await teamDepartmentApi.addLeader(form);
      setData({
        leadership: result.leadership || [],
        departments: result.departments || [],
      });
      toast.success("Matrix updated.", { id: tid });
      resetLeaderForm();
    } catch (err: any) {
      toast.error(err.message || "Sync failure", { id: tid });
    } finally {
      setSavingLeader(false);
    }
  };

  const submitDept = async (e: React.FormEvent) => {
    e.preventDefault();
    const tid = toast.loading("Re-configuring unit structure...");
    setSavingDept(true);

    const form = new FormData();
    form.append("name", deptForm.name);
    form.append("members", String(deptForm.members));
    if (deptForm.color) form.append("color", deptForm.color);
    if (deptForm.iconText) form.append("icon", deptForm.iconText);

    try {
      const result = editingDept
        ? await teamDepartmentApi.updateDepartment(editingDept._id, form)
        : await teamDepartmentApi.addDepartment(form);
      setData({
        leadership: result.leadership || [],
        departments: result.departments || [],
      });
      toast.success("Unit updated.", { id: tid });
      resetDeptForm();
    } catch (err: any) {
      toast.error(err.message || "Config failure", { id: tid });
    } finally {
      setSavingDept(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Assembling Collective Intel...</p>
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
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Collective</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            The human engine. Orchestrate leadership profiles and sectoral units within the infrastructure.
          </p>
        </div>

        <div className="flex gap-4">
          {!showLeaderForm && (
            <button
              onClick={() => setShowLeaderForm(true)}
              className="h-20 px-10 bg-white hover:bg-zinc-200 text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-[2.5rem] transition-all flex items-center justify-center gap-4 shadow-2xl"
            >
              ENLIST LEADER
            </button>
          )}
          {!showDeptForm && (
            <button
              onClick={() => setShowDeptForm(true)}
              className="h-20 px-10 bg-zinc-900 hover:bg-zinc-800 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-[2.5rem] transition-all border border-zinc-800 flex items-center justify-center gap-4 shadow-2xl"
            >
              INITIALIZE UNIT
            </button>
          )}
        </div>
      </div>

      {/* Forms Section */}
      {(showLeaderForm || showDeptForm) && (
        <div className="grid grid-cols-1 gap-12 animate-in fade-in slide-in-from-top-10 duration-500">
          {showLeaderForm && (
            <LeaderForm
              formData={leaderForm}
              editingLeader={editingLeader}
              saving={savingLeader}
              imagePreview={leaderPreview}
              onReset={resetLeaderForm}
              onChange={handleLeaderChange}
              onImageChange={handleLeaderFile}
              onSubmit={submitLeader}
              fileRef={leaderFileRef}
            />
          )}
          {showDeptForm && (
            <DepartmentForm
              formData={deptForm}
              editingDept={editingDept}
              saving={savingDept}
              onReset={resetDeptForm}
              onChange={handleDeptChange as any}
              onSubmit={submitDept}
            />
          )}
        </div>
      )}

      {/* Collective Intelligence Display */}
      <div className="space-y-32">
        {/* Leadership Section */}
        <section className="space-y-12">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
              <FiAward size={24} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Command Center</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{data.leadership.length} DESIGNATED</span>
          </div>

          {data.leadership.length === 0 ? (
            <div className="text-center py-32 bg-zinc-950/30 rounded-[4rem] border-4 border-dashed border-zinc-900/50">
              <FiActivity size={48} className="mx-auto text-zinc-800 mb-6" />
              <p className="text-zinc-700 font-black uppercase tracking-[0.3em]">Command hierarchy currently unpopulated.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data.leadership.map((leader) => (
                <div key={leader._id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <LeaderCard
                    leader={leader}
                    onEdit={handleEditLeader}
                    onDelete={handleDeleteLeader}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Departments Section */}
        <section className="space-y-12">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
              <FiUsers size={24} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Operational Units</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{data.departments.length} CLUSTERS</span>
          </div>

          {data.departments.length === 0 ? (
            <div className="text-center py-32 bg-zinc-950/30 rounded-[4rem] border-4 border-dashed border-zinc-900/50">
              <FiUsers size={48} className="mx-auto text-zinc-800 mb-6" />
              <p className="text-zinc-700 font-black uppercase tracking-[0.3em]">No sectoral units categorized in infrastructure.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.departments.map((dept) => (
                <div key={dept._id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <DepartmentCard
                    dept={dept}
                    onEdit={handleEditDept}
                    onDelete={handleDeleteDept}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
