const request = require('request')

const forecast = (lat, long, callback) => {
    url = 'https://api.darksky.net/forecast/55a62d5eefdb70f4b21ce757d62ecdaf/'+lat+','+long

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary)
        }
    })
}

module.exports = forecast