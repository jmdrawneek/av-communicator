import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

import { Connection, Edge, EdgeChange, Node, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { signal } from '@maverick-js/signals';

export interface FlowConfig {
  nodes: Node[];
  edges: Edge[];
  flowName: string;
}

interface CurrentFlowContextType {
  currentFlow: FlowConfig | null;
  setFlowName: (flowName: string) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (params: Connection) => void;
  updateNode: (node: Node['data'], id: Node['id']) => void;
  nodes: Node[];
  edges: Edge[];
  flowName: string;
  loadedFlow: string | null;
  setLoadedFlow: (loadedFlow: string | null) => void;
}


const CurrentFlowContext = createContext<CurrentFlowContextType | undefined>(undefined);

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

export const CurrentFlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentFlow, setCurrentFlow] = useState<FlowConfig | null>(null);
  const [nodes, setNodesInternal] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [flowName, setFlowName] = useState('New Flow');
  const [loadedFlow, setLoadedFlow] = useState<string | null>(null);

  useEffect(() => {
    console.log('setting current flow', {nodes, edges, flowName})
    setCurrentFlow({ nodes, edges, flowName });
  }, [nodes, edges, flowName]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodesInternal((nds) => applyNodeChanges(changes, nds))
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, []);

  const updateNode = useCallback((nodeData: Node['data'], id: Node['id']) => {
    setNodesInternal((nds) => nds.map((n) => n.id === id ? {...n, data: {...n.data, ...nodeData}} : n));
  }, []);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const setNodes = useCallback((nodes: Node[]) => {
    console.log({nodes})
    setNodesInternal(nodes.map((node) => ({ 
      ...node, 
      data: { 
        ...node.data, 
        signal: signal(node.data.signal || { active: false }) 
      } 
    })))
  }, []);

  return (
    <CurrentFlowContext.Provider value={{ 
      currentFlow, 
      nodes, 
      edges, 
      flowName, 
      setFlowName, 
      setNodes, 
      setEdges, 
      onNodesChange, 
      onEdgesChange, 
      onConnect, 
      updateNode,
      loadedFlow,
      setLoadedFlow
    }}>
      {children}
    </CurrentFlowContext.Provider>
  );
};

export const useCurrentFlow = () => {
  const context = useContext(CurrentFlowContext);
  if (context === undefined) {
    throw new Error('useCurrentFlow must be used within a CurrentFlowProvider');
  }
  return context;
};