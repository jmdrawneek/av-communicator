import { deviceCommands } from '../config/deviceCommands.js';
import { makePostRequest } from '../utils/httpClient.js';

const debug = process.env.DEBUG;

function logDebug(...args) {
    if (debug) {
        console.log('[Device Controller]', ...args);
    }
}

export async function runDeviceCommands(ctx) {
  // Validate request body
  const { device_name, ip_address, input, output, volume } = ctx.request.body;

  // Check if all required fields are present
  if (!device_name || !ip_address) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: {
        message: 'Missing required fields: device_name and ip_address are mandatory'
      }
    };
    return;
  }

  // Get device commands from the map
  const deviceCommand = deviceCommands.get(device_name);
  if (!deviceCommand) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: {
        message: `Device "${device_name}" not found in supported devices`
      }
    };
    return;
  }

  try {
    // Prepare base URL for requests
    const baseURL = `http://${ip_address}`;

    // Store all promises for commands
    const commandPromises = [];

    // Process each attribute if provided and add to promises array
    if (input && deviceCommand.input) {
      commandPromises.push(
        makePostRequest(baseURL, deviceCommand.input(input))
      );
    }

    if (output && deviceCommand.output) {
      commandPromises.push(
        makePostRequest(baseURL, deviceCommand.output(output))
      );
    }

    if (volume && deviceCommand.volume) {
      commandPromises.push(
        makePostRequest(baseURL, deviceCommand.volume(volume))
      );
    }

    // Execute all commands in parallel
    const results = await Promise.all(commandPromises);

    // Check for any errors in the results
    const errors = results.filter(result => result.error);

    ctx.body = {
      success: errors.length === 0,
      results: results,
      errors: errors.length > 0 ? errors : undefined
    };

  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        message: 'Failed to execute device commands',
        details: error.message
      }
    };
  }
}

async function runCommand(req, res) {
    const { deviceId, command, parameters } = req.body;
    
    logDebug(`Received command request for device ${deviceId}:`, { command, parameters });

    try {
        const device = await getDevice(deviceId);
        if (!device) {
            logDebug(`Device not found: ${deviceId}`);
            return res.status(404).json({ error: 'Device not found' });
        }

        logDebug(`Found device: ${device.name} (${device.type})`);
        
        const result = await executeCommand(device, command, parameters);
        logDebug(`Command executed successfully:`, result);
        
        res.json(result);
    } catch (error) {
        logDebug(`Error executing command:`, error);
        res.status(400).json({ error: error.message });
    }
} 