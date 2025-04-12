'use client';

import React from "react";

import { CurrentAutomationProvider } from "@/context/currentAutomationContext";
import { AutomationProvider } from "@/context/automationContext";

import Sidebar from "@/components/sidebar";

import styles from "./styles.module.scss";


const LoggedInLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.container}>
            <AutomationProvider>
                <CurrentAutomationProvider>
                    <Sidebar />
                    <main className={styles.main}>
                        {children}
                    </main>
                </CurrentAutomationProvider>
            </AutomationProvider>
        </div>);
};

export default LoggedInLayout;