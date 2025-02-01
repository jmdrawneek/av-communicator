import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { errorHandler } from './src/middleware/errorHandler.js';
import router from './src/routes/index.js';

// Initialize Koa app
const app = new Koa();

// Middleware to handle errors
app.use(errorHandler);

// Parse JSON body
app.use(bodyParser());

// Use router middleware
app.use(router.routes()).use(router.allowedMethods());

// Get all registered routes
const registeredRoutes = router.stack.map(layer => ({
  method: layer.methods.join(','),
  path: layer.path,
}));

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log('\n🚀 Server started successfully\n');
  
  console.log('📡 Server listening on:');
  console.log(`   http://${HOST}:${PORT}\n`);
  
  console.log('📍 Registered Routes:');
  registeredRoutes.forEach(route => {
    console.log(`   ${route.method.padEnd(6)} ${route.path}`);
  });
  console.log('\n✨ Ready for connections\n');
});

// Error handler
app.on('error', (err, ctx) => {
  console.error('❌ Server Error:', err);
});
