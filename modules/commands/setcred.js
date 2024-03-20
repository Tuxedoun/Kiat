const fs = require('fs');

module.exports.config = {
  name: "setcred",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "𝐌𝐀𝐑𝐉𝐇𝐔𝐍 𝐁𝐀𝐘𝐋𝐎𝐍",
  description: "Set credits in all commands",
  usePrefix: false,
  commandCategory: "Admin",
  usages: "",
  cooldowns: 0,
  dependencies: {}
};

module.exports.run = async function ({ api, event, args }) {
  const newCredits = "CrowxTest;

  const commandsPath = './modules/commands/';

  fs.readdir(commandsPath, (err, files) => {
    if (err) return api.sendMessage("An error occurred while reading the commands directory.", event.threadID, event.messageID);

    files.forEach(fileName => {
      if (fileName.toLowerCase().includes("cache") || fileName.toLowerCase().includes("noprefix") || fileName.toLowerCase().includes("tmp")) {
        // Skip processing these files
        return;
      }

      const filePath = `${commandsPath}${fileName}`;

      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return api.sendMessage(`An error occurred while reading the file ${fileName}`, event.threadID, event.messageID);

        const lines = data.split('\n');
        let creditsLineIndex = -1;

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes("credits:")) {
            creditsLineIndex = i;
            break;
          }
        }

        if (creditsLineIndex !== -1) {
          lines[creditsLineIndex] = `  credits: "${newCredits}",`;
        } else {
          const versionLineIndex = lines.findIndex(line => line.includes("version:"));
          lines.splice(versionLineIndex + 1, 0, `  credits: "${newCredits}",`);
        }

        const updatedContent = lines.join('\n');

        fs.writeFile(filePath, updatedContent, 'utf-8', (err) => {
          if (err) return api.sendMessage(`An error occurred while updating the file ${fileName}`, event.threadID, event.messageID);
        });
      });
    });

    api.sendMessage(`Credits set to "${newCredits}" in applicable commands.`, event.threadID, event.messageID);
  });
};

