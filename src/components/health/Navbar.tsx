import { Link, useNavigate } from "@tanstack/react-router";
import { Activity, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-50 group-hover:opacity-80 transition" />
            <div className="relative h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">Aurum<span className="text-accent">.</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/symptom-checker" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Symptom AI</Link>
          <Link to="/remedies" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Remedies</Link>
          <Link to="/doctors" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Find Doctor</Link>
          {user && <Link to="/dashboard" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Dashboard</Link>}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/dashboard" })}>
                <UserIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={async () => { await signOut(); navigate({ to: "/" }); }}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/auth" })}>Sign in</Button>
              <Button size="sm" className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90" onClick={() => navigate({ to: "/auth" })}>Get started</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}