"use client";

import { Plus } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    { id: "1", name: "Aurora ML Framework", area: "Machine Learning", lead: "Dr. Chen", status: "Active", startDate: "2025-06-01" },
    { id: "2", name: "Next-Gen NLP Models", area: "NLP", lead: "Dr. Yamamoto", status: "Active", startDate: "2025-08-15" },
    { id: "3", name: "Computer Vision Pipeline", area: "Computer Vision", lead: "M. Torres", status: "Planning", startDate: "2026-01-01" },
    { id: "4", name: "AI Safety Framework", area: "Ethics & Safety", lead: "Dr. Chen", status: "Active", startDate: "2025-04-20" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Research Projects</h1>
        <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
            <p className="text-gray-600 mb-4">{project.area}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Team Lead:</span>
                <span className="font-medium">{project.lead}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  project.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{project.startDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
