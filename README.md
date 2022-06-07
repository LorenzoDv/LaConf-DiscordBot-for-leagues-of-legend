# La Confinerie bot discord connect too Riot API
A Discord Bot that fetches League of Legend player data from Riot API, hosted on [Heroku](https://dashboard.heroku.com/apps). It can be used as a quick way for players to check their game/rank status. This bot is programmed using node.js along with the powerfull module discord.js. <br/>
 - [Discord Developer Portal](https://discord.com/developers/docs/intro) <br/>
 - [Riot's API](https://developer.riotgames.com) <br/>
 - [Discord.js](https://discord.js.org/#/) <br/>

## A Quick Guide
A **.env** file is required in order to run the bot locally. It needs to look like the following:
```
BOTTOKEN = #YOUR DISCORD BOT TOKEN
RIOTKEY = #YOUR RIOT API KEY
```
After adding the bot to the server, it can be launched with:
```
node index.js
```

## Overview
### The bot supports the following commands: ```$help```<br/>

Displays the current ranked status of the given summoner. <br/><br/>
``` $lol rank #playerName ``` <br/><br/>

<img src="https://raw.githubusercontent.com/LorenzoDv/LaConf-Discord_bot/master/img/demo/lolrankinfo.PNG" width = "300"> <br/><br/><br/>

<hr>
Displays the top 5 highest mastery points champions of the given summoner (In descending order) + Total mastery points on Riot account. <br/><br/>

``` $lol mastery #playerName ``` <br/><br/>

<img src="https://raw.githubusercontent.com/LorenzoDv/LaConf-Discord_bot/master/img/demo/masteryinfo1.PNG" width = "300"> <br/><br/><br/>

<hr>
Check if player is in game or not !<br/><br/>

``` $lol info #playerName ``` <br/><br/>

<img src="https://raw.githubusercontent.com/LorenzoDv/LaConf-Discord_bot/master/img/demo/infoplayer.PNG" width = "300"> <br/><br/><br/>

<hr>
Match info by sumoner name ! current game time, game start !<br/><br/>

``` $lol match #playerName ``` <br/><br/>

<img src="https://raw.githubusercontent.com/LorenzoDv/LaConf-Discord_bot/master/img/demo/gamestart.PNG" width = "300"> <br/><br/><br/>



