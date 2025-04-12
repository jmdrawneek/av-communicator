import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

import { Connection, Edge, EdgeChange, Node, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { signal } from '@maverick-js/signals';
import { v4 as uuidv4 } from 'uuid';
import {
    saveAutomation as saveAutomationLocalStorage,
    loadAutomation as loadAutomationLocalStorage,
    deleteAutomation as deleteAutomationLocalStorage,
    listAutomations as listAutomationsLocalStorage
} from '@/helpers/localStorage';
import localforage from 'localforage';

export interface AutomationConfig {
    id: string;
    nodes: Node[];
    edges: Edge[];
    name: string;
    roomId?: string;
    dashboardId?: string;
    notSaved?: boolean;
}

const addSignalToNode = (node: Node) => ({
    ...node,
    data: {
        ...node.data,
        signal: signal(node.data.signal || { active: false })
    }
})

interface AutomationContextType {
    automations: AutomationConfig[];
    notSavedAutomations: AutomationConfig[];
    currentAutomation: AutomationConfig | null;
    getAutomation: (id: string) => Promise<AutomationConfig | null>;
    setAutomationName: (name: string) => void;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (params: Connection) => void;
    updateNode: (node: Node['data'], id: Node['id']) => void;
    nodes: Node[];
    edges: Edge[];
    automationName: string;
    addAutomation: (roomId?: string, dashboardId?: string) => void;
    saveAutomation: (automation: AutomationConfig) => void;
    deleteAutomation: (id: string) => void;
    listAutomationsLocalStorage: () => Promise<AutomationConfig[]>;
    setNotSavedAutomations: (automations: AutomationConfig[]) => void;
}

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const AutomationContext = createContext<AutomationContextType | undefined>(undefined);

export const AutomationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [automations, setAutomations] = useState<AutomationConfig[]>([]);
    const [notSavedAutomations, setNotSavedAutomations] = useState<AutomationConfig[]>([]);
    const [currentAutomation, setCurrentAutomation] = useState<AutomationConfig | null>(null);
    const [nodes, setNodesInternal] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [automationName, setAutomationName] = useState('New Automation');

    useEffect(() => {
        // Load saved automations from localStorage
        listAutomationsLocalStorage().then((savedAutomations) => {
            if (savedAutomations && savedAutomations.length > 0) {
                setAutomations(savedAutomations);
            } else {
                // Fallback to demo data if nothing in localStorage
                setAutomations([
                    {
                        id: '1',
                        nodes: [],
                        edges: [],
                        name: 'Room Lighting Automation',
                        roomId: '1',
                        dashboardId: '1'
                    },
                    {
                        id: '2',
                        nodes: [],
                        edges: [],
                        name: 'AV System Power On',
                        roomId: '2',
                        dashboardId: '2'
                    }
                ]);
            }
        });

        // Load not saved automations from localStorage
        localforage.getItem('notSavedAutomations').then((notSaved) => {
            if (notSaved) {
                setNotSavedAutomations(notSaved as AutomationConfig[]);
            }
        });
    }, []);

    const setNodes = useCallback((nodes: Node[]) => {
        const processedNodes = nodes.map(addSignalToNode);

        setNodesInternal(processedNodes);

        // Update currentAutomation if it exists
        if (currentAutomation) {
            setCurrentAutomation(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    nodes: processedNodes
                };
            });
        }
    }, [currentAutomation]);

    const getAutomation = useCallback(async (id: string): Promise<AutomationConfig | null> => {
        // First check if it's the current automation
        if (currentAutomation && currentAutomation.id === id) {
            return currentAutomation;
        }

        // Then check unsaved automations in memory
        const notSavedAutomation = notSavedAutomations.find(automation => automation.id === id);
        if (notSavedAutomation) {
            setCurrentAutomation(notSavedAutomation);
            setNodesInternal(notSavedAutomation.nodes);
            setEdges(notSavedAutomation.edges);
            setAutomationName(notSavedAutomation.name);
            return notSavedAutomation;
        }

        // Then check saved automations in memory
        const savedAutomation = automations.find(automation => automation.id === id);
        if (savedAutomation) {
            setCurrentAutomation(savedAutomation);
            setNodesInternal(savedAutomation.nodes);
            setNodes(savedAutomation.nodes);
            setEdges(savedAutomation.edges);
            setAutomationName(savedAutomation.name);
            return savedAutomation;
        }

        // Finally check localStorage if not found in memory
        const loadedAutomation = await loadAutomationLocalStorage({ automationId: id });
        if (loadedAutomation) {
            setCurrentAutomation(loadedAutomation);
            setNodesInternal(loadedAutomation.nodes);
            setNodes(loadedAutomation.nodes);
            setEdges(loadedAutomation.edges);
            setAutomationName(loadedAutomation.name);

            // Also add to the automations state
            setAutomations(prev => [...prev, loadedAutomation]);

            return loadedAutomation;
        }

        return null;
    }, [automations, currentAutomation, notSavedAutomations, setNodes]);

    const addAutomation = useCallback((roomId?: string, dashboardId?: string) => {
        const newAutomation: AutomationConfig = {
            id: uuidv4(),
            nodes: [],
            edges: [],
            name: 'New Automation',
            roomId,
            dashboardId,
            notSaved: true
        };

        setNotSavedAutomations(prev => {
            const updated = [...prev, newAutomation];
            // Save to localStorage
            localforage.setItem('notSavedAutomations', updated);
            return updated;
        });
        setCurrentAutomation(newAutomation);
        setNodesInternal([]);
        setEdges([]);
        setAutomationName('New Automation');
    }, []);

    const saveAutomation = useCallback((automation: AutomationConfig) => {
        const isNew = automation.notSaved;

        // Update the automation with current nodes and edges if it's the current one
        const updatedAutomation = {
            ...automation,
            notSaved: false,
            nodes: currentAutomation?.id === automation.id ? nodes : automation.nodes,
            edges: currentAutomation?.id === automation.id ? edges : automation.edges
        };

        if (isNew) {
            // Remove from notSavedAutomations and add to automations
            setNotSavedAutomations(prev => {
                const updated = prev.filter(a => a.id !== automation.id);
                // Update localStorage
                localforage.setItem('notSavedAutomations', updated);
                return updated;
            });
            setAutomations(prev => [...prev, updatedAutomation]);
        } else {
            // Update in automations
            setAutomations(prev => prev.map(a => a.id === automation.id ? updatedAutomation : a));
        }

        // Save to localStorage
        saveAutomationLocalStorage({ automationId: updatedAutomation.id, automation: updatedAutomation });

        // Update currentAutomation if it's the one being saved
        if (currentAutomation?.id === automation.id) {
            setCurrentAutomation(updatedAutomation);
        }
    }, [currentAutomation, nodes, edges]);

    const deleteAutomation = useCallback((id: string) => {
        setAutomations(prev => prev.filter(automation => automation.id !== id));
        setNotSavedAutomations(prev => {
            const updated = prev.filter(automation => automation.id !== id);
            // Update localStorage
            localforage.setItem('notSavedAutomations', updated);
            return updated;
        });

        // Remove from localStorage
        deleteAutomationLocalStorage({ automationId: id });

        // Clear currentAutomation if it's the one being deleted
        if (currentAutomation?.id === id) {
            setCurrentAutomation(null);
            setNodesInternal([]);
            setEdges([]);
            setAutomationName('New Automation');
        }
    }, [currentAutomation]);

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        console.log('automationContext onNodesChange called with:', changes);
        setNodesInternal((nds) => applyNodeChanges(changes, nds));

        // Update currentAutomation if it exists
        if (currentAutomation) {
            setCurrentAutomation(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    nodes: applyNodeChanges(changes, prev.nodes)
                };
            });
        }
    }, [currentAutomation]);

    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));

        // Update currentAutomation if it exists
        if (currentAutomation) {
            setCurrentAutomation(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    edges: applyEdgeChanges(changes, prev.edges)
                };
            });
        }
    }, [currentAutomation]);

    const updateNode = useCallback((nodeData: Node['data'], id: Node['id']) => {
        setNodesInternal((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, ...nodeData } } : n));

        // Update currentAutomation if it exists
        if (currentAutomation) {
            setCurrentAutomation(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    nodes: prev.nodes.map((n) => n.id === id ? { ...n, data: { ...n.data, ...nodeData } } : n)
                };
            });
        }
    }, [currentAutomation]);

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => addEdge(params, eds));

        // Update currentAutomation if it exists
        if (currentAutomation) {
            setCurrentAutomation(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    edges: addEdge(params, prev.edges)
                };
            });
        }
    }, [currentAutomation]);

    return (
        <AutomationContext.Provider value={{
            automations,
            notSavedAutomations,
            currentAutomation,
            getAutomation,
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
            addAutomation,
            saveAutomation,
            deleteAutomation,
            listAutomationsLocalStorage,
            setNotSavedAutomations
        }}>
            {children}
        </AutomationContext.Provider>
    );
};

export const useAutomationContext = () => {
    const context = useContext(AutomationContext);
    if (context === undefined) {
        throw new Error('useAutomationContext must be used within an AutomationProvider');
    }
    return context;
}; 