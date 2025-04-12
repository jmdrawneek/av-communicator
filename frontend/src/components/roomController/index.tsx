import React from "react";
import { Button } from "@/components/button";

import { useRoomContext } from "@/context/roomContext";

import styles from "./styles.module.scss";

export const RoomController = () => {
    const { addRoom } = useRoomContext();

    return <div className={styles.controls}>
        <Button variant="primary" size="sm" onClick={addRoom}>Add Room</Button>
    </div>;
}