const moment = require("moment-timezone");

module.exports.config = {
  name: "stat",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "𝐌𝐀𝐑𝐉𝐇𝐔𝐍 𝐁𝐀𝐘𝐋𝐎𝐍",
  description: "",
  usePrefix: false,
  commandCategory: "system",
  cooldowns: 5,
  dependencies: {
    "pidusage": ""
  }
};

function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.languages = {
  "en": {
    "returnResult": `🤖 BOT has been working for %1 hour(s) %2 minute(s) %3 second(s).\n\n👥 Total users: %4\n🔄 Total Threads: %5\n💻 Cpu usage: %6%\n🧠 RAM usage: %7\n📶 Ping: %8ms`
  }
}

module.exports.run = async ({ api, event, getText }) => {
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);

  const pidusage = await global.nodemodule["pidusage"](process.pid);

  const CROWX = 'CROWXEBO';

  const startTime = moment().tz("Asia/Manila");
  const formattedTime = startTime.format("hh:mm A");
  const formattedDate = startTime.format("MMM D, YYYY");

  return api.sendMessage(
    `━𝖡𝖮𝖳 𝖲𝖸𝖲𝖳𝖤𝖬 𝖲𝖳𝖠𝖳𝖲━\n\n` +
    `🕒 ＴＩＭＥ : ${formattedTime} -\n` +
    `🏃 𝖮𝖭𝖫𝖨𝖭𝖤 𝖲𝖳𝖠𝖳𝖲 : ${hours} hours, ${minutes} minutes, ${seconds} seconds\n\n` +
    `👥 𝖳𝖮𝖳𝖠𝖫 𝖴𝖲𝖤𝖱𝖲 : ${global.data.allUserID.length}\n` +
    `🔄 𝖦𝖢 𝖢𝖮𝖴𝖭𝖳 : ${global.data.allThreadID.length}\n`  +
    `🧠 𝖱𝖠𝖬 𝖴𝖲𝖠𝖦𝖤 : ${byte2mb(pidusage.memory)}\n` +
    `📶 𝖯𝖨𝖭𝖦 : ${Date.now() - event.timestamp}ms\n` +
    `👷 𝖡𝖮𝖳 𝖬𝖠𝖨𝖭𝖳𝖠𝖨𝖭𝖤𝖱 : ${Marjhun}`,
    event.threadID,
    event.messageID
  );
}
