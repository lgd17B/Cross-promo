function isValidChannelLink(link) {
  if (!link) return false;
  const clean = link.trim();
  return /^(https?:\/\/)?t\.me\/[A-Za-z0-9_]{5,}$/.test(clean);
}

function parseLang(input) {
  const v = (input || '').toLowerCase().trim();
  if (v.startsWith('fr')) return 'fr';
  if (v.startsWith('en')) return 'en';
  return null;
}

module.exports = { isVa
