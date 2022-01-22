import { getCharDetails } from "../fetch.js";

export default function animeCommand(bot) {
  bot.command(["character", "Character", "CHARACTER","character@AniMoe_Bot", "Character@AniMoe_Bot", "CHARACTER@AniMoe_Bot"], (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    const message = ctx.message.text;
    const mssgArr = message.split(" ");

    if (mssgArr.length == 1) {
      ctx.reply("Please enter anime name", {
        reply_to_message_id: ctx.update.message.message_id,
      });
    } else {
      mssgArr.shift();
      let query = mssgArr.join(" ");

      let schema = `
      query ($query:String = "${query}") {
          Character (search:$query){
            id
            name {
                full
            }
            gender
            siteUrl
            image {
                large
            }
            description (asHtml: false)
        }
      }
      `;
      getCharDetails(schema).then((res) => {
        if (res == null) {
          ctx.reply("Character not found.", {
            reply_to_message_id: ctx.update.message.message_id,
          });
        } else {
          const { name, siteUrl, description, gender } = res;
          let shortOverview;
          if (description.length > 450) {
            shortOverview = description.slice(0, 450) + "...";
          } else {
            shortOverview = description;
          }
          ctx.replyWithPhoto(
            { url: res.image.large, filename: "anime.jpg" },
            {
              caption: `
*${name.full}* (${gender})

*Description:* ${shortOverview}
`,
              parse_mode: "Markdown",
              reply_to_message_id: ctx.update.message.message_id,
              reply_markup: {
                inline_keyboard: [[{ text: "Anilist", url: siteUrl }]],
              },
            }
          );
        }
      });
    }
  });
}
