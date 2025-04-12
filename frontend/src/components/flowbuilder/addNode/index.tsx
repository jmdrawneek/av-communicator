import React from "react";

import type { Node } from '@xyflow/react';

import { useAutomationContext } from "@/context/automationContext";

import { Button } from "@/components/button";

const startNode = {
    id: '0',
    type: 'startNode',
    data: { label: 'Start' },
    position: { x: 50, y: 25 },
    draggable: false,
};

const newNode = ({ nodes }: { nodes: Node[] }) => ({
    id: `${nodes.length + 1}`,
    type: 'stepNode',
    data: {
        label: 'New Node'
    },
    position: { x: 50, y: 90 },
    draggable: true,
    deletable: true
})

export const AddNode = () => {
    const { setNodes, nodes } = useAutomationContext();

    const handleAddNode = () => {
        console.log('Adding new node, current nodes:', nodes);
        setNodes([...nodes, nodes.length ? newNode({ nodes }) : startNode]);
    }

    return (
        <Button buttonStyle="primary" onClick={handleAddNode}>
            Add a step
            <span>+</span>
        </Button>
    )
}