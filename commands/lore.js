

const fetch = require("node-fetch");
const Discord = require('discord.js');
const utf8 = require('utf8');



module.exports = {

    name: 'lore',
    description: 'A show command',
    async execute(message, args) {
        let name = '';

        var split = message.content.split(' ')

        for (var i = 1; i < split.length; i++) {
            name += split[i];

        }



        if (name == "") {
            message.channel.send("Veulliez entrer un champ")
        }

        else if (name) {
            let upper = name[0].toUpperCase() +
                name.slice(1);

            try {
                const lore = await fetch('http://ddragon.leagueoflegends.com/cdn/12.12.1/data/fr_FR/champion/' + upper + '.json');
                const loreapiJson = await lore.json();
                let title = loreapiJson.data[upper].title;
                let Lore = loreapiJson.data[upper].lore;
                let info = loreapiJson.data[upper].info.difficulty;



                const embed = new Discord.MessageEmbed()

                    //set the title
                    .setTitle("Description pour : " + upper)

                    .addFields( //add a field to the embed
                        { name: "Titre :", value: title, inline: true + "" },
                        { name: "Lore :", value: Lore, inline: true + "" },
                        { name: "Difficulté :", value: info, inline: true + "" },

                    )

                    //set the color of the embed
                    .setColor("#0099ff")

                //set the footer of the embed


                //send the embed to the channel
                message.channel.send(embed);


            }
            catch {
                message.channel.send("Nom du champion invalide ou non conforme ex : Mundo -> DrMundo")
            }




        }


    }
}
