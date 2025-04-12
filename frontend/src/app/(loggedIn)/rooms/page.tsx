'use client';

import React from "react";
import { RoomProvider } from "@/context/roomContext";
import { RoomController } from "@/components/roomController";
import { RoomOrganiser } from "@/components/roomOrganiser";

const Rooms = () => {
    return (
        <RoomProvider>
            <div className="space-y-8 p-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Rooms
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your rooms and their associated dashboards. Click on a room to view its details or click
                        the edit button to modify room settings.
                    </p>
                </div>
                <div className="rounded-lg border border-border/20 bg-card p-6">
                    <RoomController />
                    <div className="mt-6">
                        <RoomOrganiser />
                    </div>
                </div>
            </div>
        </RoomProvider>
    );
};

export default Rooms;