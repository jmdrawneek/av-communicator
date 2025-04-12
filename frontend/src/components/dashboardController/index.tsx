import React, { useCallback } from "react";

import { useDashboardContext } from "@/context/dashboardContext";
import { Button } from "@/components/button";

export const DashboardController = ({ roomId }: { roomId: string }) => {
    const { addDashboard } = useDashboardContext();

    const addDashboardCb = useCallback(() => {
        addDashboard({ roomId });
    }, [addDashboard, roomId]);

    return (
        <div className="mb-6">
            <Button variant="primary" size="sm" onClick={addDashboardCb}>Add Dashboard</Button>
        </div>
    );
}