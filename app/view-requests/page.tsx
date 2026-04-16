"use client";

import { useEffect, useState } from "react";

interface HelpRequest {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
}

export default function ViewRequestsPage() {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRequests() {
      try {
        const response = await fetch("/api/requests");
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to load requests.");
          return;
        }

        setRequests(data.requests || []);
      } catch (err) {
        setError("Unable to connect to the requests API.");
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">View Requests</p>
        <h1 className="text-3xl font-semibold text-slate-900">Community Help Requests</h1>
        <p className="text-slate-600">Browse all active help requests submitted through the platform.</p>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading requests...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-slate-500">No requests found yet. Be the first to submit one.</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <div key={request._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">{request.title}</h2>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  {request.category}
                </span>
              </div>
              <p className="mt-3 text-slate-700">{request.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>Status: {request.status}</span>
                <span>Created: {new Date(request.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
