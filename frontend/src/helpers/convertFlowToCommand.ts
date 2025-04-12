import { savedFlow } from "@/components/flowbuilder/saveFlow";
import { Edge, Node } from "@xyflow/react";

export interface AutomationConfig {
    flowName: string;
    steps: {
        actionType: string;
        data: {
            label?: string;
            signal: {
                set: (arg0: { active: boolean; id: string }) => void;
            };
        };
        source: string;
        id: string;
    }[]
    
}

export const convertFlowToCommand = ({ flow }: { flow: savedFlow }) => {
    const { nodes, edges, automationName }: { nodes: Node[]; edges: Edge[]; automationName: string } = flow;

    const config = edges
        // Put the edges in order so we know what step is before what.
        .toSorted((a, b) => parseInt(a.source) - parseInt(b.source))
        .reduce((prev, { source, sourceHandle, target, targetHandle, id }) => {
            // Find the step we're updating.

            // Find the nodes we're targeting to add as actions to the step.
            const nodeList = nodes.filter(({ id }) => id === target);
            console.log({ source, target, sourceHandle, targetHandle, id })

            if (nodeList.length === 0) return prev;

            console.log({ nodeList })
            prev.steps.push(...nodeList.map(({ type, data, id }) => ({
                actionType: type as string,
                data: data as AutomationConfig['steps'][number]['data'],
                source,
                id
            })));


            return prev;
        }, {
            flowName: automationName,
            steps: []
        } as AutomationConfig);

    console.log(config)

    return config;

}