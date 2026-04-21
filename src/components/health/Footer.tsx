import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/30 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold">Aurum<span className="text-accent">.</span></span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">Premium AI healthcare guidance, gentle home remedies, and trusted physicians — all in one place.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Symptom AI</li><li>Remedies</li><li>Find a doctor</li><li>Dashboard</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li><li>Privacy</li><li>HIPAA notice</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Disclaimer</h4>
          <p className="text-xs text-muted-foreground">Aurum provides information only and is not a substitute for professional medical advice. In an emergency, call your local emergency number.</p>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Aurum Health</div>
    </footer>
  );
}