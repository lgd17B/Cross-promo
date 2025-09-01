// Échappement MarkdownV2 pour Telegram
const specials = /[_*\[\]()~`>#+\-=|{}.!]/g;
function escapeMdV2(text = '') {
  return String(text).replace(specials, (m) => `\${m}`);
}
function mdSection(title, body) {
  return `*${escapeMdV2(title)}*
${escapeMdV2(body)}`;
}
module.exports = { escapeMdV2, mdSection };
