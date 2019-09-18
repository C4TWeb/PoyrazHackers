const Discord = require('discord.js'); 

exports.run = async (client, message, args) => { 
 
  let user = message.member 
  let guild = message.guild 
  
  let rol = guild.roles.find('name', 'ƉarkŁadys' , '「👨」Aboneler')
  let isim = args[0] 
  let yas = args[1] 
  
  if (!isim) return message.channel.send(`İsmini girmelisin.`) 
  if (!yas) return message.channel.send(`Yaşını girmelisin.`) 
  
  user.setNickname(`${isim} | ${yas}`) 
  user.addRole(rol) 
  message.channel.send(`${message.author} **Kız Rolü İle Başarıyla Kayıt Oldun Tebrikler** !`) 
}; 

exports.conf = { 
  enabled: true, 
  guildOnly: true, 
  aliases: [], 
  permLevel: 0 
} 

exports.help = { 
  name: 'darkladys', 
  description: "Sunucuya kaydolmaya ne dersin ?", 
  usage: 'darkladys isim yaş' 
}