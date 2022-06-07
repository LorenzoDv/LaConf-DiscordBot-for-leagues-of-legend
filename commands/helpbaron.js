const { DiscordAPIError } = require("discord.js");
const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();


//creer une commande 'baron' qui envoie un message 'leagues of legend est en cour de desinstallation' dans un embed
module.exports = {
    name: 'helpbaron',
    description: 'The baron command',
    execute(message, args) {

        const helpEmbed = new Discord.MessageEmbed();
        helpEmbed.setColor('#0099ff');
        helpEmbed.setDescription("League of legends est en cours de désinstallation...")

        message.channel.send(helpEmbed);
    }
}












