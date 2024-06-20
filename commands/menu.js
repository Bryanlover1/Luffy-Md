const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const runtime = function (seconds) { 
 seconds = Number(seconds); 
 var d = Math.floor(seconds / (3600 * 24)); 
 var h = Math.floor((seconds % (3600 * 24)) / 3600); 
 var m = Math.floor((seconds % 3600) / 60); 
 var s = Math.floor(seconds % 60); 
 var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : ""; 
 var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : ""; 
 var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : ""; 
 var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : ""; 
 return dDisplay + hDisplay + mDisplay + sDisplay; 
 } 

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }



 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Africa/Nairobi');

// Create a date and time in EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭────𖤍 𝐌𝐄𝐆𝐀𝐓𝐑𝐎𝐍 𝐁𝐎𝐓 𖤍────◆
│𖤍 *Préfix* : ${s.PREFIXE}
│𖤍 *User* : ${s.OWNER_NAME}
│𖤍 *Mode* : ${mode}
│𖤍 *Commands* : ${cm.length} 
│𖤍 *Date* : ${date}
│𖤍 *Time* : ${temps} 
│𖤍 *Ram* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│𖤍 *Platform* : Linux 
│𖤍 *Uptime*: ${runtime(process.uptime())}
╰─────✞🩸𝐊𝚰𝚳𝚳𝐘𓃵𖤍🔥³¹⁶─────◆ \n\n`;

  let menuMsg=`  

* 𝐌𝐄𝐆𝐀𝐓𝐑𝐎𝐍 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 :*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `*╭────✞* *${cat}* *✞⊷*`;
        for (const cmd of coms[cat]) {
            menuMsg += `
*𓃵* ${cmd}`;
        }
        menuMsg += `
*╰═════════════⊷* \n`
    }

    menuMsg += `
◇            ◇
*————— ★ —————*

  *𖤍 ༒𝐃𝚫𝚳𝚯𝚴𖤍༒³¹⁶*                                         
*╰═════════════⊷*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*༒𝐃𝚫𝚳𝚯𝚴𖤍༒*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {

    repondre(infoMsg + menuMsg);

}

});
