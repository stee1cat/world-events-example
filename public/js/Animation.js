/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

export default class Animation {

    constructor(fps, renderCallback) {
        this.setFrameRate(fps);

        this.playing = false;
        this.renderCallback = renderCallback;

        this.loop = this.loop.bind(this);
    }

    loop(timestamp) {
        let sequence;

        if (this.time === null) {
            this.time = timestamp;
        }

        sequence = Math.floor((timestamp - this.time) / this.delay);

        if (sequence > this.frame) {
            this.frame = sequence;

            this.renderCallback({
                time: timestamp,
                frame: this.frame
            });
        }

        this.raf = requestAnimationFrame(this.loop);
    }

    start() {
        if (!this.playing) {
            this.playing = true;
            this.raf = requestAnimationFrame(this.loop);
        }
    };

    pause() {
        if (this.playing) {
            cancelAnimationFrame(this.raf);
            this.playing = false;
            this.time = null;
            this.frame = -1;
        }
    };

    setFrameRate(fps) {
        this.fps = fps;
        this.delay = 1000 / fps;
        this.frame = -1;
        this.time = null;
    };

}
