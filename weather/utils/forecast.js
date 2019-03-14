const request = require('request')

const forecast = (lat, long, callback) => {
    url = 'https://api.darksky.net/forecast/55a62d5eefdb70f4b21ce757d62ecdaf/'+lat+','+long
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect services', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, response.body.daily.data[0].summary)
        }
    })
}

module.exports = forecast