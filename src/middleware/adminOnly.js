function adminOnly(adminIds) {
  return (ctx, next) => {
    if (!adminIds.includes(ctx.from?.id)) {
      return ctx.reply('🔐 Admins seulement.');
    }
    return next();
  };
}
module.exports = { adminOnly };
