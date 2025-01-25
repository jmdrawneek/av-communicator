import localforage from 'localforage';

import type { FlowConfig } from '@/context/currentFlowContext';
import { RoomConfig } from '@/context/roomContext';
import { DashboardConfig } from '@/context/dashboardContext';

localforage.config({
    name: 'av-communicator-poc'
});


// Flows
export const saveFlow = ({ flowName, flow }: { flowName: string, flow: FlowConfig }) => {
  // Remove signal from each node so it can be saved to localforage
  return localforage.setItem("flows/" + flowName, { 
    nodes: flow.nodes.map((node) => ({ ...node, data: { ...node.data, signal: null } })), 
    edges: flow.edges 
  });
}

export const loadFlow = ({ flowName }: { flowName: string }) => {
  return localforage.getItem("flows/" + flowName);
}

export const deleteFlow = ({ flowName }: { flowName: string }) => {
  return localforage.removeItem("flows/" + flowName);
}

export const listFlows = () => {
  return localforage.keys();
}



// Rooms
export const saveRoom = async ({ roomId, room }: { roomId: string, room: RoomConfig }) => {
    return localforage.setItem("rooms/" + roomId, room);
}

export const loadRoom = ({ roomId }: { roomId: string }): Promise<RoomConfig | null> => {
  return localforage.getItem("rooms/" + roomId);
}

export const deleteRoom = ({ roomId }: { roomId: string }) => {
  return localforage.removeItem("rooms/" + roomId);
}

export const listRooms = (): Promise<RoomConfig[]> => {
  return localforage.keys().then((keys) => {
    return Promise.all(keys.filter((key) => key.startsWith("rooms/"))
      .map((key) => localforage.getItem(key) as Promise<RoomConfig>));
  });
}

// Dashboards
export const saveDashboard = async ({ dashboardId, dashboard }: { dashboardId: string, dashboard: DashboardConfig }) => {
    return localforage.setItem("dashboards/" + dashboardId, dashboard);
} 

export const loadDashboard = ({ dashboardId }: { dashboardId: string }): Promise<DashboardConfig | null> => {
  return localforage.getItem("dashboards/" + dashboardId);
}

export const deleteDashboard = ({ dashboardId }: { dashboardId: string }) => {
  return localforage.removeItem("dashboards/" + dashboardId);
}

export const listDashboards = (): Promise<DashboardConfig[]> => {
  return localforage.keys().then((keys) => {
    return Promise.all(keys.filter((key) => key.startsWith("dashboards/"))
      .map((key) => localforage.getItem(key) as Promise<DashboardConfig>));
  });
} 