const fs = require("fs");
const zlib = require("zlib");

const inquirer = require('inquirer');

(async() => {
    var { from, to } = await inquirer.prompt([{
            name: 'from',
            type: "input",
            message: 'Where is the gzip file?(Path)'
        },
        {
            name: 'to',
            type: "input",
            message: 'unzip to where?(Path)'
        }
    ]);

    var fromFs = fs.createReadStream(from);
    var toFs = fs.createWriteStream(to);
    console.log("Copying...");

    fromFs.on('ready', () => {
        console.log("Ready to unzip");
    });

    fromFs.on('error', (err) => {
        console.error(err);
    });

    fromFs.on('end', () => {
        console.log('Unzipped!');
    })

    fromFs.pipe(zlib.createGunzip())
        .pipe(toFs);
})();