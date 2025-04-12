import React from 'react';

import { useCurrentAutomation } from '@/context/currentAutomationContext';

import { LoadFlow } from '../flowbuilder/loadFlow';
import { SaveFlow } from '../flowbuilder/saveFlow';
import { DeleteFlow } from '../flowbuilder/deleteFlow';

import styles from './styles.module.scss';


export const FlowControls = () => {
    const { nodes } = useCurrentAutomation();
    return (
        <ul className={styles.flowControls}>
            <li><LoadFlow /></li>
            {nodes.length > 1 && <li><SaveFlow /></li>}
            <li><DeleteFlow /></li>
        </ul>
    )
}