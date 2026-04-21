import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/health/Navbar";
import { Footer } from "@/components/health/Footer";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Activity, MessageCircle, Heart, TrendingUp, Calendar, ChevronRight, Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import humanImg from "@/assets/hero-human.jpg";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Aurum" }] }),
  component: Dashboard,
});

type Conv = { id: string; title: string; summary: string | null; updated_at: string };

const heartData = Array.from({ length: 24 }, (_, i) => ({ h: i, v: 65 + Math.round(Math.sin(i / 3) * 8 + Math.random() * 5) }));
const wellnessData = Array.from({ length: 7 }, (_, i) => ({ d: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i], score: 70 + Math.round(Math.sin(i) * 10 + Math.random() * 8) }));

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [convs, setConvs] = useState<Conv[]>([]);
  const [profile, setProfile] = useState<{ full_name: string | null } | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("conversations").select("id,title,summary,updated_at").order("updated_at", { ascending: false }).limit(20)
      .then(({ data }) => setConvs(data ?? []));
    supabase.from("profiles").select("full_name").eq("id", user.id).single().then(({ data }) => setProfile(data));
  }, [user]);

  const firstName = (profile?.full_name || user?.email?.split("@")[0] || "there").split(" ")[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 animate-fade-up">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Your wellness</p>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-light tracking-tight">Hello, <span className="italic text-gradient">{firstName}</span>.</h1>
            <p className="mt-1 text-muted-foreground">Here's a calm look at your health today.</p>
          </div>
          <Button onClick={() => navigate({ to: "/symptom-checker" })} className="rounded-full bg-gradient-primary text-primary-foreground shadow-elegant">
            <Plus className="h-4 w-4" /> New consultation
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Wellness score with 3D human */}
          <div className="lg:col-span-2 rounded-3xl border border-border/60 bg-card overflow-hidden relative shadow-soft">
            <div className="absolute inset-0 bg-hero opacity-50" />
            <div className="relative grid sm:grid-cols-2 gap-6 p-8">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Wellness score</div>
                <div className="mt-2 font-display text-7xl font-light text-gradient">87</div>
                <div className="mt-1 text-sm text-emerald-600 inline-flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +4 this week</div>
                <div className="mt-6 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={wellnessData}>
                      <defs>
                        <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.62 0.12 195)" stopOpacity={0.4}/>
                          <stop offset="100%" stopColor="oklch(0.62 0.12 195)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={10} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
                      <Area type="monotone" dataKey="score" stroke="oklch(0.42 0.08 195)" strokeWidth={2} fill="url(#wg)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="relative aspect-square">
                <div className="absolute inset-0 rounded-3xl overflow-hidden animate-float-slow">
                  <img src={humanImg} alt="AI human" className="w-full h-full object-cover" loading="lazy" width={1080} height={1920} />
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Heart rate</div>
                  <div className="mt-1 font-display text-3xl">72 <span className="text-base text-muted-foreground">bpm</span></div>
                </div>
                <Heart className="h-5 w-5 text-accent animate-pulse-glow" />
              </div>
              <div className="mt-3 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={heartData}>
                    <Line type="monotone" dataKey="v" stroke="oklch(0.72 0.16 35)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Today</div>
              <div className="mt-2 grid grid-cols-3 gap-3 text-center">
                <div><div className="font-display text-xl">8.2k</div><div className="text-[10px] text-muted-foreground uppercase">Steps</div></div>
                <div><div className="font-display text-xl">7.1h</div><div className="text-[10px] text-muted-foreground uppercase">Sleep</div></div>
                <div><div className="font-display text-xl">2.1L</div><div className="text-[10px] text-muted-foreground uppercase">Water</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation history */}
        <div className="mt-10 rounded-3xl border border-border/60 bg-card p-8 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl">Recent conversations</h2>
              <p className="text-sm text-muted-foreground mt-1">Your previous AI consultations</p>
            </div>
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          {convs.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="h-10 w-10 text-primary/30 mx-auto" />
              <p className="mt-3 text-sm text-muted-foreground">No conversations yet.</p>
              <Button asChild className="mt-4 rounded-full bg-gradient-primary text-primary-foreground"><Link to="/symptom-checker">Start your first consultation</Link></Button>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {convs.map((c) => (
                <Link key={c.id} to="/dashboard/conversations/$id" params={{ id: c.id }} className="flex items-center gap-4 py-4 group hover:bg-secondary/40 -mx-4 px-4 rounded-xl transition">
                  <div className="h-10 w-10 rounded-xl bg-gradient-primary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{c.title}</div>
                    <div className="text-xs text-muted-foreground inline-flex items-center gap-1.5 mt-0.5">
                      <Calendar className="h-3 w-3" /> {new Date(c.updated_at).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}