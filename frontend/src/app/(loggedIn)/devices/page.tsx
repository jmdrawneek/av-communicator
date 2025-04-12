'use client';

import React from "react";
import styles from "./styles.module.scss";

const Devices = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Devices</h1>
                <p className={styles.description}>
                    Manage your connected devices. Add new devices or edit existing ones.
                </p>
            </div>

            <div className={styles.controls}>
                <button className={styles.button}>Add Device</button>
            </div>

            <div className={styles.devicesList}>
                <p>No devices found. Click the "Add Device" button to create a new device.</p>
            </div>
        </div>
    );
};

export default Devices;