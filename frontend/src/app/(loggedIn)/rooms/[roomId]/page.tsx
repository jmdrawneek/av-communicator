'use client';

import React, { useEffect, useState } from "react";

import { type RoomConfig, useRoomContext } from "@/context/roomContext";
import { DashboardOrganiser } from "@/components/dashboardOrganiser";
import { DashboardController } from "@/components/dashboardController";
import { DashboardProvider, useDashboardContext } from "@/context/dashboardContext";


import styles from "./styles.module.scss";

export default function Page({
    params,
}: {
    params: Promise<{ roomId: string }>
}) {
    const { getRoom, currentRoom } = useRoomContext();
    const [slug, setSlug] = useState<string | null>(null);
    const [theRoom, setTheRoom] = useState<RoomConfig | null>(null);

    useEffect(() => {
        (async () => {
            const theSlug = (await params).roomId;
            const theRoom = await getRoom(theSlug);

            setTheRoom(theRoom);
            setSlug(theSlug);
        })();
    }, [getRoom, params]);

    console.log({ currentRoom })

    return (
        <DashboardProvider>
            <div className={styles.container}>
                <h1 className={styles.title}>{currentRoom?.name}</h1>
                {currentRoom && <DashboardController roomId={currentRoom.id} />}
                <div className={styles.dashboards}>
                    {currentRoom && <DashboardOrganiser currentRoom={currentRoom} />}
                </div>
            </div>
        </DashboardProvider>
    )
}