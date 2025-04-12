'use client';

import React from "react";

import styles from "./styles.module.scss";

import { RoomProvider } from "@/context/roomContext";
import { RoomController } from "@/components/roomController";
import { RoomOrganiser } from "@/components/roomOrganiser";

const Rooms = () => {
    return (
        <RoomProvider>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Rooms</h1>
                    <p className={styles.description}>
                        Manage your rooms and their associated dashboards. Click on a room to view its details or click
                        the edit button to modify room settings.
                    </p>
                </div>
                <RoomController />
                <div className={styles.rooms}>
                    <RoomOrganiser />
                </div>
            </div>
        </RoomProvider>
    );
};

export default Rooms;