module.exports.config = {
 name: "info",
 version: "1.2.6",
 hasPermssion: 0,
 credits: "NOBITA CHAT BOT",
 description: "Bot information command",
 commandCategory: "For users",
 hide: true,
 usages: "",
 cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, Users, Threads }) {
 const { threadID } = event;
 const request = global.nodemodule["request"];
 const fs = global.nodemodule["fs-extra"];
 const moment = require("moment-timezone");

 const { configPath } = global.client;
 delete require.cache[require.resolve(configPath)];
 const config = require(configPath);

 const { commands } = global.client;
 const threadSetting = (await Threads.getData(String(threadID))).data || {};
 const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : config.PREFIX;

 const uptime = process.uptime();
 const hours = Math.floor(uptime / 3600);
 const minutes = Math.floor((uptime % 3600) / 60);
 const seconds = Math.floor(uptime % 60);

 const totalUsers = global.data.allUserID.length;
 const totalThreads = global.data.allThreadID.length;

 const msg = `╭⭓ ⪩ 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 ⪨
│
├─ 🤖 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘 : ─꯭─⃝‌‌𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓
├─ ☢️ 𝗣𝗥𝗘𝗙𝗜𝗫 : ${config.PREFIX}
├─ ♻️ 𝗣𝗥𝗘𝗙𝗜𝗫 𝗕𝗢𝗫 : ${prefix}
├─ 🔶 𝗠𝗢𝗗𝗨𝗟𝗘𝗦 : ${commands.size}
├─ 🔰 𝗣𝗜𝗡𝗚 : ${Date.now() - event.timestamp}ms
│
╰───────⭓

╭⭓ ⪩ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ⪨
│
├─ 👑 𝗡𝗔𝗠𝗘 : 𝐒𝐀𝐋𝐌𝐀𝐍 𝐀𝐇𝐌𝐄𝐃
├─ 📲 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 :
│ ✔︎ facebook.com/DEATH.USER1
├─ 💌 𝗠𝗘𝗦𝗦𝗘𝗡𝗚𝗘𝗥 :
│ ✔︎ https://m.me/DEATH.USER1
├─ 📞 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 :
│ ✔︎ wa.me/+8801941010189
│
╰───────⭓

╭⭓ ⪩ 𝗔𝗖𝗧𝗜𝗩𝗜𝗧𝗜𝗘𝗦 ⪨
│
├─ ⏳ 𝗔𝗖𝗧𝗜𝗩𝗘 𝗧𝗜𝗠𝗘 : ${hours}h ${minutes}m ${seconds}s
├─ 📣 𝗚𝗥𝗢𝗨𝗣𝗦 : ${totalThreads}
├─ 🧿 𝗧𝗢𝗧𝗔𝗟 𝗨𝗦𝗘𝗥𝗦 : ${totalUsers}
╰───────⭓

     ❤️ 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚 𝗠𝗬 𝗕𝗢𝗧 🌺`;

 const imgLinks = [
 "https://imgur.com/a/YVUjWxK",
 "https://imgur.com/a/3fDST5S",
 "https://imgur.com/a/qBLmHLP",
 "https://imgur.com/a/UIVoAya"
 ];

 const imgLink = imgLinks[Math.floor(Math.random() * imgLinks.length)];

 const callback = () => {
 api.sendMessage({
 body: msg,
 attachment: fs.createReadStream(__dirname + "/cache/info.jpg")
 }, threadID, () => fs.unlinkSync(__dirname + "/cache/info.jpg"));
 };

 return request(encodeURI(imgLink)).pipe(fs.createWriteStream(__dirname + "/cache/info.jpg")).on("close", callback);
};
