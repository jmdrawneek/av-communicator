

export const deviceCommands = {
    '11111111111': {
        supportedModels: ['XLMK2ef'],
        type: 'hdmiSwitch',
        manufacturer: 'Sony',
        commandType: 'rs232',
        termination: '\r\n',
        command: 'changeInputTo1',
        return: 'changedInputTo1',
    },
    '11111111112': {
        supportedModels: ['XLMK2ef'],
        type: 'hdmiSwitch',
        manufacturer: 'Sony',
        commandType: 'rs232',
        termination: '\r\n',
        command: 'changeInputTo2',
        return: 'changedInputTo2',
    },
    '22222222222': {
        supportedModels: ['XLMK2ef'],
        type: 'hdmiSwitch',
        manufacturer: 'Sony',
        commandType: 'rs232',
        termination: '\r\n',
        command: 'beepBoop',
        return: 'beepBoopBob',
        attributes: {
            inputs: 4,
            outputs: 2
        }
    },
    '33333333333': {
        supportedModels: ['XLMK2ef'],
        type: 'hdmiSwitch',
        manufacturer: 'Sony',
        commandType: 'rs232',
        termination: '\r\n',
        command: 'beepBoop',
        return: 'beepBoopBob',
    },
    '44444444444': {
        supportedModels: ['FTG54d'],
        type: 'screen',
        manufacturer: 'Sony',
        commandType: 'rs232',
        termination: '\r\n',
        command: 'beepBoop',
        return: 'beepBoopBob',
    },
    '55555555555': {
        supportedModels: ['FTG54d'],
        type: 'screen',
        manufacturer: 'Sony',
        commandType: 'ip',
        termination: 'response',
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '66666666666': {
        supportedModels: ['UDNGHF'],
        type: 'hdmiSwitch',
        manufacturer: 'Sony',
        commandType: 'ip',
        termination: 'response',
        command: 'beepBoop',
        return: 'beepBoopBob'
    }
}

export type DeviceCommand = typeof deviceCommands[keyof typeof deviceCommands];
