// src/index.js
const { Telegraf, Scenes, session, Markup } = require('telegraf');
const config = require('./config');
const fr = require('./locales/fr');
const en = require('./locales/en');
const onboardingScene = require('./scenes/onboarding');
const adminHandlers = require('./adminHandlers');


// Initialize bot
const bot = new Telegraf(config.token);


// Scenes setup
const stage = new Scenes.Stage([onboardingScene(fr), onboardingScene(en)]);
bot.use(session());
bot.use(stage.middleware());


// /start command
bot.start(async (ctx) => {
const locale = ctx.from.language_code?.startsWith('fr') ? fr : en;
await ctx.reply(locale.start, Markup.keyboard([
[locale.langs.fr, locale.langs.en]
]).resize());
});


// Handle language choice
bot.hears([fr.langs.fr, en.langs.fr], async (ctx) => ctx.scene.enter('onboarding-fr'));
bot.hears([fr.langs.en, en.langs.en], async (ctx) => ctx.scene.enter('onboarding-en'));


// Admin handlers
adminHandlers(bot, fr, en, config);


// Unknown messages
bot.on('message', async (ctx) => {
const locale = ctx.from.language_code?.startsWith('fr') ? fr : en;
await ctx.reply(locale.unknown);
});


// Webhook or polling
if (config.useWebhook) {
bot.launch({
webhook: {
domain: config.webhookUrl,
port: config.port,
},
});
console.log(`🚀 Bot running in webhook mode at ${config.webhookUrl}`);
} else {
bot.launch();
console.log('🚀 Bot running in long polling mode');
}


// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
