const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]


if (!location) {
    console.log('Please enter location')
} else {
    geocode(location, (error, data) => {
        
        if (error) {
            return console.log(error)
        }
    
        const lat = data.latitude
        const long = data.longtitude
        forecast (lat, long, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            console.log(data.location)
            console.log(forecastData)
        })
    })
}