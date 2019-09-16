const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/be3a246d5ed0a6a7932f82f94cb664b3/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'?units=si'


//setting up the request function for the forecast
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location. Try Another search.', undefined)
        }else {
            callback(undefined, body.daily.data[0].summary+" It is currently "+ body.currently.temperature+" and today the Maximum temperature is " + body.daily.data[0].temperatureMax + " with a Minimum temperature of " + body.daily.data[0].temperatureMin + ".There is "+body.currently.precipProbability+"% chance of rain")
        }
    })

}

module.exports = forecast