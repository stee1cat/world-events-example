/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

const config = require('./config');

let express = require('express');

let app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (request, response) {
    response.render('index', {
        title: 'Main Page'
    });
});

app.listen(config.port, function () {
    console.log('Server started: http://localhost:' + config.port + '/');
});
