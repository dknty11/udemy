const fs = require('fs')

// const book = {
//     title: 'Getting started with Node',
//     author: 'Ryan Hodiler'
// }

// const bookJSON = JSON.stringify(book)
// console.log(bookJSON)

//const parsedData = JSON.parse(bookJSON)
//console.log(parsedData)
//fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data.title)

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
console.log(data.age)
data.age = 26
data.name = 'Vern Nguyen'
data.planet = 'Jupiter'
fs.writeFileSync('1-json.json', JSON.stringify(data))
const dataBufferAfter = fs.readFileSync('1-json.json')
console.log(dataBufferAfter.toString())

