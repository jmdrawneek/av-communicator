import localforage from 'localforage';

localforage.config({
    name: 'av-communicator-poc'
});

export const saveFlow = ({ flowName, flow }: { flowName: string, flow: any }) => {
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