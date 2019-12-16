const { json } = require("../bot");
const { returnColorPosition } = require("./returnColorPosition");

function deleteColor(colorName) {
    const fs = require('fs');
    var json = JSON.parse(fs.readFileSync('colors.json', 'utf8')); // Opens json file to be read
    
    json["colors"].splice(returnColorPosition, 1); //delete the position where the color is
    var newJson = JSON.stringify(json); // set to new json string
    fs.writeFileSync('colors.json', newJson); //writes to new json file
    return 1;
}
exports.deleteColor = deleteColor;
