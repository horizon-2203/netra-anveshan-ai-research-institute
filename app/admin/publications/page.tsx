"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import AdminCrudModal from "@/components/AdminCrudModal";

type PublicationForm = {
  id?: string;
  title: string;
  authors: string;
  status: "draft" | "published";
  published_date: string;
};

const DEFAULT_FORM: PublicationForm = {
  title: "",
  authors: "",
  status: "draft",
  published_date: "",
};

export default function PublicationsPage() {
  const [publications, setPublications] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState<PublicationForm>(DEFAULT_FORM);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const fetchPublications = async () => {
    const { data } = await supabase
      .from("publications")
      .select("*")
      .order("published_date", { ascending: false });

    setPublications(data ?? []);
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this publication?");
    if (!ok) return;

    const { error } = await supabase.from("publications").delete().eq("id", id);
    if (error) {
      window.alert(`Failed to delete publication: ${error.message}`);
      return;
    }

    setPublications((prev) => prev.filter((item) => item.id !== id));
  };

  const openAdd = () => {
    setMode("add");
    setForm(DEFAULT_FORM);
    setSelectedFile(null);
    setUploadMessage("");
    setModalOpen(true);
  };

  const openEdit = (publication: any) => {
    setMode("edit");
    setForm({
      id: publication.id,
      title: publication.title || "",
      authors: publication.authors || "",
      status: publication.status === "published" ? "published" : "draft",
      published_date: publication.published_date || "",
    });
    setSelectedFile(null);
    setUploadMessage("");
    setModalOpen(true);
  };

  const uploadFile = async (file: File, category: string) => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("file", file);

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!result.ok) {
      throw new Error(result.message || "Upload failed");
    }
    return result;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      authors: form.authors,
      status: form.status,
      published_date: form.status === "published" ? form.published_date || new Date().toISOString().slice(0, 10) : null,
    };

    if (mode === "add") {
      const { error } = await supabase.from("publications").insert(payload);
      if (error) {
        window.alert(`Failed to add publication: ${error.message}`);
        return;
      }

      if (selectedFile) {
        setUploadMessage("Uploading...");
        try {
          const result = await uploadFile(selectedFile, "publications");
          setUploadMessage(`Uploaded: ${result.file}`);
        } catch (uploadError) {
          window.alert((uploadError as Error).message);
        }
      }
    } else if (form.id) {
      const { error } = await supabase.from("publications").update(payload).eq("id", form.id);
      if (error) {
        window.alert(`Failed to update publication: ${error.message}`);
        return;
      }
    }

    setModalOpen(false);
    setSelectedFile(null);
    await fetchPublications();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Publications</h1>
        <button onClick={openAdd} className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Publication
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Authors</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
            {publications.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-slate-400">
                  No publications found. Create records in ERP or Supabase to see data here.
                </td>
              </tr>
            )}
            {publications.map((pub) => (
              <tr key={pub.id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-100">{pub.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{pub.authors}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{pub.published_date || "-"}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pub.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {pub.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(pub)} className="text-gray-600 hover:text-gray-800" title="Edit">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(pub.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Remove"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminCrudModal
        open={modalOpen}
        title={mode === "add" ? "Add Publication" : "Edit Publication"}
        submitLabel={mode === "add" ? "Create" : "Save"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
      >
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Authors</label>
          <input
            value={form.authors}
            onChange={(e) => setForm((prev) => ({ ...prev, authors: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as "draft" | "published" }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Published Date</label>
          <input
            type="date"
            value={form.published_date}
            onChange={(e) => setForm((prev) => ({ ...prev, published_date: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>
        {mode === "add" && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p>This upload is for documentation purpose only.</p>
            <p>Real dataset and model uploads, requests and related operations must be done on premises.</p>
            <div className="mt-3 flex items-center gap-3">
              <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
              {uploadMessage && <span className="text-xs text-amber-800">{uploadMessage}</span>}
            </div>
          </div>
        )}
      </AdminCrudModal>
    </div>
  );
}
