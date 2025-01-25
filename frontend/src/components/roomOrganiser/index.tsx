import React from "react";

import styles from "./styles.module.scss";
import { useRoomContext } from "@/context/roomContext";
import { MenuCard } from "../menuCard";

export const RoomOrganiser = () => {
    const { rooms, notSavedRooms, saveRoom, deleteRoom } = useRoomContext();
    console.log({ rooms, notSavedRooms });
    return (
        <div className={styles.container}>
            <ul className={styles.rooms}>
                {[...rooms, ...notSavedRooms].map((room) => (
                    <li key={room.id}><MenuCard item={room} cardType="rooms" saveItem={saveRoom} deleteItem={deleteRoom} namePlaceholder="Room name" /></li>
                ))}
            </ul>
        </div>
    );
}   