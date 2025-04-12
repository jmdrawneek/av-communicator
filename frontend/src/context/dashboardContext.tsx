import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import {
    listDashboards as listDashboardsLocalStorage,
    loadDashboard as loadDashboardLocalStorage,
    saveDashboard as saveDashboardLocalStorage,
    deleteDashboard as deleteDashboardLocalStorage
} from "@/helpers/localStorage";

// TODO: Remove when we hook up to the backend.
export function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}



export type DashboardConfig = {
    name: string;
    flows: string[];
    notSaved: boolean;
    id: string;
    layout: unknown;
    roomId: string;
}

type DashboardContextType = {
    dashboards: DashboardConfig[];
    setDashboards: (dashboards: DashboardConfig[]) => void;
    currentDashboard: DashboardConfig | null;
    setCurrentDashboard: (dashboardName: string) => void;
    notSavedDashboards: DashboardConfig[];
    setNotSavedDashboards: (dashboards: DashboardConfig[]) => void;
    addDashboard: ({ roomId }: { roomId: string }) => void;
    saveDashboard: (dashboard: DashboardConfig) => void;
    deleteDashboard: (dashboardId: string) => void;
    getDashboard: (dashboardId: string) => Promise<DashboardConfig | null>;
}

const defaultDashboardContext: DashboardContextType = {
    dashboards: [],
    setDashboards: () => { },
    currentDashboard: null,
    setCurrentDashboard: () => { },
    notSavedDashboards: [],
    setNotSavedDashboards: () => { },
    addDashboard: () => { },
    saveDashboard: () => { },
    deleteDashboard: () => { },
    getDashboard: () => Promise.resolve(null)
}

export const dashboardContext = createContext<DashboardContextType>(defaultDashboardContext);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [dashboards, setDashboards] = useState<DashboardConfig[]>(defaultDashboardContext.dashboards);
    const [currentDashboard, setCurrentDashboardFn] = useState<DashboardConfig | null>(defaultDashboardContext.currentDashboard);
    const [notSavedDashboards, setNotSavedDashboards] = useState<DashboardConfig[]>([]);

    console.log({ notSavedDashboards })

    useEffect(() => {
        listDashboardsLocalStorage().then((dashboards) => {
            console.log({ dashboards })
            setDashboards(dashboards);
        });
    }, []);

    const setCurrentDashboard = useCallback((dashboardId: string) => {
        loadDashboardLocalStorage({ dashboardId }).then((dashboard) => {
            console.log({ dashboard })
            if (dashboard?.name) {
                setCurrentDashboardFn({ ...dashboard });
            } else {
                throw new Error('dashboard config not found');
            }
        });
    }, [setCurrentDashboardFn]);

    const addDashboard = useCallback(({ roomId }: { roomId: string }) => {
        setNotSavedDashboards((prev) => [...prev, {
            name: '', flows: [], notSaved: true, id: uuidv4(), layout: {}, roomId
        }]);
    }, [setNotSavedDashboards]);

    const saveDashboard = useCallback((item: DashboardConfig) => {
        // Remove not saved key from dashboard
        const dashboardToSave = { ...item, notSaved: false };
        return saveDashboardLocalStorage({ dashboardId: item.id, dashboard: dashboardToSave }).then(() => {
            // Remove the dashboard from the notSaveddashboards array
            setNotSavedDashboards((prev) => prev.filter((r) => r.id !== item.id));
            // Add the dashboard to the dashboards array
            setDashboards((prev) => [...prev.filter((r) => r.id !== item.id), { ...dashboardToSave }]);

        });
    }, [setNotSavedDashboards]);

    const deleteDashboard = useCallback((dashboardId: string) => {
        deleteDashboardLocalStorage({ dashboardId });
    }, []);

    const getDashboard = useCallback(async (dashboardId: string) => {
        return await loadDashboardLocalStorage({ dashboardId }).then((dashboard) => {
            console.log({ dashboard })
            if (dashboard?.name) {
                setCurrentDashboardFn({ ...dashboard });
                return dashboard;
            } else {
                throw new Error('dashboard config not found');
            }
        });
    }, [setCurrentDashboardFn]);

    return <dashboardContext.Provider value={{
        dashboards,
        setDashboards,
        currentDashboard,
        setCurrentDashboard,
        notSavedDashboards,
        setNotSavedDashboards,
        addDashboard,
        saveDashboard,
        deleteDashboard,
        getDashboard
    }}>{children}</dashboardContext.Provider>;
}

export const useDashboardContext = () => {
    const context = useContext(dashboardContext);
    if (!context) {
        throw new Error('useDashboardContext must be used within a dashboardProvider');
    }
    return context;
}