const { deleteColor } = require("./functions/deleteColor");

const { AddColor } = require("./functions/AddColor");

const { doesColorExist } = require("./functions/doesColorExist");

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');


client.on('ready', () => {
    client.user.setActivity('!help in #colors for help')
    console.log(`Logged in as ${client.user.tag}!`);
});


const helpEmbed = new Discord.RichEmbed()
    .setTitle("Help Commands")
    .setAuthor("Zuby", "https://i.imgur.com/jqIsh9f.png")
    .setColor(0x00AE86)
    .setDescription("Type !color <name> to set your color\n\n" +
        "**Admin Commands**\n" +
        "!addcolor <hex number> <name>\n" +
        "!delcolor <name>")
    .setFooter("zuby-bot", "https://i.imgur.com/jqIsh9f.png")
    .setTimestamp()


client.on("message", (message) => {
    // Exit and stop if it's not there
    if (message.author.bot) return; // if the author of the message is the bot do nothing

    if (!message.content.startsWith(config.prefix)) return;

    if (message.content.startsWith(config.prefix + "help")) {
        message.channel.send(helpEmbed);
    }
    if (message.author.id == config.zubyID) {



        if (message.content.startsWith(config.prefix + "addcolor")) {
            inputCommand = "".concat(message.content.split('!addcolor ', 0))

            var inputCommand = message.content.split(" ")

            if (inputCommand.length > 3) {
                message.channel.send("Too many arguments, please do !addcolor <hex> <colorname>");
            } else if (inputCommand.length < 3) {
                message.channel.send("Not enough arguments, please do !addcolor <hex> <colorname>");
            } else {
                var colorHex = inputCommand[1]; // sets hex of color
                var colorName = inputCommand[2].toLowerCase(); // sets name of color



                var doesExist = doesColorExist(colorName);


                // console.log(doesExist);

                if (doesExist == true) {
                    message.channel.send("The color **" + colorName + "** is already added.");
                } else {
                    message.channel.send("The color **" + colorName + "** is not in the list of colors.");
                    var colourAdded = AddColor(colorName, colorHex)
                    if (colourAdded == true) {
                        message.channel.send("Added color **" + colorName + "** with hex value **" + colorHex + "**.");
                    } else {
                        message.channel.send("Failed to add color " + colorName + ". Contact admin.")
                    }
                }
            }
        }
    }





    if (message.content.startsWith(config.prefix + "delcolor")) {
        inputCommand = "".concat(message.content.split('!delcolor', 0))

        var inputCommand = message.content.split(" ")

        if (inputCommand.length > 2) {
            message.channel.send("Too many arguments, please do !delcolor <colorname>");
        } else if (inputCommand.length < 2) {
            message.channel.send("Not enough arguments, please do !delcolor <colorname>");
        } else {
            var colorName = inputCommand[1];

            var doesExist = doesColorExist(colorName);

            if (doesExist == "false") {

                message.channel.send("This color **" + colorName + "** doesn't exists.")
            } else {

                var colorDeleted = deleteColor(colorName)
                if (colorDeleted == true) {
                    message.channel.send("I have deleted the color: **" + colorName + "**");
                } else {
                    message.channel.send("Color doesn't exist. Cannot delete.");
                }
            }
        }

    }




    if (message.content.startsWith(config.prefix + "color")) {
        inputCommand = "".concat(message.content.split('!color', 0))

        var inputCommand = message.content.split(" ")

        if (inputCommand.length > 2) {
            message.channel.send("Too many arguments, please do !color <colorname>");
        } else if (inputCommand.length < 0) {
            message.channel.send("Not enough arguments, please do !color <colorname>");
        } else {
            var roleToGive = inputCommand[1];  // sets name of color that is to be deleted
            message.channel.send(roleToGive);

            function returnHex() {
                'use strict';
                const fs = require('fs');
                var json = JSON.parse(fs.readFileSync('colors.json', 'utf8')); // Opens json file to be read
                return json;

            }


            var json = returnHex();

            console.log(json.colors[roleToGive]);


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
