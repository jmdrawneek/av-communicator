export const deviceList = {
    Sony_XLMK2ef: {
        name: 'Light 1 Model 1',
        manufacturer: 'Sony',
        model: 'XLMK2ef',
        type: 'light',
        actions: [
            {
                id: '11111111111',
                label: 'Power On',
                commandType: 'rs232',
                termination: '\r\n',
                command: 'powerOn',
                return: 'poweredOn',
            },
            {
                id: '22222222222',
                label: 'Power Off',
                commandType: 'rs232',
                termination: '\r\n',
                command: 'powerOff',
                return: 'poweredOff'
            },
            {
                id: '33333333333',
                label: 'Change Brightness',
                commandType: 'rs232',
                termination: '\r\n',
                command: 'changeBrightness',
                return: 'brightnessChanged',
            }
        ]
    },
    Sony_FTG54d: {
        name: 'Screen 1 Model 1',
        manufacturer: 'Sony',
        model: 'FTG54d',
        type: 'screen',
        actions: [
            {
                id: '44444444444',
                label: 'Power On',
                commandType: 'rs232',
                termination: '\r\n',
                command: 'powerOn',
                return: 'poweredOn'
            },
            {
                id: '55555555555',
                label: 'Power Off',
                commandType: 'rs232',
                termination: '\r\n',
                command: 'powerOff',
                return: 'poweredOff'
            }
        ]
    },
    Sony_UDNGHF: {
        name: 'HDMI Switch 1 Model 1',
        manufacturer: 'Sony',
        model: 'UDNGHF',
        type: 'hdmiSwitch',
        actions: [
            {
                id: '66666666666',
                label: 'Switch Input',
                commandType: 'rs232',
                termination: '\r\n',
                command: 'changeInputTo1',
                return: 'changedInputTo1',
            }
        ]
    },
    Universal_HDMI_Switch: {
        name: 'Universal HDMI Switch',
        manufacturer: 'Universal',
        model: 'UNIVERSAL_HDMI_SWITCH',
        type: 'hdmiSwitch',
        actions: [
            { id: '77777777777', label: 'Switch Input' }
        ]
    },
    Universal_Screen: {
        name: 'Universal Screen',
        manufacturer: 'Universal',
        model: 'UNIVERSAL_SCREEN',
        type: 'screen',
        actions: [
            { id: '88888888888', label: 'Power On' }
        ]
    }
}

export type Device = typeof deviceList[keyof typeof deviceList];
