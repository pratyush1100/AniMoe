import axios from "axios";

export default async function tvCommand(bot, api_key) {
  bot.command(["tv", "Tv", "TV", "tV","tv@AniMoe_Bot", "Tv@AniMoe_Bot", "TV@AniMoe_Bot", "tV@AniMoe_Bot"], async (ctx) => {
    try {
      const image_path = `https://image.tmdb.org/t/p/w1280`;

      bot.telegram.sendChatAction(ctx.chat.id, "typing");
      let mssg = ctx.message.text;
      let mssgArr = mssg.split(" ");
      let query = "";

      if (mssgArr.length == 1) {
        ctx.reply("Please enter the Series name.", {
          reply_to_message_id: ctx.update.message.message_id,
        });
      } else {
        mssgArr.shift();
        query = mssgArr.join("+");
        const url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query="${query}"`;

        const response = await axios.get(url);
        const result = response.data.results;

        if (!result[0].id) {
          ctx.reply("Tv Series not found.");
        } else {
          const tv_id = result[0].id;
          const tvUrl = `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${api_key}`;

          const res = await axios.get(tvUrl);
          const {
            episode_run_time,
            first_air_date,
            status,
            genres,
            homepage,
            languages,
            name,
            number_of_episodes,
            number_of_seasons,
            overview,
            popularity,
            poster_path,
            production_companies,
            vote_average,
          } = res.data;

          let genreList = [];
          genres.map((genre) => {
            genreList.push(genre.name);
          });
          let CompanyName = [];
          if (production_companies[0] != undefined) {
            production_companies.map((comp) => {
              CompanyName.push(comp.name);
            });
          } else {
            CompanyName = "Na";
          }
          let shortOverview = "";
          if (overview.length > 450) {
            shortOverview = overview.slice(0, 450) + "...";
          } else {
            shortOverview = overview;
          }
          ctx
            .replyWithPhoto({url: image_path + poster_path, filename: "tvseries.jpg"}, {
              caption: `
*${name}* - ${languages[0]}

*➝ Status:* ${status.toUpperCase()}
*➝ Genres:* \`${genreList.join(", ")}\`
*➝ Popularity:* ${popularity}
*➝ Seasons:* ${number_of_seasons}
*➝ Episodes:* ${number_of_episodes}
*➝ Average Score:* ${vote_average}
*➝ Runtime:* ${episode_run_time} minutes
*➝ Premiered:* ${first_air_date.slice(0, 4)}
*➝ Production Company:* ${CompanyName.join(", ")}

*➝* ${shortOverview}
                `,
              parse_mode: "Markdown",
              reply_to_message_id: ctx.update.message.message_id,
            })
        }
      }
    } catch (error) {
      ctx.reply("Tv Series not found.");
    }
  });
}
