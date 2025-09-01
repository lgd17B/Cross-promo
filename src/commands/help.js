const locales = { fr: require('../locales/fr'), en: require('../locales/en') };

module.exports = function registerHelp(bot) {
  bot.command('help', (ctx) => {
    const lang = ctx.session?.lang || 'fr';
    const loc = locales[lang] || locales.fr;
    const text = [
      '🤖 *Bot1 – Onboarding*',
      '
/ start — Démarrer l\'onboarding',
      '/help — Cette aide',
      '/ping — Vérifier la disponibilité',
    ].join('
');
    return ctx.replyWithMarkdownV2(text.replace(/[!_()*~`\[\]>#\+\-=|{}\.]/g, (m) => `\${m}`));
  });
};
