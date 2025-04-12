'use client';

import React from "react";

import { CurrentAutomationProvider } from "@/context/currentAutomationContext";
import { AutomationProvider } from "@/context/automationContext";

import Sidebar from "@/components/sidebar";

const LoggedInLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <AutomationProvider>
                <CurrentAutomationProvider>
                    <Sidebar />
                    <main className="flex-1 w-[calc(100%-450px)]">
                        {children}
                    </main>
                </CurrentAutomationProvider>
            </AutomationProvider>
        </div>
    );
};

export default LoggedInLayout;