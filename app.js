/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

const config = require('./config');
const EventService = require('./libs/EventService');

let express = require('express');
let expressWs = require('express-ws');

expressWs = expressWs(express());

let app = expressWs.app;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (request, response) {
    response.render('index', {
        title: 'World Map'
    });
});

app.ws('/events', function (websocket, request) {
    let eventService = new EventService(websocket);

    eventService.start();
    console.log('client connected');

    websocket.on('close', () => {
        eventService.stop();
        console.log('client disconnected');
    });
});

app.listen(config.port, function () {
    console.log('Server started: http://localhost:' + config.port + '/');
});
