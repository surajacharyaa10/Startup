"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { projectsApi } from "@/lib/api/projects";
import type { Project } from "@/lib/types/project";
import API_URL from "@/app/api/url";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectForm from "@/components/projects/ProjectForm";
import { FiSearch, FiFilter, FiActivity } from "react-icons/fi";

const categories = [
  { id: "sandbox", label: "Sandbox", color: "orange" },
  { id: "incubating", label: "Incubating", color: "yellow" },
  { id: "graduated", label: "Graduated", color: "green" },
  { id: "archived", label: "Archived", color: "gray" },
] as const;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<string>("sandbox");
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    category: "sandbox",
    version: "v1.0",
    maturity: "0%",
    contributors: 0,
    stars: 0,
    status: "Active",
    roadmap: "",
    license: "MIT",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [featuresInput, setFeaturesInput] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsApi.getProjects();
      setProjects(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      tagline: "",
      description: "",
      category: activeTab,
      version: "v1.0",
      maturity: "0%",
      contributors: 0,
      stars: 0,
      status: "Active",
      roadmap: "",
      license: "MIT",
    });
    setEditingProject(null);
    setFeaturesInput("");
    setTechStackInput("");
    setSelectedImage(null);
    setImagePreview(null);
    setShowForm(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      tagline: project.tagline,
      description: project.description,
      category: project.category,
      version: project.version,
      maturity: project.maturity,
      contributors: project.contributors,
      stars: project.stars,
      status: project.status,
      roadmap: project.roadmap,
      license: project.license,
    });
    setFeaturesInput(project.features.join(", "));
    setTechStackInput(project.techStack.join(", "));
    setActiveTab(project.category);
    if (project.image) {
      setImagePreview(project.image.startsWith('/uploads') ? `${API_URL}${project.image}` : project.image);
    }
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-zinc-900 text-sm font-black uppercase italic">Decommission this project?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const t2 = toast.loading("Suspending module...");
              try {
                await projectsApi.deleteProject(id);
                setProjects((prev) => prev.filter((p) => p._id !== id));
                toast.success("Project offline.", { id: t2 });
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
    const tId = toast.loading(`${editingProject ? "Updating" : "Initializing"} project protocol...`);
    setSaving(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, String(value));
    });

    formDataToSend.append("features", JSON.stringify(featuresInput.split(",").map((f) => f.trim()).filter(Boolean)));
    formDataToSend.append("techStack", JSON.stringify(techStackInput.split(",").map((t) => t.trim()).filter(Boolean)));

    if (selectedImage) {
      formDataToSend.append("image", selectedImage);
    }

    try {
      if (editingProject) {
        const result = await projectsApi.updateProject(editingProject._id, formDataToSend);
        if (result.success) {
          setProjects((prev) =>
            prev.map((p) => (p._id === editingProject._id ? result.data : p))
          );
          toast.success("Identity updated.", { id: tId });
        }
      } else {
        const result = await projectsApi.createProject(formDataToSend);
        if (result.success) {
          setProjects((prev) => [...prev, result.data]);
          toast.success("Project established.", { id: tId });
        }
      }
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Failed to save project", { id: tId });
    } finally {
      setSaving(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesTab = p.category === activeTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Processing Project Matrix...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1700px] mx-auto pb-20 p-4 md:p-8 space-y-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-12 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Portfolio</h1>
          </div>
          <p className="text-zinc-500 font-black max-w-3xl text-sm md:text-base leading-relaxed uppercase tracking-widest italic">
            Architect the future. Manage the evolution of project modules from Sandbox through to Graduation.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="h-20 px-12 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2.5rem] transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-4"
          >
            INITIALIZE NEW PROJECT
          </button>
        )}
      </div>

      <div className="space-y-16">
        {showForm && (
          <div className="animate-in fade-in slide-in-from-top-10 duration-500">
            <ProjectForm
              formData={formData}
              featuresInput={featuresInput}
              techStackInput={techStackInput}
              editingProject={editingProject}
              saving={saving}
              imagePreview={imagePreview}
              onSubmit={handleSubmit}
              onChange={handleChange}
              onImageChange={handleImageChange}
              onFeaturesChange={setFeaturesInput}
              onTechStackChange={setTechStackInput}
              onCancel={resetForm}
              categories={[...categories]}
            />
          </div>
        )}

        {/* Dynamic Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-zinc-950/50 backdrop-blur-xl border border-zinc-900 rounded-[3rem] p-10">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`h-16 px-8 rounded-2xl flex items-center gap-4 transition-all border font-black text-[10px] uppercase tracking-widest ${activeTab === cat.id
                    ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800"
                  }`}
              >
                {cat.label}
                <span className={`px-2 py-1 rounded-lg ${activeTab === cat.id ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-600"} text-[8px]`}>
                  {projects.filter(p => p.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>

          <div className="relative group w-full lg:w-96">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search Matrix..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl pl-16 pr-8 text-white font-black text-[10px] uppercase tracking-widest focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-zinc-700"
            />
          </div>
        </div>

        {/* List Grid */}
        <div className="space-y-10">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-40 bg-zinc-950/30 rounded-[4rem] border-4 border-dashed border-zinc-900/50">
              <FiActivity size={48} className="mx-auto text-zinc-800 mb-6" />
              <p className="text-zinc-700 font-black uppercase tracking-[0.3em]">No project signatures detected in this sector.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {filteredProjects.map((project) => (
                <div key={project._id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <ProjectCard
                    project={project}
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
