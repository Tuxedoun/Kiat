module.exports.config = {
  name: "prefix",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐌𝐀𝐑𝐉𝐇𝐔𝐍 𝐁𝐀𝐘𝐋𝐎𝐍",
  description: "See the bot prefix",
  usePrefix: false,
  commandCategory: "For admin",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
  let foundPrefix = false;

  const words = event.body.toLowerCase().split(' ');
  for (const word of words) {
    if (word === "prefix" && !foundPrefix) {
      const prefix = threadSetting.PREFIX || global.config.PREFIX;
      api.sendMessage(`System prefix: [ ${prefix} ]`, event.threadID);
      foundPrefix = true;
      break;
    }
  }
};
