import localforage from 'localforage';

import type { FlowConfig } from '@/context/currentFlowContext';

localforage.config({
    name: 'av-communicator-poc'
});

export const saveFlow = ({ flowName, flow }: { flowName: string, flow: FlowConfig }) => {
  // Remove signal from each node so it can be saved to localforage
  return localforage.setItem(flowName, flow.nodes.map((node) => ({ ...node, data: { ...node.data, signal: null } })));
}

export const loadFlow = ({ flowName }: { flowName: string }) => {
  return localforage.getItem(flowName);
}

export const deleteFlow = ({ flowName }: { flowName: string }) => {
  return localforage.removeItem(flowName);
}

export const listFlows = () => {
  return localforage.keys();
}