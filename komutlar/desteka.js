const Discord = require('discord.js')
const id = '436148908293488641'

exports.run = (client, message, args) => {
    const bildiri = args.join("436148908293488641 ")
    if (!args[0]) {
        const embed = new Discord.RichEmbed()
            .setDescription(`Lütfen geçerli bir bildiri yazın. Gereksiz Bildirimle Yetkiliyi Rahatsız Etmeyin`)
            .setTimestamp()
            .setColor("RANDOM")
        message.channel.send({embed})
        return
    }
    
    const embed = new Discord.RichEmbed()
        .setDescription(`Destek İsteginiz 2 Yetkiliye Başarıyla Bot Geliştiricisine İletilmiştir En Yakın Surede Yetkili İİlgilenmeye Çalışacaktır.`)
        .setTimestamp()
        .setColor("RANDOM")
    message.channel.send({embed})
    
    message.channel.createInvite({maxAge: 0}).then(async (invite) => {
        const embed = new Discord.RichEmbed()
            .addField(`Bildiren Kişi`, message.author.tag)
            .addField(`Bildirinin Yapıldığı Sunucu`, message.guild.name)
            .addField(`Bildirinin Yapıldığı Sunucunun Davet Linki`, invite.url)
            .addField(`Bildiri`, bildiri)
            .setColor("RANDOM")
            .setTimestamp()
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rapor', 'raporla', 'destek', 'tavsiyeet', 'tavsiyet', 'öner', 'öneri', 'bildir'],
    permLevel: 0
}

exports.help = {
    name: 'bildiri',
    description: 'Bot geliştiricisine hataları raporlamayı/tavsiye vermeyi/öneri iletmeyi sağlar.',
    usage: 'bildiri [bildiri]'
}