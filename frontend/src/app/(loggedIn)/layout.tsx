'use client';

import React from "react";

import { CurrentFlowProvider } from "@/context/currentFlowContext";

import Sidebar from "@/components/sidebar";

import styles from "./styles.module.scss";


const LoggedInLayout = ({ children }: { children: React.ReactNode }) => {
    return  (
    <div className={styles.container}>
        <CurrentFlowProvider>
        <Sidebar />
        <main className={styles.main}>
            {children}
        </main>
        </CurrentFlowProvider>
    </div>);
};

export default LoggedInLayout;