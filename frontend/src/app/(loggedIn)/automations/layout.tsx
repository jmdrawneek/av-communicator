'use client';

import React from "react";

import { CurrentAutomationProvider } from "@/context/currentAutomationContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <CurrentAutomationProvider>{children}</CurrentAutomationProvider>;
}