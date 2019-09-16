const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//setting the port value from heroku or 3000 for local machine
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mike Creed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mike Creed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Helpful text',
        name: 'Mike Creed'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={} ) => {
        if(error){
            return res.send({ error })
        }
        
        
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error){
                return res.send({ error })
            }
    
            res.send({
                location,
                forecast : forecastData,
                address: req.query.address

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


    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 Help',
        name: 'Mike Creed',
        errorMessage: 'Help article not found'
    
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        
        title: 'Error',
        name: 'Mike Creed',
        errorMessage: 'Error 404, page not found'
        
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})