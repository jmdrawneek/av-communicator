export const deviceList = {
    Sony_Light_XLMK2ef: {
        name: 'Light 1 Model 1',
        manufacturer: 'Sony',
        model: 'XLMK2ef',
        type: 'light',
        actions: [
            { id: '11111111111', label: 'Power On' }, 
            { id: '22222222222', label: 'Power Off' }, 
            { id: '33333333333', label: 'Change Brightness' }
        ]
    },
    Sony_Screen_FTG54d: {
        name: 'Screen 1 Model 1',
        manufacturer: 'Sony',
        model: 'FTG54d',
        type: 'screen',
        actions: [
            { id: '44444444444', label: 'Power On' }, 
            { id: '55555555555', label: 'Power Off' }
        ]
    },
    Sony_HDMI_Switch_UDNGHF: {
        name: 'HDMI Switch 1 Model 1',
        manufacturer: 'Sony',
        model: 'UDNGHF',
        type: 'hdmiSwitch',
        actions: [
            { id: '66666666666', label: 'Switch Input' }
        ]
    }
}

export type Device = typeof deviceList[keyof typeof deviceList];


export const deviceCommands = {
    '11111111111': {
        supportedModels: ['XLMK2ef'],
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '22222222222': {
        supportedModels: ['XLMK2ef'],
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '33333333333': {
        supportedModels: ['XLMK2ef'],
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '44444444444': {
        supportedModels: ['FTG54d'],
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '55555555555': {
        supportedModels: ['FTG54d'],
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '66666666666': {
        supportedModels: ['UDNGHF'],
        command: 'beepBoop',
        return: 'beepBoopBob'
    }
}

export type DeviceCommand = typeof deviceCommands[keyof typeof deviceCommands];
