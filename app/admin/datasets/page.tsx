"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import AdminCrudModal from "@/components/AdminCrudModal";

type DatasetForm = {
  id?: string;
  name: string;
  dataset_type: string;
  size_gb: string;
  is_public: boolean;
};

const DEFAULT_FORM: DatasetForm = {
  name: "",
  dataset_type: "NLP",
  size_gb: "0",
  is_public: true,
};

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState<DatasetForm>(DEFAULT_FORM);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const fetchDatasets = async () => {
    const { data } = await supabase
      .from("datasets")
      .select("*")
      .order("created_at", { ascending: false });

    setDatasets(data ?? []);
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this dataset?");
    if (!ok) return;

    const { error } = await supabase.from("datasets").delete().eq("id", id);
    if (error) {
      window.alert(`Failed to delete dataset: ${error.message}`);
      return;
    }

    setDatasets((prev) => prev.filter((item) => item.id !== id));
  };

  const openAdd = () => {
    setMode("add");
    setForm(DEFAULT_FORM);
    setSelectedFile(null);
    setUploadMessage("");
    setModalOpen(true);
  };

  const openEdit = (dataset: any) => {
    setMode("edit");
    setForm({
      id: dataset.id,
      name: dataset.name || "",
      dataset_type: dataset.dataset_type || "NLP",
      size_gb: String(dataset.size_gb ?? 0),
      is_public: Boolean(dataset.is_public),
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
      name: form.name,
      dataset_type: form.dataset_type,
      size_gb: Number(form.size_gb) || 0,
      is_public: form.is_public,
    };

    if (mode === "add") {
      const { error } = await supabase.from("datasets").insert(payload);
      if (error) {
        window.alert(`Failed to add dataset: ${error.message}`);
        return;
      }

      if (selectedFile) {
        setUploadMessage("Uploading...");
        try {
          const result = await uploadFile(selectedFile, "datasets");
          setUploadMessage(`Uploaded: ${result.file}`);
        } catch (uploadError) {
          window.alert((uploadError as Error).message);
        }
      }
    } else if (form.id) {
      const { error } = await supabase.from("datasets").update(payload).eq("id", form.id);
      if (error) {
        window.alert(`Failed to update dataset: ${error.message}`);
        return;
      }
    }

    setModalOpen(false);
    setSelectedFile(null);
    await fetchDatasets();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">AI Datasets</h1>
        <button onClick={openAdd} className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Dataset
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Dataset Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Size (GB)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
            {datasets.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-slate-400">
                  No datasets found. Create records in ERP or Supabase to see data here.
                </td>
              </tr>
            )}
            {datasets.map((dataset) => (
              <tr key={dataset.id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-100">{dataset.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{dataset.dataset_type}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{dataset.size_gb}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dataset.is_public ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {dataset.is_public ? "Public" : "Private"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/datasets/${dataset.id}`} className="text-primary hover:text-primary/80">
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button onClick={() => openEdit(dataset)} className="text-gray-600 hover:text-gray-800">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(dataset.id)}
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
        title={mode === "add" ? "Add Dataset" : "Edit Dataset"}
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
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Type</label>
          <input
            value={form.dataset_type}
            onChange={(e) => setForm((prev) => ({ ...prev, dataset_type: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Size (GB)</label>
          <input
            type="number"
            step="0.01"
            value={form.size_gb}
            onChange={(e) => setForm((prev) => ({ ...prev, size_gb: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={form.is_public}
            onChange={(e) => setForm((prev) => ({ ...prev, is_public: e.target.checked }))}
          />
          Public dataset
        </label>
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
