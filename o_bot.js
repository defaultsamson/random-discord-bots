const Discord = require("discord.js");
const client = new Discord.Client();

// All the things that could be substituted for an "o"
const hash = {};
hash["⭕"] = "o";
hash["🎱"] = "o";
hash["O"] = "o";
hash["0"] = "o";
hash["oh"] = "o";
hash["oo"] = "o";

const whitelist = ['o-o'];

const messageBuffer = 3; // The number of messages that must pass without being an "o" before someone's allowed to send an "o" in chat

const timerCooldown = 30 * 1000; // ms
var timers = {};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  check(msg);
});

client.on('messageUpdate', function(oldMsg, msg) {
  check(msg);
});

// Checks the message and determines whether or not it needs to be deleted
function check(msg) {
  // Debug
  // console.log('message: ' + msg.content + '  isAnO:' + msg.content.isAnO());

  /*
    if (msg.author.id != '175227650493775872') {
      return;
    }*/

  // Teacup
  if (msg.author.id == '175360513968963584') {
    return;
  }

  // If the message is an "o"
  if (msg.content.isAnO()) {
    // If the author has a timer on them already and it's been less than the timer cooldown since the last "o"
    if (timers[msg.author.id] && Date.now() - timers[msg.author.id] < timerCooldown) {
      msg.delete();
    } else {
      function checkPrev(messages) {
        var mess = messages.array();

        // Goes through the recent messages and if it finds one that's an "o" then delete the new message
        for (i in mess) {
          if (mess[i].content.isAnO()) {
            msg.delete();
            break;
          }
        }
      }

      msg.channel.fetchMessages({
          limit: messageBuffer,
          before: msg.id
        })
        .then(messages => checkPrev(messages))
        .catch(console.error);
    }

    // Reset the timer for every "o"
    timers[msg.author.id] = Date.now();
  }
}

// To remove a timer
// delete timers[msg.author.id];


// String functions

String.prototype.isAnO = function() {
  // Replace all keys with their respective letters
  var text = this;
  for (var key in hash) {
    while (text.contains(key)) text = text.replaceAll(key, hash[key]);
  }

  // If the string contains "o" and no other real alphabet characters that aren't "o" or a space (hence the "\s")
  if (text.contains('o') && !/[A-Za-z0-9]/.test(text.replaceAll('o', ''))) {

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

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(escapeRegExp(search), 'g'), escapeRegExp(replacement));
};

String.prototype.contains = function(search) {
  var target = this;
  return target.indexOf(search) != -1;
};



client.login('MzQyNzg5OTA5MDI4Nzk4NDc0.DGU5Kg.hqyV4vj-vZnkjHllbpjKawblN6A');

console.log("Bot code loaded...");
