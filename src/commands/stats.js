import User from "../userSchema.js";

export default async function statsCommand(bot) {
  bot.command(["stats", "Stats", "STATS","stats@AniMoe_Bot", "Stats@AniMoe_Bot", "STATS@AniMoe_Bot"], async (ctx) => {
    const users = await User.find({ type: "private" });
    const groups = await User.find({ type: "group" });
    const superGroups = await User.find({ type: "supergroup" });

    const statsMessage = `
** [${ctx.botInfo.first_name}](https://t.me/${ctx.botInfo.username}) Stats **

*▸ Used by *${users.length} *Users.*
*▸ Added in* ${groups.length + superGroups.length} *Groups.*

*Thanks for using me! :3*`;
    ctx.reply(statsMessage, {
      parse_mode: "Markdown",
      reply_to_message_id: ctx.update.message.message_id,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "➕ Add me to your group",
              url: `https://t.me/${ctx.botInfo.username}?startgroup=true`,
            },
          ],
        ],
      },
    });
  });
}
