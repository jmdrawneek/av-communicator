import React from "react";
import { Device } from "../../../types/device";

interface DeviceListProps {
    devices: Device[];
    onDeviceSelect: (device: Device) => void;
    selectedDevice: Device | null;
}

export const DeviceList = ({ devices, onDeviceSelect, selectedDevice }: DeviceListProps) => {
    return (
        <div className="flex flex-col gap-2">
            {devices.map((device) => (
                <div
                    key={device.id}
                    onClick={() => onDeviceSelect(device)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${selectedDevice?.id === device.id
                            ? 'bg-[#13ba3a] text-white'
                            : 'bg-[#41c2eed6] text-black hover:bg-[#13ba3a] hover:text-white'
                        }`}
                >
                    {device.name}
                </div>
            ))}
        </div>
    );
}; 