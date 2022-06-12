const { DiscordAPIError } = require("discord.js");
const fetch = require("node-fetch");
const discord = require('discord.js');
const client = new discord.Client();


//create a commande ton send a message 'leagues of legend est en cours de désinstallation' in an embed
module.exports = {
    name: 'l',
    execute(message, args, Discord) {
        let channel = message.client.channels.cache.get('792465530657308682');
        let role = message.guild.roles.cache.find(r => r.id === "689421225994354691");
        var user = message.author.id
        channel.send(`<@${user}> t'invite sur League of legends - ${role}`);
        //effacer le message avec un certain temps
        setTimeout(function () {
            message.delete();
        }
            , 50);




    },
};

























