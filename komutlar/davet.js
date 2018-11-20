const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(':postbox: **Hemen Özel Mesajlarına Bak !** :postbox:');
    message.channel.sendEmbed(ozelmesajkontrol) }
    const pingozel = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('**__Davet Linkim :__**\n\n[Tıkla Ve Sunucuna Al](https://discordapp.com/oauth2/authorize?client_id=494483302057771028&scope=bot&permissions=2146958847)');
    return message.author.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['davet'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'davet'
}; 