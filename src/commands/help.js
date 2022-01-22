export default function helpCommand(bot) {
  bot.command(["help", "Help", "HELP","help@AniMoe_Bot", "Help@AniMoe_Bot", "HELP@AniMoe_Bot"], (ctx) => {
    ctx.replyWithAnimation(
      "https://telegra.ph/file/e5237018383000888f3d6.mp4",
      {
        caption: `Hi ${ctx.update.message.from.first_name}!! 
      
I am [${ctx.botInfo.first_name}](https://t.me/${ctx.botInfo.username}) and i can help you to get information about your favorite Movies, TV, Anime shows and some other related stuffs! Here are my commands:
        `,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "📺 Anime", callback_data: "anime" },
              { text: "🎥 Movie", callback_data: "movie" },
            ],
            [
              { text: "🎁 Others", callback_data: "others" },
              { text: "🤖 About", callback_data: "about" },
            ],
          ],
        },
      }
    );
  });
}
