import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/health/Navbar";
import { Footer } from "@/components/health/Footer";
import { Search, AlertCircle, Leaf } from "lucide-react";
import remediesImg from "@/assets/remedies.jpg";

export const Route = createFileRoute("/remedies")({
  head: () => ({ meta: [{ title: "Home Remedies — Aurum" }, { name: "description", content: "Evidence-based home remedies and OTC guidance for everyday minor health concerns." }] }),
  component: Remedies,
});

const REMEDIES = [
  { cat: "Throat", title: "Sore Throat", remedies: ["Warm saline gargle 3×/day", "Honey + ginger tea (1 tsp honey)", "Lozenges with menthol"], otc: "Paracetamol 500mg q6h if needed", flag: "Difficulty swallowing or fever > 39°C" },
  { cat: "Head", title: "Tension Headache", remedies: ["Hydrate (500ml water)", "10-min temple massage", "Cool compress on forehead", "Quiet, dark room rest"], otc: "Ibuprofen 400mg with food", flag: "Sudden severe headache, vision changes, neck stiffness" },
  { cat: "Stomach", title: "Indigestion", remedies: ["Ginger tea after meals", "Avoid lying down for 2h", "Small, slow meals", "Chamomile tea"], otc: "Antacid (calcium carbonate) as needed", flag: "Black stools, vomiting blood, severe pain" },
  { cat: "Cold", title: "Common Cold", remedies: ["Steam inhalation 2×/day", "Vitamin C-rich foods", "Honey-lemon water", "Plenty of rest"], otc: "Decongestant if blocked nose", flag: "Fever > 39°C lasting > 3 days, breathing difficulty" },
  { cat: "Skin", title: "Minor Burns", remedies: ["Cool (not cold) running water 10 min", "Aloe vera gel", "Loose cotton dressing"], otc: "Paracetamol for pain", flag: "Burn larger than palm, on face/hands, or blistering" },
  { cat: "Sleep", title: "Insomnia", remedies: ["Chamomile or valerian tea", "No screens 1h before bed", "Cool bedroom (18°C)", "4-7-8 breathing technique"], otc: "Melatonin 1-3mg short-term", flag: "Persistent > 3 weeks, daytime exhaustion" },
  { cat: "Muscle", title: "Lower Back Pain", remedies: ["Hot pack 20 min, 3×/day", "Gentle stretches (cat-cow)", "Walking 20 min"], otc: "Ibuprofen 400mg with food", flag: "Numbness in legs, loss of bladder control" },
  { cat: "Energy", title: "Mild Fatigue", remedies: ["10-min sunlight exposure", "Iron-rich snacks (dates, nuts)", "Hydration + electrolytes"], otc: "Multivitamin (short-term)", flag: "Persistent > 2 weeks or with weight loss" },
];

function Remedies() {
  const [q, setQ] = useState("");
  const filtered = REMEDIES.filter(r => r.title.toLowerCase().includes(q.toLowerCase()) || r.cat.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Gentle care</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-light tracking-tight">Time-honored remedies, <span className="italic text-gradient">science-backed</span>.</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">For minor concerns, the kitchen often holds the answer. Browse trusted home remedies — and know exactly when to see a doctor.</p>
            <div className="mt-8 relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a symptom…"
                className="w-full h-12 pl-12 pr-5 rounded-full border border-border/60 bg-card/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-elegant border border-border/50 aspect-[5/4]">
            <img src={remediesImg} alt="Natural remedies" className="w-full h-full object-cover" loading="lazy" width={1280} height={1024} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r, i) => (
            <article key={r.title} className="group rounded-3xl border border-border/60 bg-card p-7 hover:shadow-elegant transition-all hover:-translate-y-1 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary">{r.cat}</span>
                  <h3 className="mt-2 font-display text-2xl">{r.title}</h3>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-gradient-primary/10 flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-primary" />
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {r.remedies.map((rem) => (
                  <li key={rem} className="flex gap-2"><span className="text-primary">·</span> {rem}</li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-border/50">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">OTC option</div>
                <p className="mt-1 text-sm">{r.otc}</p>
              </div>
              <div className="mt-4 rounded-xl bg-destructive/5 border border-destructive/20 p-3 flex gap-2">
                <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <div className="text-xs text-foreground/80"><span className="font-medium text-destructive">See a doctor:</span> {r.flag}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}