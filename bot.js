const Client = require('mpp-client-xt');
var gClient = new Client("ws://www.multiplayerpiano.com:443");
var defaultChannel = "test/sweepcenter";
gClient.setChannel(defaultChannel);
gClient.start();
var ex = 0;
var ey = 0;
var banned = [];
var issweeping = false;
setInterval(function (){},100)
setInterval(function (){ex = ex + 5;if (ex > 100){ex = -100; ey = Math.floor(Math.random() * 100)}gClient.moveMouse(ex,ey);if (issweeping){gClient.setName('vroom [v!help]');}else{gClient.setName('vroom [v!help]');}},100);
setInterval(function (){if (!issweeping){gClient.say('Want to vroom with any channels? you can use v!vroom [channel name]')}},1000000)
gClient.on('vroom [v!help]',function(msg){
   if (!banned.includes(msg.p._id)) {
   if (msg.a.split(' ')[0] == "v!vroom") {
     gClient.say('Vrooming to '+msg.a.split(' ').slice(1).join(' ')+' is now ready to go')
     issweeping = true;
     gClient.setChannel(msg.a.split(' ').slice(1).join(' '))
     setTimeout(function(){gClient.say('Well thats vroomed too much. Bye');gClient.setChannel(defaultChannel);issweeping = false;},50000)
   }
   if (msg.a == "v!rules"){
      gClient.say("1. this")
      gClient.say("2. is")
      setTimeout(function () {gClient.say("very")},10000)
      setTimeout(function () {gClient.say("broken")},20000)
   }
   if (msg.a == "v!help"){
      gClient.say("general commands: v!sweep [channel name], v!rules")
   }
   if (msg.a.split(' ')[0] == "v!ban" && msg.p.name == "WatashiSan") {
     
     banned.push(msg.a.split(' ')[1])
     gClient.say("sucessfully banned")
     
   }
    
   if (msg.a.split(' ')[0] == "v!default" && msg.p.name == "WatashiSan") {
     gClient.say('Default Channel set to '+msg.a.split(' ').slice(1).join(' '))
     defaultChannel = msg.a.split(' ').slice(1).join(' ')
     gClient.setChannel(defaultChannel)
     
   }
   }
   if (msg.a.startsWith("v!") && banned.includes(msg.p._id)) {
      
      gClient.say('well, goodbye '+msg.p.name+'. you are banned from owner')
   }
   
})
