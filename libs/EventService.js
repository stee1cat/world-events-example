/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

'use strict';

const config = require('./../config');

const PhantomJsService = require('./PhantomJsService');

let phantomJsService = new PhantomJsService();
let generator = phantomJsService.page();

let EventService = function (ws) {
    this.ws = ws;
};

EventService.prototype = (function () {
    let start,
        stop,
        send,
        generateEvent,
        generateCoord;

    start = function () {
        this.interval = setInterval(this.send.bind(this), 1000 / config.eventsPerSecond);
    };

    stop = function () {
        clearInterval(this.interval);
    };

    send = function () {
        generateCoord()
            .then(coord => {
                if (coord && this.ws.readyState == this.ws.OPEN) {
                    this.ws.send(JSON.stringify({
                        id: Date.now(),
                        x: coord.x,
                        y: coord.y
                    }));
                }
            });
    };

    generateCoord = function () {
        return generator.then(function (page) {
                return page.evaluate(function () {
                    // @see inject.js
                    return findPoint();
                });
            })
    };

    return {
        start,
        stop,
        send
    };
}) ();

module.exports = EventService;
