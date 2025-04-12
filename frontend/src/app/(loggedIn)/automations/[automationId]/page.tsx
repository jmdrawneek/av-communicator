'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAutomationContext } from "@/context/automationContext";
import { Button } from "@/components/button";
import FlowWrapper from "@/components/flowbuilder";
import { useCurrentAutomation } from "@/context/currentAutomationContext";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function Page({
    params,
}: {
    params: Promise<{ automationId: string }>
}) {
    const { getAutomation, saveAutomation, deleteAutomation, currentAutomation, notSavedAutomations, setNotSavedAutomations } = useAutomationContext();
    const { currentAutomation: currentAutomationContext, setLoadedAutomation, setNodes, setEdges } = useCurrentAutomation();
    const [isEditing, setIsEditing] = useState(false);
    const [automationName, setAutomationName] = useState("");
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const automationId = (await params).automationId;
            const automation = await getAutomation(automationId);
            if (automation) {
                setAutomationName(automation.name);
            }
        })();
    }, [getAutomation, notSavedAutomations, params, currentAutomation, setLoadedAutomation, setNodes, setEdges]);

    useEffect(() => {
        // If something changes in the currentAutomationContext, we need to set isEditing to true
        setIsEditing(true);
    }, [currentAutomationContext]);

    const handleSave = () => {
        const newItem = {
            ...currentAutomationContext,
            ...currentAutomation,
            name: automationName
        }
        if (newItem?.id) {
            saveAutomation({
                id: newItem.id,
                name: newItem.name,
                nodes: newItem.nodes || [],
                edges: newItem.edges || [],
                roomId: newItem.roomId,
                dashboardId: newItem.dashboardId
            });
            setIsEditing(false);
            // Remove the automation from the notSavedAutomations array
            setNotSavedAutomations(notSavedAutomations.filter((automation) => automation.id !== newItem.id));
        }
    };

    const handleDelete = () => {
        if (currentAutomation) {
            deleteAutomation(currentAutomation.id);
            router.push("/automations");
        }
    };

    return (
        <div className="space-y-8 p-8">
            <div className="space-y-6">
                <Link
                    href="/automations"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-accent"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to automations
                </Link>

                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        {isEditing ? (
                            <input
                                type="text"
                                value={automationName}
                                onChange={(e) => setAutomationName(e.target.value)}
                                className="w-full rounded-md border border-border/20 bg-card px-3 py-2 text-2xl font-bold focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                            />
                        ) : (
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                {currentAutomation?.name}
                            </h1>
                        )}

                        {currentAutomation && (
                            <div className="flex items-center gap-4">
                                {currentAutomation.roomId && (
                                    <Link
                                        href={`/rooms/${currentAutomation.roomId}`}
                                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent"
                                    >
                                        <span>Room {currentAutomation.roomId}</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                                {currentAutomation.dashboardId && (
                                    <Link
                                        href={`/dashboards/${currentAutomation.dashboardId}`}
                                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent"
                                    >
                                        <span>Dashboard {currentAutomation.dashboardId}</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {!isEditing && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            variant={isEditing ? "primary" : "outline"}
                            size="sm"
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-border/20 bg-card">
                <FlowWrapper />
            </div>
        </div>
    );
} 