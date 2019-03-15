const https = require('https')

url = 'https://api.darksky.net/forecast/55a62d5eefdb70f4b21ce757d62ecdaf/40,-75'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
        console.log(data)
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('Error: ', error)
})

request.end()