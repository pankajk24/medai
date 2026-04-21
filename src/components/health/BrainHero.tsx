import brain from "@/assets/hero-brain.jpg";

export function BrainHero() {
  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto">
      {/* Outer rotating rings */}
      <div className="absolute inset-0 animate-spin-slow">
        <div className="absolute inset-0 rounded-full border border-primary/20" />
        <div className="absolute inset-6 rounded-full border border-primary/15 border-dashed" />
      </div>
      <div className="absolute inset-0 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "60s" }}>
        <div className="absolute inset-12 rounded-full border border-accent/20" />
      </div>

      {/* Glow */}
      <div className="absolute inset-10 rounded-full bg-gradient-primary opacity-20 blur-3xl animate-pulse-glow" />

      {/* Brain image */}
      <div className="absolute inset-8 rounded-full overflow-hidden shadow-elegant animate-float-slow">
        <img src={brain} alt="3D brain visualization" className="w-full h-full object-cover" />
      </div>

      {/* Floating data chips */}
      <div className="absolute top-4 right-0 px-3 py-2 rounded-xl bg-card/90 backdrop-blur shadow-soft border border-border/50 animate-float-slow" style={{ animationDelay: "1s" }}>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Heart rate</div>
        <div className="text-sm font-semibold text-foreground">72 <span className="text-xs text-muted-foreground">bpm</span></div>
      </div>
      <div className="absolute bottom-8 left-0 px-3 py-2 rounded-xl bg-card/90 backdrop-blur shadow-soft border border-border/50 animate-float-slow" style={{ animationDelay: "2s" }}>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">SpO₂</div>
        <div className="text-sm font-semibold text-foreground">98<span className="text-xs text-muted-foreground">%</span></div>
      </div>
      <div className="absolute top-1/2 -right-2 px-3 py-2 rounded-xl bg-card/90 backdrop-blur shadow-soft border border-border/50 animate-float-slow" style={{ animationDelay: "3s" }}>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">AI scan</div>
        <div className="text-sm font-semibold text-primary">Active</div>
      </div>
    </div>
  );
}