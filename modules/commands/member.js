const fs = require('fs');

module.exports.config = {
  name: "member",
  version: '1.0.0',
  hasPermission: 2,
  credits: "𝐌𝐀𝐑𝐉𝐇𝐔𝐍 𝐁𝐀𝐘𝐋𝐎𝐍",
  description: 'Block a user from using the bot',
usePrefix: false,
  commandCategory: 'system',
  usages: '[userID]',
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  let uid;

  if (args.join().includes('@')) {
    uid = Object.keys(event.mentions);
  } else {
    uid = [args[0]];
  }

  if (uid.length !== 1 || isNaN(uid[0])) {
    api.sendMessage('Invalid user ID provided.', event.threadID, event.messageID);
    return;
  }

  if (args.length > 1) {
    const action = args[1].toLowerCase();

    if (action === 'unblock') {
      api.changeBlockedStatus(uid[0], false);
      api.sendMessage(`Successfully unblocked user ${uid[0]}`, event.threadID, event.messageID);
    } else if (action === 'block') {
      api.changeBlockedStatus(uid[0], true);
      api.sendMessage(`Successfully blocked user ${uid[0]}`, event.threadID, event.messageID);
    } else {
      api.sendMessage('Invalid command. Please use "block" or "unblock".', event.threadID, event.messageID);
    }
  } else {
    api.sendMessage('Missing command. Please use "block" or "unblock".', event.threadID, event.messageID);
  }
};
