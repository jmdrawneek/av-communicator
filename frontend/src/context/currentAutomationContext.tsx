import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

import { Connection, Edge, EdgeChange, Node, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { signal } from '@maverick-js/signals';

export interface AutomationConfig {
  nodes: Node[];
  edges: Edge[];
  automationName: string;
}

interface CurrentAutomationContextType {
  currentAutomation: AutomationConfig | null;
  setAutomationName: (automationName: string) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (params: Connection) => void;
  updateNode: (node: Node['data'], id: Node['id']) => void;
  nodes: Node[];
  edges: Edge[];
  automationName: string;
  loadedAutomation: string | null;
  setLoadedAutomation: (loadedAutomation: string | null) => void;
}


const CurrentAutomationContext = createContext<CurrentAutomationContextType | undefined>(undefined);

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

export const CurrentAutomationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAutomation, setCurrentAutomation] = useState<AutomationConfig | null>(null);
  const [nodes, setNodesInternal] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [automationName, setAutomationName] = useState('New Automation');
  const [loadedAutomation, setLoadedAutomation] = useState<string | null>(null);

  useEffect(() => {
    console.log('setting current automation', { nodes, edges, automationName })
    setCurrentAutomation({ nodes, edges, automationName });
  }, [nodes, edges, automationName]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    console.log('currentAutomationContext onNodesChange called with:', changes);
    setNodesInternal((nds) => applyNodeChanges(changes, nds))
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, []);

  const updateNode = useCallback((nodeData: Node['data'], id: Node['id']) => {
    setNodesInternal((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, ...nodeData } } : n));
  }, []);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const setNodes = useCallback((nodes: Node[]) => {
    console.log({ nodes })
    setNodesInternal(nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        signal: signal(node.data.signal || { active: false })
      }
    })))
  }, []);

  return (
    <CurrentAutomationContext.Provider value={{
      currentAutomation,
      nodes,
      edges,
      automationName,
      setAutomationName,
      setNodes,
      setEdges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      updateNode,
      loadedAutomation,
      setLoadedAutomation
    }}>
      {children}
    </CurrentAutomationContext.Provider>
  );
};

export const useCurrentAutomation = () => {
  const context = useContext(CurrentAutomationContext);
  if (context === undefined) {
    throw new Error('useCurrentAutomation must be used within a CurrentAutomationProvider');
  }
  return context;
};