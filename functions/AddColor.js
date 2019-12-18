const fs = require('fs');

function AddColor(colorName, colorHex) {
    var oldJson = JSON.parse(fs.readFileSync('colors.json', 'utf8'));

    hex = colorHex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = '('+r+','+g+','+b+')';

    oldJson.push({
        "hex": "#" + colorHex,
        "name": colorName,
        "rgb": result
     });
    var newJson = JSON.stringify(oldJson);
    fs.writeFileSync('colors.json', newJson);

    return true;

}
exports.AddColor = AddColor;
