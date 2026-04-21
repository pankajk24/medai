import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/health/Navbar";
import { Footer } from "@/components/health/Footer";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/conversations/$id")({
  head: () => ({ meta: [{ title: "Conversation — Aurum" }] }),
  component: ConvDetail,
});

type Msg = { id: string; role: string; content: string; created_at: string };

function ConvDetail() {
  const { id } = Route.useParams();
  const [messages, setMessages] = useState<Msg[] | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    supabase.from("conversations").select("title").eq("id", id).single().then(({ data }) => setTitle(data?.title ?? ""));
    supabase.from("messages").select("id,role,content,created_at").eq("conversation_id", id).order("created_at").then(({ data }) => setMessages(data ?? []));
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="h-4 w-4" /> Back to dashboard</Link>
        <h1 className="font-display text-4xl font-light tracking-tight">{title || "Consultation"}</h1>
        <div className="mt-8 space-y-4">
          {messages === null ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : messages.length === 0 ? <p className="text-muted-foreground text-sm">No messages.</p> : messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-gradient-primary text-primary-foreground shadow-elegant" : "bg-card border border-border/60"}`}>
                <div className="text-[10px] uppercase tracking-wider opacity-60">{m.role === "user" ? "You" : "Aurum AI"}</div>
                <div className="mt-1 text-sm whitespace-pre-wrap">{m.content}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}