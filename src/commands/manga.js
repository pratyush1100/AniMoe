import { getDetails } from "../fetch.js";

export default function animeCommand(bot) {
  bot.command(["manga", "Manga", "MANGA","manga@AniMoe_Bot", "Manga@AniMoe_Bot", "MANGA@AniMoe_Bot"], (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    const message = ctx.message.text;
    const mssgArr = message.split(" ");

    if (mssgArr.length == 1) {
      ctx.reply("Please enter a manga name.", {
        reply_to_message_id: ctx.update.message.message_id,
      });
    } else {
      mssgArr.shift();
      let query = mssgArr.join(" ");

      let schema = `
      query ($query:String = "${query}") {
        Media (type:MANGA, search:$query) {
        id
        idMal
        chapters
        volumes
        startDate{
          year
        }
        type
        genres
        status
        title {
          romaji
          native 
        }
        coverImage{
          extraLarge
        }
        averageScore
        siteUrl
        description
        }
      }
`;

      getDetails(schema).then(async (res) => {
        if (res == null) {
          ctx.reply("Manga Not Found.", {
            reply_to_message_id: ctx.update.message.message_id,
          });
        } else {
          const {
            idMal,
            chapters,
            volumes,
            startDate,
            type,
            genres,
            status,
            averageScore,
            siteUrl,
            description,
          } = res;
          let shortOverview;
          if (description.length > 450) {
            shortOverview = description.slice(0, 450) + "...";
          } else {
            shortOverview = description;
          }

          let buttonData = [
            [
              { text: "Anilist", url: siteUrl },
              {
                text: "MyAnimeList",
                url: "https://myanimelist.net/manga/" + idMal,
              },
            ],
          ];
          ctx.replyWithPhoto(
            { url: res.coverImage.extraLarge, filename: "anime.jpg" },
            {
              caption: `
*${res.title.romaji}*(${res.title.native})

*➝ Type:* ${type}
*➝ Status:* ${status}
*➝ Genres:* \`${genres.join(", ")}\`
*➝ Volumes:* ${volumes}
*➝ Chapters:* ${chapters}
*➝ Released:* ${startDate.year} 
*➝ Score:* ${averageScore}

*➝* ${shortOverview.replace(/<br>/g, " ")}
`,
              parse_mode: "Markdown",
              reply_to_message_id: ctx.update.message.message_id,
              reply_markup: {
                inline_keyboard: buttonData,
              },
            }
          );
        }
      });
    }
  });
}
