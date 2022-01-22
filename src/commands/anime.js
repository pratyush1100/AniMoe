import { getDetails } from "../fetch.js";

export default function animeCommand(bot) {
  bot.command(["anime", "Anime", "ANIME","anime@AniMoe_Bot", "Anime@AniMoe_Bot", "ANIME@AniMoe_Bot"], (ctx) => {
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
      Media (type:ANIME, search:$query) {
        id
        idMal
        duration
        studios{
          nodes{
            name
          }
        }
        trailer{
            id
            site
          }
        type
        genres
        status
        title {
          romaji
          native 
        }
        episodes
        startDate{
          year
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
      getDetails(schema).then((res) => {
        if (res == null) {
          ctx.reply("Anime not found.", {
            reply_to_message_id: ctx.update.message.message_id,
          });
        } else {
          const {
            idMal,
            startDate,
            type,
            genres,
            status,
            episodes,
            averageScore,
            siteUrl,
            description,
            duration,
          } = res;
          let studioArr = [];
          res.studios.nodes.map((studio) => studioArr.push(studio.name));
          let shortOverview;
          if (description.length > 450) {
            shortOverview = description.slice(0, 450) + "...";
          } else {
            shortOverview = description;
          }
          let buttonData = [[]];
          if (res.trailer == null) {
            buttonData = [
              [
                { text: "Anilist", url: siteUrl },
                {
                  text: "MyAnimeList",
                  url: "https://myanimelist.net/anime/" + idMal,
                },
              ],
            ];
          } else {
            buttonData = [
              [
                {
                  text: "Trailer",
                  url: "https://www.youtube.com/watch?v=" + res.trailer.id,
                },
              ],
              [
                { text: "Anilist", url: siteUrl },
                {
                  text: "MyAnimeList",
                  url: "https://myanimelist.net/anime/" + idMal,
                },
              ],
            ];
          }
          ctx.replyWithPhoto(
            { url: res.coverImage.extraLarge, filename: "anime.jpg" },
            {
              caption: `
*${res.title.romaji}*(${res.title.native})

*➝ Type:* ${type}
*➝ Status:* ${status}
*➝ Genres:* \`${genres.join(", ")}\`
*➝ Episodes:* ${episodes}
*➝ Duration:* ${duration} Per Ep
*➝ Released:* ${startDate.year} 
*➝ Score:* ${averageScore}
*➝ Studios:* ${studioArr.join(", ")}

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

  // getDetails("naruto", "ANIME").then((res) => {
  // if (res == null) {
  //   console.log("Error");
  // } else {
  //   console.log(res);
  // }
  // });
}
