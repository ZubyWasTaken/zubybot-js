const { deleteColor } = require("./functions/deleteColor");

const { AddColor } = require("./functions/AddColor");

const { doesColorExist } = require("./functions/doesColorExist");

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');
var json = JSON.parse(fs.readFileSync('colors.json', 'utf8'));
exports.json = json;

client.on('ready', () => {
    client.user.setActivity('!help in #colors for help')
    console.log(`Logged in as ${client.user.tag}!`);
});


const helpEmbed = new Discord.RichEmbed()
    .setTitle("Help")
    .setAuthor("Zuby", "https://i.imgur.com/jqIsh9f.png")
    .setColor(0x00AE86)
    .setDescription("The commands are:\r!color <name>\r\rColors located at: ...")
    .setFooter("zuby-bot", "https://i.imgur.com/jqIsh9f.png")
    .setThumbnail("https://i.imgur.com/jqIsh9f.png")
    .setTimestamp()


client.on("message", (message) => {
    // Exit and stop if it's not there
    if (message.author.bot) return; // if the author of the message is the bot do nothing

    if (!message.content.startsWith(config.prefix)) return;

    if (message.content.startsWith(config.prefix + "help")) { // if message is !help
        message.channel.send(helpEmbed); // send an embed
    }
    if (message.author.id == config.zubyID) { // if message author has this specific ID
        if (message.content.startsWith(config.prefix + "addcolor")) { // and if the message is !addcolor
            inputCommand = "".concat(message.content.split('!addcolor ', 0))

            var inputCommand = message.content.split(" ")

            if (inputCommand.length > 3) { // checks if there are more than 3 parameters including addcolor
                message.channel.send("Too many arguments, please do !addcolor <hex> <colorname>");
            } else if (inputCommand.length < 3) { // checks if there are less than 3 parameters including addcolor
                message.channel.send("Not enough arguments, please do !addcolor <hex> <colorname>");
            } else {
                var colorHex = inputCommand[1]; // sets hex of color
                var colorName = inputCommand[2]; // sets name of color



                var doesExist = doesColorExist(colorName);
                console.log(doesExist);
                if (doesExist == 1) {
                    message.channel.send("The color **" + colorName + "** is already added.");
                } else if (doesExist == -1) {

                    var colourAdded = AddColor(colorName, colorHex)
                    if (colourAdded == 1) {
                        message.channel.send("Added color **" + colorName + "** with hex value **" + colorHex + "**");
                    }
                }
            }
        }
    }





    if (message.content.startsWith(config.prefix + "deletecolor")) { // and if the message is !deletrcolor
        inputCommand = "".concat(message.content.split('!deletecolor', 0))

        var inputCommand = message.content.split(" ")

        if (inputCommand.length > 2) {
            message.channel.send("Too many arguments, please do !deletecolor <colorname>");
        } else if (inputCommand.length < 2) {
            message.channel.send("Not enough arguments, please do !deletecolor <colorname>");
        } else {
            var colorName = inputCommand[1];  // sets name of color that is to be deleted

            var doesExist = doesColorExist(colorName);

            if (doesExist == -1) {

                message.channel.send("This color **" + colorName + "** doesn't exists.")
            } else if (doesExist == 1) {

                var colorDeleted = deleteColor(colorName)
                if (colorDeleted == 1) {
                    message.channel.send("I have deleted the color: **" + colorName + "**");
                }else{
                    message.channel.send("Color doesn't exist. Cannot delete.");
                }
            }
        }
    }



    if (message.content.startsWith(config.prefix + "color")) { // and if the message is !deleterole
        inputCommand = "".concat(message.content.split('!color', 0))

        var inputCommand = message.content.split(" ")

        if (inputCommand.length > 2) {
            message.channel.send("Too many arguments, please do !color <colorname>");
        } else if (inputCommand.length < 0) {
            message.channel.send("Not enough arguments, please do !color <colorname>");
        } else {
            var roleToGive = inputCommand[1];  // sets name of color that is to be deleted
            message.channel.send(roleToGive);

            var color = '000001';

            function DoesNameExist(color) {
                'use strict';
                const fs = require('fs');
                var json = JSON.parse(fs.readFileSync('colors.json', 'utf8')); // Opens json file to be read
                for (var i = 0; i < json["colors"].length; i++) { //loops through the length of the json file
                    if (Object.keys(json["colors"][i])[0] == color) { //checks if the name is in the array
                        return i; //returns position
                    }
                }
                // only happens if the color does not exist
                return -1;
            }

            function DoesColorExist(color) {
                'use strict';
                const fs = require('fs');
                var json = JSON.parse(fs.readFileSync('colors.json', 'utf8')); // Opens json file to be read
                for (var i = 0; i < json["colors"].length; i++) { //loops through the length of the json file
                    if (Object.keys(json["colors"][i])[1] == color) { //checks if the name is in the array
                        return Object.keys(json["colors"][i])[1];
                    }
                    // only happens if the color does not exist
                    return -1;
                }

                var doesColorNameExist = DoesNameExist(roleToGive);

                if (doesColorNameExist == -1) {
                    // If the color does not exist, it does nothing i.e not delete anything
                    message.channel.send("This color name does not exist")

                } else if (doesColorNameExist == roleToGive) {
                    message.channel.send("This color name does exist")
                    var hexColor = DoesColorExist(roleToGive)

                    message.channel.send(hexColor, colorHex)
                }


                message.member.guild.createRole({
                    name: `${roleToGive}`,
                    color: `0X${color}`,
                    permissons: []
                }).then(function (role) {
                    message.member.addRole(role);
                });

            }
        }
    }
});//end of client.on("message", (message)


client.login(config.token);
