'use client';

import React, { useEffect } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  Panel,
} from '@xyflow/react';

import { StartNode } from '@/components/flowbuilder/startNode';
import { StepNode } from '@/components/flowbuilder/stepNode';

import { useAutomationContext } from '@/context/automationContext';
import { useCurrentAutomation } from '@/context/currentAutomationContext';

import { AddNode } from './addNode';
import { AutomationName } from './automationName';
import { RunAutomation } from './runAutomation';

import '@xyflow/react/dist/style.css';
import styles from './styles.module.scss';

// Set up custom nodes.
const nodeTypes = {
  startNode: StartNode,
  stepNode: StepNode,
};

const Flow = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useAutomationContext();

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        fitView
        nodesDraggable={true}
      >
        <Background variant={BackgroundVariant.Cross} gap={50} />
      </ReactFlow>
      <Panel position="bottom-center">
        <div className={styles.footer}>
          <div className={styles.footerButtons}>
            <AddNode />
            {nodes.length > 1 && <RunAutomation />}
          </div>
          <div className={styles.subFooter}>
            <AutomationName />
          </div>
        </div>
      </Panel>
    </>
  );
};

// Component to sync CurrentAutomationContext with AutomationContext
const ContextSynchronizer = () => {
  const {
    setNodes: setCurrentNodes,
    setEdges: setCurrentEdges,
    nodes: currentNodes,
    edges: currentEdges
  } = useCurrentAutomation();

  const {
    nodes: automationNodes,
    edges: automationEdges,
    setNodes: setAutomationNodes,
    setEdges: setAutomationEdges
  } = useAutomationContext();

  // References to track last synchronized states
  const currentNodesRef = React.useRef(currentNodes);
  const currentEdgesRef = React.useRef(currentEdges);
  const automationNodesRef = React.useRef(automationNodes);
  const automationEdgesRef = React.useRef(automationEdges);

  // Sync automation context to current automation context
  useEffect(() => {
    // Only sync if automation nodes have changed
    if (automationNodes.length > 0 &&
      JSON.stringify(automationNodes) !== JSON.stringify(automationNodesRef.current)) {

      // Update ref
      automationNodesRef.current = automationNodes;
      setCurrentNodes(automationNodes);
    }

    if (automationEdges.length > 0 &&
      JSON.stringify(automationEdges) !== JSON.stringify(automationEdgesRef.current)) {

      // Update ref
      automationEdgesRef.current = automationEdges;
      setCurrentEdges(automationEdges);
    }
  }, [automationNodes, automationEdges, setCurrentNodes, setCurrentEdges]);

  // Sync current automation context to automation context
  useEffect(() => {
    // Only sync back if current nodes have changed
    if (currentNodes.length > 0 &&
      JSON.stringify(currentNodes) !== JSON.stringify(currentNodesRef.current)) {

      // Update ref
      currentNodesRef.current = currentNodes;
      setAutomationNodes(currentNodes);
    }

    if (currentEdges.length > 0 &&
      JSON.stringify(currentEdges) !== JSON.stringify(currentEdgesRef.current)) {

      // Update ref
      currentEdgesRef.current = currentEdges;
      setAutomationEdges(currentEdges);
    }
  }, [currentNodes, currentEdges, setAutomationNodes, setAutomationEdges]);

  return null; // This component doesn't render anything
};

const FlowWrapper = () => (
  <ReactFlowProvider>
    <div className={styles.wrapper}>
      <ContextSynchronizer />
      <Flow />
    </div>
  </ReactFlowProvider>
);

export default FlowWrapper;
