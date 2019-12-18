const { json } = require("../bot");


function deleteColor(colorName) {
    const fs = require('fs');
    var json = JSON.parse(fs.readFileSync('colors.json', 'utf8')); // Opens json file to be read

    for (i in json) {

        if (json[i].name == colorName) {
            console.log("Color found");
            json.splice(i, 1);
            var newJson = JSON.stringify(json);
            fs.writeFileSync('colors.json', newJson);


            return true;
        } else {
            console.log("Color not found");
        }

    }


}
exports.deleteColor = deleteColor;
