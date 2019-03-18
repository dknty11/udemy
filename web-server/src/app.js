const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for Express config
const public_dir_path = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'templates/views')
const partialsPath = path.join(__dirname, 'templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(public_dir_path))


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Vern'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vern',
        info: 'First dynamic template using hbs'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }

    geocode(req.query.address, (error, { latitude:lat, longtitude:long , location:address } = {}) => {
        if (error) {
            return res.send({
                error: 'Unable to find location'
            })
        }
    
        forecast (lat, long, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'Unable to fetch data from provided lat/long'
                })
            }
            res.send({
                title: 'Weather',
                name: 'Vern',
                location: address,
                forecast: forecastData,
                address: req.query.address,
                longtitude: long
            })
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Vern',
        helpText: 'This is some text'
    })
})

app.get('help/*', (req, res) => {
    res.render('404error', {
        title: '404',
        name: 'Vern',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404error', {
        title: '404',
        name: 'Vern',
        errorMessage: 'The page you\'re searching not found.'
    })
})

app.listen(3000, () => {
    console.log('app started')
})