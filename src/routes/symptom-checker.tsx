import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/health/Navbar";
import { Footer } from "@/components/health/Footer";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Loader2, Stethoscope } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/symptom-checker")({
  head: () => ({ meta: [{ title: "Symptom AI — Aurum" }, { name: "description", content: "Conversational AI symptom checker with home remedies and physician guidance." }] }),
  component: SymptomChecker,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "I have a headache and feel nauseous",
  "Sore throat and mild fever for 2 days",
  "Lower back pain after sitting all day",
  "Trouble sleeping and feeling anxious",
];

function SymptomChecker() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    let convId = conversationId;
    if (user) {
      try {
        if (!convId) {
          const { data, error } = await supabase.from("conversations")
            .insert({ user_id: user.id, title: text.slice(0, 60) })
            .select().single();
          if (error) throw error;
          convId = data.id;
          setConversationId(convId);
        }
        await supabase.from("messages").insert({ conversation_id: convId!, user_id: user.id, role: "user", content: text });
      } catch (e) { console.error(e); }
    }

    let assistantText = "";
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/symptom-chat`;
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (resp.status === 429) { toast.error("Slow down — too many requests."); setLoading(false); return; }
      if (resp.status === 402) { toast.error("AI credits exhausted. Add funds in your Lovable workspace."); setLoading(false); return; }
      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx); buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const p = JSON.parse(json);
            const c = p.choices?.[0]?.delta?.content;
            if (c) {
              assistantText += c;
              setMessages((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantText } : m));
            }
          } catch { buf = line + "\n" + buf; break; }
        }
      }

      if (user && convId && assistantText) {
        await supabase.from("messages").insert({ conversation_id: convId, user_id: user.id, role: "assistant", content: assistantText });
        await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", convId);
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to get a response");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 py-8 flex flex-col">
        <div className="text-center mb-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs">
            <Sparkles className="h-3 w-3 text-accent" /> Powered by clinical-grade AI
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-light tracking-tight">Tell me what you're feeling.</h1>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Describe your symptoms in your own words. I'll suggest possible causes, gentle home remedies, and when to see a doctor.</p>
          {!user && <p className="mt-3 text-xs text-muted-foreground">💡 <button onClick={() => navigate({ to: "/auth" })} className="text-primary underline">Sign in</button> to save this conversation.</p>}
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-6 space-y-4 min-h-[400px]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <Stethoscope className="h-12 w-12 text-primary/30" />
              <p className="mt-4 text-sm text-muted-foreground">Try one of these to start</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-2 max-w-2xl">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-left text-sm px-4 py-3 rounded-2xl border border-border/60 bg-background/60 hover:border-primary/40 hover:bg-card transition">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-gradient-primary text-primary-foreground shadow-elegant" : "bg-background border border-border/60 shadow-soft"}`}>
                  <div className="text-[10px] uppercase tracking-wider opacity-60">{m.role === "user" ? "You" : "Aurum AI"}</div>
                  <div className="mt-1 text-sm whitespace-pre-wrap leading-relaxed">{m.content || (loading && i === messages.length - 1 ? <Loader2 className="h-4 w-4 animate-spin" /> : "")}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-4 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe your symptoms…" disabled={loading}
            className="flex-1 h-12 px-5 rounded-full border border-border/60 bg-card/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <Button type="submit" disabled={loading || !input.trim()} className="h-12 w-12 rounded-full bg-gradient-primary text-primary-foreground p-0 shadow-elegant">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
        <p className="mt-3 text-center text-xs text-muted-foreground">Aurum is informational and not a substitute for medical advice. In an emergency, call your local emergency number.</p>
      </main>
      <Footer />
    </div>
  );
}