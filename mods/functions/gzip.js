const fs = require("fs");
const zlib = require("zlib");

const inquirer = require('inquirer');

(async() => {
    var { from, to } = await inquirer.prompt([{
            name: 'from',
            type: "input",
            message: 'Where is the file?(Path)'
        },
        {
            name: 'to',
            type: "input",
            message: 'gzip to where?(Path)'
        }
    ]);

    var fromFs = fs.createReadStream(from);
    var toFs = fs.createWriteStream(to + '.gz');
    console.log("Copying...");

    fromFs.on('ready', () => {
        console.log("Ready to zip");
    });

    fromFs.on('error', (err) => {
        console.error(err);
    });

    fromFs.on('end', () => {
        console.log('Zipped!');
    })

    fromFs.pipe(zlib.createGzip())
        .pipe(toFs);
})();