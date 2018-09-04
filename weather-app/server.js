const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = '*******************';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
});

app.post('/', (req, res) => {
    let city = req.body.city;
    console.log(city);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, (err, response, body)=> {
        if (err) {
            res.render('index', {
                weather: null,
                error: 'Error, request failed'
            });
        } else {
            let weather = JSON.parse(body)
            console.log(weather);
            if (weather.main == undefined) {
                res.render('index', {
                    weather: null,
                    error: 'Error, please enter a city'
                });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {
                    weather: weatherText,
                    error: null
                });
            }
        }
    });
})

app.listen(3000, () => {
    console.log('Weather-app listening on port 3000!')
});