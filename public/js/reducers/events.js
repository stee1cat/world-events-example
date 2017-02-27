/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

import {RECEIVE_EVENT} from '../constants/actions';
import EventstInitialState from '../models/EventstInitialState';
import config from '../config';

const TIME_PERIOD_MS = 1000;

let lastTime = Date.now();
let counter = 0;

export default function events(state = EventstInitialState, action) {
    switch (action.type) {
        case RECEIVE_EVENT:
            let currenTime = Date.now();
            let eventsPerSecond = state.eventsPerSecond;

            // events per second
            if ((currenTime - lastTime) > TIME_PERIOD_MS) {
                eventsPerSecond = counter;
                lastTime = currenTime;
                counter = 0;
            }
            else {
                counter++;
            }

            if (state.points.length > config.bufferSize) {
                state.points = state.points.slice(1, config.bufferSize - 1);
            }

            state.points.push(action.event);

            return {
                points: state.points,
                eventsPerSecond: eventsPerSecond
            };
            break;
        default:
            return state;
    }
};
