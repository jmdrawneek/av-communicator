import localforage from 'localforage';

import type { FlowConfig } from '@/context/currentFlowContext';

localforage.config({
    name: 'av-communicator-poc'
});

export const saveFlow = ({ flowName, flow }: { flowName: string, flow: FlowConfig }) => {
  return localforage.setItem(flowName, flow);
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