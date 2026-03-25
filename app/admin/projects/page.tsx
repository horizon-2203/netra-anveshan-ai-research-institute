"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import AdminCrudModal from "@/components/AdminCrudModal";

type ProjectForm = {
  id?: string;
  name: string;
  research_area: string;
  team_lead: string;
  status: string;
  start_date: string;
};

const DEFAULT_FORM: ProjectForm = {
  name: "",
  research_area: "General",
  team_lead: "",
  status: "planning",
  start_date: "",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState<ProjectForm>(DEFAULT_FORM);
  const [uploadMessage, setUploadMessage] = useState("");

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("research_projects")
      .select("*")
      .order("created_at", { ascending: false });

    setProjects(data ?? []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;

    const { error } = await supabase.from("research_projects").delete().eq("id", id);
    if (error) {
      window.alert(`Failed to delete project: ${error.message}`);
      return;
    }

    setProjects((prev) => prev.filter((item) => item.id !== id));
  };

  const openAdd = () => {
    setMode("add");
    setForm(DEFAULT_FORM);
    setModalOpen(true);
  };

  const openEdit = (project: any) => {
    setMode("edit");
    setForm({
      id: project.id,
      name: project.name || "",
      research_area: project.research_area || "General",
      team_lead: project.team_lead || "",
      status: project.status || "planning",
      start_date: project.start_date || "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      research_area: form.research_area,
      team_lead: form.team_lead,
      status: form.status,
      start_date: form.start_date || null,
    };

    if (mode === "add") {
      const { error } = await supabase.from("research_projects").insert(payload);
      if (error) {
        window.alert(`Failed to add project: ${error.message}`);
        return;
      }
    } else if (form.id) {
      const { error } = await supabase.from("research_projects").update(payload).eq("id", form.id);
      if (error) {
        window.alert(`Failed to update project: ${error.message}`);
        return;
      }
    }

    setModalOpen(false);
    await fetchProjects();
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return;
    setUploadMessage("Uploading...");

    const formData = new FormData();
    formData.append("category", "projects");
    formData.append("file", file);

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setUploadMessage(result.ok ? `Uploaded: ${result.file}` : result.message || "Upload failed");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Research Projects</h1>
        <button onClick={openAdd} className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <p>This upload is for documentation purpose only.</p>
        <p>Real dataset and model uploads, requests and related operations must be done on premises.</p>
        <div className="mt-3 flex items-center gap-3">
          <input type="file" onChange={(e) => handleUpload(e.target.files?.[0] || null)} />
          {uploadMessage && <span className="text-xs text-amber-800">{uploadMessage}</span>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.length === 0 && (
          <div className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-200 dark:border-slate-800 shadow-sm text-center text-sm text-gray-500 dark:text-slate-400">
            No research projects found.
          </div>
        )}
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">{project.name}</h3>
              <div className="flex gap-2">
                <button onClick={() => openEdit(project)} className="text-gray-600 hover:text-gray-800" title="Edit">
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 dark:text-slate-300 mb-4">{project.research_area}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-slate-400">Team Lead:</span>
                <span className="font-medium text-gray-900 dark:text-slate-100">{project.team_lead || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  project.status === "Active" || project.status === "active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                }`}>
                  {project.status || "Planning"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-slate-400">Start Date:</span>
                <span className="font-medium text-gray-900 dark:text-slate-100">{project.start_date || "-"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminCrudModal
        open={modalOpen}
        title={mode === "add" ? "Add Project" : "Edit Project"}
        submitLabel={mode === "add" ? "Create" : "Save"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
      >
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Research Area</label>
          <input
            value={form.research_area}
            onChange={(e) => setForm((prev) => ({ ...prev, research_area: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Team Lead</label>
          <input
            value={form.team_lead}
            onChange={(e) => setForm((prev) => ({ ...prev, team_lead: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Status</label>
          <input
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Start Date</label>
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm((prev) => ({ ...prev, start_date: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>
      </AdminCrudModal>
    </div>
  );
}
