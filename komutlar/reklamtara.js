const Discord = require('discord.js');
exports.run = (client, msg, args) => {
 const members = msg.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));
 return msg.channel.send(members.map(member => `<@${member.id}> \`${member.id}\``).join("\n") || "**Hiç Birinin Oynuyorunda Discord Sunucunu Paylaşan Göremedik!!!**");
};

exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: [],
 permLevel: 2
};

exports.help = {
 name: 'reklamtara',
 description: 'reklamtara',
 usage: 'reklamtara'
};