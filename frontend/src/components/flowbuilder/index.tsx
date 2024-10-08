'use client';

import React from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
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
import { RunFlow } from './runFlow';

// Set up custom nodes.
const nodeTypes = {
  startNode: StartNode,
  stepNode: StepNode,
};

const Flow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCurrentFlow();

  return (
    <>
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
            <div className={styles.footerButtons}>
              <AddNode />
            <LoadFlow />
            <SaveFlow />
            <DeleteFlow />
            </div>
            <div className={styles.subFooter}>
              <FlowName />
              <RunFlow />
            </div>
          </div>
        </Panel>
    </>
  );
};

const FlowWrapper = () => (
  <CurrentFlowProvider>
    <ReactFlowProvider>
      <div className={styles.wrapper}>
      
        <Flow />
        
      </div>
    </ReactFlowProvider>
  </CurrentFlowProvider>
);

export default FlowWrapper;
