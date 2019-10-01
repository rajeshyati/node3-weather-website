const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Rajesh'
    })
})

app.get('/about',(req,res) => {

    res.render('about',{
        title:'About',
        name:'Rajesh'
    })
})

app.get('/help',(req,res) => {

    res.render('help', {
        helptext:'This is some helpful text',
        title:'Help',
        name:'Rajesh'
    })
})
/* app.get('/help',(req,res) => {

    res.send([{name:'Rajesh'}, {age:32}]) 
})

app.get('/about',(req,res) => { 

    res.send('<h1>About Page</h1>') 
}) */

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({

            error:"You must provide the address"
        })
    }else{

        geocode(req.query.address, (error, {latitude,longitude,location}= {}) => {
            if(error){
                return res.send({
                    error
                })
            }else{
                forecast(longitude, latitude, (error, forecastData) => {
                    if(error){  
                        return res.send({
                            error
                        })
                    }
                    res.send({
                        forecast:forecastData, 
                        location:location,
                        address:req.query.address
                    })  
                  })
            }
        })
    }
})

app.get('/products', (req,res)=> {

    if(!req.query.search){
        return res.send({
            error:"You must provide the search term"
        })
    }
    else{
        console.log(req.query.search)
        res.send({

            products:[]
        })
    }
})

app.get('/help/*',(req,res) => {
    res.send('Help article not found')
})

app.get('*',(req,res) => {
    res.render('404', {
        title:'404',
        name:'Rajesh',
        errorMessage:'Page Not Found'
    })
})

app.listen(port, () => {

    console.log('Server is listening on Port '+port)
})