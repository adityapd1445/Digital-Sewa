import Link from "next/link";

export default function Home() {
  const cards = [
    {
      title: "Request Help",
      description: "Submit a new help request and reach the community.",
      href: "/request-help",
    },
    {
      title: "View Requests",
      description: "Browse all help requests submitted by users.",
      href: "/view-requests",
    },
    {
      title: "Donate",
      description: "Share support by making a donation.",
      href: "/donate",
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center">
      <div className="w-full max-w-5xl space-y-8 rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-sm">
        <section className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Digital Sewa</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Help the community with requests and donations.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600">
            Use the links below to request support, view active requests, or contribute a donation. Everything works with Tailwind CSS and Next.js App Router.
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:-translate-y-1 hover:bg-slate-100"
            >
              <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-600">
                Go to {card.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
