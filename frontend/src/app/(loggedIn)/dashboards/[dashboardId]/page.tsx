'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { DashboardProvider, useDashboardContext } from "@/context/dashboardContext";
import { Button } from "@/components/button";

import styles from "./styles.module.scss";

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
            <div className={styles.container}>
                <div className={styles.header}>
                    {currentDashboard?.roomId && (
                        <Link href={`/rooms/${currentDashboard.roomId}`} className={styles.backLink}>
                            ← Back to room
                        </Link>
                    )}

                    <div className={styles.titleContainer}>
                        {isEditing ? (
                            <input
                                type="text"
                                value={dashboardName}
                                onChange={(e) => setDashboardName(e.target.value)}
                                className={styles.titleInput}
                            />
                        ) : (
                            <h1 className={styles.title}>{currentDashboard?.name}</h1>
                        )}

                        <div className={styles.buttons}>
                            {isEditing ? (
                                <Button buttonStyle="primarySmall" onClick={handleSave}>Save</Button>
                            ) : (
                                <Button buttonStyle="primarySmall" onClick={() => setIsEditing(true)}>Edit</Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.dashboardContent}>
                    <h2>Dashboard Builder</h2>
                    <p>This is where the dashboard builder UI would be implemented.</p>
                    {/* Dashboard builder components would go here */}
                </div>
            </div>
        </DashboardProvider>
    )
}