import React from 'react';
import { Handle, Position } from '@xyflow/react';

import { StepWrapper } from '../stepWrapper';

export const StartNode = () => {
  return (
    <StepWrapper stepType="start">
      <div>
        Start
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="start"
        style={{ bottom: 0, top: 'auto', background: '#555' }}
        isConnectable={true}
      />
    </StepWrapper>
  );
};
