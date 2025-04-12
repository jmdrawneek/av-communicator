'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRoomContext } from "@/context/roomContext";
import { DashboardOrganiser } from "@/components/dashboardOrganiser";
import { DashboardController } from "@/components/dashboardController";
import { DashboardProvider } from "@/context/dashboardContext";
import { Button } from "@/components/button";

import styles from "./styles.module.scss";

export default function Page({
    params,
}: {
    params: Promise<{ roomId: string }>
}) {
    const { getRoom, currentRoom, saveRoom } = useRoomContext();
    const [isEditing, setIsEditing] = useState(false);
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        (async () => {
            const theRoomId = (await params).roomId;
            const theRoom = await getRoom(theRoomId);
            setRoomName(theRoom?.name || "");
        })();
    }, [getRoom, params]);

    const handleSave = () => {
        if (currentRoom) {
            saveRoom({
                ...currentRoom,
                name: roomName
            });
            setIsEditing(false);
        }
    };

    return (
        <DashboardProvider>
            <div className={styles.container}>
                <div className={`${styles.header} p-8`}>
                    <Link href="/rooms" className={styles.backLink}>
                        ← Back to rooms
                    </Link>

                    <div className={styles.titleContainer}>
                        {isEditing ? (
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                className={styles.titleInput}
                            />
                        ) : (
                            <h1 className={styles.title}>{currentRoom?.name}</h1>
                        )}

                        <div className={styles.buttons}>
                            {isEditing ? (
                                <Button buttonStyle="primarySmall" onClick={handleSave}>Save</Button>
                            ) : (
                                <Button buttonStyle="primarySmall" onClick={() => setIsEditing(true)}>Edit</Button>
                            )}
                        </div>
                    </div>

                    <p className={styles.description}>
                        Manage dashboards for this room. Add a new dashboard or edit existing ones.
                    </p>
                </div>

                {currentRoom && <DashboardController roomId={currentRoom.id} />}
                <div className={styles.dashboards}>
                    {currentRoom && <DashboardOrganiser currentRoom={currentRoom} />}
                </div>
            </div>
        </DashboardProvider>
    )
}