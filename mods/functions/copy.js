const fs = require("fs");

const inquirer = require('inquirer');

(async() => {
    var { from, to } = await inquirer.prompt([{
            name: 'from',
            type: "input",
            message: 'from where to copy?(Path)'
        },
        {
            name: 'to',
            type: "input",
            message: 'copy to where?(Path)'
        }
    ]);

    var fromFs = fs.createReadStream(from);
    var toFs = fs.createWriteStream(to);
    console.log("Copying...");

    fromFs.on('ready', () => {
        console.log("Ready to copy");
    });

    fromFs.on('error', (err) => {
        console.error(err);
    });

    fromFs.on('end', () => {
        console.log('Copied!');
    })

    fromFs.pipe(toFs);
})();