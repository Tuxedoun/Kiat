const axios = require("axios");

module.exports.config = {
  name: "genmail",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐌𝐀𝐑𝐉𝐇𝐔𝐍 𝐁𝐀𝐘𝐋𝐎𝐍",
  description: "( 𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡𝙫2 )",
  usePrefix: false,
  commandCategory: "no prefix",
  usages: "( Gen Random Email address ) ",
  cooldowns: 3
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body || !(event.body.indexOf("genmail") === 0 || event.body.indexOf("Genmail") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();

  if (args[0] === "gen") {
    try {
      const response = await axios.get("https://genmail.replit.app/get");
      const responseData = JSON.stringify(response.data, null, 2);
      api.sendMessage(`( 𝙏𝙀𝙈𝙋𝙈𝘼𝙄𝙇 📧 )\n\n ${responseData} `, event.threadID);
    } catch (error) {
      console.error("🔴 𝖤𝗋𝗋𝗈𝗋", error);
      api.sendMessage("🔴 𝖴𝗇𝖾𝗑𝖾𝖼𝗍𝖾𝖽 𝖤𝗋𝗋𝗈𝗋, 𝖶𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖽𝗋𝖾𝗌𝗌...", event.threadID);
    }
  } else if (args[0].toLowerCase() === "inbox" && args.length === 2) {
    const email = args[1];
    try {
      const response = await axios.get(`https://genmail.replit.app/get/${email}`);
      const inboxMessages = response.data;
      api.sendMessage(`( 𝙄𝙉𝘽𝙊𝙓 📩 )\n\n${JSON.stringify(inboxMessages, null, 2)}`, event.senderID);
      api.sendMessage("✉️ 𝖨𝗇𝖻𝗈𝗑 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌 𝗌𝖾𝗇𝗍 𝗉𝗋𝗂𝗏𝖺𝗍𝖾𝗅𝗂𝗄𝖾𝗌. 𝖢𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗂𝗇𝖻𝗈𝗑 𝖾𝗆𝖺𝗂𝗅 𝖼𝗈𝖽𝖾.", event.threadID);
    } catch (error) {
      console.error("🔴 𝖤𝗋𝗋𝗈𝗋", error);
      api.sendMessage("🔴 𝖴𝗇𝖾𝗑𝖾𝖼𝗍𝖾𝖽 𝖤𝗋𝗋𝗈𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋...", event.senderID);
    }
  } else {
  }
};

module.exports.run = async function ({ api, event }) {

};
