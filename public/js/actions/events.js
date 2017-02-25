/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

import {RECEIVE_EVENT, CONNECT, DISCONNECT} from '../constants/actions';

export function connect() {
    return {
        type: CONNECT
    }
}

export function disconnect() {
    return {
        type: DISCONNECT
    }
}

export function receiveEvent(event) {
    return {
        type: RECEIVE_EVENT,
        event
    }
}
