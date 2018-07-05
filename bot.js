const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
    client.user.setActivity('!help in #colors for help')
    console.log(`Logged in as ${client.user.tag}!`);
});


/*
This function checks if the color exists and where
*/
function GetColorIndex(colorName) {
    'use strict';
    const fs = require('fs');
    var json = JSON.parse(fs.readFileSync('colors.json', 'utf8')); // Opens json file to be read
    for (var i = 0; i < json["colors"].length; i++) { //loops through the length of the json file
        if (Object.keys(json["colors"][i])[0] == colorName) { //checks if the name is in the array
            return i; //returns position
        }
    }
    // only happens if the color does not exist
    return -1;
}

const embed = new Discord.RichEmbed()
    .setTitle("Help")
    .setAuthor("Zuby", "https://i.imgur.com/jqIsh9f.png")
    .setColor(0x00AE86)
    .setDescription("The commands are:\r!color <name>\r\rColors located at: https://www.zubyk.co.uk")
    .setFooter("zuby-bot", "https://i.imgur.com/jqIsh9f.png")
    .setThumbnail("https://i.imgur.com/jqIsh9f.png")
    .setTimestamp()


client.on("message", (message) => {
        // Exit and stop if it's not there
        if (message.author.bot) return; // if the author of the message is the bot do nothing

        if (!message.content.startsWith(config.prefix)) return;

        if (message.content.startsWith(config.prefix + "help")) { // if message is !help
            message.channel.send(embed); // send an embed
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
                    var json = JSON.parse(fs.readFileSync('colors.json', 'utf8')); // Opens json file to be read

                    /*
                    This function adds the color
                    when given the color name and hex
                     */
                    function AddColor(colorName, colorHex) {
                        var oldJson = JSON.parse(fs.readFileSync('colors.json', 'utf8'));
                        oldJson['colors'].push({[colorName]: colorHex});
                        var newJson = JSON.stringify(oldJson);
                        fs.writeFileSync('colors.json', newJson);

                        // Tells use the name of color they added and hex of that color
                        message.channel.send("Added color " + colorName + " with hex value " + colorHex);
                    }

                    /*
                    Checks if color exists.
                    Returns either -1 or the index of the existing color
                     */
                    var colorExist = GetColorIndex(colorName)
                    if (colorExist > -1) {
                        // Prints only if the color exists
                        message.channel.send("This color already exists")
                    } else if (colorExist == -1) {
                        /*
                        If color does not exist then execute AddColor function.
                        Passes in the name of color and hex.
                         */
                        message.channel.send("This color DOES NOT exist.")
                        AddColor(colorName, colorHex)
                    }
                }
            }
        }
        if (message.author.id == config.zubyID) {
            if (message.content.startsWith(config.prefix + "deletecolor")) { // and if the message is !deletrcolor
                inputCommand = "".concat(message.content.split('!deletecolor', 0))

                var inputCommand = message.content.split(" ")

                if (inputCommand.length > 2) {
                    message.channel.send("Too many arguments, please do !deletecolor <colorname>");
                } else if (inputCommand.length < 2) {
                    message.channel.send("Not enough arguments, please do !deletecolor <colorname>");
                } else {
                    var colorName = inputCommand[1];  // sets name of color that is to be deleted
                    var json = JSON.parse(fs.readFileSync('colors.json', 'utf8')); // Opens json file to be read

                    /*
                    Checks if color exists.
                    Returns either -1 or the index of the existing color
                     */
                    var colorExist = GetColorIndex(colorName)
                    if (colorExist == -1) {
                        // If the color does not exist, it does nothing i.e not delete anything
                        message.channel.send("This color DOES NOT exists")
                    } else if (colorExist > -1) {
                        /*
                        If the color exists delete the position in the JSON.
                        Write the edited JSON to the same file, overwriting it.
                         */
                        message.channel.send("This color ALREADY exists at position " + colorExist)
                        message.channel.send("I am deleting color " + colorName)
                        json["colors"].splice(colorExist, 1); //delete the position where the color is
                        var newJson = JSON.stringify(json); // set to new json string
                        fs.writeFileSync('colors.json', newJson); //writes to new json file
                        message.channel.send("i have deleted " + colorName + " at position " + colorExist) //outputs what color got deleted and position
                    }
                }
            }


        }
        if (message.content.startsWith(config.prefix + "color")) { // and if the message is !deleterole
            inputCommand = "".concat(message.content.split('!color', 0))

            var inputCommand = message.content.split(" ")

            if (inputCommand.length > 1) {
                message.channel.send("Too many arguments, please do !color <colorname>");
            } else if (inputCommand.length < 1) {
                message.channel.send("Not enough arguments, please do !color <colorname>");
            } else {
                var role = inputCommand[1];  // sets name of color that is to be deleted

            }
        }
    }
); //end of client.on("message", (message)


client.login(config.token);
