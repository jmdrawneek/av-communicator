export const deviceList = {
    lightModel1: {
        name: 'Light 1 Model 1',
        type: 'light',
        actions: [
            {id: 'powerOn', label: 'Power On'}, 
            {id: 'powerOff', label: 'Power Off'}, 
            {id: 'changeBrightness', label: 'Change Brightness'}
        ]
    },
    screenModel1: {
        name: 'Screen 1 Model 1',
        type: 'screen',
        actions: [
            {id: 'powerOn', label: 'Power On'}, 
            {id: 'powerOff', label: 'Power Off'}
        ]
    },
    hdmiSwitchModel1: {
        name: 'HDMI Switch 1 Model 1',
        type: 'hdmiSwitch',
        actions: [
            {id: 'switchInput', label: 'Switch Input'}
        ]
    }
}

export type Device = typeof deviceList[keyof typeof deviceList];


export const deviceCommands = {
    'lightModel1': {
        powerOn: {
            command: 'beepBoop',
            return: 'beepBoopBob'
        }
    }
}