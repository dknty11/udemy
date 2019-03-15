const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]
console.log(location)

if (!location) {
    console.log('Please enter location')
} else {
    geocode(location, (error, { latitude:lat, longtitude:long , location:address }) => {
        console.log(lat, long)
        if (error) {
            return console.log(error)
        }
    
        forecast (lat, long, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            console.log(address)
            console.log(forecastData)
        })
    })
}