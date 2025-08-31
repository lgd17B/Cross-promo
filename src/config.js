const dotenv = require('dotenv');
dotenv.config();

function parseAdminIds() {
  const raw = process.env.ADMIN_IDS || '';
  return raw
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => Number(x));
}

module.exports = {
  token: process.env.TELEGRAM_BOT_TOKEN,
  adminIds: parseAdminIds(),
  useWebhook: (process.env.USE_WEBHOOK || 'false').toLowerCase() === 'true',
  webhookUrl: process.env.WEBHOOK_URL,
  port: Number(process.env.PORT) || 10000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  bot2Link: process.env.BOT2_LINK,
  partnersGroupLink: process.env.PARTNERS_GROUP_LINK,
};
