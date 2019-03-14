const chalk = require('chalk')
const yargs = require('yargs')
const validator = require('validator')
const utils = require('./utils.js')

//fs.writeFile('notes.txt', 'hello folks!')
//fs.appendFileSync('notes.txt', '\nhellow')
//const add = require('./utils.js')

//const name = 'vern'

//subtract = add(3, 5)
//console.log(subtract)

//console.log(validator.isURL('http://abc.com'))
//console.log(chalk.green('Success\n') + chalk.inverse.blue('What\'s next!'))
//console.log(chalk.yellow('hello ') + process.argv[2])

yargs.version('1.1.0')
// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true
        },
        body: {
            describe: 'Describe',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        utils.addNote(argv.title, argv.body) 
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        utils.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler() {
        console.log('Listing a note')
        utils.listNote()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Readiing a note')
        utils.readNotes(argv.title)
    }
})

//console.log(yargs.argv)
yargs.parse()
