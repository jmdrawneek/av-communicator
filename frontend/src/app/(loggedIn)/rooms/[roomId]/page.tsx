'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRoomContext } from "@/context/roomContext";
import { DashboardOrganiser } from "@/components/dashboardOrganiser";
import { DashboardController } from "@/components/dashboardController";
import { DashboardProvider } from "@/context/dashboardContext";
import { Button } from "@/components/button";

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
            <div className="container mx-auto p-8">
                <div className="mb-8">
                    <Link
                        href="/rooms"
                        className="text-muted-foreground hover:text-accent transition-colors"
                    >
                        ← Back to rooms
                    </Link>

                    <div className="flex items-center justify-between mt-4">
                        {isEditing ? (
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                className="text-2xl font-semibold bg-secondary/50 border border-border/20 rounded-md px-3 py-2 w-full max-w-[500px] focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        ) : (
                            <h1 className="text-2xl font-semibold text-foreground">{currentRoom?.name}</h1>
                        )}

                        <div className="flex gap-2">
                            {isEditing ? (
                                <Button variant="primary" size="sm" onClick={handleSave}>Save</Button>
                            ) : (
                                <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                            )}
                        </div>
                    </div>

                    <p className="mt-4 text-muted-foreground">
                        Manage dashboards for this room. Add a new dashboard or edit existing ones.
                    </p>
                </div>

                {currentRoom && <DashboardController roomId={currentRoom.id} />}
                <div className="mt-8">
                    {currentRoom && <DashboardOrganiser currentRoom={currentRoom} />}
                </div>
            </div>
        </DashboardProvider>
    )
}