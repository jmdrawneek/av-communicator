import Router from '@koa/router';
import { runDeviceCommands } from './deviceController.js';

const router = new Router();

/**
 * POST /run
 * Executes commands on a specified device
 * 
 * Example payload:
 * {
 *   "device_name": "speaker",     // Required: Name of the device to control
 *   "ip_address": "192.168.1.100", // Required: IP address of the device
 *   "input": "hdmi1",            // Optional: Input source
 *   "output": "optical",         // Optional: Output destination
 *   "volume": "50"              // Optional: Volume level
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "results": [
 *     { "status": "success" },
 *     { "status": "success" }
 *   ],
 *   "errors": undefined
 * }
 */
router.post('/run', runDeviceCommands);

export default router; 