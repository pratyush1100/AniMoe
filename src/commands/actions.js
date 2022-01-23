export default function botActions(bot) {
  bot.action("help", (ctx) => {
    ctx.editMessageCaption(
      `
Hi ${ctx.update.callback_query.from.first_name}!!

I am [${ctx.botInfo.first_name}](https://t.me/${ctx.botInfo.username}) and i can help you to get information about your favorite Movies, TV, Anime shows and some other related stuffs! Here are my commands:
`,
      {
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

  bot.action("anime", (ctx) => {
    ctx.editMessageCaption(
      `
Here are all anime related commands:

\`/anime <anime>\`: returns details about the anime. 
\`/manga <manga>\`: returns details about the manga.
\`/character <character>\`: returns details about the character.
\`/airing <airing anime>\`: returns details about the airing.
`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Go Back 🔙", callback_data: "help" }]],
        },
      }
    );
  });
  bot.action("movie", (ctx) => {
    ctx.editMessageCaption(
      `
Here are all movie related commands:

\`/movie <movie>\`: returns details about the movie.
\`/tv <series name>\`: returns details about the web series.
`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Go Back 🔙", callback_data: "help" }]],
        },
      }
    );
  });
  bot.action("others", (ctx) => {
    ctx.editMessageCaption(
      `
Here are all other commands:

\`/quote \`: returns an anime quote.
\`/wall <anime name> \`: returns an anime wallpaper.
\`/stats \`: gives the stats of bot.
`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Go Back 🔙", callback_data: "help" }]],
        },
      }
    );
  });
  bot.action("about", (ctx) => {
    ctx.editMessageCaption(
      `
This bot is fully written in *JavaScript* by ๖ۣۜƊaℝ𝓀 Sτaℝ⇜, feel free to report me if you find any rough edge inside this bot.

*▸ Name:* ${ctx.botInfo.first_name}
*▸ Bot version:* 1.0.0
*▸ Package:* Telegraf
*▸ Bot Server:* Heroku
*▸ Database:* MongoDb
*▸ Movies & TV:* [TheMoviesDb](themoviedb.org)
*▸ Anime data:* [Anilist](Anilist.co)
*▸ Anime quotes:* [Animechan](animechan.vercel.app)
      
If you wanna know more about me then ask developer,
Thank You ;)
`,
      {
        parse_mode: "Markdown",
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Github",
                url: "https://github.com/pratyush1100",
              },
              {
                text: "Creator",
                url: "https://t.me/pratyush1100",
              },
            ],
            [
              {
                text: "Go Back 🔙",
                callback_data: "help",
              },
            ],
          ],
        },
      }
    );
  });
}
