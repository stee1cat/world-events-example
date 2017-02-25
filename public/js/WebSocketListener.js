/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

import {receiveEvent, connect, disconnect} from './actions/events';
import WebSocketClient from './WebSocketClient';
import Event from './models/Event';

export default class WebSocketListener {

    constructor(store) {
        this.store = store;

        this.client = new WebSocketClient({
            onopen: this.onopen.bind(this),
            onmessage: this.onmessage.bind(this),
            onclose: this.onclose.bind(this),
        });
    }

    onopen() {
        this.store.dispatch(connect());
    }

    onmessage(data) {
        let event = new Event(data);

        this.store.dispatch(receiveEvent(event))
    }

    onclose(event) {
        this.store.dispatch(disconnect());
    }

}
