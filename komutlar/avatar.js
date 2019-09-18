
const Discord = require('discord.js') 

module.exports.run = async (bot, message, args) => { 
    const EtiketlenenKullanici = message.mentions.users.first();
    if(EtiketlenenKullanici) { 
        const EtiketlenenAvatarEmbed = new Discord.RichEmbed() 
        .setColor('RANDOM') 
        .setAuthor('Aeson| Avatar Sistemi') 
        .setImage(EtiketlenenKullanici.avatarURL) 
        .setFooter(message.author.username + ' tarafından istendi.') 
        message.channel.send(EtiketlenenAvatarEmbed)
        }
    if(!EtiketlenenKullanici) { 
        const AvatarEmbed = new Discord.RichEmbed() 
        .setColor('RANDOM') 
        .setAuthor('Aeson| Avatar Sistemi') 
        .setImage(message.author.avatarURL) 
        message.channel.send(AvatarEmbed)
        }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['s', 'konuş', 'avatar', 'avatar'],
  permLevel: 0
};

exports.help = {
  name: "avatar",
  description: "Sunucunuzdaki Ailenizi Gösterir.",
  usage: "avatar"
};