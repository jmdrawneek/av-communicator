'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { DashboardProvider, useDashboardContext } from "@/context/dashboardContext";
import { Button } from "@/components/button";

export default function Page({
    params,
}: {
    params: Promise<{ dashboardId: string }>
}) {
    const { getDashboard, currentDashboard, saveDashboard } = useDashboardContext();
    const [isEditing, setIsEditing] = useState(false);
    const [dashboardName, setDashboardName] = useState("");

    useEffect(() => {
        (async () => {
            const theDashboardId = (await params).dashboardId;
            const theDashboard = await getDashboard(theDashboardId);

            setDashboardName(theDashboard?.name || "");
        })();
    }, [getDashboard, params]);

    const handleSave = () => {
        if (currentDashboard) {
            saveDashboard({
                ...currentDashboard,
                name: dashboardName
            });
            setIsEditing(false);
        }
    };

    return (
        <DashboardProvider>
            <div className="container mx-auto p-8">
                <div className="mb-8">
                    {currentDashboard?.roomId && (
                        <Link
                            href={`/rooms/${currentDashboard.roomId}`}
                            className="text-muted-foreground hover:text-accent transition-colors"
                        >
                            ← Back to room
                        </Link>
                    )}

                    <div className="flex items-center justify-between mt-4">
                        {isEditing ? (
                            <input
                                type="text"
                                value={dashboardName}
                                onChange={(e) => setDashboardName(e.target.value)}
                                className="text-2xl font-semibold bg-secondary/50 border border-border/20 rounded-md px-3 py-2 w-full max-w-[500px] focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        ) : (
                            <h1 className="text-2xl font-semibold text-foreground">{currentDashboard?.name}</h1>
                        )}

                        <div className="flex gap-2">
                            {isEditing ? (
                                <Button variant="primary" size="sm" onClick={handleSave}>Save</Button>
                            ) : (
                                <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-border/20 bg-card p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Dashboard Builder</h2>
                    <p className="text-muted-foreground">This is where the dashboard builder UI would be implemented.</p>
                    {/* Dashboard builder components would go here */}
                </div>
            </div>
        </DashboardProvider>
    )
}