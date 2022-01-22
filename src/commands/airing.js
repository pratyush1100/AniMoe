import { getDetails } from "../fetch.js";
import millisec from "millisec";

export default function airingCommand(bot) {
  bot.command(["airing", "Airing", "AIRING","airing@AniMoe_Bot", "Airing@AniMoe_Bot", "AIRING@AniMoe_Bot"], (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    const message = ctx.message.text;
    const mssgArr = message.split(" ");

    if (mssgArr.length == 1) {
      ctx.reply("Please enter an airing anime name.", {
        reply_to_message_id: ctx.update.message.message_id,
      });
    } else {
      mssgArr.shift();
      let query = mssgArr.join(" ");

      let schema = `
      query ($query:String = "${query}") {
        Media (type:ANIME, search:$query) {
        id
        episodes
        title {
            romaji
            native
        }
        nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
        }
        }
      }
`;

      getDetails(schema).then((res) => {
        if (res == null) {
          ctx.reply("Anime not found.", {
            reply_to_message_id: ctx.update.message.message_id,
          });
        } else if (res.nextAiringEpisode == null) {
          ctx.reply(
            `
${res.title.romaji} - (${res.title.native})

*Episode:* ${res.episodes}
*ID:* ${res.id}
*Status:* Finished 
`,
            {
              parse_mode: "Markdown",
              reply_to_message_id: ctx.update.message.message_id,
            }
          );
        } else {
          let ms = res.nextAiringEpisode.timeUntilAiring * 1000;
          let formattedDate = millisec(ms).format("DD, HH, MM, SS");
          ctx.reply(
            `
${res.title.romaji} - (${res.title.native})

*Episode:* ${res.nextAiringEpisode.episode}
*ID:* ${res.id}
*Airing in:* ${formattedDate}
`,
            {
              parse_mode: "Markdown",
              reply_to_message_id: ctx.update.message.message_id,
            }
          );
        }
      });
    }
  });
}
