import React from 'react';

import { useCurrentFlow } from '@/context/currentFlowContext';

import { LoadFlow } from '../flowbuilder/loadFlow';
import { SaveFlow } from '../flowbuilder/saveFlow';
import { DeleteFlow } from '../flowbuilder/deleteFlow';

import styles from './styles.module.scss';


export const FlowControls = () => {
    const { nodes } = useCurrentFlow();
    return ( 
    <ul className={styles.flowControls}>
        <li><LoadFlow /></li>
       {nodes.length > 1 && <li><SaveFlow /></li>}
        <li><DeleteFlow /></li>
    </ul>
    )
}