const Discord = require('discord.js');
const fs = require('fs');
let linkEngel = JSON.parse(fs.readFileSync("././jsonlar/linkEngelle.json", "utf8"));

exports.run = async (client, message) => {
  
	let args = message.content.split(' ').slice(1);
	const secenekler = args.slice(0).join(' ');

	if(secenekler.length < 1) return message.reply("**Açmak İstiyorsan:**```-linkengelle aç``` **Kapatmak İstiyorsan:**```-linkengelle kapat``` **yaz!**");

  if (secenekler !== "aç" && secenekler !== "kapat" && secenekler !== "on" && secenekler !== "off") return message.reply("**Açmak İstiyorsan:**```-linkengelle aç``` **Kapatmak İstiyorsan:**```-linkengelle kapat``` **yaz!**")

	if (secenekler === "aç" || secenekler === "on") {
		
      
    
		message.reply(":white_check_mark: **İşlem Başarılı: Açık!**")
    
  if(!linkEngel[message.guild.id]){
		linkEngel[message.guild.id] = {
			linkEngel: "acik"
		  };
  };

		  fs.writeFile("././jsonlar/linkEngelle.json", JSON.stringify(linkEngel), (x) => {
        if (x) console.error(x)
      })
	};

	if (secenekler === "kapat" || secenekler === "off") {
    
               if(!linkEngel[message.guild.id]){
		linkEngel[message.guild.id] = {
			linkEngel: "kapali"
		  };
  };

		fs.writeFile("././jsonlar/linkEngelle.json", JSON.stringify(linkEngel), (x) => {
        if (x) console.error(x)
      })

       delete linkEngel[message.guild.id]
       delete linkEngel[message.guild.id].linkEngel

		message.channel.send(":white_check_mark: **İşlem Başarılı: Kapalı!**")
    
	};
}

	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['reklamengelle'],
		permLevel: 3
	  };
	  
	exports.help = {
		name: 'linkengelle',
		description: 'Lİnk engelleme sistemini açıp kapatmanızı sağlar.',
		usage: 'linkengelle <aç/kapat>'
	};