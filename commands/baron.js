const { DiscordAPIError } = require("discord.js");
const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();


//creer une commande 'baron' qui envoie une api de dog
module.exports = {
    name: 'baron',
    description: 'The baron command',
    execute(message, args) {
        //get a random dog picture
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(res => res.json())
            .then(json => {
                //send the dog picture
                message.channel.send(json.message);
            }
            ).catch(err => {
                //if the api is not working, send a message
                message.channel.send("The API is not working!");
            }
            );
    }
}