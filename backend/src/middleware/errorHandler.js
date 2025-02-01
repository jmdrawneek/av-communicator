export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      success: false,
      error: {
        message: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      }
    };
    ctx.app.emit('error', err, ctx);
  }
}; 