import React, { useMemo } from 'react';
import { type Device, deviceList } from '../../../../shared/devices';
import { DeviceCard } from '../deviceCard';
import { DeviceWithAction } from '../flowbuilder/stepNode';

export const DeviceSelector = ({ onSelect }: { onSelect: (device: DeviceWithAction) => void }) => {
    const devices: Device[] = useMemo(() => Object.values(deviceList), []);
    const deviceIds = useMemo(() => Object.keys(deviceList), []);

    console.log({ devices, deviceIds })
    return (
        <div className="space-y-4 w-max-[80vw] overflow-x-auto w-full">
            <ul className="grid grid-cols-1 gap-4">
                {devices.map((device, index) => (
                    <li key={`${device.name}-${index}`}>
                        <DeviceCard device={device} deviceId={deviceIds[index]} onSelect={onSelect} />
                    </li>
                ))}
            </ul>
        </div>
    );
};