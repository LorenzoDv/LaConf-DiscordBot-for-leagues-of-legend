
const fetch = require("node-fetch");
const Discord = require('discord.js');
const utf8 = require('utf8');


//fetch mrr
module.exports = {
    name: 'mmr',
    description: 'The mmr command',
    async execute(message, args) {
        let name = '';
        var split = message.content.split(' ')
        for (var i = 1; i < split.length; i++) {
            name += split[i];
        }
        name = utf8.encode(name);
        console.log(name);

        const rankedResponse = await fetch('https://euw.whatismymmr.com/api/v1/summoner?name=' + name);
        const rankedJson = await rankedResponse.json();

        // enlever les %20 a name
        name = name.replace(/%20/g, ' ');
        //mettre en majuscule le nom
        name = name.toUpperCase();

        let normal = rankedJson.normal.avg;
        let ranked = rankedJson.ranked.avg;

        let aram = rankedJson.ARAM.avg;
        let normalrank = rankedJson.normal.closestRank
        let rankedrank = rankedJson.ranked.closestRank
        let aramrank = rankedJson.ARAM.closestRank
        let normalpercent = rankedJson.normal.percentile
        let normalResult = (100 - normalpercent)
        normalResult = normalResult.toFixed(2)
        let rankedpercent = rankedJson.ranked.percentile
        let rankedResult = (100 - rankedpercent)
        rankedResult = rankedResult.toFixed(2)
        console.log(rankedResult);
        let arampercent = rankedJson.ARAM.percentile
        let aramResult = (100 - arampercent)
        aramResult = aramResult.toFixed(2)


        if (ranked == null) {
            ranked = "No MMR"

        }
        if (normal == null) {
            normal = "No MMR"
        }
        if (aram == null) {
            aram = "No MMR"
        }
        if (normalrank == null) {
            normalrank = "No MMR"
        }
        if (rankedrank == null) {
            rankedrank = "No MMR"
        }
        if (aramrank == null) {
            aramrank = "No MMR"
        }
        if (normalpercent == null) {
            normalpercent = "No MMR"
        }
        if (normalResult == 100.00) {
            normalResult = "No MMR"
        }
        if (rankedpercent == null) {
            rankedpercent = "No MMR"
        }
        if (rankedResult == 100.00) {
            rankedResult = "No MMR"
        }
        if (arampercent == null) {
            arampercent = "No MMR"
        }
        if (aramResult == 100.00) {
            aramResult = "No MMR"
        }


        const embed = new Discord.MessageEmbed()
            .setTitle(':diamond_shape_with_a_dot_inside: Information sur le mmr :diamond_shape_with_a_dot_inside: ')
            .setDescription(':computer: Nom du joueur :' + '**' + name + '**')
            .addFields(
                { name: '\u200B', value: '**:medal: NORMAL GAME  : :arrow_down: **', inline: true + "" },
                { name: '\u200B', value: '**Normal points : **' + '`' + normal + '` \n ' + '**Rank moyen : **' + '`' + normalrank + '`' + '\n' + '**TOP : **' + '`' + normalResult + '`', inline: true + "" },
                { name: '\u200B', value: '**:medal: RANKED GAME  : :arrow_down: **', inline: true + "" },
                { name: '\u200B', value: '**Ranked points : **' + '`' + ranked + '` \n ' + '**Rank moyen : **' + '`' + rankedrank + '`' + '\n' + '**TOP : **' + '`' + rankedResult + '`', inline: true + "" },
                { name: '\u200B', value: '**:medal: ARAM  :** :arrow_down: ', inline: true + "" },
                { name: '\u200B', value: '**Aram points : **' + '`' + aram + '` \n ' + '**Rank moyen : **' + '`' + aramrank + '`' + '\n' + '**TOP : **' + '`' + aramResult + '`', inline: true + "" },

            )

            // .setDescription(`Normal: **${normal}** / rank avg : **${normalrank}**\n Ranked: **${ranked}** / rank avg : **${rankedrank}**`)
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('Créé par Senshi', 'https://cdn.discordapp.com/avatars/196247557570166784/1dd31426ef78aa73467ad8b7db3f54a5.webp?size=128')
        message.channel.send(embed);
        console.log(rankedJson);









    }
}
