'use client';

import React from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useStoreApi,
  useReactFlow,
  Panel,
} from '@xyflow/react';


import { StartNode } from '@/components/flowbuilder/startNode';
import { StepNode } from '@/components/flowbuilder/stepNode';

import '@xyflow/react/dist/style.css';
import styles from './styles.module.scss';
import { CurrentFlowProvider, useCurrentFlow } from '@/context/currentFlowContext';
import { AddNode } from './addNode';
import { LoadFlow } from './loadFlow';
import { SaveFlow } from './saveFlow';
import { DeleteFlow } from './deleteFlow';
import { FlowName } from './flowName';

// Set up custom nodes.
const nodeTypes = {
  startNode: StartNode,
  stepNode: StepNode,
};

const Flow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setFlowName } = useCurrentFlow();

  return (
    <>
    <Panel position="top-left"><FlowName /></Panel>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      //onNodeDrag={onNodeDrag}
      //onNodeDragStop={onNodeDragStop}
      onConnect={onConnect}
      fitView
    >
      <Background variant={BackgroundVariant.Cross} gap={50} />
    </ReactFlow>
    <Panel position="bottom-center">
          <div className={styles.footer}>
            <AddNode />
            <LoadFlow />
            <SaveFlow />
            <DeleteFlow />
          </div>
        </Panel>
    </>
  );
};

export default () => (
  <CurrentFlowProvider>
    <ReactFlowProvider>
      <div className={styles.wrapper}>
      
        <Flow />
        
      </div>
    </ReactFlowProvider>
  </CurrentFlowProvider>
);
