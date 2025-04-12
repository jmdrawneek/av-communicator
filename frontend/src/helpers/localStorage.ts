import localforage from 'localforage';

import type { AutomationConfig as CurrentAutomationConfig } from '@/context/currentAutomationContext';
import { RoomConfig } from '@/context/roomContext';
import { DashboardConfig } from '@/context/dashboardContext';
import { AutomationConfig } from '@/context/automationContext';
import { Node, Edge } from '@xyflow/react';

localforage.config({
    name: 'av-communicator-poc'
});


// Flows
export const saveFlow = ({ flowName, flow }: { flowName: string, flow: CurrentAutomationConfig | { nodes: Node[], edges: Edge[], flowName: string } }) => {
  // Create a clean copy of nodes with only clonable data
  const cleanNodes = flow.nodes.map((node: Node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      ...node.data,
      signal: null,
      // Remove any other non-clonable data
      onSignal: undefined,
      onConnect: undefined,
      onDisconnect: undefined,
      onDelete: undefined,
      onUpdate: undefined,
    },
    width: node.width,
    height: node.height,
    selected: node.selected,
    dragging: node.dragging,
  }));

  return localforage.setItem("flows/" + flowName, { 
    nodes: cleanNodes, 
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

// Automations
export const saveAutomation = async ({ automationId, automation }: { automationId: string, automation: AutomationConfig }) => {
  console.log('saving automation', automation, automationId)
  const cleanAutomation = {
    ...automation,
    nodes: automation.nodes.map((node) => ({
      ...node,
      data: { ...node.data, signal: null }
    }))
  }
    return localforage.setItem("automations/" + automationId, cleanAutomation);
}

export const loadAutomation = ({ automationId }: { automationId: string }): Promise<AutomationConfig | null> => {
  return localforage.getItem("automations/" + automationId);
}

export const deleteAutomation = ({ automationId }: { automationId: string }) => {
  return localforage.removeItem("automations/" + automationId);
}

export const listAutomations = (): Promise<AutomationConfig[]> => {
  return localforage.keys().then((keys) => {
    return Promise.all(keys.filter((key) => key.startsWith("automations/"))
      .map((key) => localforage.getItem(key) as Promise<AutomationConfig>));
  });
}