const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = 'ff5b3627e6bcd17a1846d568947c73a7';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.render('index', {
        weather: null,
        error: null
    });
});

app.post('/', (req, res) => {
    let position = req.body.position.split(',');
    let lat = position[0];
    let lon = position[1];
    console.log(position);
    let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
    console.log("request url= " + url);
    request(url, (err, response, body) => {
        if (err) {
            res.render('index', {
                weather: null,
                error: 'Error, err=' + err
            });
        } else {
            let weather = JSON.parse(body)
            // console.log(weather);
            if (weather.approvedTime == undefined) {
                res.render('index', {
                    weather: null,
                    error: 'Error, err=' + body
                });
            } else {
                for (var i = 0; i < weather.timeSeries.length; i++) {
                    var tSerie = weather.timeSeries[i];
                    console.log("hourOf(validTime)= " + hourOf(tSerie.validTime))
                    console.log("currentHour()= " + currentHour());
                    if (hourOf(tSerie.validTime) == currentHour()) {
                        for (var j = 0; j < tSerie.parameters.length; j++) {
                            var parameter = tSerie.parameters[j];
                            if (parameter.name == 't') {
                                let weatherText = `It's ${parameter.values[0]} degrees in (${lat},${lon})!`;
                                res.render('index', {
                                    weather: weatherText,
                                    error: null
                                });
                                return;
                            }
                        }
                    }
                }
            }
        }
    });
});

function hourOf(date) {
    // 2018-09-04T13:00:00Z     =>      13
    return parseInt(date.split('T')[1].split(':')[0]);
};

function currentHour() {
    return new Date().getHours();
}

app.listen(3000, () => {
    console.log('Weather-app listening on port 3000!')
});