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

import { useCurrentFlow } from '@/context/currentFlowContext';

import { AddNode } from './addNode';
import { FlowName } from './flowName';
import { RunFlow } from './runFlow';

import '@xyflow/react/dist/style.css';
import styles from './styles.module.scss';

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
              {nodes.length > 1 && <RunFlow />}
            </div>
            <div className={styles.subFooter}>
            <FlowName />
            </div>
          </div>
        </Panel>
    </>
  );
};

const FlowWrapper = () => (
    <ReactFlowProvider>
      <div className={styles.wrapper}>
        <Flow />
      </div>
    </ReactFlowProvider>
);

export default FlowWrapper;
