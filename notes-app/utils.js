const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => "Your notes..."

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse('New node added!'))
    } else {
        console.log(chalk.red.inverse('The title already in use!'))
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const noteToKeeps = notes.filter((note) => note.title !== title)

    if (notes.length > noteToKeeps.length) {
        console.log(chalk.green.inverse('successfully removed'))
        saveNotes(noteToKeeps)
    } else {
        console.log(chalk.red.inverse('Key '+title+' does not exist'))
    }
}


const listNote = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note)
    })
}

const readNotes = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)

    if (foundNote) {
        console.log('Found one: ' + chalk.green.inverse(foundNote.title) +' '+ foundNote.body)
    } else {
        console.log(chalk.red.inverse('Not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNotes: readNotes
}