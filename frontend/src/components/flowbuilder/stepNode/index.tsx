import React, { memo, useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

import { StepWrapper } from '../stepWrapper';
import { SingleInput } from '../../singleInput';
import { useCurrentFlow } from '@/context/currentFlowContext';

import styles from './styles.module.scss';


export const StepNode = memo(({ data, id }: { data: any, id: string }) => {
  const { updateNode } = useCurrentFlow(); 
  const [stepName, setStepName] = useState(data.label);
  const [isEditing, setIsEditing] = useState(false);

  const updateName = useCallback((newName: string) => {
    setStepName(newName);
    setIsEditing(false);
    updateNode({ ...data, label: newName }, id);
  }, [data, updateNode, id]);

  return (
    <StepWrapper stepType="step">
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
});
