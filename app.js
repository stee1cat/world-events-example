/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

const config = require('./config');

let express = require('express');

let app = express();

app.get('/', function (request, response) {
    response.send('Hello World!');
});

app.listen(config.port);
