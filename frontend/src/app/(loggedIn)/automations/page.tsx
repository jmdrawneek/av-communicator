'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAutomationContext } from "@/context/automationContext";
import { Button } from "@/components/button";
import { Plus, ExternalLink } from "lucide-react";
import { AutomationConfig } from "@/context/automationContext";

const demoAutomations: AutomationConfig[] = [
    {
        id: '1',
        nodes: [],
        edges: [],
        name: 'Room Lighting Automation',
        roomId: '1',
        dashboardId: '1'
    },
    {
        id: '2',
        nodes: [],
        edges: [],
        name: 'AV System Power On',
        roomId: '2',
        dashboardId: '2'
    }
];

const AutomationList = () => {
    const { notSavedAutomations, listAutomationsLocalStorage } = useAutomationContext();
    const [savedAutomations, setSavedAutomations] = useState<AutomationConfig[]>([]);

    useEffect(() => {
        // Refresh automations list when component mounts
        listAutomationsLocalStorage().then((loadedAutomations) => {
            if (loadedAutomations && loadedAutomations.length > 0) {
                setSavedAutomations(loadedAutomations);
            } else {
                // Show demo data if no automations are saved
                setSavedAutomations(demoAutomations);
            }
        });
    }, [listAutomationsLocalStorage]);

    const allAutomations = [...savedAutomations, ...notSavedAutomations];

    return (
        <div className="space-y-4">
            {allAutomations.length === 0 ? (
                <div className="rounded-lg border border-border/20 bg-card/50 p-6 text-center">
                    <p className="text-muted-foreground">
                        No automations found. Create your first automation to get started.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {allAutomations.map((automation) => (
                        <div
                            key={automation.id}
                            className="group rounded-lg border border-border/20 bg-card p-4 shadow-sm transition-all hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {automation.name}
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        {automation.roomId && (
                                            <Link
                                                href={`/rooms/${automation.roomId}`}
                                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent"
                                            >
                                                <span>Room {automation.roomId}</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </Link>
                                        )}
                                        {automation.dashboardId && (
                                            <Link
                                                href={`/dashboards/${automation.dashboardId}`}
                                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent"
                                            >
                                                <span>Dashboard {automation.dashboardId}</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </Link>
                                        )}
                                        {automation.notSaved && (
                                            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                                                Unsaved
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <Link href={`/automations/${automation.id}`}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        {automation.notSaved ? 'Continue Editing' : 'Edit'}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Automations = () => {
    const { addAutomation } = useAutomationContext();

    return (
        <div className="space-y-8 p-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Automations
                </h1>
                <p className="text-muted-foreground">
                    Create and manage automations for your AV system. Set up triggers and actions to automate your environment.
                </p>
            </div>

            <div className="flex justify-end">
                <Button onClick={() => addAutomation()} variant="primary" size="md">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Automation
                </Button>
            </div>

            <AutomationList />
        </div>
    );
};

export default function AutomationsPage() {
    return <Automations />;
} 