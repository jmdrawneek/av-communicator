

export const deviceCommands = {
    '11111111111': {
        supportedModels: ['XLMK2ef'],
        commandType: 'rs323',
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '22222222222': {
        supportedModels: ['XLMK2ef'],
        commandType: 'rs323',
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '33333333333': {
        supportedModels: ['XLMK2ef'],
        commandType: 'rs323',
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '44444444444': {
        supportedModels: ['FTG54d'],
        commandType: 'rs323',
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '55555555555': {
        supportedModels: ['FTG54d'],
        commandType: 'ip',
        command: 'beepBoop',
        return: 'beepBoopBob'
    },
    '66666666666': {
        supportedModels: ['UDNGHF'],
        commandType: 'ip',
        command: 'beepBoop',
        return: 'beepBoopBob'
    }
}

export type DeviceCommand = typeof deviceCommands[keyof typeof deviceCommands];
