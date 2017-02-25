/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

export default class WebSocketClient {

    constructor(options) {
        this.ws = new WebSocket('ws://localhost:8080/events');
        this.ws.onopen = options.onopen;
        this.ws.onclose = event => options.onclose(event);
        this.ws.onmessage = event => options.onmessage(JSON.parse(event.data));
    }

    close() {
        this.ws.close();
    }

}
