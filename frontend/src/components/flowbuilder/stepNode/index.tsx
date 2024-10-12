import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

import { effect } from '@maverick-js/signals';

import { StepWrapper } from '../stepWrapper';
import { SingleInput } from '../../singleInput';
import { Modal } from '../../modal';

import { useCurrentFlow } from '@/context/currentFlowContext';

import type { Node } from '@xyflow/react';

import styles from './styles.module.scss';
import { DeviceSelector } from '@/components/deviceSelector';
import { Device } from '../../../../../shared/devices';
import { Loader } from '@/components/loader';

export type DeviceWithAction = Omit<Device, 'actions'> & {action: string, deviceId: string, ip: string};

export const StepNode = ({ data, id }: { data: Node['data'] & { signal: () => { active: boolean, id: string } }, id: string }) => {
  const { updateNode } = useCurrentFlow(); 
  const [stepName, setStepName] = useState(data.label as string);
  const [isEditing, setIsEditing] = useState(false);
  const [nodeIsActive, setNodeIsActive] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceWithAction | null>(data.device as DeviceWithAction || null);

  useEffect(() => {
    effect(() => {
      const { active, id } = data.signal();
      console.log(`React node ${id} updating`, active);
      setNodeIsActive(active);
    })
  }, [data, data.signal]);

  const updateDeviceDetails = useCallback(({ name, action, deviceId, ip, type }: { name: string, action: string, deviceId: string, ip: string, type: string }) => {
      setSelectedDevice({ name, action, deviceId, ip, type });
      updateNode({ ...data, device: { name, action, deviceId, ip, type: 'device' } }, id);
  }, [data, id, updateNode]);

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
        {nodeIsActive && <Loader colour='white' />}
        {selectedDevice && <div className={styles.selectedDevice}>{selectedDevice.name} - {selectedDevice.action}</div>}
        <Modal triggerText={selectedDevice ? 'Change device' : "Select Device"} title="Select Device" content={<DeviceSelector onSelect={updateDeviceDetails} />} />
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
