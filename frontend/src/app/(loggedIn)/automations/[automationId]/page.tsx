'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { AutomationProvider, useAutomationContext } from "@/context/automationContext";
import { Button } from "@/components/button";
import FlowWrapper from "@/components/flowbuilder";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useCurrentAutomation } from "@/context/currentAutomationContext";

export default function Page({
    params,
}: {
    params: Promise<{ automationId: string }>
}) {
    const { getAutomation, saveAutomation, deleteAutomation, currentAutomation, notSavedAutomations } = useAutomationContext();
    const { currentAutomation: currentAutomationContext } = useCurrentAutomation();
    const [isEditing, setIsEditing] = useState(false);
    const [automationName, setAutomationName] = useState("");
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const automationId = (await params).automationId;
            const automation = await getAutomation(automationId);
            console.log({ automation, automationId, notSavedAutomations })
            setAutomationName(automation?.name || "");
        })();
    }, [getAutomation, notSavedAutomations, params]);

    const handleSave = () => {
        const newItem = {
            ...currentAutomationContext,
            ...currentAutomation,

            name: automationName
        }
        console.log('SAving config ', { newItem, currentAutomationContext, currentAutomation })
        if (newItem && newItem.id) {
            saveAutomation(newItem);
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        if (currentAutomation) {
            deleteAutomation(currentAutomation.id);
            router.push("/automations");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/automations" className={styles.backLink}>
                    ← Back to automation
                </Link>

                <div className={styles.titleContainer}>
                    {isEditing ? (
                        <input
                            type="text"
                            value={automationName}
                            onChange={(e) => setAutomationName(e.target.value)}
                            className={styles.titleInput}
                        />
                    ) : (
                        <h1 className={styles.title}>{currentAutomation?.name}</h1>
                    )}

                    <div className={styles.buttons}>
                        {!isEditing && (
                            <Button buttonStyle="primarySmall" onClick={handleDelete}>Delete</Button>
                        )}
                        {isEditing ? (
                            <Button buttonStyle="primarySmall" onClick={handleSave}>Save</Button>
                        ) : (
                            <Button buttonStyle="primarySmall" onClick={() => setIsEditing(true)}>Edit</Button>
                        )}
                    </div>
                </div>

                {currentAutomation && (
                    <div className={styles.metadata}>
                        {currentAutomation.roomId && (
                            <span className={styles.metadataItem}>
                                Room: <Link href={`/rooms/${currentAutomation.roomId}`}>
                                    {currentAutomation.roomId}
                                </Link>
                            </span>
                        )}
                        {currentAutomation.dashboardId && (
                            <span className={styles.metadataItem}>
                                Dashboard: <Link href={`/dashboards/${currentAutomation.dashboardId}`}>
                                    {currentAutomation.dashboardId}
                                </Link>
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className={styles.automationContent}>
                <FlowWrapper />
            </div>
        </div>
    );
} 