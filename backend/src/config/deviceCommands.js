// Define device commands map
// This map contains the commands for different devices
// Key: device_name, Value: object containing command templates
export const deviceCommands = new Map([
  ['speaker', {
    input: (value) => `/api/input/${value}`,
    output: (value) => `/api/output/${value}`,
    volume: (value) => `/api/volume/set/${value}`
  }],
  ['amplifier', {
    input: (value) => `/control/input/${value}`,
    output: (value) => `/control/output/${value}`,
    volume: (value) => `/control/volume/${value}`
  }]
  // Add more devices as needed
]); 