function doesColorExist(color) {

    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('colors.json', 'utf8'));

    for (i in obj) {

        if (obj[i].name == color) {
            console.log("Color found");
            return true;
        } else {
            console.log("Color not found");
        }

    }

}




exports.doesColorExist = doesColorExist;
