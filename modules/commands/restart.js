module.exports.config = {
  name: "res",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "𝐌𝐀𝐑𝐉𝐇𝐔𝐍 𝐁𝐀𝐘𝐋𝐎𝐍",
  description: "Restart Bot",
  usePrefix: false,
  commandCategory: "system",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  return api.sendMessage(`🔁 | 𝖡𝖮𝖳 𝖶𝖨𝖫𝖫 𝖱𝖤𝖲𝖳𝖠𝖱𝖳 𝖯𝖫𝖤𝖠𝖲𝖤 𝖶𝖠𝖨𝖳 𝖨𝖳 𝖯𝖠𝖳𝖨𝖤𝖭𝖳𝖫𝖸`, threadID, () => process.exit(1));
}
