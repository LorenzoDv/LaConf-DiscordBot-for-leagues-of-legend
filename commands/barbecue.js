const meteokey = 'access_key=' + process.env.meteokey;
const fetch = require("node-fetch");
const Discord = require('discord.js');
const utf8 = require('utf8');



//fetch mrr
module.exports = {
    name: 'bbq',
    description: 'The bbq command',
    async execute(message, args) {
        let name = '';
        console.log(name);
        var split = message.content.split(' ')
        console.log(split);

        for (var i = 1; i < split.length; i++) {
            name += split[i] + '%20';

        }
        if (name == "bagnère%20de%20bigorre") {
            name = "bagneres";
        }
        else if (name == "bagneres%20de%20bigorre") {
            name = "bagneres";
        }
        else if (name == "b2b%20") {
            name = "bagneres";

        }
        console.log(name);


        name = utf8.encode(name);

        // http://api.weatherstack.com/current?access_key=60f01e2b790e233c1e2940295bc6eb18&query=Bagnères-De-Bigorre

        const meteoapi = await fetch('http://api.weatherstack.com/current?' + meteokey + '&query=' + name);
        const meteoapiJson = await meteoapi.json();
        if (meteoapiJson.error) {
            message.channel.send("Ville non trouvé, ou WeatherStack à un problème avec cette ville (Veuillez réessayé plus tard")
        }
        //fetchError


        else if (name == "") {
            message.channel.send("Veulliez entrer un champ")
        }
        else {
            name = name.replace(/%20/g, ' ');
            //mettre en majuscule le nom
            name = name.toUpperCase();
            region = meteoapiJson.location.region;
            localtime = meteoapiJson.location.localtime;
            wind = meteoapiJson.current.wind_speed;
            wind_degree = meteoapiJson.current.wind_degree;
            humidity = meteoapiJson.current.humidity;
            weather_code = meteoapiJson.current.weather_code;
            temperature = meteoapiJson.current.temperature + "°C";
            country = meteoapiJson.location.country;
            weather = "";
            barbecue = "";
            if (weather_code == 113) {
                weather = ":sunny: Ensoleillé";
                barbecue = ":fire: barbecue :white_check_mark: ";
            }
            else if (weather_code == 116) {
                weather = " :white_sun_cloud: Partiellement nuageux";
                barbecue = ":fire: barbecue :white_check_mark: ";
            }
            else if (weather_code == 119) {
                weather = ":cloud: Nuageux";
                barbecue = ":fire: barbecue :white_check_mark: ";
            }
            else if (weather_code == 122) {
                weather = ":cloud: Couvert";
                barbecue = ":fire: barbecue :white_check_mark: ";
            }
            else if (weather_code == 143) {
                weather = ":cloud: Brumeux";
                barbecue = ":fire: barbecue :white_check_mark: ";
            }
            else if (weather_code == 176) {
                weather = ":cloud_rain: Pluie éparse à proximité";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 179) {
                weather = ":cloud_snow: Neige éparse à proximité";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 182) {
                weather = ":cloud_rain: Pluie éparse";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 185) {
                weather = ":cloud_snow: Neige éparse";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 200) {
                weather = ":cloud_lightning: Orageux";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 227) {
                weather = ":cloud_snow: Rafales de neige";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 230) {
                weather = ":cloud_snow: Blizzard";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 248) {
                weather = ":cloud: Brouillard";
                barbecue = ":fire: barbecue :x:  ";
            }

            else if (weather_code == 260) {
                weather = ":cloud: Brouillard givrant";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 263) {
                weather = ":cloud_rain: Bruine lègeres éparse";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 266) {
                weather = ":cloud_rain: Bruine lègeres";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 281) {
                weather = ":cloud_rain: Bruine verglaçante";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 284) {
                weather = ":cloud_rain: Forte bruine verglaçante";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 293) {
                weather = ":cloud_rain: Pluie légère éparse";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 296) {
                weather = ":cloud_rain: Pluie légère";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 299) {
                weather = ":cloud_rain: Pluie modérée par moments";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 302) {
                weather = ":cloud_rain: Pluie modérée";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 305) {
                weather = ":cloud_rain: forte pluie par moments";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 308) {
                weather = ":cloud_rain: Forte pluie";
                barbecue = ":fire: barbecue :x:  ";
            }
            else if (weather_code == 311) {
                weather = ":cloud_rain: Pluie verglaçante légère";
                barbecue = ":fire: barbecue :x:  ";
            }
            else {
                weather = "Non renseigné";
                barbecue = ":man_shrugging: ";
            }


            //create a new embed
            const embed = new Discord.MessageEmbed()

                //set the title
                .setTitle("Météo pour " + name)

                .addFields( //add a field to the embed
                    { name: "Ville", value: name, inline: true + "" },
                    { name: "Pays", value: (region, country), inline: true + "" },
                    { name: "Heure locale", value: localtime, inline: true + "" },
                    { name: "Vent", value: wind + " km/h " + wind_degree + " °", inline: true + "" },
                    { name: "Humidité", value: humidity + "%", inline: true + "" },
                    { name: "Météo", value: weather, inline: true + "" },
                    { name: "Température ", value: temperature, inline: true + "" },
                    { name: "Barbecue", value: barbecue, inline: true + "" }
                )

                //set the color of the embed
                .setColor("#0099ff")

                //set the footer of the embed
                .setFooter("Météo récupérée par WeatherStack");

            //send the embed to the channel
            message.channel.send(embed);

        }
    }
}


