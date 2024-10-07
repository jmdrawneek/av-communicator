import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

import { effect } from '@maverick-js/signals';

import { StepWrapper } from '../stepWrapper';
import { SingleInput } from '../../singleInput';
import { useCurrentFlow } from '@/context/currentFlowContext';

import type { Node } from '@xyflow/react';

import styles from './styles.module.scss';


export const StepNode = ({ data, id }: { data: Node['data'] & { signal: () => { active: boolean, id: string } }, id: string }) => {
  const { updateNode } = useCurrentFlow(); 
  const [stepName, setStepName] = useState(data.label as string);
  const [isEditing, setIsEditing] = useState(false);
  const [nodeIsActive, setNodeIsActive] = useState(false);

  useEffect(() => {
    effect(() => {
      const { active, id } = data.signal();
      console.log(`React node ${id} updating`, active);
      setNodeIsActive(active);
    })
  }, [data, data.signal])

  const updateName = useCallback((newName: string) => {
    setStepName(newName);
    setIsEditing(false);
    updateNode({ ...data, label: newName }, id);
  }, [data, updateNode, id]);

  return (
    <StepWrapper stepType="step" active={nodeIsActive}>
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{ top: 0, bottom: 'auto', background: '#555' }}
        isConnectable={true}
      />
      
      <div className={styles.content}>
        {isEditing ? <SingleInput updateValue={updateName} /> : stepName}
        {!isEditing && <button className={styles.edit} onClick={() => setIsEditing(true)}>Edit</button>}
        <div className={styles.active}>{nodeIsActive ? 'Active' : 'Inactive'}</div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{ bottom: 0, top: 'auto', background: '#555' }}
        isConnectable={true}
      />
    </StepWrapper>
  );
};
