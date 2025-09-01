/ Rate limit très basique par utilisateur (mémoire processus)
const hits = new Map();
function rateLimit({ windowMs = 5000, max = 5 } = {}) {
  return (ctx, next) => {
    const key = ctx.from?.id || 'anon';
    const now = Date.now();
    const arr = hits.get(key) || [];
    const recent = arr.filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    if (recent.length > max) {
      return ctx.reply('⏳ Merci de ralentir un peu.');
    }
    return next();
  };
}
module.exports = { rateLimit };
