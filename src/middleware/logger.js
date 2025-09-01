const { logActivity } = require('../services/supabase');

function logger() {
  return async (ctx, next) => {
    const meta = {
      from: ctx.from?.id,
      chat: ctx.chat?.id,
      type: ctx.updateType,
      data: Object.keys(ctx.update || {}),
    };
    try {
      await logActivity('update_in', meta, ctx.from?.id || null);
    } catch (_) {}

    try {
      await next();
    } catch (err) {
      try {
        await logActivity('error', { message: err.message, stack: err.stack?.slice(0, 500) }, ctx.from?.id || null);
      } catch (_) {}
      throw err;
    }
  };
}

module.exports = { logger };
