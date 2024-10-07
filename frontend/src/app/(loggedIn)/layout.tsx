'use client';

import React from "react";

import Sidebar from "@/components/sidebar";

import styles from "./styles.module.scss";


const LoggedInLayout = ({ children }: { children: React.ReactNode }) => {
    return  (
    <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
            {children}
        </main>
    </div>);
};

export default LoggedInLayout;