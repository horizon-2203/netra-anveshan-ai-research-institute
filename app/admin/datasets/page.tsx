"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<any[]>([]);

  useEffect(() => {
    const fetchDatasets = async () => {
      const { data } = await supabase
        .from("datasets")
        .select("*")
        .order("created_at", { ascending: false });
      
      // Fallback data if no database
      const sampleData = [
        { id: "1", name: "ImageNet Large Scale", dataset_type: "Computer Vision", size_gb: 150, is_public: true, status: "Active" },
        { id: "2", name: "GPT Training Corpus", dataset_type: "NLP", size_gb: 570, is_public: false, status: "Active" },
        { id: "3", name: "RL Benchmark Suite", dataset_type: "Reinforcement Learning", size_gb: 45, is_public: true, status: "Active" },
        { id: "4", name: "Medical Imaging Dataset", dataset_type: "Computer Vision", size_gb: 230, is_public: false, status: "Review" },
      ];
      
      setDatasets(data && data.length > 0 ? data : sampleData);
    };

    fetchDatasets();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Datasets</h1>
        <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Dataset
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Dataset Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Size (GB)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {datasets.map((dataset) => (
              <tr key={dataset.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{dataset.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{dataset.dataset_type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{dataset.size_gb}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dataset.is_public ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {dataset.is_public ? "Public" : "Private"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link 
                      href={`/admin/datasets/${dataset.id}`}
                      className="text-primary hover:text-primary/80"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
