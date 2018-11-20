const Discord = require('discord.js')
const request = require('node-superfetch')
const moment = require('moment')
const { GOOGLE_KEY } = ('AIzaSyC0wNMZke-tFM4pVk6tdnZBXeHjW0zqfFQ')
 
exports.run = async (client, message, args) => {
        if (!args[0]) {
                const embed = new Discord.RichEmbed()
                        .setDescription(`Lütfen geçerli bir kitap ismi yazın.`)
                        .setTimestamp()
                        .setColor("#36393F")
                message.channel.send({embed})
                return
        }
 
        const kitap = args.join(" ")
 
        try {
                const { body } = await request
                        .get('https://www.googleapis.com/books/v1/volumes')
                        .query({
                                apiKey: GOOGLE_KEY,
                                q: kitap,
                                maxResults: 1,
                                printType: 'books'
                        });
 
                if(!body.items) {
                        const embed = new Discord.RichEmbed()
                                .setDescription(`Lütfen geçerli bir kitap ismi yazın.`)
                                .setTimestamp()
                               .setColor("#36393F")
                        message.channel.send({embed})
                        return
                }
       
                const data = body.items[0].volumeInfo;
 
                const embed = new Discord.RichEmbed()
                        .setAuthor(`${data.title} | Kitap Bilgileri`, "https://i.imgur.com/N3oHABo.png", `https://books.google.com.tr/`)
                        .addField(`Yazarlar`, data.authors || 'Bilinmiyor')
                        if(!data.publishedDate) {
                                embed.addField(`Yayın Tarihi`, `Bilinmiyor`)
                        } else {
                                embed.addField(`Yayın Tarihi`, `${moment(data.publishedDate).format('DD/MM/YYYY')}`)
                        }
                        embed.addField(`Sayfa Sayısı`, data.pageCount || 'Bilinmiyor')
                        if(data.imageLinks) {
                                embed.setThumbnail(`${data.imageLinks ? data.imageLinks.thumbnail : null}`)
                        }
                        embed.setColor("#36393F")
                        .setTimestamp()
                message.channel.send({embed})
        } catch (err) {
                console.log(err)
        }
}
 
exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['kitap', 'kitap-ara'],
        permLevel: 0
}
 
exports.help = {
        name: 'kitapara',
        description: 'Yazılan kitabın bilgisini gösterir.',
        usage: 'kitapara [kitap ismi]'
}