const fs = require('fs');
function AddColor(colorName, colorHex) {
    var oldJson = JSON.parse(fs.readFileSync('colors.json', 'utf8'));
    // oldJson['colors'].push({[colorName]: colorHex});
    oldJson['colors'].push({ [colorName]: colorHex });
    var newJson = JSON.stringify(oldJson);
    fs.writeFileSync('colors.json', newJson);
    // Tells use the name of color they added and hex of that color
    return 1;
}
exports.AddColor = AddColor;
