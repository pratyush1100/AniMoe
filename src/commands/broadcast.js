import User from "../userSchema.js";

export default async function BroadcastCommand(bot) {
  bot.command("broadcast", async (ctx) => {
    if (ctx.chat.id === 1828515510 || 675277916) {
      const users = await User.find();
      let mssg = ctx.message.text;
      let mssgArr = mssg.split(" ");
      if (mssgArr.length == 1) {
        ctx.reply("Please enter a message.", {
          reply_to_message_id: ctx.update.message.message_id,
        });
      } else {
        mssgArr.shift();
        let message = mssgArr.join(" ");
        users.map((user) => {
          bot.telegram.sendMessage(user.userid, message).catch((err) => {
            return err;
          });
        });
      }
    } else {
      ctx.reply("This command is only available for admins", {
        reply_to_message_id: ctx.update.message.message_id,
      });
    }
  });
}
