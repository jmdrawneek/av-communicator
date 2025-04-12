import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-8 flex flex-col items-center">
        <div className="space-y-8 w-full max-w-7xl">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to AV Communicator</h1>
            <p className="text-muted-foreground">Manage your AV system with ease</p>
          </div>

          <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/rooms"
              className="group rounded-lg border border-border/20 bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-border/40"
            >
              <h2 className="text-lg font-semibold text-foreground group-hover:text-accent">View Rooms</h2>
              <p className="text-muted-foreground group-hover:text-accent/80">Manage your rooms and associated dashboards</p>
            </Link>

            <Link
              href="/automations"
              className="group rounded-lg border border-border/20 bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-border/40"
            >
              <h2 className="text-lg font-semibold text-foreground group-hover:text-accent">View Automations</h2>
              <p className="text-muted-foreground group-hover:text-accent/80">Create and manage your automations</p>
            </Link>

            <Link
              href="/devices"
              className="group rounded-lg border border-border/20 bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-border/40"
            >
              <h2 className="text-lg font-semibold text-foreground group-hover:text-accent">View Devices</h2>
              <p className="text-muted-foreground group-hover:text-accent/80">Manage your connected devices</p>
            </Link>
          </nav>
        </div>
      </main>
      <footer className="p-8 border-t border-border/20 text-center">
      </footer>
    </div>
  );
}
