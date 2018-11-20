const Discord = require('discord.js');

exports.run = (client, message, args) => {

  let pages = [
                '**Başlangıç**\n\n\n' + ' Hey Merhaba Botumuz Şuanda İlerleme Kat Ediyor Sende Bize Destek Olmak İçin /davet Yazman Yeterli. Beni Sunucuna Eklemeyi Unutma.\n \n Botum 100 sunucuya ulaştığında bir çekiliş Yapacam Kazanana Botumun 5 komutunu verecem\n \n -giriş-çıkış-ayarla [#kanal] Yazarak Giriş Çıkışı Aktif Edebilirsiniz: \n \n  /vote Yazarak Bana Oy Verebilirsin.\n \n \n⬅  |  ➡ Bu Emojılere Tıklayarak Sayfayı Değiştirebilirsiniz',
              '**Ana Komutlar**\n\n\n' + '/avatar [@Kullanıcı] = Avatarları Gösterir. \n/botbilgi = Botun Bilgilerini Gösterir. \n/davet = Botun Davet Linkini Atar. \n/destek [Mesaj] = Yetkililere Bildirirsiniz. \n/kullanıcıbilgim = Bilgilerinizi Gösterir.\n \n/report [@kullanıcı] [sebep]= Kurallara Uymayanları Reportlayabilirsin.\n \n/sunucubilgi = Sunucunun Bilgilerini Gösterir. \n/ping = Botun Pingini Gösterir.',
              '**Müzik Komutları**\n\n\n' + '/oynat = Müzik Açmanıza Yarar. \n/geç = Açılan Müziği Kuyrukta Olan Başka Müziklere Geçer. \n/kapat = Çalınan Müziği Kapatır.\n/ses = Çalınan Müziğin Sesini Değiştirir.  \n/durdur = Çalınan Müziği Durdurur. \n/devam = Durdurulan Son Müziği Devam Ettirir. \n/kuyruk = Kuyrukta Olan Müzikleri Gösterir.',
              '**Eğlence**\n\n\n' + '/atatürk = Rastgele Atatürk Gifleri Atar. \n/aşkölçer = Birisiyle Aşkınızı Ölçer. \n/danscı [YAZI] = Danscı Yazı Yazarsınız. \n/dolar = Alış Satış Fiyatını Gösterir. \n/euro = Alış Satış Fiyatını Gösterir. \n/espri = Bot Espri Yapar. \n/gif [Aranacak] = Aradığınız Gifi Atar. \n/google [Arama] = Googlede İstediğinizi Arar. \n/havadurumu [Şehir] = Şehirin Hava Durumunu Gösteriri. \n/hastebin [Yazı] = Hastebine Yazı Yazdırır. \n/kitapara [İsim] = İstediğiniz Kitabı Arar. \n/kısalt [Link] = Linkleri Kısaltır. \n/mcskin [Ad] = Minecraft Skin Gösterir. \n/mcödül [Yazı] = Yazdığınız Yazıyı McÖdüle Çevirir. \n/randomşifre = Random Şifre Atar. \n/roblox [Ad] = Roblox İstatistiklerini Gösterir. \n/roller = Sunucudaki Rolleri Gösterir. \n/steamoyun [Oyun] = Oyunun İstatistiklerini Gösterir. \n/tr = Profil Fotoğrafınıza Türk Bayrağı Ekler. \n/söv [@Kullanıcı] = Şaka Amaçlıdır. \n/kaçcm = Şaka Amaçlıdır. \n/kedi = Rastgele Kedi Resimleri Atar. \n/köpek = Rastgele Köpek Resimleri Atar. \n/çekiliş = Sunucunuzda Bir Çekiliş Yapar.',
              '**Eğlence 2**\n\n\n' + '/kasaaç = Kasa Açarsınız. \n/tersyaz [Yazı] = Ters Yazarsınız. \n/winner = Profil Fotoğrafınıza Winner Efekti Ekler. \n/aze = Profil Fotoğrafınıza AzerBeycan Bayrağı Ekler. \n/atam = Profil Fotoğrfınıza Atatürk Ekler. \//sniper = Profil Fotoğrafınıza Sniper Efekti Ekler. \n/wasted = Profil Fotoğrafınıza Wasted Efekti Ekler. \n/hacked = Profil Fotoğrafınıza Hacked Efekti Ekler. \n/sigara = Sigara Yakarsınız. ',
              '**Yetkili**\n\n\n ' + '/at [@kullanıcı] [sebep] = İstediğiniz Kullanıcıyı Sunucudan Atar. \n/ban [@kullanıcı] [sebep] = İstediğiniz Kullanıcıyı Sunucudan Banlar.  \n/linkengelle [aç/kapat] = Reklam Yapanları Engeller. \n/uyar [@kullanıcı] [sebep] = İstediğiniz Kullanıcı Uyarır. \n/sustur [@kullanıcı] [sebep] = İstediğiniz Kullanıcıyı Susturursunuz. \n/temizle [0/100] = Sohbeti Silersiniz.\n \n/geçici-sustur [@kulanıcı] = Geçici Süreliğine susturur 1s/m/h/d | 1s = 1 saniye , 1m = 1 dakika , 1h = 1 saat, 1d = 1 gün.\n \n/kilit [#kanal] = İstediğiniz Kanalı Kitler. \n/sayaç [Sayı] = Gelenleri Gidenleri Sayar. \n/reklamtara = Oynuyorunda Reklam Olanları Tarar.\n \n/slowmode [sayı max 180] = Slow Modeyi Çalıştırır Üyeler Belirlenen Zamana Göre Yazı Yazarlar.    ',
              '**Nsfw  **\n\n\n ' + '/hd = +18 resimler atar.',
              '**Yapımcım **\n\n\n ' + 'Yapımcım : Turan \nYardımcım : TuranHost',
              ];
  let page = 1;

  const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail('https://cdn.discordapp.com/avatars/494483302057771028/7f7a0c571b66fb82e177fb4aa419b334.png?size=2048')
    .setFooter(`Sayfa ${page} / ${pages.length}`)
    .setDescription(pages[page-1])
  message.channel.send(embed).then(msg => {

  msg.react('⬅')
  .then(r => {
    msg.react('➡')

      //Filterd
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });

      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setColor('RANDOM')
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setColor('RANDOM')
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })

    })
   message.react(":white_check_mark: ")
  })
};


exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["help", "y", "h"],
permLevel: 0
};

exports.help = {
name: 'yardım',
description: 'Yardım Listesini Gösterir',
usage: 'yardım'
};