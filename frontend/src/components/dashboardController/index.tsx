import React, { useCallback } from "react";

import { useDashboardContext } from "@/context/dashboardContext";

import { Button } from "@/components/button";

import styles from "./styles.module.scss";

export const DashboardController = ({ roomId }: { roomId: string }) => {
    const { addDashboard } = useDashboardContext();

    const addDashboardCb = useCallback(() => {  
        addDashboard({roomId});
        }, [addDashboard, roomId]);

    return <div className={styles.controls}>
        <Button buttonStyle="primarySmall" onClick={addDashboardCb}>Add Dashboard</Button>
    </div>;
}