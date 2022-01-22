import axios from "axios";

export default async function wallCommand(bot, wall_api_key) {
  bot.command(["wall", "Wall", "WALL","wall@AniMoe_Bot", "Wall@AniMoe_Bot", "WALL@AniMoe_Bot"], async (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    const message = ctx.message.text;
    const mssgArr = message.split(" ");

    if (mssgArr.length == 1) {
      ctx.reply("Please enter a query", {
        reply_to_message_id: ctx.update.message.message_id,
      });
    } else {
      mssgArr.shift();
      let query = mssgArr.join("+");
      let url = `https://wallhaven.cc/api/v1/search?q=${query}&categories=010&purity=100&sorting=date_added&api_key=${wall_api_key}`;
      const res = await axios.get(url);
      try {
        let data = res.data.data;
        let randomIndex = Math.floor(Math.random() * data.length);
        ctx.replyWithPhoto(data[randomIndex].path, {
          caption: data[randomIndex].resolution,
        });
        ctx.replyWithDocument(data[randomIndex].path, {
          caption: data[randomIndex].resolution,
        });
      } catch (error) {
        bot.telegram.sendMessage(ctx.chat.id, "No result found :(", {
          reply_to_message_id: ctx.update.message.message_id,
        });
      }
    }
  });
}
