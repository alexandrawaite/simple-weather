const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index', {weather: null, error: null})
})

app.post('/', (req, res) => {
  let apiKey = '5d791ac517c4625e6779e0e2fbe5df01'
  let {city} = req.body
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, (err, response, body) => {
    if (err) {
      res.render('index', {weather: null, error: 'Sorry, there was an error. Please try again!'})
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index', {weather: null, error: 'Sorry, there was an error. Please try again!'})
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`
        res.render('index', {weather: weatherText, error: null})
      }
    }
  })
})

app.listen(3000, () => {
  console.log('App is listening on port 3000!')
})
