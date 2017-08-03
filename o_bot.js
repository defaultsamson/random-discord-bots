const Discord = require("discord.js");
const client = new Discord.Client();

// All the things that could be substituted for an "o"
const hash = {};
hash["⭕"] = "o";
hash["🎱"] = "o";
hash["O"] = "o";
hash["0"] = "o";
hash["oo"] = "o";

const whitelist = ['o-o'];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  // Debug
  // console.log('message: ' + msg.content + '  isAnO:' + msg.content.isAnO());

  // If the message is just an "o" then delete it
  if (msg.content.isAnO()) {
    msg.delete();
  }
});

client.on('message', msg => {

  // Debug
  // console.log('message: ' + msg.content + '  isAnO:' + msg.content.isAnO());

  // If the message is just an "o" then delete it
  if (msg.content.isAnO()) {
    msg.delete();
  }
});




// String functions

String.prototype.isAnO = function () {
  // Replace all keys with their respective letters
  var text = this;
  for (var key in hash) {
    while (text.contains(key)) text = text.replaceAll(key, hash[key]);
  }

  // If the string contains "o" and no other real alphabet characters that aren't o
  if (text.contains('o') && !/^([A-Za-z0-9]+)$/.test(text.replaceAll('o', ''))) {
    
    // Last chance before confirming it's an "o". If the string is equal to anything in the whitelist, let it through
    for (i in whitelist) {
      if (text == whitelist[i]) return false;
    }
    
    return true;
  } else {
    return false;
  }
};

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(escapeRegExp(search), 'g'), escapeRegExp(replacement));
};

String.prototype.contains = function (search) {
  var target = this;
  return target.indexOf(search) != -1;
};



client.login('MzQyNzg5OTA5MDI4Nzk4NDc0.DGU5Kg.hqyV4vj-vZnkjHllbpjKawblN6A');

console.log("Bot code loaded...");