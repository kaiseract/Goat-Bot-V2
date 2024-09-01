=> {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "cmdstore",
          messageID: info.messageID,
          author: event.senderID,
          commands,
        });
      });
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while fetching commands.");
    }
  },

  onReply: async function ({ api, event, Reply, args, message }) {
    const { author, commandName, commands } = Reply;

    if (event.senderID !== author || !commands) {
      return;
    }

    const commandID = parseInt(args[0], 10);

    if (isNaN(commandID) || !commands.some(cmd => cmd.id === commandID)) {
      message.reply("Invalid input.\nPlease provide a valid command ID.");
      return;
    }

    const selectedCommand = commands.find(cmd => cmd.id === commandID);

    let replyMessage = `
    ð—œð——:${selectedCommand.id}
    ð—–ð— ð——:${selectedCommand.cmdName}
    ð—–ð—¢ð——ð—˜:${selectedCommand.codeLink}
    ð—œð—¡ð—™ð—¢:${selectedCommand.description}`;

    message.reply(replyMessage);
    global.GoatBot.onReply.delete(event.messageID);
  },
};