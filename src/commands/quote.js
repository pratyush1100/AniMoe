import { getRandomQuote } from "../fetch.js";
let url = "https://animechan.vercel.app/api/random";

export default function quoteCommand(bot) {
  bot.command(["quote", "Quote", "QUOTE","quote@AniMoe_Bot", "Quote@AniMoe_Bot", "QUOTE@AniMoe_Bot"], (ctx) => {
    getRandomQuote(url).then((data) => {
      if (data == null) {
        ctx.reply("Some error occured.");
      } else {
        ctx.reply(
          `
❝ ${data.quote} ❞
      
- *${data.character}* (${data.anime})
      `,
          {
            parse_mode: "Markdown",
            reply_to_message_id: ctx.update.message.message_id,
            reply_markup: {
              inline_keyboard: [[{ text: "Reload", callback_data: "reload" }]],
            },
          }
        );
      }
    });
  });

  bot.action("reload", (ctx) => {
    getRandomQuote(url).then((data) => {
      ctx.editMessageText(
        `
❝ ${data.quote} ❞
      
- *${data.character}* (${data.anime})
      `,
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [[{ text: "Reload", callback_data: "reload" }]],
          },
        }
      );
    });
  });
}
