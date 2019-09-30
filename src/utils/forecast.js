const request = require('request')

const forecast = (latitide, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/72ebeeed2ad619dbf7835515e5bd6d64/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitide)
    request({url,json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the forecast service')
        }else if(body.error){
            callback('Unable to forecast the given location')
        }else{

            callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain')
        }
    })
}

module.exports = forecast