const request = require('request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmVybm5ndXllbiIsImEiOiJjanQ4M3ExcWYwNHBxNDNrODg1MjFpbDh1In0.oUUbdQOHBft5LIudFWBW2A&limit=2'

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longtitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode