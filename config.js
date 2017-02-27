/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

module.exports = {
    port: 8080,
    eventsPerSecond: 200,
    worldMap: 'file:///' + __dirname.replace(/\\/g, '/') + '/public/world.svg'
};
