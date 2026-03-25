"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Edit, Plus, Trash2 } from "lucide-react";
import AdminCrudModal from "@/components/AdminCrudModal";

type RequestForm = {
  id?: string;
  name: string;
  email: string;
  organization: string;
  request_type: string;
  message: string;
  status: string;
};

const DEFAULT_FORM: RequestForm = {
  name: "",
  email: "",
  organization: "",
  request_type: "Dataset Access",
  message: "",
  status: "pending",
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState<RequestForm>(DEFAULT_FORM);
  const [uploadMessage, setUploadMessage] = useState("");

  const fetchRequests = async () => {
    const { data } = await supabase
      .from("access_requests")
      .select("*")
      .order("created_at", { ascending: false });

    setRequests(data ?? []);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this access request?");
    if (!ok) return;

    const { error } = await supabase.from("access_requests").delete().eq("id", id);
    if (error) {
      window.alert(`Failed to delete request: ${error.message}`);
      return;
    }

    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const openAdd = () => {
    setMode("add");
    setForm(DEFAULT_FORM);
    setModalOpen(true);
  };

  const openEdit = (request: any) => {
    setMode("edit");
    setForm({
      id: request.id,
      name: request.name || "",
      email: request.email || "",
      organization: request.organization || "",
      request_type: request.request_type || "Dataset Access",
      message: request.message || "",
      status: request.status || "pending",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      organization: form.organization,
      request_type: form.request_type,
      message: form.message,
      status: form.status,
    };

    if (mode === "add") {
      const { error } = await supabase.from("access_requests").insert(payload);
      if (error) {
        window.alert(`Failed to add request: ${error.message}`);
        return;
      }
    } else if (form.id) {
      const { error } = await supabase.from("access_requests").update(payload).eq("id", form.id);
      if (error) {
        window.alert(`Failed to update request: ${error.message}`);
        return;
      }
    }

    setModalOpen(false);
    await fetchRequests();
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return;
    setUploadMessage("Uploading...");

    const formData = new FormData();
    formData.append("category", "requests");
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Access Requests</h1>
        <button onClick={openAdd} className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Request
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

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Organization</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Request Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-slate-400">
                  No access requests found.
                </td>
              </tr>
            )}
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-100">{req.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{req.organization}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{req.request_type}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    req.status === "approved" ? "bg-green-100 text-green-800" :
                    req.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {req.status === "approved" ? "Approved" : req.status === "pending" ? "Pending" : "Rejected"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{req.created_at ? new Date(req.created_at).toISOString().slice(0, 10) : "-"}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(req)} className="text-gray-600 hover:text-gray-800" title="Edit">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(req.id)}
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
        title={mode === "add" ? "Add Request" : "Edit Request"}
        submitLabel={mode === "add" ? "Create" : "Save"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
      >
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Requester Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Organization</label>
          <input
            value={form.organization}
            onChange={(e) => setForm((prev) => ({ ...prev, organization: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Request Type</label>
          <input
            value={form.request_type}
            onChange={(e) => setForm((prev) => ({ ...prev, request_type: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 min-h-[90px]"
          />
        </div>
      </AdminCrudModal>
    </div>
  );
}
