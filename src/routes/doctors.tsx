import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/health/Navbar";
import { Footer } from "@/components/health/Footer";
import { MapPin, Star, Phone, Calendar, Loader2, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapBg from "@/assets/map-bg.jpg";

export const Route = createFileRoute("/doctors")({
  head: () => ({ meta: [{ title: "Find a Doctor — Aurum" }, { name: "description", content: "Locate verified physicians near you, filtered by specialty." }] }),
  component: Doctors,
});

const SPECS = ["All", "General", "ENT", "Cardiology", "Dermatology", "Pediatrics", "Orthopedics"];

const DOCTORS = [
  { name: "Dr. Anika Rao", spec: "ENT", rating: 4.9, exp: 12, dist: 0.8, addr: "Lotus Medical Centre, Indiranagar", color: "from-primary to-primary-glow" },
  { name: "Dr. Marcus Chen", spec: "Cardiology", rating: 4.8, exp: 18, dist: 1.2, addr: "Heart Institute, MG Road", color: "from-accent to-amber-400" },
  { name: "Dr. Priya Nair", spec: "General", rating: 4.7, exp: 9, dist: 0.5, addr: "Wellness Clinic, Koramangala", color: "from-emerald-500 to-teal-500" },
  { name: "Dr. Rahul Verma", spec: "Dermatology", rating: 4.9, exp: 14, dist: 1.8, addr: "Skin & Beyond, HSR Layout", color: "from-rose-400 to-pink-500" },
  { name: "Dr. Sara Khan", spec: "Pediatrics", rating: 5.0, exp: 11, dist: 1.4, addr: "Little Bloom Hospital, BTM", color: "from-sky-400 to-indigo-500" },
  { name: "Dr. James O'Connor", spec: "Orthopedics", rating: 4.6, exp: 21, dist: 2.3, addr: "Bone & Joint Centre, Jayanagar", color: "from-violet-400 to-purple-500" },
  { name: "Dr. Leila Santos", spec: "General", rating: 4.8, exp: 7, dist: 0.9, addr: "City Clinic, Whitefield", color: "from-teal-400 to-cyan-500" },
  { name: "Dr. Vikram Iyer", spec: "ENT", rating: 4.7, exp: 16, dist: 2.0, addr: "ENT Specialty, Malleshwaram", color: "from-amber-400 to-orange-500" },
];

function Doctors() {
  const [spec, setSpec] = useState("All");
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => { setLoc({ lat: p.coords.latitude, lng: p.coords.longitude }); setLocating(false); },
        () => setLocating(false),
        { timeout: 5000 }
      );
    } else setLocating(false);
  }, []);

  const filtered = (spec === "All" ? DOCTORS : DOCTORS.filter(d => d.spec === spec)).sort((a,b) => a.dist - b.dist);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 opacity-30">
          <img src={mapBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1536} height={1024} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Verified physicians</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-light tracking-tight">A trusted doctor, <span className="italic text-gradient">moments away</span>.</h1>
            <p className="mt-5 text-lg text-muted-foreground">Curated specialists near you. Real reviews, transparent distance, instant booking.</p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/60 text-sm">
              {locating ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <MapPin className="h-4 w-4 text-accent" />}
              {loc ? <span>Showing doctors near <span className="font-medium">your location</span></span> : locating ? "Detecting location…" : "Showing curated nearby doctors"}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {SPECS.map((s) => (
              <button key={s} onClick={() => setSpec(s)}
                className={`px-4 py-2 rounded-full text-sm border transition ${spec === s ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft" : "border-border/60 bg-card/60 hover:bg-card text-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d, i) => (
            <article key={d.name} className="group rounded-3xl border border-border/60 bg-card p-6 hover:shadow-elegant transition-all hover:-translate-y-1 animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start gap-4">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${d.color} flex items-center justify-center shadow-soft shrink-0`}>
                  <Stethoscope className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl truncate">{d.name}</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">{d.spec} · {d.exp} yrs</p>
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="font-medium">{d.rating}</span>
                    <span className="text-muted-foreground">· {d.dist} km</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>{d.addr}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button size="sm" className="rounded-full bg-gradient-primary text-primary-foreground"><Calendar className="h-3.5 w-3.5" /> Book</Button>
                <Button size="sm" variant="outline" className="rounded-full"><Phone className="h-3.5 w-3.5" /> Call</Button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}