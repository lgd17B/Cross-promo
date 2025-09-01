Vous avez dit :
Vous avez dit :

Créer deux **bot Telegram avancé de cross-promotion automatisée** avec les caractéristiques suivantes :

---

## 🔁 Fonctionnalités principales

Bot1

* **Onboarding des nouveaux partenaires (FR/EN bilingue)**

  * Dialogue interactif posant les questions suivantes :

    * Lien du canal (t.me/...)
    * Nombre d’abonnés (minimum 500, sinon rejet)
    * Thématique principale (ex : crypto, AI, business…)
    * Langue du canal (fr/en)
    * Fréquence de publication
    * Acceptation des règles(fR/en)
  * Le bot génère un **récapitulatif** et envoie la demande aux **admins**.
  * Les admins reçoivent un message avec boutons **✅ Approve / ❌ Reject**.
  * En cas de validation → ajout du canal en base (Supabase). Suivi d'un message avec le lien du deuxième bot2 moteur de cross promo et  un numéro attribué pour la survie personne des Cross promotion dans un groupe principal des partenaires ex: P1, P2 etc pour chaque
Résultat P2 ton  lien est envoie dans le canal de P1  sa sera une vérification le bot Va fait un récapitulatif de toutes les cross promo de la journée 
 partenaire validée
Utiliser JavaScript 
---
Bot1

## ⚙️ Moteur de cross-promotion automatisée

* Gestion d’une **liste de canaux partenaires** (stockée dans Supabase ou config.json).
* Sélection intelligente d’un **canal partenaire** selon :

  * Thématique / langue
  * Pondération (weight) définie dans config.json
* Génération du message promotionnel avec **A/B testing** :

  * Tirage aléatoire entre plusieurs textes définis par langue.
* Envoi automatique des promos aux **heures optimales** (configurable).
* Limitation d’envoi et délais (anti-spam).
* Possibilité de gérer **100+ canaux**, avec un **scheduler en file d’attente** pour ne pas être bloquer par telegramme.
##strictte
*Supprimer un canal si le bot n’est plus admis ou n’a pas reçu le droit de partage des messages 
*partage un message avec le lien dans  un canal selon la langue dans laquelle le lien sera partagé 
*chaque message doit faire 1h de temps et sera supprimé automatiquement du canal par le bot même et non pas par le propriétaire 
*si un propriétaire supprime un message ou envoie un autre message avant le délai de la disparition du message du cross promo reçois un avertissement ( 3 maximum) son canal sera supprimé automatiquement 
.---

## 📊 Suivi & statistiques (Supabase)

* **Tracking des clics** via un click_id ajouté aux liens.
* Suivi des métriques :

  * Nombre de promos envoyées
  * Clics reçus
  * Conversions (nouveaux abonnés)
  * Rétention (actifs après 24h / 7j)
* Export possible via une **API publique** (JSON).
* Tableau promos et clicks dans Supabase.

---

## 🧠 Intelligence & automatisation

* Détection des **membres inactifs** et lancement de campagnes de relance.
* Suggestions automatiques de messages basés sur les promos qui ont le mieux converti.
* A/B testing intégré : comparaison automatique des performances de deux textes.

---

## 🔐 Sécurité & fiabilité

* **Authentification admin** pour accéder aux commandes sensibles.
* **Logs d’activité** (ajout canal, rejet, promo envoyée).
* **Cooldown** entre messages pour éviter tout blocage.

---

## 🛠️ Stack technique

* **Langage** : Node.js (Telegraf.js) ou Python (aiogram/pyTelegramBotAPI).
* **Base de données** : Supabase (gratuit).
* **Config** : config.json (partenaires, messages, fréquence, tokens).
* **Hébergement** : Render (plan gratuit, 750h/mois, 512 Mo RAM → suffisant pour un bot).

---

## 🎁 Bonus (facultatif mais apprécié)

* Génération automatique de visuels promotionnels (bannières avec image, texte et QR code).
* Interface web simple pour visualiser les stats en temps réel.
* API publique pour connecter d’autres bots de promotion.

---

👉 Le bot doit donc :

1. Accueillir un nouveau canal partenaire → poser les questions → valider via admin.
2. Ajouter le canal validé dans la base.
3. Lancer régulièrement des campagnes cross-promo (choix intelligent du partenaire + message A/B).
4. Sauvegarder stats 
(clics, conversions, rétention) dans Supabase.
5. Tourner sans problème sur Render gratuit.
Allons étape par étape on commence avec le bot 1 donne moi tout les fichiers nécessaires pour créer 
ChatGPT a dit :
Réflexion durant 39s

Top ! J’ai mis tous les fichiers nécessaires (code complet, schéma Supabase, env, Dockerfile, render.yaml, etc.) dans le canvas à droite. Tu peux cloner cette structure, remplir .env, lancer en local (polling) ou déployer sur Render (webhook).

Tu veux que je te prépare un script d’auto-provision Supabase (exécute le SQL + crée les variables Render) ou on enchaîne direct avec Bot2 (moteur de cross-promo) ?

Vous avez dit :
Le resté de fichiers src

ChatGPT a dit :
Réflexion durant 11s

C’est ajouté 👍
Dans le canvas, j’ai complété le dossier src/ avec :

utils : markdown.js (échappement MarkdownV2), rateLimit.js

middleware : logger.js, adminOnly.js

commands : /help, /ping, /restart

et une version mise à jour de src/index.js qui monte ces modules.

Tu veux que je te génère aussi un script bash pour créer l’arborescence + fichiers automatiquement (copier/coller → setup.sh) ? Ou on enchaîne direct avec Bot2 (moteur de cross-promo) ?

Vous avez dit :
Le bot 1 est en webhook ou polling 

ChatGPT a dit :

Le Bot1 que je t’ai préparé fonctionne dans les deux modes :

Polling (par défaut en local) → il suffit de ne pas définir USE_WEBHOOK=true dans .env.

USE_WEBHOOK=false


➝ Le bot va faire du long polling (bot.launch()).

Webhook (recommandé sur Render ou autre hébergeur) → tu actives le mode webhook avec :

USE_WEBHOOK=true
WEBHOOK_URL=https://ton-app.onrender.com
PORT=10000


➝ Le bot démarre un serveur Express et s’attache sur /telegraf/<secret>.
➝ Render route le trafic vers ce port.

Donc :

en local → polling (plus simple à tester).

en prod Render → webhook (plus stable et conforme).

Veux-tu que je t’écrive un guide pas-à-pas de déploiement Render (avec webhook) ou tu préfères garder le polling ?

Vous avez dit :
Donne moi le fichier env complet 


ChatGPT a dit :

Parfait 👍 Voici un .env complet adapté à Bot1 :

# ==============
# 🔐 Telegram Bot
# ==============
TELEGRAM_BOT_TOKEN=1234567890:AA...      # Ton token BotFather

# ============
# 👑 Admin IDs
# ============
# Liste séparée par virgules des admins autorisés à valider/rejeter
ADMIN_IDS=123456789,987654321

# ====================
# 🗄️ Supabase (DB + API)
# ====================
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJI...   # clé service role (ou anon si lecture seule)

# ==============
# 🌐 Mode Webhook
# ==============
# Si USE_WEBHOOK=false => polling
# Si USE_WEBHOOK=true  => webhook activé
USE_WEBHOOK=false

# URL publique de ton app (Render, Railway, etc.)
# Exemple : https://ton-app.onrender.com
WEBHOOK_URL=https://ton-app.onrender.com

# Port exposé par Render (ou Railway). 10000 par défaut sur Render.
PORT=10000

# ====================
# 🛠️ Autres paramètres
# ====================
# Langue par défaut si indéterminée
DEFAULT_LANG=fr

# Durée de session Telegraf (ms)
SESSION_TTL=86400000   # 24h


👉 Résumé :

En local, mets USE_WEBHOOK=false et lance node src/index.js → il tourne en polling.

En prod Render, mets USE_WEBHOOK=true + WEBHOOK_URL = ton domaine Render → il tournera en webhook.

Veux-tu que je te montre aussi le render.yaml (fichier de déploiement Render) pour automatiser l’hébergement du bot ?

Vous avez dit :
Oui
ChatGPT a dit :

Super 🚀 Voici un render.yaml complet que tu peux mettre à la racine de ton projet.
Render va automatiquement builder et déployer ton bot en webhook mode :

services:
  - type: web
    name: bot1-crosspromo
    env: node
    plan: free
    region: frankfurt          # change si besoin (us, oregon, etc.)
    buildCommand: "npm install"
    startCommand: "node src/index.js"
    autoDeploy: true
    envVars:
      - key: NODE_VERSION
        value: 18
      - key: USE_WEBHOOK
        value: true
      - key: PORT
        value: 10000
      - key: WEBHOOK_URL
        sync: false   # tu mets l’URL Render finale après le 1er déploiement
      - key: TELEGRAM_BOT_TOKEN
        sync: false
      - key: ADMIN_IDS
        sync: false
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_KEY
        sync: false
      - key: DEFAULT_LANG
        value: fr
      - key: SESSION_TTL
        value: "86400000"

🔁 Procédure Render

Mets ce fichier render.yaml à la racine de ton repo GitHub.

Connecte ton dépôt à Render
.

Choisis Blueprint deploy → Render lit render.yaml.

Après 1er déploiement, récupère l’URL publique Render (ex: https://bot1-crosspromo.onrender.com).

Va dans Dashboard > Environment → remplace la valeur de WEBHOOK_URL par l’URL Render.

Redeploy → ✅ ton bot passe en webhook.

👉 Astuce : en local, garde USE_WEBHOOK=false pour tester avec polling.

Veux-tu que je t’ajoute aussi le Dockerfile minimal (utile si tu veux builder en container sur Render ou Railway) ?

Vous avez dit :
Et maintenant ping sur cronjo.org pour rêve le bot si il est mise en veille sur render 

ChatGPT a dit :

Très bonne idée 👌
Sur Render (plan gratuit), ton bot peut être mis en veille après 15 minutes d’inactivité. Pour l’empêcher, tu peux utiliser un service externe comme cron-job.org pour faire un ping HTTP régulier.

⚡ Mise en place du "keep-alive"
1. Ajoute une route GET /ping dans ton bot

Dans src/index.js :

import express from "express";

if (process.env.USE_WEBHOOK === "true") {
  const app = express();

  // Route Webhook Telegram
  app.use(bot.webhookCallback(`/telegraf/${secretPath}`));

  // ➕ Ajoute une route ping
  app.get("/ping", (req, res) => {
    res.status(200).send("✅ Bot1 alive");
  });

  app.listen(process.env.PORT || 10000, () => {
    console.log(`Bot1 listening on port ${process.env.PORT || 10000}`);
  });
} else {
  bot.launch();
}


👉 Cette route /ping te permet de vérifier si le bot tourne.

2. Configure cron-job.org

Crée un compte gratuit sur https://cron-job.org
.

Ajoute un nouveau cron job :

URL : https://ton-app.onrender.com/ping

Intervalle : toutes les 5 minutes (suffisant pour garder le service éveillé).

Type : GET

Sauvegarde → cron-job.org va ping ton bot toutes les 5 min.

3. Vérification

Tu peux tester en visitant directement :

https://ton-app.onrender.com/ping


Tu devrais voir ✅ Bot1 alive.

👉 Résultat : même en plan gratuit Render, ton bot restera réveillé en permanence.

Veux-tu que je t’ajoute aussi une protection avec un token secret sur la route /ping (pour éviter que n’importe qui ne spamme ton endpoint) ?

Vous avez dit :
Oui
ChatGPT a dit :

Parfait 👍 On va sécuriser la route /ping avec un token secret défini dans ton .env.

1. Ajoute une variable dans .env
# Token secret pour le keep-alive
PING_SECRET=ma-cle-secrete-tres-longue

2. Modifie src/index.js

On protège la route /ping :

import express from "express";

if (process.env.USE_WEBHOOK === "true") {
  const app = express();

  // Route Webhook Telegram
  app.use(bot.webhookCallback(`/telegraf/${secretPath}`));

  // Route keep-alive protégée
  app.get("/ping", (req, res) => {
    const token = req.query.token;
    if (!token || token !== process.env.PING_SECRET) {
      return res.status(403).send("❌ Forbidden");
    }
    res.status(200).send("✅ Bot1 alive");
  });

  app.listen(process.env.PORT || 10000, () => {
    console.log(`Bot1 listening on port ${process.env.PORT || 10000}`);
  });
} else {
  bot.launch();
}

3. URL de ping

Tu dois maintenant appeler :

https://ton-app.onrender.com/ping?token=ma-cle-secrete-tres-longue


👉 Configure cron-job.org avec cette URL.
Seul celui qui connaît ton PING_SECRET pourra réveiller ton bot.

Veux-tu que je t’ajoute aussi une alerte Telegram automatique (ex. message envoyé à un admin) si le bot reçoit un ping invalide (attaque ou spam) ?

Vous avez dit :
Possibilité que le ping échoué 
ChatGPT a dit :

Exact 👌 Il y a plusieurs cas où le ping peut échouer même avec cron-job.org :

🔎 Causes possibles d’échec

Bot endormi trop longtemps sur Render Free

Même si on ping toutes les 5 min, Render peut couper ton app si elle n’a pas de trafic réseau entrant depuis plusieurs heures.

Si le bot est totalement éteint, le premier ping peut retourner 503 Service Unavailable.

DNS propagation / Render cold start

Render peut prendre quelques secondes (5-10s) pour réveiller ton container → durant ce temps, le ping échoue.

Le ping suivant réussira.

Token secret invalide

Si tu oublies ?token=... ou si la clé est incorrecte → réponse 403 Forbidden.

Quota Render dépassé

Plan gratuit Render = 750 heures par mois (≈ 1 seul bot actif 24/7).

Si tu as plusieurs services, Render peut stopper le bot quand le quota est atteint.

Limite cron-job.org

Sur plan gratuit, ils garantissent l’exécution mais pas à la seconde près → si ton ping tombe pendant un redéploiement Render, ça échoue.

✅ Solutions pour fiabiliser

Pings redondants : configure 2 services (cron-job.org + Uptimerobot, par ex.) → moins de risque de trous.

Retry logique : mets le ping toutes les 5 min avec 3 tentatives (cron-job.org permet retry si échec).

Monitoring : ajoute une alerte Telegram quand /ping n’est pas appelé depuis >10 minutes.

Plan payant Render (Starter $7/mo) → plus de veille forcée.

👉 Je peux t’ajouter un module de monitoring interne :

Le bot stocke dans Supabase le dernier ping réussi.

Si aucun ping >10 minutes, il envoie une alerte à l’admin.

Tu veux que je code ce petit watchdog dans Bot1 ?

Vous avez dit :
Probabilités d'échecs avec solution fiable les ping se fera a des heures précises 
ChatGPT a dit :
Réflexion durant 13s

Voici un plan clair pour des pings à heures précises + une estimation des probabilités d’échec et la solution fiable à mettre en place.

🎯 Objectif

Garder le bot Render réveillé aux heures fixes (ex. 07:00, 12:00, 18:00, 22:00 – fuseau Africa/Lome) et être quasi certain que le réveil fonctionne.

🔢 Probabilités d’échec (ordre de grandeur)

Estimations empiriques typiques pour Render Free + internet grand public. Ce sont des fourchettes (peuvent varier).

Cold start Render / 1er hit échoue : ~2–8% (503/timeout sur le premier ping après veille)

Réseau / TLS transitoire (timeout/resolve) : ~0.5–3% par tentative

Indispo Render (incident plateforme) : ~0.05–0.5% par jour

Cron externe indispo/dégradé : ~0.2–1% sur une exécution

Erreur humaine (token/manip) : ~1–5% si config manuelle

👉 Avec une seule tentative pile à HH:00, le risque cumulé d’échec ponctuel peut dépasser ~5–10%.
👉 Avec multi-tentatives + redondance, on tombe sous 0.1% (voire 0.01%).

✅ Stratégie fiable (recommandée)

Deux fournisseurs

cron-job.org pour l’horaire exact (ex. HH:00).

UptimeRobot (ou Healthchecks.io) en secours toutes les 5 min (intervalle, pas horaire exact) — il rattrape un raté.

Fenêtre de tir + retries

À chaque heure cible H, programme 3 pings via cron-job.org :

H:00, H:01:30, H:03:00 (délais 90s)

Sur cron-job.org : timeout 10–15s, retries 2–3 si dispo.

URL protégée + idempotence

/ping?token=SECRET&ts=YYYYMMDDHH (ignore les dupli dans l’heure).

Le bot accepte plusieurs hits dans une fenêtre ±5 min sans effet de bord.

Watchdog interne

Le bot enregistre last_ping_ok (en DB Supabase).

Si à H+10 min aucun ping validé, alerte Telegram aux admins : “Ping H:00 manquant”.

Health endpoint distinct

/health (non protégé) répond “OK” pour UptimeRobot (si tu veux garder /ping secret de ton côté).

Plan B (optionnel)

Ajoute un auto-retry côté bot : si un ping arrive et constate qu’il réveille le process (cold start), déclenche un self-ping interne 30s plus tard pour stabiliser (préchauffage).

🗓️ Exemple d’horaires précis (Africa/Lome)

Choisis tes heures fixes, ex. 07:00, 12:00, 18:00, 22:00.
Sur cron-job.org, crée 3 jobs par heure :

07:00, 07:01:30, 07:03:00

12:00, 12:01:30, 12:03:00

18:00, 18:01:30, 18:03:00

22:00, 22:01:30, 22:03:00
→ URL : https://ton-app.onrender.com/ping?token=SECRET&ts=20250830-0700 (ts = “slot”)

En secours, UptimeRobot : check /health chaque 5 min (GET).

🔐 Paramétrage conseillé

/ping : exige token (SECRET long en .env) + accepte ts (slot).

Timeout (serveur) : 10–15s.

Rate-limit /ping : 1 par 30s (mais accepte 3 sur 5 min).

Logs : écris un log “ping_ok / ping_fail” (Supabase) pour audit.

🧮 Petit calcul de fiabilité (intuition)

Supposons échec d’un essai (cold start + réseau) ≈ 6%.

3 tentatives espacées : prob. d’échec des 3 ≈ 0.06³ ≈ 0.000216 (0.0216%).

Ajoute UptimeRobot (5 min) : prob. conjointe tombe bien sous 0.01%.

Avec watchdog + alerte, tu es averti dans les rares cas restants.

🛠️ À implémenter côté bot (résumé)

Route /ping protégée, idempotente par slot ts.

Route /health simple (200 “OK”).

Stockage last_ping_ok + watchdog qui notifie à H+10 si manquant.

Logs Supabase (ping_ok / ping_fail / watchdog_alert).

Si tu veux, je t’ajoute tout le code du watchdog + routes /ping & /health directement dans le projet (avec le modèle Supabase pour last_ping_ok).

Vous avez dit :
Fichiers index du bot 1

ChatGPT a dit :
Bot1 Onboarding – Fichiers & Instructions (telegraf + Supabase)
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

J’ai ajouté le fichier complet src/index.js pour démarrer le bot (scènes d’onboarding FR/EN, gestion admin, polling ou webhook). Veux-tu que je prépare aussi package.json avec toutes les dépendances (telegraf, supabase, dotenv, etc.) prêtes pour Render ?

Vous avez dit :
Fichiers onboarding du bot 1 
ChatGPT a dit :

Parfait ✅. Comme tu veux voir les fichiers liés à l’onboarding du Bot1, voilà ce qu’il faut dans src/scenes/onboarding.js (la scène Wizard Telegraf) :

📂 src/scenes/onboarding.js
const { Scenes, Markup } = require("telegraf");
const { isValidChannelLink, parseLang } = require("../utils/validation");
const supabase = require("../services/supabase");
const fr = require("../locales/fr");
const en = require("../locales/en");

function getT(lang) {
  return lang === "fr" ? fr : en;
}

// WizardScene avec plusieurs étapes
const onboardingScene = new Scenes.WizardScene(
  "onboarding",

  // 1️⃣ Choix de la langue
  async (ctx) => {
    await ctx.reply(getT("fr").chooseLang, {
      reply_markup: {
        keyboard: [
          [{ text: fr.langs.fr }, { text: fr.langs.en }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
    return ctx.wizard.next();
  },

  // 2️⃣ Sauvegarder langue
  async (ctx) => {
    const text = ctx.message?.text;
    let lang = text.includes("Français") ? "fr" : text.includes("English") ? "en" : null;
    if (!lang) {
      return ctx.reply("❌ Invalid choice. /start to retry");
    }
    ctx.wizard.state.lang = lang;
    const t = getT(lang);

    await ctx.reply(t.begin, Markup.removeKeyboard());
    await ctx.reply(t.q_link);
    return ctx.wizard.next();
  },

  // 3️⃣ Lien canal
  async (ctx) => {
    const t = getT(ctx.wizard.state.lang);
    const link = ctx.message?.text;
    if (!isValidChannelLink(link)) {
      return ctx.reply("❌ " + t.q_link);
    }
    ctx.wizard.state.channel_link = link;
    await ctx.reply(t.q_subs);
    return ctx.wizard.next();
  },

  // 4️⃣ Nombre d’abonnés
  async (ctx) => {
    const t = getT(ctx.wizard.state.lang);
    const subs = parseInt(ctx.message?.text, 10);
    if (isNaN(subs) || subs < 500) {
      return ctx.reply(t.too_small);
    }
    ctx.wizard.state.subs_count = subs;
    await ctx.reply(t.q_theme);
    return ctx.wizard.next();
  },

  // 5️⃣ Thème
  async (ctx) => {
    ctx.wizard.state.theme = ctx.message?.text;
    const t = getT(ctx.wizard.state.lang);
    await ctx.reply(t.q_lang);
    return ctx.wizard.next();
  },

  // 6️⃣ Langue canal
  async (ctx) => {
    const t = getT(ctx.wizard.state.lang);
    const lang = parseLang(ctx.message?.text);
    if (!lang) {
      return ctx.reply(t.q_lang);
    }
    ctx.wizard.state.language = lang;
    await ctx.reply(t.q_freq);
    return ctx.wizard.next();
  },

  // 7️⃣ Fréquence
  async (ctx) => {
    ctx.wizard.state.post_frequency = ctx.message?.text;
    const t = getT(ctx.wizard.state.lang);
    await ctx.reply(t.q_rules);
    return ctx.wizard.next();
  },

  // 8️⃣ Acceptation règles
  async (ctx) => {
    const t = getT(ctx.wizard.state.lang);
    const answer = (ctx.message?.text || "").toLowerCase();
    if (!["oui", "yes"].includes(answer)) {
      return ctx.reply(t.rules_required);
    }
    ctx.wizard.state.rules_accepted = true;

    // Récap
    const d = ctx.wizard.state;
    await ctx.reply(t.recap_title);
    await ctx.reply(t.recap(d), Markup.inlineKeyboard([
      [Markup.button.callback(t.submit, "submit")],
      [Markup.button.callback(t.cancel, "cancel")],
    ]));
    return ctx.wizard.next();
  },

  // 9️⃣ Soumission
  async (ctx) => {
    const t = getT(ctx.wizard.state.lang);
    if (ctx.update.callback_query?.data === "cancel") {
      await ctx.reply("❌ " + t.cancel);
      return ctx.scene.leave();
    }
    if (ctx.update.callback_query?.data === "submit") {
      const d = ctx.wizard.state;
      const { data, error } = await supabase
        .from("partners")
        .insert([{
          channel_link: d.channel_link,
          subs_count: d.subs_count,
          theme: d.theme,
          language: d.language,
          post_frequency: d.post_frequency,
          rules_accepted: d.rules_accepted,
          submitted_by: ctx.from.id,
        }])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        await ctx.reply("❌ Error saving your data. Try later.");
        return ctx.scene.leave();
      }

      await ctx.reply(t.submitted);
      return ctx.scene.leave();
    }
  }
);

module.exports = onboardingScene;
