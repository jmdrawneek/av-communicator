'use client';

import React from "react";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";

const Devices = () => {
    return (
        <div className="space-y-8 p-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Devices
                </h1>
                <p className="text-muted-foreground">
                    Manage your connected devices. Add new devices or edit existing ones.
                </p>
            </div>

            <div className="flex justify-end">
                <Button variant="primary" size="md">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Device
                </Button>
            </div>

            <div className="rounded-lg border border-border/20 bg-card/50 p-6 text-center">
                <p className="text-muted-foreground">
                    No devices found. Click the &ldquo;Add Device&rdquo; button to create a new device.
                </p>
            </div>
        </div>
    );
};

export default Devices;