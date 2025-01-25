'use client';

import React, { useEffect, useState } from "react";

import { type RoomConfig, useRoomContext } from "@/context/roomContext";
import { DashboardOrganiser } from "@/components/dashboardOrganiser";
import { DashboardController } from "@/components/dashboardController";
import { DashboardConfig, DashboardProvider, useDashboardContext } from "@/context/dashboardContext";


import styles from "./styles.module.scss";

export default function Page({
    params,
}: {
    params: Promise<{ dashboardId: string }>
}) {
    const { getDashboard, currentDashboard } = useDashboardContext();
    const [dashboardId, setDashboardId] = useState<string | null>(null);
    const [theDashboard, setTheDashboard] = useState<DashboardConfig | null>(null);

    useEffect(() => {
        (async () => {
            const theDashboardId = (await params).dashboardId;

            const theDashboard = await getDashboard(theDashboardId);
            setTheDashboard(theDashboard);
            setDashboardId(theDashboardId);
        })();
    }, [getDashboard, params]);

    console.log({ currentDashboard })

    return (
        <DashboardProvider>
            <div className={styles.container}>
                <h1 className={styles.title}>{currentDashboard?.name}</h1>
                {currentDashboard && <DashboardController roomId={currentDashboard.id} />}
                <div className={styles.dashboards}>
                    {currentDashboard && JSON.stringify(currentDashboard)}
                </div>
            </div>
        </DashboardProvider>
    )
}