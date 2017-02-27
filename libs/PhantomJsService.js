/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

const config = require('../config');

let phantom = require('phantom');
let fs = require('fs');

let promise = new Promise(function (resolve, reject) {
    let _page;
    let url = config.worldMap;
    let html = `
    <html>
        <body style="margin: 0;">
            ${fs.readFileSync('public/world.svg')}
        </body>
    </html>`;

    phantom.create()
        .then(instance => instance.createPage())
        .then(page => {
            _page = page;

            page.property('viewportSize', {
                width: 3000,
                height: 3000
            });

            return page.open('about:blank');
        })
        .then(function (status) {
            if (status == 'success') {

                _page.setContent(html, url);
                _page.injectJs(require.resolve('./inject.js'));

                resolve(_page);
            }
        })
        .catch(error => reject(error));
});

let PhantomJsService = function () {};

PhantomJsService.prototype = (function () {
    return {
        page: function () {
            return promise;
        }
    };
}) ();

module.exports = PhantomJsService;
