'use client';

import React from "react";

const Settings = () => {
    return (
        <div className="space-y-8 p-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Settings
                </h1>
                <p className="text-muted-foreground">
                    Configure your AV Control system settings and preferences.
                </p>
            </div>

            <div className="rounded-lg border border-border/20 bg-card p-6">
                <p className="text-muted-foreground">
                    Settings configuration will be available soon.
                </p>
            </div>
        </div>
    );
};

export default Settings;