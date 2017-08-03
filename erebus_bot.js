const Discord = require('discord.js');
const client = new Discord.Client();

const thisID = '269878065079779328';
const ereID = '191264343688609792'; //'191264343688609792';

//https://discordapp.com/oauth2/authorize?client_id=269878065079779328&scope=bot&permissions=0

// The amount of characters it should detect before deeming the message as shite
const detectionThreshold = 3;

const hash={};
hash["🖇"]="a";
hash["🇦"]="a"; // TODO might be unused now
hash["🍙"]="a";
hash["🅱"]="b";
hash["🇧"]="b";
hash["↪"]="c";
hash["🌊"]="c"; // TODO might be unused now
hash["🌜"]="c";
hash["🌓"]="d";
hash["🌗"]="d";
hash["📧"]="e";
hash["💶"]="e";
hash["🇫"]="f";
hash["🏳"]="f";
hash["🗜"]="g";
hash["🇬"]="g";
hash["♓"]="h";
hash["🏨"]="h";
hash["🥄"]="i";
hash["ℹ"]="i";
hash["💈"]="i";
hash["⤴"]="j";
hash["🤳"]="j";
hash["🇰"]="k";
hash["🤸"]="k";
hash["🕒"]="l";
hash["🛴"]="l";
hash["〽"]="m";
hash["♏"]="m";
hash["📈"]="n";
hash["♑"]="n";
hash["⭕"]="o";
hash["🎱"]="o";
hash["🅿"]="p";
hash["👎"]="p";
//hash[""]="q";
hash["♈"]="r";
hash["🇷"]="r"; // TODO might be unused now
hash["🥀"]="r";
hash["💲"]="s";
hash["💰"]="s";
hash["✝"]="t";
hash["🌴"]="t";
hash["⛎"]="u";
hash["🙆"]="u";
hash["🖖"]="v";
hash["✌"]="v";
hash["🐍"]="w";
hash["👐"]="w";
//hash[""]="x";
hash["⚒"]="x";
hash["🌱"]="y";
hash["💴"]="y";
//hash[""]="z";
hash["⚠"]="!";
hash["❓"]="?";
hash["▪"]="";

hash["0⃣"]="0";
hash["1⃣"]="1";
hash["2⃣"]="2";
hash["3⃣"]="3";
hash["4⃣"]="4";
hash["5⃣"]="5";
hash["6⃣"]="6";
hash["7⃣"]="7";
hash["8⃣"]="8";
hash["9⃣"]="9";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(escapeRegExp(search), 'g'), escapeRegExp(replacement));
};

String.prototype.contains = function(search) {
  var target = this;
  return target.indexOf(search) != -1;
};

client.on('ready', () => {
  console.log('Bot is ready');
})

var newMess;
var oldMess;

function postEditedMessages(element, index, array){
  console.log(element.content);

  // Found the messgae
  if (element.author.id == thisID && element.content == oldMess){
    element.edit(newMess);
    return false;
  }
  else {
    return true;
  }
}

client.on('messageUpdate', function(oldMessage, newMessage) {
  oldMess = translate(oldMessage.content);
  newMess = translate(newMessage.content);

  newMessage.channel.fetchMessages({limit: 10, after: newMessage.id})
  .then(messages => {
    var didIt = messages.every(postEditedMessages)

    // If it didn't find a message
    if (didIt && shouldTranslate(newMessage.content)) {
      // Create a new message
      newMessage.channel.sendMessage(newMess);
    }
  })
  .catch(console.error);
})

client.on('message', message => {
  var user = message.author;

  // If it's not the bot sending a message
  if (user.id != thisID)
  {
    var input = message.content;

    if (message.channel.id == '269878855831912449') console.log(input);

    if (user.id == ereID && Math.floor((Math.random() * 100) + 1) == 40) message.channel.sendMessage("haha Ere is talking in the chat what a hoser");

    if (shouldTranslate(input)) {
      console.log("doin it");
      console.log(translate(input));
      message.channel.sendMessage(translate(input));
    }

    if (message.content == 'ping') message.reply("pong");
    else if ((message.content.contains("is") || message.content.contains("Is")) && (message.content.contains("ere") || message.content.contains("Ere")) && message.content.contains("trash") && message.content.contains("?")) message.reply("Ere is pretty trash");
  }
})

function translate(text){
  // Replace all keys with their respective letters
  for(var key in hash) {
    text = text.replaceAll(key, hash[key]);
  }
  // Removes whitespace
  while(text.indexOf("  ") != -1) text = text.replaceAll("  ", " ");
  // send the message
  return text;
}

function shouldTranslate(text){
  // Checks if the text contains any of the keys
  var counter = 0;
  for(var key in hash) {
    if (text.contains(key)) {
      counter++;

      if (counter >= detectionThreshold) {
        return true;
      }
    }
  }
  return false;
}

client.login('MjY5ODc4MDY1MDc5Nzc5MzI4.C1wXFg.atO29QMjXwQ4b7mqY-FjD6_4WJY');
