const summonerSearchLink = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const masterySearchLink = 'https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/';
const accountInfoLink = 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/';



const utf8 = require('utf8');
const riotKey = 'api_key=' + process.env.RIOTKEY;
const { DiscordAPIError } = require("discord.js");
const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();
const DiscordButtons = require('discord-buttons');
DiscordButtons(client);

// Ranked Emblem Conversion
const rankedEmblem = {
    0: 'https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Iron.png',
    1: 'https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Bronze.png',
    2: 'https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Silver.png',
    3: 'https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Gold.png',
    4: 'https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Platinum.png',
    5: 'https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Diamond.png',
    6: 'https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Master.png',
    7: 'https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Grandmaster.png',
    8: 'https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Challenger.png',
};

const rankedConvert = {
    "IRON": 0,
    "BRONZE": 1,
    "SILVER": 2,
    "GOLD": 3,
    "PLATINUM": 4,
    "DIAMOND": 5,
    "MASTER": 6,
    "GRANDMASTER": 7,
    "CHALLENGER": 8
}

const numsToRank = {
    0: "IRON",
    1: "BRONZE",
    2: "SILVER",
    3: "GOLD",
    4: "PLATINUM",
    5: "DIAMOND",
    6: "MASTER",
    7: "GRANDMASTER",
    8: "CHALLENGER"
}

// Command Process
module.exports = {
    // show lol rank #name
    // show lol mastery #name
    // show lol freerotation
    name: 'lol',
    description: 'A show command',
    async execute(message, args) {
        var split = message.content.split(' ')
        var summonerName = '';
        var encryptedID = '';          // Summoner ID
        var accountID = '';
        var summonerLevel = '';

        // Champion ID lookup table
        const IDResponse = await fetch('http://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json')

        const IDTable = await IDResponse.json();

        for (var i = 2; i < split.length; i++) {
            summonerName += split[i] + '%20';
        }
        summonerName = utf8.encode(summonerName);
        const link = summonerSearchLink + summonerName + '?' + riotKey;
        const response = await fetch(link);
        let summonerData = await response.json();
        if (summonerData.hasOwnProperty('status') && summonerData.status.status_code == 404) {
            message.channel.send("Ce joueur n'existe pas!");
            return;
        }

        encryptedID = summonerData.id;
        summonerName = summonerData.name;
        summonerLevel = summonerData.summonerLevel;
        accountID = summonerData.accountId;
        if (split[1] == 'info') {
            //check current game by sumoner name
            const currentGame = await fetch('https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/' + encryptedID + '?' + riotKey);
            const currentGameData = await currentGame.json();
            if (currentGameData.hasOwnProperty('gameId')) {
                message.channel.send("Le joueur est en jeu!");
                return;
            }
            //check if summoner is in ranked
            const rankedResponse = await fetch('https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encryptedID + '?' + riotKey);
            const rankedData = await rankedResponse.json();
            if (rankedData.length == 0) {
                message.channel.send("Le joueur n'est pas en ranked!");
                return;
            }
            //check if summoner is in a team
            const teamResponse = await fetch('https://euw1.api.riotgames.com/lol/team/v4/teams/by-summoner/' + encryptedID + '?' + riotKey);
            const teamData = await teamResponse.json();
            if (teamData.length == 0) {
                message.channel.send("Le joueur n'est pas en team!");
                return;
            }
            //check if summoner is in a match
            const matchResponse = await fetch('https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accountID + '?' + riotKey);
            const matchData = await matchResponse.json();
            if (matchData.length == 0) {
                message.channel.send("Le joueur n'est pas en match!");
                return;
            }




            else {
                message.channel.send("Le joueur n'est pas en jeu!");
            }
        }
        if (split[1] == 'match') {
            //recup CurrentGameInfo gameStartTime   participants championId
            const currentGame = await fetch('https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/' + encryptedID + '?' + riotKey);
            const currentGameData = await currentGame.json();
            if (currentGameData.hasOwnProperty('gameId')) {
                const gameStartTime = currentGameData.gameStartTime;
                // format timestamp a l'heure francaise
                const date = new Date(gameStartTime);
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false
                };
                const dateString = date.toLocaleString('fr-FR', options);

                const gameLength = currentGameData.gameLength;

                //gameLength in hours format
                var hours = Math.floor(gameLength / 3600);
                var minutes = Math.floor((gameLength % 3600) / 60);
                var seconds = gameLength % 60;
                var gameLengthString = (hours + 2) + 'h ' + minutes + 'm ' + seconds + 's';

                var champName = '';
                var champID = '';
                var champIcon = '';
                var champEmblem = '';
                var champEmblemURL = '';
                var champEmblemURL2 = '';

                for (var i = 0; i < currentGameData.participants.length; i++) {
                    if (currentGameData.participants[i].summonerName == summonerName) {
                        champName = currentGameData.participants[i].IDchampData;
                        champID = currentGameData.participants[i].championId;
                        champIcon = currentGameData.participants[i].championIcon;
                        champEmblem = currentGameData.participants[i].championEmblem;
                        champEmblemURL = 'http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/' + champIcon + '.png';
                        champEmblemURL2 = 'http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/' + champEmblem + '.png';
                    }

                }
                const embed = new Discord.MessageEmbed()
                    .setTitle('Nom de joueur : ' + '*' + summonerName + '*')
                    .setColor(0x00AE86)
                    .setThumbnail(champEmblemURL)
                    .setImage(champEmblemURL2)
                    .addField('Game lancé le :', dateString, true + "\n")
                    .addField('La game en est à :', gameLengthString, true + "\n")
                    .setFooter('La Confinerie © Senshi, Inc.', "https://cdn.discordapp.com/avatars/196247557570166784/1dd31426ef78aa73467ad8b7db3f54a5.webp?size=128");


                message.channel.send({ embed });
            }
        }
        //fin game id and send current match info




        // Champion Mastery Lookup
        if (split[1] == 'mastery') {
            var masteries = [];
            var names = [];
            const masteryLink = masterySearchLink + encryptedID + '?' + riotKey;
            const masteryResponse = await fetch(masteryLink);
            let masteryData = await masteryResponse.json();

            //calcul all masteries points
            var totalMasteryPoints = 0;
            for (var i = 0; i < masteryData.length; i++) {
                totalMasteryPoints += masteryData[i].championPoints;
            }

            var total = new Intl.NumberFormat().format(totalMasteryPoints);
            //change space to .
            var total2 = total.replace(/\s/g, '.');



            // Parse out mastery level, mastery points, and champion names
            for (var i = 0; i < 10; i++) {
                var id = masteryData[i].championId;
                var points = masteryData[i].championPoints;
                var parsepoints = new Intl.NumberFormat().format(points);
                var parsepoints2 = parsepoints.replace(/\s/g, '.');
                var level = masteryData[i].championLevel;
                var champName = '';
                var m = '';
                var n = '';
                for (const key in IDTable.data) {
                    if (IDTable.data[key].key == id) {
                        champName = IDTable.data[key].id;
                        n = champName;
                        m = 'Mastery Level: ' + level + ',     Mastery Points: ' + parsepoints2;
                        masteries.push(m);
                        names.push(n);
                    }
                }
            }
            //calcul all mastery points



            // League of Legends Summoner Lookup
            const masteryEmbed = new Discord.MessageEmbed()


                .setColor('#0099ff')
                .setTitle('Point de maitrise des champions de `' + summonerName + '`')
                .setDescription('Le top 5 des champions de `' + summonerName + '` par point de maitrise.')
                .addFields(
                    { name: ':first_place: `' + names[0] + '`', value: masteries[0] },
                    { name: ':second_place: `' + names[1] + '`', value: masteries[1] },
                    { name: ':third_place: `' + names[2] + '`', value: masteries[2] },
                    { name: '4: `' + names[3] + '`', value: masteries[3] },
                    { name: '5: `' + names[4] + '`', value: masteries[4] },
                    { name: 'Point de maîtraise global : ', value: ':arrow_right:  ' + total2 }


                )

            message.channel.send(masteryEmbed)

        }
        else if (split[1] == 'rank') { // Player Rank Lookup (Solo and Flex)
            const rankLink = accountInfoLink + encryptedID + '?' + riotKey;
            const accountResponse = await fetch(rankLink);
            let accountData = await accountResponse.json();
            console.log(accountData);
            const rankEmbed = new Discord.MessageEmbed();
            var highestRank = -1;

            // Unranked Account
            if (accountData.length == 0) {
                rankEmbed.setColor('#0099ff');
                rankEmbed.setTitle('Rank de ' + summonerName);
                rankEmbed.setDescription('Level du compte: : `' + summonerLevel + '`\nCe joueur est unranked');
                rankEmbed.setTimestamp()
                rankEmbed.setFooter("Créé par Senshi", "https://cdn.discordapp.com/avatars/196247557570166784/1dd31426ef78aa73467ad8b7db3f54a5.webp?size=128")
            } else {
                // Parse first ranked queue
                var queueType = '';
                if (accountData[0].queueType == 'RANKED_SOLO_5x5') {
                    queueType = 'Ranked Solo/Duo';
                } else {
                    queueType = 'Ranked Flex 5x5'
                }

                highestRank = Math.max(highestRank, rankedConvert[accountData[0].tier]);
                var rankTier = accountData[0].tier + '  ' + accountData[0].rank + '  ' + accountData[0].leaguePoints + " LP.";
                var win = accountData[0].wins;
                var lose = accountData[0].losses;
                var winRate = Math.round(win / (win + lose) * 1000) / 10;
                var WRData = 'Wins: `' + win + '`  Loses: `' + lose + '`  Winrate: `' + winRate + '%`';

                rankEmbed.setColor('#0099ff');
                rankEmbed.setTitle('Rank de `' + summonerName + '`');
                rankEmbed.setDescription('Level du compte: : `' + summonerLevel + '`');
                rankEmbed.addFields(
                    { name: queueType + ': ' + rankTier, value: WRData },
                );
                rankEmbed.setThumbnail('https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Grandmaster.png');
                rankEmbed.setTimestamp()
                rankEmbed.setFooter("Créé par Senshi", "https://cdn.discordapp.com/avatars/196247557570166784/1dd31426ef78aa73467ad8b7db3f54a5.webp?size=128")

                // Check Ranked Promotion Series
                if (accountData[0].hasOwnProperty('miniSeries')) {
                    var progress = accountData[0].miniSeries.progress;
                    var progressStr = '';
                    var nextRank = numsToRank[rankedConvert[accountData[0].tier] + 1];
                    for (var c in progress) {
                        if (progress[c] == 'L') {
                            progressStr += ':x:   ';
                        } else if (progress[c] == 'W') {
                            progressStr += ':o:   ';
                        } else {
                            progressStr += ':question:   ';
                        }
                    }

                    rankEmbed.addField('``' + summonerName + ' est en promotion pour ' + nextRank + '`` ', progressStr);
                }

                // Parse second ranked queue (if exist)
                if (accountData.length == 2) {
                    if (accountData[1].queueType == 'RANKED_SOLO_5x5') {
                        queueType = 'Ranked Solo/Duo';
                    } else {
                        queueType = 'Ranked Flex 5x5'
                    }

                    highestRank = Math.max(highestRank, rankedConvert[accountData[1].tier]);
                    var rankTier = accountData[1].tier + '  ' + accountData[1].rank + '  ' + accountData[1].leaguePoints + " LP.";
                    var win = accountData[1].wins;
                    var lose = accountData[1].losses;
                    var winRate = Math.round(win / (win + lose) * 1000) / 10;
                    var WRData = 'Wins: `' + win + '`  Loses: `' + lose + '`  ' + 'Winrate: `' + winRate + '%`';

                    rankEmbed.addFields(
                        { name: queueType + ':  ' + rankTier, value: WRData },
                    );

                    // Check Ranked Promotion Series
                    if (accountData[1].hasOwnProperty('miniSeries')) {
                        var progress = accountData[1].miniSeries.progress;
                        var progressStr = '';
                        var nextRank = numsToRank[rankedConvert[accountData[1].tier] + 1];
                        for (var c in progress) {
                            if (progress[c] == 'L') {
                                progressStr += ':x:   ';
                            } else if (progress[c] == 'W') {
                                progressStr += ':o:   ';
                            } else {
                                progressStr += ':question:   ';
                            }
                        }

                        rankEmbed.addField('``' + summonerName + ' est en promotion pour ' + nextRank + '`` ', progressStr);
                    }
                }

            }
            if (highestRank != -1) {
                rankEmbed.setThumbnail(rankedEmblem[highestRank]);
            }
            message.channel.send(rankEmbed);
        }
    }
}