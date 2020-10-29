const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login('NzcxMjcxMzE1MjQ3MDcxMjMz.X5psYw.keh_EecfBoJ29p6SRvgErNxR2ps');

client.on('message', message => {
    if(message.content.startsWith(`${prefix}kick`)) {
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("```Nu ai permisiunea sa folosesti aceasta comanda!```")
        }
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("**Nu am permisiunea pentru a folosi aceasta comanda!**")
        }
        let target = message.mentions.members.first();
        if(!target) {
            return message.channel.send("```!kick <discord.tag>```")
        }
        if(target.id === message.author.id) {
            return message.channel.send("**Nu poti sa iti dai kick singur :)**")
        }
        let member = message.mentions.members.first();
        member.kick().then((member) => {
            let embed = new Discord.MessageEmbed()
            .setDescription(`${target} cu id-ul (${target.id})`)
            .setColor("RED")
            .setFooter(`A primit kick de la ${message.author.username}`);
            message.channel.send(embed)
        })
    }
})

client.on('message', message => {
    if(message.content.startsWith(`${prefix}ban`)) {
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("```Nu ai permisiunea sa folosesti aceasta comanda!```")
        }
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("**Nu am permisiunea pentru a folosi aceasta comanda!**")
        }
        let target = message.mentions.members.first();
        if(!target) {
            return message.channel.send("```!ban <discord.tag>```")
        }
        if(target.id === message.author.id) {
            return message.channel.send("**Nu poti sa iti dai ban singur :)**")
        }
        let member = message.mentions.members.first();
        member.ban().then((member) => {
            let embed = new Discord.MessageEmbed()
            .setDescription(`${target} cu id-ul (${target.id})`)
            .setColor("RED")
            .setFooter(`A primit ban de la ${message.author.username}`);
            message.channel.send(embed)
        })
    }
})

const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../functions");
module.exports = {
  name: "avatar",
  description: "Get your own or someone else's avatar",
  usage: "[user mention]",
  category: "fun",
  run: async (bot, message, args) => {
    let Embed = new MessageEmbed();
    let roles = [];
    if (!message.mentions.users.first()) {
      message.member.roles.cache.forEach((role) => {
        roles.push(role.name);
      });
      Embed.setTitle(`Your avatar!`);
      Embed.setThumbnail(message.author.displayAvatarURL());
      Embed.setColor(`RANDOM`);
      Embed.setDescription(
        `Joined: (MM/DD/YYYY) ${formatDate(message.member.joinedAt)}\nID: ${
          message.author.id
        }\nRoles: ${roles}`
      );
      return message.channel.send(Embed);
    } else {
      let User = message.mentions.members.first();
      User.roles.cache.forEach((role) => {
        roles.push(role.name);
      });
      Embed.setTitle(`${bot.users.cache.get(User.id).tag}'s avatar!`);
      Embed.setThumbnail(bot.users.cache.get(User.id).displayAvatarURL());
      Embed.setColor(`RANDOM`);
      Embed.setDescription(
        `Joined: (MM/DD/YYYY) ${formatDate(User.joinedAt)}\nID: ${
          User.id
        }\nRoles: ${roles}`
      );
      return message.channel.send(Embed);
    }
  },
};

const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");
module.exports = {
  name: "meme",
  description: "Get a meme!",
  category: "fun",
  run: async (bot, message, args) => {
    let subreddits = ["comedyheaven", "dank", "meme", "memes"];
    let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    let img = await api(subreddit, true);
    const Embed = new MessageEmbed()
      .setTitle(`A meme from r/${subreddit}`)
      .setURL(`https://reddit.com/r/${subreddit}`)
      .setColor("RANDOM")
      .setImage(img);
    message.channel.send(Embed);
  },
};