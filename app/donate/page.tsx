"use client";

import { FormEvent, useState } from "react";

export default function DonatePage() {
  const [amount, setAmount] = useState<number | string>("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const response = await fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount), message }),
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (response.ok) {
      setStatus("Donation saved successfully.");
      setAmount("");
      setMessage("");
    } else {
      setStatus(data.message || "Unable to save donation.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Donate</p>
        <h1 className="text-3xl font-semibold text-slate-900">Share support with a donation</h1>
        <p className="text-slate-600">Enter an amount and optional message to contribute.</p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Amount</span>
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter donation amount"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Add an optional note"
            className="mt-2 h-28 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Saving..." : "Send Donation"}
          </button>
          {status ? <p className="text-sm text-slate-700">{status}</p> : null}
        </div>
      </form>
    </div>
  );
}
