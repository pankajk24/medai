import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, MapPin, Leaf, Shield, Activity, MessageCircle, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/health/Navbar";
import { Footer } from "@/components/health/Footer";
import { BrainHero } from "@/components/health/BrainHero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum — Premium AI Healthcare" },
      { name: "description", content: "Describe symptoms, get gentle home remedies, find the nearest physician — all powered by AI." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              Powered by clinical-grade AI · v2.0
            </div>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight">
              Your health,<br />
              <span className="italic font-normal text-gradient">understood</span> in seconds.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Describe what you're feeling. Aurum's AI listens, suggests gentle home remedies for minor concerns, and connects you to the nearest trusted physician when it matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-all">
                <Link to="/symptom-checker">Start a consultation <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-border/70 hover:bg-secondary">
                <Link to="/doctors">Find a doctor <MapPin className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-primary" /> HIPAA-aligned</div>
              <div className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-accent" /> Trained on peer-reviewed data</div>
            </div>
          </div>

          <div className="relative">
            <BrainHero />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/50 bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: "2.4M", l: "Consultations" },
            { v: "98.7%", l: "Triage accuracy" },
            { v: "12k+", l: "Verified physicians" },
            { v: "24/7", l: "Always available" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl font-light text-foreground">{s.v}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">What we do</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-light tracking-tight">A complete care companion, beautifully calm.</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            { icon: MessageCircle, title: "Symptom AI", desc: "Conversational diagnosis assistance with safety-flag detection.", to: "/symptom-checker", color: "from-primary to-primary-glow" },
            { icon: Leaf, title: "Home remedies", desc: "Evidence-based remedies and OTC guidance for minor concerns.", to: "/remedies", color: "from-emerald-500 to-teal-500" },
            { icon: MapPin, title: "Nearest physician", desc: "Geo-located doctors filtered by your symptoms in seconds.", to: "/doctors", color: "from-accent to-amber-400" },
          ].map((f, i) => (
            <Link key={f.title} to={f.to} className="group relative rounded-3xl border border-border/60 bg-card/60 p-8 hover:shadow-elegant transition-all hover:-translate-y-1 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-soft`}>
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-6 font-display text-2xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-primary">Open <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/40 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">How it works</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-light">Three calm steps. Real clarity.</h2>
              <div className="mt-10 space-y-8">
                {[
                  { n: "01", t: "Describe how you feel", d: "Type or speak. The AI asks gentle clarifying questions." },
                  { n: "02", t: "Receive guided care", d: "Likely causes, safe home remedies, and OTC dosage notes." },
                  { n: "03", t: "Connect to a physician", d: "If needed, see verified doctors near you with one tap." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-6 group">
                    <div className="font-display text-3xl text-primary/40 group-hover:text-primary transition">{s.n}</div>
                    <div>
                      <h3 className="font-display text-xl">{s.t}</h3>
                      <p className="mt-1 text-sm text-muted-foreground max-w-md">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant border border-border/50">
              <div className="absolute inset-0 bg-gradient-primary opacity-10" />
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="rounded-2xl bg-card p-4 shadow-soft max-w-[80%] animate-fade-up">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">You</div>
                    <p className="text-sm mt-1">I've had a sore throat and mild fever for two days.</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-primary text-primary-foreground p-4 shadow-elegant max-w-[85%] ml-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
                    <div className="text-[10px] uppercase tracking-wider opacity-70">Aurum AI</div>
                    <p className="text-sm mt-1">Likely a viral pharyngitis. Try warm saline gargles 3×/day, honey-ginger tea, and rest. Paracetamol 500mg if fever &gt; 38°C. <strong>See a doctor</strong> if it lasts beyond 5 days or you develop difficulty swallowing.</p>
                  </div>
                  <div className="rounded-2xl bg-card p-4 shadow-soft max-w-[80%] animate-fade-up" style={{ animationDelay: "400ms" }}>
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      <span className="font-medium">Dr. Anika Rao · ENT · 0.8 km</span>
                    </div>
                    <button className="mt-2 text-xs text-primary font-medium">Book an appointment →</button>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground text-center">Live demo · Conversation snippet</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <Activity className="h-10 w-10 text-primary mx-auto" />
        <h2 className="mt-6 font-display text-5xl sm:text-6xl font-light tracking-tight max-w-3xl mx-auto">Healthcare, <span className="italic text-gradient">reimagined</span> for the way you live.</h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">Join thousands who turn to Aurum first — for clarity, calm, and the right next step.</p>
        <Button asChild size="lg" className="mt-8 rounded-full bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow">
          <Link to="/auth">Create free account <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </section>

      <Footer />
    </div>
  );
}