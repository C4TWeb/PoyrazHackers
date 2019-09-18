

const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const Jimp = require('jimp');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;
let owner = "612241038353891328";

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['a', 'YEDEK KOMUT2'],
  permLevel: "0"
};

let linkEngel = JSON.parse(fs.readFileSync("././jsonlar/linkEngelle.json", "utf8"));

client.on("message", msg => { 
if (!linkEngel[msg.guild.id]) return;
if (linkEngel[msg.guild.id].linkEngel === "kapali") return;
    if (linkEngel[msg.guild.id].linkEngel === "acik") {
    var regex = new RegExp(/(discord.gg|http|.gg|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/)
    if (regex.test(msg.content)== true) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
        var e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Link Engeli!")
        .setDescription(`Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Link atmana izin vermeyeceğim!`)
        msg.channel.send(e).then(message => message.delete(5000));
    }
}
    }
});

client.on("message", message => {
    if (message.content.toLowerCase() === prefix + "vote") {
        const embed = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.avatarURL)
.addField("Vote Atmak İstiyorsan Altaki Linke Tıkla Çabuk",`[Vote Atmak İçin Tıkla!](https://discordbots.org/bot/494483302057771028/vote)`)
            .setColor("RANDOM")
        return message.channel.sendEmbed(embed)
    }
});

client.on('guildCreate', async guild => {
  const girismesaj = [
    'Dark Tower sunucunuza eklendi.',
    'Bu bot **Dark Tower Ekibi** tarafından geliştirilmektedir.',
    '/yardım',
    '/botbilgi',
    '/ping',
    '/davet ',
  ]
  guild.owner.send(girismesaj)
  console.log(`Hey: ${guild.name}.  Adlı sunucuya katıldım!`);
})

const sistem = JSON.parse(fs.readFileSync("./level.json", "utf8"));

client.on("message", message => {

 if (message.author.bot === true) return;
  
if (!sistem[message.author.id]) {
 sistem[message.author.id] = {
   xp: 0,
   level: 0
  }
}

sistem[message.author.id] = {
   xp: sistem[message.author.id].xp || 0 + 1,
   level: 0
  }

   fs.writeFile("./level.json", JSON.stringify(sistem), (err) => {
      console.error(err)
    })

if (sistem[message.author.id].xp > 100) {
  

sistem[message.author.id] = {
   xp: 0,
   level: sistem[message.author.id].level + 1
  }

   fs.writeFile("./level.json", JSON.stringify(sistem), (err) => {
      console.error(err)
    })

   message.channel.send(`<@${message.author.id}> başarıyla level atladın! \n**Yeni Levelin:** ${sistem[message.author.id].level || 0}`)

  }

let prefix = "-" //"!" yerine kendi botunuzun prefixini yazınız!

if (message.content === prefix+"seviye" || message.content === prefix+"level") {

let user = message.mentions.users.first() || message.author

let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`${user.username} - Seviye Bilgisi`, user.avatarURL)
.addField("Seviye", sistem[user.id].level || 0 + "/100")
.addField("XP", sistem[user.id].xp || 0)
message.channel.send(embed)

}

});


exports.help = {
  name: "özel",
  description: "Discord Botumuz deneme",
  usage: "özel"
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
                .setColor(ayarlar.renk)
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})


// Sunucuya birisi girdiği zaman mesajı yolluyalım

client.on("guildMemberAdd", async member => {
    let sayac = JSON.parse(fs.readFileSync("./sayac.json", "utf8"));
 const channel = member.guild.channels.find("name", "sayaç")
    channel.send(`**:inbox_tray: ${member.user.tag}** Giriş Yaptı **${sayac[member.guild.id].sayi}** olmamıza son **${sayac[member.guild.id].sayi - member.guild.members.size}** üye kaldı!`)
})


client.on("guildMemberRemove", async member => {
    let sayac = JSON.parse(fs.readFileSync("./sayac.json", "utf8"));
    const channel = member.guild.channels.find("name", "sayaç")
    channel.send(`**📤 ${member.user.tag}** Ayrıldı **${sayac[member.guild.id].sayi}** olmamıza son **${sayac[member.guild.id].sayi - member.guild.members.size}** üye kaldı!`)
})

 /////////////////////

const discord = require ("discord.js");
const randomPuppy = require('random-puppy');

module.exports.run = (client, message, args) => {
    if (!message.channel.nsfw) return message.reply(":underage: Kardeşim burası +18 bir kanal mı?");

    var subreddits = [
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor("OHH ÇEK KARDEŞİM ÇEK BOŞAL EKRANA", client.user.avatarURL)
                .setFooter("SEKS SİKİŞ GÖTTEN SOKUŞ OH OH OH")
                .setImage(url);
            message.channel.send({
                embed
            });
        })
}

module.exports.help = {
  name: 'nsfw'
};

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "gs") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(100));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(500, 500)
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/494485600552878080/498202758256656409/qwe.jpg", (err, avatar) => {
                avatar.resize(500, 500)
                image.composite(avatar, 0, 2).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "winner") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487841969561796608/image0.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});


client.on('message', message => {
if (message.content.toLowerCase() === prefix + "kaçcm") {
    var sans = ["11cm", "15cm", "20cm", "24cm", "28cm", "31m", "39cm", "45cm", "49cm", "54cm", "58cm", "63cm", "67cm", "77cm", "73cm", "84cm", "80cm", "83cm", "96cm", "94cm", "99cm", "Jony Sins mısın krdşm"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Seninki___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("message", message => {

if (message.content === prefix + "ping") {
   message.channel.send('**__Geçikme Süresi Hesaplandı :__**').then(message => message.delete(3000));

    const pingozel = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(`Gecikme Süreleri`, client.user.avatarURL)
    .setDescription(`⏳ **| Normal Gecikme** : __[${client.ping}]__  \n📨 **| Mesaj Gecikmesi** : __[${new Date().getTime() - message.createdTimestamp}]__`)
    return message.channel.sendEmbed(pingozel);
}
});





client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "atam") {		
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)	
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487849021658890240/image0.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});
client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "sniper") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(310, 325)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2FPNGPIX-COM-Crosshair-PNG-Transparent-Image.png?1529363625811", (err, avatar) => {
                avatar.resize(310, 325)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "afew") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://i.ytimg.com/vi/-2Z0Y3Kk8nU/maxresdefault.jpg", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "wasted") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hayırsız bot') {
    msg.reply('**Öyle Olsun :sob: :sob:** ');
  }
});
client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "hacked") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487837060326227972/image0.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});
client.on('message', msg => {
if (msg.content.toLowerCase() === prefix + "sigara") {
msg.channel.send(':smoking: :cloud::cloud::cloud:')
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'));
}


});
client.on('message', message => {
    if (message.content.toLowerCase() === '-köpek') {
var request = require('request');

request('https://random.dog/woof.json', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var info = JSON.parse(body);
  const foto = new Discord.RichEmbed()
  .setImage(info.url)
  .setColor("RANDOM")
      message.channel.send(foto)
    }
})
    }
});
client.on('message', message => {
    if (message.content.toLowerCase() === '/kedi') {
var request = require('request');

request('http://aws.random.cat/meow', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
  const foto = new Discord.RichEmbed()
  .setImage(info.file)
  .setColor("RANDOM")
      message.channel.send(foto)
    }
})
    }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'kasaaç') {
    var sans = ["Hiçbirşey :cry:", "Stattrak AWP | Asiimov", "Karambit | Doopler :dagger:", "Hatıra USP-S | Leş Onaylandı", "Kancalı Bıçak | Fade :dagger:", "Desert Eagle | Kızıl Ağ", "Hatıra Dragon Lore", "Stattrak M4A1 | Uluma", "SGG 07 | Sudaki Kan", "Hatıra Glock 18 | Fade", "AWP | Medusa", "Desert Eagle | Alev", "Stattrak AK-47 | Vulkan",  "M4A1-S | Hiper Canavar",  "Hatıra M4A1-S | Altın Bobin", "Statrak AWP | Elektrikli Kovan", "P90 | Ecel Kedisi", "AWP | Yıldırım Çarpması", "Karambit | Mazi :dagger:", "Hatıra Faction Bicaği :dagger:"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    msg.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Sana **${sonuc}** Çıktı.`).setTitle('Başarıyla Kasa Açıldı').setThumbnail('https://cdn.discordapp.com/avatars/436148908293488641/e58ec51e5f91a0dbc168f0d4e7ea90cf.png?size=2048').setColor('RANDOM'));
  }
});

client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.find('name', 'giriş-çıkış');//log ismini ayarlıyacaksınız log adında kanal açın
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })
client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.find('name', 'giriş-çıkış');
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {            
                        const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// })


client.on("ready", async message => {
  var Activity = [
      
      
      "Dark Tower",

  ];

  setInterval(function() {

      var random = Math.floor(Math.random()*(Activity.length-0+1)+0);

      client.user.setActivity(Activity[random], { type: "watching"});
      }, 6 * 3000);
})
const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core')
const queue = new Map();
 
client.on('warn', console.warn);
 
client.on('error', console.error);
 
client.on('ready', () => console.log('Bot artık hazır!'));
 
client.on('disconnect', () => console.log('Bağlantım kesildi, bildiğinizden emin olun, şimdi tekrar bağlanacağım...'));
 
client.on('reconnecting', () => console.log('Tekrar bağlanıyorum!'));
 
 
 
client.on('message', async msg => { // eslint-disable-line
        if (msg.author.bot) return undefined;
        if (!msg.content.startsWith(prefix)) return undefined;
 
        const args = msg.content.split(' ');
        const searchString = args.slice(1).join(' ');
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(msg.guild.id);
 
        let command = msg.content.toLowerCase().split(' ')[0];
        command = command.slice(prefix.length)
 
 
 
        if (command === 'oynat') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
                const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
                const permissions = voiceChannel.permissionsFor(msg.client.user);
                if (!permissions.has('CONNECT')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('🚫 | Şuanda olduğunuz kanala girmek için gerekli izinlere sahip değilim.'));
                }
                if (!permissions.has('SPEAK')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('🚫 | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
                }
 
                if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                        const playlist = await youtube.getPlaylist(url);
                        const videos = await playlist.getVideos();
                        for (const video of Object.values(videos)) {
                                const video2 = await youtube.getVideoByID(video.id); // ehehehehu videomuzu bulalım
                                await handleVideo(video2, msg, voiceChannel, true); // ve gönderelim
                        }
      return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setDescription(`✔ | Playlist ➢ **${playlist.title}** has been added to the queue!`);
                } else {
                        try {
                                var video = await youtube.getVideo(url);
                        } catch (error) {
                                try {
                                        var videos = await youtube.searchVideos(searchString, 10);
                                        let index = 0;
                                        msg.channel.sendEmbed(new Discord.RichEmbed()
                                .setTitle('Şarkı Seçimi')
      .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
       .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 30 saniye içinde liste iptal edilecektir.')
          .setColor('RANDOM'));
                                        // en fazla 5 tane
                                        try {
                                                var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                                                        maxMatches: 1,
                                                        time: 10000,
                                                        errors: ['time']
                                                });
                                        } catch (err) {
                                                console.error(err);
            return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription('❎ | Şarkı seçimi iptal edildi. '));
                                        }
                                        const videoIndex = parseInt(response.first().content);
                                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                                } catch (err) {
                                        console.error(err);
          return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('RANDOM')
          .setDescription(' ❎ | Herhangi bir arama sonucu elde edemedim.'));
                                }
                        }
                        return handleVideo(video, msg, voiceChannel);
                }
        } else if (command === 'geç') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
                if (!serverQueue) return msg.channel.send(' ❎ | Kuyruk boş olduğu için geçemiyorum. ');
                serverQueue.connection.dispatcher.end('Geç komudu kullanıldı.');
                return undefined;
        } else if (command === 'kapat') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
                serverQueue.songs = [];
                serverQueue.connection.dispatcher.end('Kapat komutu kullanıldı!');
                return undefined;
        } else if (command === 'ses') {
      if (!msg.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
        .setDescription(`You can not use commands here.`)
        return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
  .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
   .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
    if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(` 🔊 | Ses seviyesi: **${serverQueue.volume}**`));
                serverQueue.volume = args[1];
        if (args[1] > 100) return msg.channel.send({
            embed: {
                title: "",
                color: 0xE50000,
                description: "Lütfen 10'dan az yada 10 olarak bir sayı belirtin."
            }
        });
                serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
   .setDescription('Ses Seviyesi ' + `**${args[1]}**` + ' Olarak Ayarlandı.'));
        } else if (command === 'çalınan') {
   
   
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`❕ | Şu anda hiçbir şey çalmıyorum.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(':x: | Şu anda hiçbir şey çalmıyorum.'));
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
        } else if (command === 'kuyruk') {
                if (!serverQueue) return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum. ');
                return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
        } else if (command === 'durdur') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
                if (serverQueue && serverQueue.playing) {
                        serverQueue.playing = false;
                        serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setDescription('⏸ | Müzik durduruldu.')
      .setColor('RANDOM'));
                }
                return msg.channel.send('🚫 | Şu anda hiçbir şey çalmıyorum.');
        } else if (command === 'devam') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`Burada komutu kullanamazsınız.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
                if (serverQueue && !serverQueue.playing) {
                        serverQueue.playing = true;
                        serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('▶ | Müzik devam ediyor.'));
                }
                return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum.');
  }
 
        return undefined;
});
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
        const serverQueue = queue.get(msg.guild.id);
        console.log(video);
        const song = {
                id: video.id,
                title: video.title,
                url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
                durations: video.duration.seconds,
    views: video.views,
        };
        if (!serverQueue) {
                const queueConstruct = {
                        textChannel: msg.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 3,
                        playing: true
                };
                queue.set(msg.guild.id, queueConstruct);
 
                queueConstruct.songs.push(song);
 
                try {
                        var connection = await voiceChannel.join();
                        queueConstruct.connection = connection;
                        play(msg.guild, queueConstruct.songs[0]);
                } catch (error) {
                        console.error(`I could not join the voice channel: ${error}`);
                        queue.delete(msg.guild.id);
                        return msg.channel.send(`HATA | Ses kanalına katılamadım: ${error}`);
                }
        } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                if (playlist) return undefined;
    else return msg.channel.sendEmbed(new Discord.RichEmbed()
  .setDescription(`✔ | **${song.title}** adlı şarkı başarıyla kuyruğa eklendi.`)
  .setColor('RANDOM'));
        }
 
        return undefined;
}
 
function play(guild, song) {
        const serverQueue = queue.get(guild.id);
 
        if (!song) {
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
        }
        console.log(serverQueue.songs);
 
        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
                .on('end', reason => {
                        if (reason === 'Akış yeterince hızlı diğil.') console.log('Şarkı Durduruldu.');
                        else console.log(reason);
                        serverQueue.songs.shift();
                        play(guild, serverQueue.songs[0]);
                })
                .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
 
   serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()
  .setAuthor(`Şarkı Çalınıyor`, `https://images.vexels.com/media/users/3/137425/isolated/preview/f2ea1ded4d037633f687ee389a571086-youtube-icon-logo-by-vexels.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('Başlık', `[${song.title}](${song.url})`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .addField("Ses Seviyesi", `${serverQueue.volume}%`, true)
  .setColor('#FFFFFF'));
}

client.login(ayarlar.token);
client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm-log");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});

const invites = {};
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  wait(1000);

client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
client.on('guildMemberAdd', member => {
let davetlog = JSON.parse(fs.readFileSync('./ayarlar/davetlog.json', 'utf8'));
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
const embed = new Discord.RichEmbed()
.setDescription(`${member.user.username} Sunucuya katıldı! \n Davet Eden Kişi: \n<@${inviter.id}> \n Daveti Kullanan Kişi Sayısı:\n \`\`${invite.uses}\`\` \n Katıldığı Davet Kodu: \n**${invite.code}** \n Davet Linki: \n https://discord.gg/${invite.code}`)
.setColor("RED")
.setThumbnail(member.user.avatarURL)

  member.guild.channels.find("id", davetlog[member.guild.id]).send({
    embed
  });
  })
})
//XiR

client.login(ayarlar.token);