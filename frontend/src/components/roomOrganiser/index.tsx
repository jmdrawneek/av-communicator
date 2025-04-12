import React from "react";

import { useRoomContext } from "@/context/roomContext";
import { MenuCard } from "../menuCard";
import type { RoomConfig } from "@/context/roomContext";
import type { DashboardConfig } from "@/context/dashboardContext";

export const RoomOrganiser = () => {
    const { rooms, notSavedRooms, saveRoom, deleteRoom } = useRoomContext();

    const handleSave = (item: RoomConfig | DashboardConfig) => {
        if ('dashboards' in item) {
            saveRoom(item as RoomConfig);
        }
    };

    return (
        <div className="w-full">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...rooms, ...notSavedRooms].map((room) => (
                    <li key={room.id}>
                        <MenuCard
                            item={room}
                            cardType="rooms"
                            saveItem={handleSave}
                            deleteItem={deleteRoom}
                            namePlaceholder="Room name" />
                    </li>
                ))}
            </ul>
        </div>
    );
}   