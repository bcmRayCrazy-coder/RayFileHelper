const inquirer = require('inquirer');
const chalk = require('chalk');

const modList = require('./mods/modList');

if (process.argv[2] == 'help') {
    console.log(`===HELP===
This is a tool to do something on a file
Not all done
==========`);
    process.exit();
}

async function main() {

    var { menu: res } = await inquirer.prompt({
        type: "list",
        name: 'menu',
        choices: (() => {
            var list = [];
            modList.forEach((o) => {
                list.push(o.name);
            });

            list.push(new inquirer.Separator());
            list.push('Exit');

            return list;
        })()
    });

    if (res == 'Exit') process.exit(0);
    modList.forEach((o) => {
        if (o.name == res) {
            require('./mods/functions/' + o.func);
        }
    });
}

main();