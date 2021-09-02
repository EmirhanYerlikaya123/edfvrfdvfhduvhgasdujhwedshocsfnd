var mineflayer = require("mineflayer");
var db = require("quick.db");



var automessage = true;

var bot = mineflayer.createBot(ayar);

bot.on("chat", function(username, message) {
  if (username === bot.username) return;
  function intervalFunc() {
    bot.setControlState("sprint", true);
  }
  setInterval(intervalFunc, 7000);

  if (kayit.authme == "var") {
    let giris = db.fetch(`giris_${ayar.host}_${ayar.username}`);
    if (!giris) {
      bot.chat(`/register ${kayit.sifre} ${kayit.sifre}`); //Kayıt olmasını sağladık.
      console.log("Bot kayıt oldu!");
      db.set(`giris_${ayar.host}_${ayar.username}`, "tm");

      if (automessage == true) {
        setInterval(() => {
          bot.chat("MYasir aternos botu hazır."); // değiştirmek çok basit '' arasındaki yazıyı değiştirin yeter
        }, 300000);
      }
    }
    if (giris) {
      bot.chat(`/login ${kayit.sifre}`); //Giriş yapmasını sağladık.
      console.log("Bot giriş yaptı!");

      if (automessage == true) {
        setInterval(() => {
          bot.chat("MYasir Aternos botu hazır."); // değiştirmek çok basit '' arasındaki yazıyı değiştirin yeter
        }, 300000);
      }
    }
  }
});

bindEvents(bot);
function bindEvents(bot) {
  bot.on("error", function(err) {
    console.log("Bir hata oluştu!");
  });

  bot.on("end", function() {
    console.log("Bot sunucudan atıldı!");
    setTimeout(relog, 5000);
  });

  function relog() {
    console.log("Sunucuya Tekrardan Baglaniliyor...");
    bot = mineflayer.createBot(ayar);
    bot.on("chat", function(username, message) {
      if (username === bot.username) return;

      console.log("Bot tekrardan oyuna giriş yaptı!");
      bot.chat(`/login ${kayit.sifre}`);

      bot.setControlState("sprint", true);
    });

    bindEvents(bot);
  }
}

var ayar = {
  host: "", //Sunucu IPnizi giriniz.
  port: "", //Sunucu portunuzu giriniz.
  username: "benbot",
  version: false 
};

var kayit = {
  authme: "yok", //Eğer sunucunuzda AuthMe eklentisi yoksa bu var yazısını yok olarak değiştirin.
  sifre: "ADMIN" //Buraya AuthMe varsa botun giriş yapması için şifreyi girin.
};


