import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../userSchema.js";
dotenv.config();
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected"))
  .catch((err) => console.log(err));
  
export default async function startCommand(bot) {
  bot.command(["start", "Start", "START","start@AniMoe_Bot", "Start@AniMoe_Bot", "START@AniMoe_Bot"], async (ctx) => {
    if (ctx.update.message.chat.type === "private" || "group" || "supergroup") {
      const absent = await User.findOne({ userid: ctx.chat.id });
      if (!absent) {
        const person = await new User({
          userid: ctx.chat.id,
          type: ctx.message.chat.type,
        });
        await person.save();
      }
    }
    if (ctx.chat.type == "private") {
      bot.telegram.sendAnimation(
        ctx.chat.id,
        "https://telegra.ph/file/cb7a2620f96c1c25c2e16.mp4",
        {
          caption: `
  Hi *${ctx.update.message.from.first_name}*!
  
  I am [${ctx.botInfo.first_name}](https://t.me/${ctx.botInfo.username}), I can get you any information related to any anime,movie,tv show just Send /help and use my special and exclusive features.
        `,
          parse_mode: "Markdown",
          reply_to_message_id: ctx.update.message.message_id,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "☑️ Add Me",
                  url: `t.me/${ctx.botInfo.username}?startgroup=true`,
                },
                { text: "📕 Help", callback_data: "help" },
              ],
              [
                { text: "🚑 Support", url: "https://t.me/cyborg_domain_help" },
                { text: "🔔 Update", url: "https://t.me/cyborg_domain" },
              ],
            ],
          },
        }
      );
    }else{
      bot.telegram.sendAnimation(
        ctx.chat.id,
        "https://telegra.ph/file/cb7a2620f96c1c25c2e16.mp4",
        {
          caption: `
Hi *${ctx.update.message.from.first_name}*!
  
I am [${ctx.botInfo.first_name}](https://t.me/${ctx.botInfo.username}), I can get you any information related to any anime,movie,tv show. Click on the button to know more about me
        `,
          parse_mode: "Markdown",
          reply_to_message_id: ctx.update.message.message_id,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "👆 For more info.",
                  url: `t.me/${ctx.botInfo.username}?start=help`,
                }
              ]
            ],
          },
        }
      );
    }
  });
}
