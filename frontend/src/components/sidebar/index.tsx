import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FlowControls } from "../flowControl";
import {
    Home,
    Settings,
    Power,
    Cpu,
    Zap
} from "lucide-react";

const navItems = [
    { href: "/rooms", label: "Rooms", icon: Home },
    { href: "/devices", label: "Devices", icon: Cpu },
    { href: "/automations", label: "Automations", icon: Zap },
    { href: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col bg-card p-6">
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground">AV Control</h2>
                <p className="mt-1 text-sm text-muted-foreground">System Management</p>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                                isActive
                                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                                    : "text-muted-foreground hover:bg-accent/10 hover:text-accent"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive ? "text-accent-foreground" : "text-muted-foreground")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto space-y-4">
                <div className="h-px w-full bg-border/50" />
                <FlowControls />
                <Link
                    href="/logout"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                    <Power className="h-5 w-5" />
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;