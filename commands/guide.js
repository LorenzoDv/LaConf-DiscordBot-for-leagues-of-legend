const Discord = require('discord.js');

const dot = ":diamond_shape_with_a_dot_inside:";
const nerd = ":nerd:";
const sun = ":sunny: ";

module.exports = {
    name: 'help',
    description: 'The help command',
    execute(message, args) {
        var lolCmd = "1: Check TOP 5 points de maîtrise  :bulb:\n `$lol mastery PSEUDO_LOL`\n\n";
        lolCmd += "2: Rank Info/ lvl du compte :brain:\n `$lol rank PSEUDO_LOL`\n\n";
        lolCmd += "3: Check si le joueur est en jeu\n `$lol info PSEUDO_LOL`\n\n";
        lolCmd += "4: Info de la game\n `$lol match PSEUDO_LOL`\n\n";
        lolCmd += "5: Permet de ping dans le channel League of Legends\n `$l`\n\n";
        lolCmd += "6: Permet de check son mmr\n `$mmr PSEUDO_LOL`\n\n";
        lolCmd += "7: Affiche le lore, et la difficulté d'un champion\n `$lore CHAMPNAME`\n\n";
        //var lolCmd5 = "5: Post une photo aléatoire de Baron\n `$baron`\n\n";
        var lolCmd5 = "1: Permet d'aider robin\n `$helpbaron`\n\n";
        var lolCmd6 = "1: Affiche la meteo + plus barbecue OUI/NON\n `$bbq VILLE`,`$bbq b2b`\n\n";




        const helpEmbed = new Discord.MessageEmbed();
        helpEmbed.setColor('#0099ff');

        helpEmbed.setDescription(":arrow_down:  Voici les commandes du bot  :arrow_down:\n\n")
        helpEmbed.setThumbnail("https://cdn.discordapp.com/icons/689406208620101650/08b5e01300e7c30cefe152857cb2ba58.webp?size=100")
        helpEmbed.setTimestamp()
        helpEmbed.setFooter("Créé par Senshi", "https://cdn.discordapp.com/avatars/196247557570166784/1dd31426ef78aa73467ad8b7db3f54a5.webp?size=128")
        helpEmbed.addFields(
            { name: "\n" + dot + ' League of Legends', value: lolCmd + "\n\n\n\n" },
        );
        helpEmbed.addFields(
            { name: "\n" + nerd + '  Fun commandes', value: lolCmd5 + "\n\n\n\n" },
        );
        helpEmbed.addFields(
            { name: "\n" + sun + '  Barbecue / Méteo ', value: lolCmd6 + "\n\n\n\n" },
        );
        message.channel.send(helpEmbed);
    },
};
