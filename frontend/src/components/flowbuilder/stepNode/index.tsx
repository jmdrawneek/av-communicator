import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

import { effect } from '@maverick-js/signals';

import { StepWrapper } from '../stepWrapper';
import { SingleInput } from '../../singleInput';
import { Modal } from '../../modal';
import { Button } from '@/components/button';

import { useCurrentAutomation } from '@/context/currentAutomationContext';

import type { Node } from '@xyflow/react';

import { DeviceSelector } from '@/components/deviceSelector';
import { Device } from '../../../../../shared/devices';
import { Loader } from '@/components/loader';

export type DeviceWithAction = Omit<Device, 'actions'> & { action: string, deviceId: string, ip: string };

export const StepNode = ({ data, id }: { data: Node['data'] & { signal: () => { active: boolean, id: string } }, id: string }) => {
  const { updateNode } = useCurrentAutomation();
  const [stepName, setStepName] = useState(data.label as string);
  const [isEditing, setIsEditing] = useState(false);
  const [nodeIsActive, setNodeIsActive] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceWithAction | null>(data.device as DeviceWithAction || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log({ data, id })
  useEffect(() => {
    effect(() => {
      const { active, id } = data.signal();
      console.log(`React node ${id} updating`, active);
      setNodeIsActive(active);
    })
  }, [data, data.signal]);

  const updateDeviceDetails = useCallback(({
    name, action, deviceId, ip, type
  }: {
    name: string,
    action: string,
    deviceId: string,
    ip: string,
    type: string
  }) => {
    const deviceData: DeviceWithAction = {
      name,
      action,
      deviceId,
      ip,
      type,
      manufacturer: '', // Add required fields from Device type
      model: ''
    };

    setSelectedDevice(deviceData);
    updateNode({ ...data, device: deviceData }, id);
    setIsModalOpen(false);
  }, [data, id, updateNode]);

  const updateName = useCallback((newName: string) => {
    setStepName(newName);
    setIsEditing(false);
    updateNode({ ...data, label: newName }, id);
  }, [data, updateNode, id]);

  return (
    <>
      <StepWrapper stepType="step" active={nodeIsActive}>
        <Handle
          type="target"
          position={Position.Top}
          id="input"
          style={{ top: 0, bottom: 'auto', background: '#555' }}
          isConnectable={true}
        />

        <div className="flex flex-col items-center justify-center p-4 space-y-2">
          {isEditing ? <SingleInput updateValue={updateName} /> : stepName}
          {!isEditing && (
            <button
              className="text-xs bg-black/25 rounded-full px-2 py-1 text-white hover:bg-black/30 transition-colors"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
          {nodeIsActive && <Loader size="sm" className="text-white" />}
          {selectedDevice && (
            <div className="text-sm text-gray-600">
              {selectedDevice.name} - {selectedDevice.action}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            {selectedDevice ? 'Change device' : "Select Device"}
          </Button>

        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          id="output"
          style={{ bottom: 0, top: 'auto', background: '#555' }}
          isConnectable={true}
        />
      </StepWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Device"
        variant="drawer"
      >
        <DeviceSelector onSelect={updateDeviceDetails} />
      </Modal>
    </>
  );
};
