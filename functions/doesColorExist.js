function doesColorExist(color) {
    'use strict';
    const fs = require('fs');
    var json = JSON.parse(fs.readFileSync('colors.json', 'utf8')); // Opens json file to be read
    for (var i = 0; i < json["colors"].length; i++) { //loops through the length of the json file
        if (Object.keys(json["colors"][i])[0] == color) { //checks if the name is in the array
            return 1;
        }
    }
    return -1;
}
exports.doesColorExist = doesColorExist;
