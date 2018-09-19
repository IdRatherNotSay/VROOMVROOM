const Client = require('mpp-client-xt');
const Discord = require('discord.js');
var bot = new Discord.Client()
var gClient = new Client("ws://www.multiplayerpiano.com:443");
var defaultChannel = "lobby";
gClient.setChannel(defaultChannel);
gClient.start();
var ex = 0;
var ey = 0;
var banned = [];
var issweeping = false;
var animationtype = 1;
var sayment = ['Want to sweep with any channels? you can use b!sweep [channel name]']
var updatetrack = setInterval(function (){if (gClient.canConnect) {gClient.say('New Update Is Relased, Please Check It');clearInterval(updatetrack)}},100)
setInterval(function (){if (animationtype == 1){ex = ex + 5;if (ex > 100){ex = -100; ey = Math.floor(Math.random() * 100)}}if (issweeping){gClient.setName('broom');}else{gClient.setName('broom [b!help]');}},100);
setInterval(function (){if (animationtype == 2){ex = Math.floor(Math.random() * 100);ey = Math.floor(Math.random() * 100);}},100);
setInterval(function (){if (animationtype == 3){ex = 60;ey = 60;}})
setInterval(function (){gClient.moveMouse(ex,ey);},100);
setInterval(function (){if (!issweeping){gClient.say(sayment[Math.floor(Math.random()*sayment.length)])}},1000000)
gClient.on('a',function(msg){
   if (!banned.includes(msg.p._id)) {
   if (msg.a.split(' ')[0] == "b!sweep") {
     gClient.say('Vrooming to '+msg.a.split(' ').slice(1).join(' ')+' is now ready to go')
     issweeping = true;
     gClient.setChannel(msg.a.split(' ').slice(1).join(' '))
     setTimeout(function(){gClient.say('Well thats vroomed too much. Bye');gClient.setChannel(defaultChannel);issweeping = false;},50000)
   }
   if (msg.a == "v!rules"){
      gClient.say("very")
      gClient.say("very)
      setTimeout(function () {gClient.say("broken)
      setTimeout(function () {gClient.say("very")},20000)
   }
   if (msg.a == "b!help"){
      gClient.say("general commands: v!sweep [channel name], v!rules")
      gClient.say("for advanced users only commands: v!prompt [command]")
   }
   if (msg.a == "b!discordbot"){
      gClient.say(botinvite);
      gClient.say('No.');
   }
   if (msg.a == "b!discord") {
      gClient.say('https://discord.gg/Am53zEg');
      gClient.say('The original script owners discord.')
   }
   if (msg.a.split(' ')[0] == "v!ban" && msg.p.name == "WatashiSan") {
     
     banned.push(msg.a.split(' ')[1])
     gClient.say("sucessfully banned")
     
   }
   if (msg.a.split(' ')[0] == "b!prompt") {
     if (!msg.a.split(' ')[1]) {gClient.say('How you want to do with vroom bot? for example: v!prompt animation 2')}
     if (msg.a.split(' ')[1] == "animation") {
        if (!msg.a.split(' ')[2]) {
           gClient.say('you can type v!prompt animation [number] to animate like cool! (1 - default animation, 2 - crazy, 3 - still)')
        }else{
        animationtype = msg.a.split(' ')[2];
        gClient.say('O.K.')
        }
     }
     if (msg.a.split(' ')[1] == "js") {
        if (!msg.a.split(' ')[2]) {
           gClient.say('you can type v!prompt js [script] to run js! but do not try close(), or else you will regert this')
        }else{
           try {var fn = new Function(msg.a.split(' ').slice(1).join(' '));fn.call();gClient.say('O.K.')} catch(e) {gClient.say('Ouch! here is error: '+e.message)}
        }
     }
   }
   if (msg.a.split(' ')[0] == "v!default" && msg.p.name == "WatashiSan") {
     gClient.say('Default Channel set to '+msg.a.split(' ').slice(1).join(' '))
     defaultChannel = msg.a.split(' ').slice(1).join(' ')
     gClient.setChannel(defaultChannel)
     
   }
   }
   if (msg.a.startsWith("b!") && banned.includes(msg.p._id)) {
      
      gClient.say('well, goodbye '+msg.p.name+'. you are banned from owner')
   }
   
})
bot.on('message',function (message) {
if (message.content.split(' ')[0] == "v!vroom") {
     message.channel.send('Sweeping to '+message.content.split(' ').slice(1).join(' ')+' is now ready to go')
     issweeping = true;
     gClient.setChannel(message.content.split(' ').slice(1).join(' '))
     setTimeout(function(){gClient.say('Well thats vroomed too much. Bye');gClient.setChannel(defaultChannel);issweeping = false;},50000)
   }
   if (message.content == "b!rules"){
      message.channel.send("1. do not spam commands. but that is too annoying")
      message.channel.send("2. after you join other channels, make sure use b!sweep [channel name you joined] in "+defaultChannel)
      message.channel.send("3. stop doing b!sweep lobby, but it is inappropriate")
      message.channel.send("4. dont ban broom after using the command, if you do it, but it is inappropriate")
   }
   if (message.content == "v!help"){
      message.channel.send("general commands: v!vroom [channel name], v!rules")
   }
   
   })

bot.on('ready',function(){
bot.user.setActivity("v!help", {
  type: "PLAYING"
});
})
bot.login(process.env.TOKEN)


