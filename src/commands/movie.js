import axios from "axios";

export default function animeCommand(bot, api_key) {
  const image_path = `https://image.tmdb.org/t/p/w1280`;
  bot.command(["movie", "Movie", "MOVIE","movie@AniMoe_Bot", "Movie@AniMoe_Bot", "MOVIE@AniMoe_Bot"], (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    let mssg = ctx.message.text;
    let mssgArr = mssg.split(" ");
    let query = "";
    if (mssgArr.length == 1) {
      ctx.reply("Please enter the movie name.", {
        reply_to_message_id: ctx.update.message.message_id,
      });
    } else {
      mssgArr.shift();
      query = mssgArr.join("+");
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="${query}"`;
      axios
        .get(url)
        .then((res) => {
          const Movie_id = res.data.results[0].id;
          const Movieurl = `https://api.themoviedb.org/3//movie/${Movie_id}?api_key=${api_key}`;

          axios.get(Movieurl).then((response) => {
            const {
              title,
              original_language,
              overview,
              popularity,
              genres,
              adult,
              release_date,
              runtime,
              status,
              vote_average,
              tagline,
            } = response.data;
            let CompanyName = "";
            let genreArry = [];
            let language = original_language.toUpperCase();
            genres.map((genre) => genreArry.push(genre.name));
            let genreList = genreArry.join(", ");
            let release_year = release_date.slice(0, 4);
            if (response.data.production_companies[0] != undefined) {
              CompanyName = response.data.production_companies[0].name;
            } else {
              CompanyName = "Na";
            }
            let shortOverview = "";
            if (overview.length > 450) {
              shortOverview = overview.slice(0, 450) + "...";
            } else {
              shortOverview = overview;
            }
            ctx.replyWithPhoto(
              {
                url: image_path + res.data.results[0].poster_path,
                filename: "anime.jpg",
              },
              {
                caption: `
*${title}* - ${language}

*➝ Status:* ${status.toUpperCase()}
*➝ Genres:* \`${genreList}\`
*➝ Adult:* ${adult ? "Yes" : "No"}
*➝ Popularity:* ${popularity}
*➝ Average Score:* ${vote_average}
*➝ Runtime:* ${runtime} minutes
*➝ Premiered:* ${release_year}
*➝ Production Company:* ${CompanyName}
*➝ Tag Line:* ❝ ${tagline ? tagline : "Na"} ❞
                            
*➝* ${shortOverview}`,
                parse_mode: "Markdown",
                reply_to_message_id: ctx.update.message.message_id,
              }
            );
          });
        })
        .catch((err) =>
          bot.telegram.sendMessage(ctx.chat.id, "No result found :(", {
            reply_to_message_id: ctx.update.message.message_id,
          })
        );
    }
  });
}
