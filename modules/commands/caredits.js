const path = require('path');
const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "caredits",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Eugene Aguilar",
  description: "car edits api by marjhun baylon",
  usePrefix: false,
  commandCategory: "video",
  usages: "car edits",
  cooldowns: 0,
};

module.exports.run = async function ({ api, event }) {
  try {
    api.sendMessage(`THS VIDEO WILL BE SEND PLEASE WAIT`, event.threadID);

    let response = await axios.get(`https://caredits-marjhun.replit.app/caredits`, { responseType: "arraybuffer" });
    let filePath = path.join(__dirname, 'cache', 'buratnimarjhun.mp4');

    fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'));

    api.sendMessage({ body: "HERE IS THE CAREDITS", attachment: fs.createReadStream(filePath) }, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage(`Error: ${error}`, event.threadID);
    console.log(error);
  }
};
