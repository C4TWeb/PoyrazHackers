 const Discord = require('discord.js')
const fs = require('fs');
let kanal = JSON.parse(fs.readFileSync("././jsonlar/gc.json", "utf8"));

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply("Giriş çıkış kanalı olarak ayarlamak istediğin kanalı etiketlemelisin!")
    }

    if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            gkanal: channel.id
        };
    }
  
    fs.writeFile("././jsonlar/gc.json", JSON.stringify(kanal), (err) => {
        console.log(err)
    })
  
    const embed = new Discord.RichEmbed()
    .setDescription(`» Giriş Çıkış kanalı başarıyla ${channel} olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send({embed})
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hoş-geldin-ayarla', 'giriş-çıkış-belirle'],
    permLevel: `Yönetici izni gerekiyor.`
}

exports.help = {
    name: 'giriş-çıkış-ayarla',
    category: 'ayarlar',
    description: 'Giriş çıkış kanalını ayarlar.',
    usage: 'giriş-çıkış-ayarla <#kanal>'
} 