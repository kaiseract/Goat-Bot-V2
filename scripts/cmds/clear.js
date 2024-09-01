module.exports = {
  config: {
    name: "clear",
    aliases: [],
    author: "kshitiz",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: "Clear bot messages"
    },
    longDescription: {
      en: "Unsend all messages sent by the bot in the current chat."
    },
    category: "𝗕𝗢𝗫",
    guide: {
      en: "{p}{n} - Unsend all bot messages."
    }
  },
  
  onStart: async function ({ api, event }) {
    const threadID = event.threadID;

    try {
      const botMessages = await api.getThreadHistory(threadID, 50);
      const botSentMessages = botMessages.filter(message => message.senderID === api.getCurrentUserID());
      
      for (const message of botSentMessages) {
        await api.unsendMessage(message.messageID);
      }

    } catch (error) {
      console.error("An error occurred while unsending messages:", error);
    }
  }
};