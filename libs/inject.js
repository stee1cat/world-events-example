/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

// Подключаемый скрипт в PhantomJS

var MAX_ITERATION = 15;
var weights = [];
var paths = document.querySelectorAll('.land path, path.land');

var svg = document.querySelector('svg');
var viewBox = svg.getAttribute('viewBox').split(/\s+|,/);

var Util = {
    randInt: function (min, max) {
        return Math.floor(Math.floor(Math.random() * (max - min + 1)) + min);
    },
    randIndexByWeight: function (weights) {
        var totalWeight = weights.reduce(function (a, b) {
                return a + b;
            }, 0),
            i,
            value;

        value = Math.random() * totalWeight;

        for (i = 0; i < weights.length; i++) {
            value -= weights[i];

            if (value <= 0) {
                return i;
            }
        }

        return weights.length - 1;
    },
    calculateWeightBySize: function (lands) {
        var weights = [],
            box,
            i;

        for (i = 0; i < lands.length; i++) {
            box = lands[i].getBBox();

            if (box.width > 100 || box.height > 100) {
                weights[i] = 100;
            }
            else if (box.width > 50 || box.height > 50) {
                weights[i] = 50;
            }
            else if (box.width > 25 || box.height > 25) {
                weights[i] = 10;
            }
            else {
                weights[i] = 0;
            }
        }

        return weights;
    }
};


if (paths && paths.length) {
    weights = Util.calculateWeightBySize(paths);
}

var findPoint = function () {
    var i = 0,
        result = false,
        index,
        path,
        box,
        x,
        y;

    while (!result && i < MAX_ITERATION) {
        index = Util.randIndexByWeight(weights);

        if (paths && paths[index]) {
            box = paths[index].getBBox();

            x = Util.randInt(box.x, box.x + box.width);
            y = Util.randInt(box.y, box.y + box.height);

            path = document.elementFromPoint(x, y);
            if (path && path.getAttribute('class') != 'ocean' && y < parseInt(viewBox[3])) {
                result = {
                    x: x,
                    y: y
                };
            }
        }

        i++;
    }

    return result;
};
