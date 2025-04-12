import React from "react";

import { useDashboardContext } from "@/context/dashboardContext";
import { MenuCard } from "../menuCard";
import type { RoomConfig } from "@/context/roomContext";
import type { DashboardConfig } from "@/context/dashboardContext";

export const DashboardOrganiser = ({ currentRoom }: { currentRoom: RoomConfig }) => {
    const { dashboards, notSavedDashboards, saveDashboard, deleteDashboard } = useDashboardContext();

    const handleSave = (item: DashboardConfig | RoomConfig) => {
        if ('layout' in item) {
            saveDashboard(item as DashboardConfig);
        }
    };

    return (
        <div className="w-full">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...dashboards, ...notSavedDashboards].map((dashboard) => (
                    <li key={dashboard.id}>
                        <MenuCard
                            item={dashboard}
                            cardType="dashboards"
                            saveItem={handleSave}
                            deleteItem={deleteDashboard}
                            namePlaceholder="Dashboard name"
                            currentRoom={currentRoom}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}   