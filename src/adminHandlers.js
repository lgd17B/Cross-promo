const { Markup } = require("telegraf");
const supabase = require("./services/supabase");

/**
 * Gestion des actions admin : approbation ou rejet des partenaires
 * @param {Telegraf} bot
 * @param {object} fr - locale française
 * @param {object} en - locale anglaise
 * @param {object} config - configuration (.env / config.js)
 */
module.exports = function adminHandlers(bot, fr, en, config) {
  // Après soumission, notifier les admins
  bot.action("submit", async (ctx) => {
    try {
      const request = ctx.wizard?.state;
      if (!request) return;

      const t = request.lang === "fr" ? fr : en;
      const recap = t.recap(request);

      for (const adminId of config.admins) {
        await ctx.telegram.sendMessage(
          adminId,
          `📩 Nouvelle demande de partenariat :\n\n${recap}`,
          Markup.inlineKeyboard([
            [Markup.button.callback("✅ Approve", `approve_${request.channel_link}`)],
            [Markup.button.callback("❌ Reject", `reject_${request.channel_link}`)],
          ])
        );
      }

      await ctx.reply(t.submitted_admin);
    } catch (err) {
      console.error("❌ Error sending admin request:", err);
    }
  });

  // ✅ Approve
  bot.action(/approve_(.+)/, async (ctx) => {
    const channelLink = ctx.match[1];
    try {
      const { error } = await supabase
        .from("partners")
        .update({ status: "approved" })
        .eq("channel_link", channelLink);

      if (error) throw error;

      await ctx.editMessageText(`✅ Canal approuvé : ${channelLink}`);
      await ctx.answerCbQuery("Approved");

      // Informer l’utilisateur (si enregistré)
      // Ici tu pourrais ajouter l'envoi d'un message Telegram au créateur
      // en utilisant ctx.telegram.sendMessage(userId, "Ton canal est validé !")
    } catch (err) {
      console.error("❌ Error approving partner:", err);
      await ctx.answerCbQuery("Erreur approval", { show_alert: true });
    }
  });

  // ❌ Reject
  bot.action(/reject_(.+)/, async (ctx) => {
    const channelLink = ctx.match[1];
    try {
      const { error } = await supabase
        .from("partners")
        .update({ status: "rejected" })
        .eq("channel_link", channelLink);

      if (error) throw error;

      await ctx.editMessageText(`❌ Canal rejeté : ${channelLink}`);
      await ctx.answerCbQuery("Rejected");
    } catch (err) {
      console.error("❌ Error rejecting partner:", err);
      await ctx.answerCbQuery("Erreur rejection", { show_alert: true });
    }
  });
};
