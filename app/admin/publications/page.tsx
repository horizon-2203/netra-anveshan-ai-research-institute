"use client";

import { Plus } from "lucide-react";

export default function PublicationsPage() {
  const publications = [
    { id: "1", title: "Deep Learning Advances in Computer Vision", authors: "Dr. Chen, Dr. Yamamoto", date: "2026-03-15", status: "Published" },
    { id: "2", title: "Next Generation NLP Models", authors: "Dr. Singh, Dr. Torres", date: "2026-02-20", status: "Published" },
    { id: "3", title: "AI Safety Framework v2.0", authors: "Dr. Chen, M. Torres", date: "2026-01-10", status: "Draft" },
    { id: "4", title: "Reinforcement Learning in Robotics", authors: "Dr. Yamamoto", date: "2025-12-05", status: "Published" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Publications</h1>
        <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Publication
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Authors</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {publications.map((pub) => (
              <tr key={pub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{pub.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{pub.authors}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{pub.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pub.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {pub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
