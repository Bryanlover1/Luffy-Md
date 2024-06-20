const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { default: axios } = require('axios');
//const conf = require('../set');


zokou({ nomCom: 'test',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '🚀', 
    fromMe: 'true', 

       
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    const { start} = new Date().getTime()
    return repondre('*𝑴𝑬𝑮𝑨𝑻𝑹𝑶𝑵-𝑩𝑶𝑻 𝒊𝒔 𝑨𝑳𝑰𝑽𝑬*\n ```' + Responding at 2000 + '``` *ms*') 
    const { end } = new Date().getTime()
    await zok.sendMessage('*Pong!*\n ```' + (end - start) + '``` *ms*')
  }
)
