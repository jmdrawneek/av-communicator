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
                <h1 className={styles.title}>Rooms</h1>
                <RoomController />
                <div className={styles.rooms}>
                    <RoomOrganiser />
                </div>
            </div>
        </RoomProvider>
    );
};

export default Rooms;