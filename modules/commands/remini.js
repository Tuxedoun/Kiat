const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports.config = {
  name: "remini",
  version: "1.0.0",
  hasPermission: 0,
  credits: "𝐌𝐀𝐑𝐉𝐇𝐔𝐍 𝐁𝐀𝐘𝐋𝐎𝐍",
  description: "Enhance image using Remini API",
usePrefix: false,
  commandCategory: "tools",
  usages: "[ reply a photo ]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const messageReply = event.messageReply;

  if (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0 || messageReply.attachments[0].type !== "photo") {
   return api.sendMessage("Please reply to a photo to use this command.", event.threadID, event.messageID);
  }

  const photoUrl = messageReply.attachments[0].url;

  try {
    const reminiResponse = await axios.get(`https://reminiapi.replit.app/remini?input=${encodeURIComponent(photoUrl)}`);

    const photo = reminiResponse.data.image_data;
    const buratResponse = await axios.get(photo, { responseType: 'arraybuffer' });
    const photoBuffer = Buffer.from(buratResponse.data, 'binary');

    const photoPath = path.join(__dirname, 'cache', 'bugok.jpg');
    fs.writeFileSync(photoPath, photoBuffer);

    api.sendMessage({ body: "✨ Enhance successfully", attachment: fs.createReadStream(photoPath) }, event.threadID, event.messageID);
  } catch (error) {
   console.error("Error calling Remini API:", error);
   api.sendMessage("An error occurred while processing the image. Please try again later.\n\nMAYBE THE DEVELOPER IS FIXING", event.threadID, event.messageID);
  }
};
