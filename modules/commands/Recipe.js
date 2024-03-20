const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { Hercai } = require('hercai');
const { DateTime } = require("luxon");

const herc = new Hercai();

module.exports.config = {
  name: 'recipe',
  version: '4.0.0',
  hasPermssion: 0,
  credits: "𝐌𝐀𝐑𝐉𝐇𝐔𝐍 𝐁𝐀𝐘𝐋𝐎𝐍",
  description: '𝖥𝖴𝖩𝖨 𝖠𝖨 𝖡𝖸 𝖬𝖠𝖱𝖩𝖧𝖴𝖭 𝖡𝖠𝖸𝖫𝖮𝖭',
  commandCategory: 'educational',
  usages: '[question]',
  cooldowns: 6,
  usePrefix: false,
};

module.exports.run = async ({ api, event, args }) => {
  if (args.length < 1) {
    return api.sendMessage('𝖯𝖫𝖤𝖠𝖲𝖤 𝖯𝖱𝖮𝖵𝖨𝖣𝖤 𝖠 RECIPE 𝖳𝖮 𝖡𝖤 GIVEN 𝖡𝖸 CROWX CHIEFS \n━━━━━━━━━━━━━━━\n', event.threadID, event.messageID);
  }

  const manilaTime = DateTime.now().setZone("Asia/Manila").toFormat("yyyy-MM-dd hh:mm:ss a");
  const botname = global.config.BOTNAME;
  const question = args.join(' ');
  api.setMessageReaction("🕣", event.messageID, () => {}, true);
  api.sendMessage("🕣 | 𝖥𝖨𝖭𝖣𝖨𝖭𝖦 RECIPE 𝖳𝖮 𝖬𝖸 𝖣𝖠𝖳𝖠𝖡𝖠𝖲𝖤 𝖯𝖫𝖤𝖠𝖲𝖤 𝖶𝖠𝖨𝖳 𝖯𝖠𝖳𝖨𝖤𝖭𝖳𝖫𝖸", event.threadID, event.messageID);
  let userName = await getUserName(api, event.senderID);
  const characterAI = `You will response what is the recipe of the food all recipes of the world even desserts`;

  try {
    const response = await herc.question({ model: 'v3-32k', content: `${characterAI}\n\n` });
    processApiResponse(api, event, response);
  } catch (error) {
    console.error('Error while making the Hercai API request:', error);
    api.sendMessage(`𝖳𝖧𝖤𝖱𝖤'𝖲 𝖠𝖭 𝖤𝖱𝖱𝖮𝖱 𝖶𝖧𝖨𝖫𝖤 𝖥𝖨𝖭𝖣𝖨𝖭𝖦 𝖠𝖭𝖲𝖶𝖤𝖱 𝖨𝖭𝖳𝖮 𝖳𝖧𝖤 CROWX𝖯𝖠𝖢𝖪 𝖣𝖠𝖳𝖠𝖡𝖠𝖲𝖤 \n\n𝖱𝖤𝖳𝖸𝖯𝖤 𝖸𝖮𝖴'𝖱𝖤 𝖰𝖴𝖤𝖲𝖳𝖨𝖮𝖭 𝖮𝖱 𝖰𝖴𝖤𝖱𝖸 𝖨𝖥 𝖸𝖮𝖴 𝖲𝖤𝖤 𝖳𝖧𝖨𝖲 𝖬𝖠𝖸𝖡𝖤 𝖳𝖧𝖤 𝖲𝖤𝖱𝖵𝖤𝖱 𝖧𝖠𝖵𝖨𝖭𝖦 𝖠 𝖧𝖠𝖱𝖣 𝖣𝖠𝖳𝖠 𝖥𝖤𝖳𝖢𝖧𝖨𝖭𝖦\n\n  \n 𝖳𝖨𝖬𝖤 𝖤𝖱𝖱𝖮𝖱 𝖬𝖤𝖲𝖲𝖠𝖦𝖤 : ${manilaTime}`, event.threadID, event.messageID);
  }
};

async function processApiResponse(api, event, response) {
  const manilaTime = DateTime.now().setZone("Asia/Manila").toFormat("yyyy-MM-dd hh:mm:ss a");

  try {
    const audioResponse = await axios.get(`https://www.api.vyturex.com/beast?query=:${encodeURIComponent(response.reply)}`);
    if (audioResponse.data && audioResponse.data.audio) {
      const audioURL = audioResponse.data.audio;
      const fileName = "mrbeast_voice.mp3";
      const filePath = path.resolve(__dirname, 'cache', fileName);

      const { data: audioData } = await axios.get(audioURL, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, audioData);

      api.sendMessage({
        body: "🧠𝖵𝖮𝖨𝖢𝖤 𝖱𝖤𝖲𝖯𝖮𝖭𝖲𝖤🧠",
        attachment: fs.createReadStream(filePath)
      }, event.threadID, async (voiceError) => {
        if (voiceError) {
          console.error('Error sending voice response:', voiceError);
        }

        fs.unlinkSync(filePath); 
      });
    } else {
      console.error("Failed to fetch audio API response.");
    }
  } catch (audioError) {
    console.error('Error during audio API request:', audioError);
  }


  const reply = `${response.reply}\n━━━━━━━━━━━━━━━\n AI CHIEF `;
  api.sendMessage(reply, event.threadID, event.messageID);
}

async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    if (userInfo && userInfo[userID]) {
      return userInfo[userID].name;
    } else {
      return "unknown";
    }
  } catch (error) {
    return "unknown";
  }
}
