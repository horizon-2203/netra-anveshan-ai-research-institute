"use client";

export default function RequestsPage() {
  const requests = [
    { id: "1", name: "Dr. Sarah Johnson", organization: "MIT", type: "Dataset Access", status: "Pending", date: "2026-03-20" },
    { id: "2", name: "Prof. Michael Lee", organization: "Stanford", type: "Collaboration", status: "Approved", date: "2026-03-18" },
    { id: "3", name: "Dr. Emily Rodriguez", organization: "Berkeley", type: "Partnership", status: "Pending", date: "2026-03-15" },
    { id: "4", name: "John Smith", organization: "Google Research", type: "Dataset Access", status: "Rejected", date: "2026-03-10" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Access Requests</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Organization</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Request Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{req.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{req.organization}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{req.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    req.status === "Approved" ? "bg-green-100 text-green-800" :
                    req.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{req.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
