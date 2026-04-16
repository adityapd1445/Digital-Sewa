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

interface Donation {
  _id: string;
  amount: number;
  message?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [requestsRes, donationsRes] = await Promise.all([
          fetch("/api/requests"),
          fetch("/api/donations"),
        ]);

        if (!requestsRes.ok || !donationsRes.ok) {
          setError("Unable to load dashboard data.");
          return;
        }

        const requestsJson = await requestsRes.json();
        const donationsJson = await donationsRes.json();

        setRequests(requestsJson.requests || []);
        setDonations(donationsJson.donations || []);
      } catch (err) {
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Admin Dashboard</p>
        <h1 className="text-3xl font-semibold text-slate-900">Overview</h1>
        <p className="text-slate-600">Monitor help requests and donations in real time.</p>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading dashboard...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total Requests</p>
              <p className="mt-4 text-5xl font-semibold text-slate-900">{requests.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total Donations</p>
              <p className="mt-4 text-5xl font-semibold text-slate-900">{donations.length}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-900">Recent Requests</h2>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                {requests.length} total
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {requests.length === 0 ? (
                <p className="text-slate-600">No requests submitted yet.</p>
              ) : (
                requests.map((request) => (
                  <div key={request._id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{request.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{request.category}</p>
                      </div>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                        {request.status}
                      </span>
                    </div>
                    <p className="mt-4 text-slate-700">{request.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{new Date(request.createdAt).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
