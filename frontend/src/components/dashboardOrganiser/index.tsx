import React from "react";

import { useDashboardContext } from "@/context/dashboardContext";
import { MenuCard } from "../menuCard";

import styles from "./styles.module.scss";
import type { RoomConfig } from "@/context/roomContext";

export const DashboardOrganiser = ({ currentRoom }: { currentRoom: RoomConfig }) => {
    const { dashboards, notSavedDashboards, saveDashboard, deleteDashboard } = useDashboardContext();
    console.log({ dashboards, notSavedDashboards });
    return <div className={styles.container}>
        <ul className={styles.dashboards}>
            {[...dashboards, ...notSavedDashboards].map((dashboard) => (
                <li key={dashboard.id}>
                    <MenuCard 
                        item={dashboard} 
                        cardType="dashboards" 
                        saveItem={saveDashboard} 
                        deleteItem={deleteDashboard} 
                        namePlaceholder="Dashboard name" 
                        currentRoom={currentRoom}
                    />
                </li>
            ))}
        </ul>
    </div>;
}   