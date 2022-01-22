import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

import animeCommand from "./src/commands/anime.js";
import airingCommand from "./src/commands/airing.js";
import mangaCommand from "./src/commands/manga.js";
import characterCommand from "./src/commands/character.js";
import movieCommand from "./src/commands/movie.js";
import quoteCommand from "./src/commands/quote.js";
import startCommand from "./src/commands/start.js";
import botActions from "./src/commands/actions.js";
import helpCommand from "./src/commands/help.js";
import tvCommand from "./src/commands/tvseries.js";
import broadcastCommand from "./src/commands/broadcast.js";
import statsCommand from "./src/commands/stats.js";
import wallCommand from "./src/commands/wall.js";

const api_key = process.env.MOVIEDB_API;
const bot = new Telegraf(process.env.BOT_TOKEN);
const wall_api_key = process.env.WALL_API_KEY;

botActions(bot);
animeCommand(bot);
airingCommand(bot);
mangaCommand(bot);
characterCommand(bot);
movieCommand(bot, api_key);
quoteCommand(bot);
startCommand(bot);
tvCommand(bot, api_key);
helpCommand(bot);
broadcastCommand(bot);
statsCommand(bot);
wallCommand(bot, wall_api_key);

bot.launch();
