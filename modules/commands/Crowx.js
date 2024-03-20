const axios = require("axios");

module.exports.config = {
  name: "fuji",
  version: "3.8",
  permission: 0,
  credits: "𝐌𝐀𝐑𝐉𝐇𝐔𝐍 𝐁𝐀𝐘𝐋𝐎𝐍",
  description: "( Crowx AI )",
  usePrefix: false,
  commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
  usages: "( 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 Crowx AI )",
  cooldown: 3,
};

async function convertVoiceToText(audioUrl, api, event) {
  try {
    api.sendMessage("🔊 | Crowx 𝙰𝙸 𝙲𝚘𝚗𝚟𝚎𝚛𝚝𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚊𝚞𝚍𝚒𝚘, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID);

    const response = await axios.get(`https://code-merge-api-hazeyy01.replit.app/api/try/voice2text?url=${encodeURIComponent(audioUrl)}`);
    const text = response.data.transcription;

    if (text) {
      api.sendMessage(`🟢 | Crowx 𝙰𝙸  𝐂𝐨𝐧𝐓𝐞𝐱𝐭\n\n ${text}`, event.threadID, event.messageID);
    } else {
      api.sendMessage("🔴 𝚄𝚗𝚊𝚋𝚕𝚎 𝚝𝚘 𝚌𝚘𝚗𝚟𝚎𝚛𝚝 𝚊𝚞𝚍𝚒𝚘.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("🔴 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚒𝚗𝚐 𝚊𝚞𝚍𝚒𝚘:", error);
    api.sendMessage("🔴 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚒𝚗𝚐 𝚊𝚞𝚍𝚒𝚘:", event.threadID, event.messageID);
  }
}

async function convertImageToCaption(imageURL, api, event) {
  try {
    api.sendMessage("📷 | Crowx 𝙰𝙸 𝚛𝚎𝚌𝚘𝚐𝚗𝚒𝚝𝚒𝚘𝚗𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID);

    const response = await axios.get(`https://code-merge-api-hazeyy01.replit.app/api/image2text/new?image=${encodeURIComponent(imageURL)}`);
    const caption = response.data.caption.generated_text;

    if (caption) {
      api.sendMessage(`📷 | Crowx 𝙰𝙸  𝐈𝐦𝐚𝐠𝐞 𝐂𝐨𝐧𝐓𝐞𝐱𝐭\n\n ${caption}`, event.threadID, event.messageID);
    } else {
      api.sendMessage("🔴 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚌𝚘𝚗𝚟𝚎𝚛𝚝 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("🔴 𝙴𝚛𝚛𝚘𝚛 𝚒𝚖𝚊𝚐𝚎 𝚛𝚎𝚌𝚘𝚐𝚗𝚒𝚝𝚒𝚘𝚗:", error);
    api.sendMessage("🔴 𝙴𝚛𝚛𝚘𝚛 𝚒𝚖𝚊𝚐𝚎 𝚛𝚎𝚌𝚘𝚐𝚗𝚒𝚝𝚒𝚘𝚗", event.threadID, event.messageID);
  }
}

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body?.toLowerCase()?.startsWith("fuji"))) return;


  const args = event.body.split(/\s+/);
  args.shift();

  if (event.type === "message_reply") {
    if (event.messageReply.attachments[0]) {
      const attachment = event.messageReply.attachments[0];

      if (attachment.type === "audio") {
        const audioUrl = attachment.url;
        convertVoiceToText(audioUrl, api, event);
        return;
      } else if (attachment.type === "photo") {
        const imageURL = attachment.url;
        convertImageToCaption(imageURL, api, event);
        return;
      }
    }
  }

  const inputText = args.join(' ');

  if (!inputText) {
    return api.sendMessage("✨ HELLO SENPAI IM CROWX YOUR HELPFUL ASSISTANT", event.threadID);
  }

  api.sendMessage("🗨️ | FINDING ANSWERS INTO MY DATASETS ", event.threadID);

  try {
    const response = await axios.get(`https://oneapi1.replit.app/meta/api?prompt=${inputText}`);
    if (response.status === 200) {
      const generatedText = response.data.response;
      api.sendMessage(`🟢 |  Crowx AI \n\n🖋️ ASK: '${inputText}'\n\n${generatedText}`, event.threadID);
    } else {
      console.error("🔴 𝙴𝚛𝚛𝚘𝚛 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚏𝚛𝚘𝚖 𝙵𝚄𝙹𝙸 𝙰𝙸 𝙰𝙿𝙸.");
    }
  } catch (error) {
    console.error("🔴 𝙴𝚛𝚛𝚘𝚛:", error);
  }
};

module.exports.run = async function ({ api, event }) {};
