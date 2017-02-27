/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

import Animation from './Animation';
import EventstInitialState from './models/EventstInitialState';

export default class WorldMap {

    constructor(ctx, events) {
        this.ctx = ctx;
        this.events = EventstInitialState;

        this.init();
        this.loadSvg();
    }

    init() {
        window.addEventListener('resize', () => this.mapCanvas = null);
    }

    loadSvg() {
        this.map = new Image();
        this.map.onload = () => {
            this.orignalWidth = this.map.width;
            this.orignalHeight = this.map.height;

            this.animation = new Animation(WorldMap.limitFps, this.render.bind(this));
            this.animation.start();
        };
        this.map.src = WorldMap.svgMap;
    }

    prerenderMap() {
        let mapSize = this.calculateMapSize();

        this.mapCanvas = document.createElement('canvas');
        this.mapCanvas.width = mapSize.width;
        this.mapCanvas.height = mapSize.height;
        this.mapCanvas.getContext('2d')
            .drawImage(this.map, 0, 0, this.orignalWidth, this.orignalHeight, 0, 0, mapSize.width, mapSize.height);
    }

    drawMap() {
        let mapSize = this.calculateMapSize();

        if (!this.mapCanvas) {
            this.prerenderMap();
        }

        this.ctx.drawImage(this.mapCanvas, 0, 0);
    }

    drawPoints() {
        let i = 0;

        this.ctx.fillStyle = '#e6e600';
        for (; i < this.events.points.length; i++) {
            this.drawPoint(this.events.points[i]);
        }
    }

    drawInfo() {
        this.ctx.fillStyle = '#e6e600';
        this.ctx.font = '12px monospace';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(`${this.events.eventsPerSecond} eps`, 5, 5);
    }

    drawPoint(event) {
        let ctx = this.ctx;
        let x = Math.floor(event.x * this.ratio);
        let y = Math.floor(event.y * this.ratio);

        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    updateCanvasSize() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }

    render() {
        this.drawMap();
        this.drawPoints();
        this.drawInfo();
    }

    setEvents(events) {
        this.events = events;
    }

    calculateMapSize() {
        this.updateCanvasSize();

        this.ratio = this.ctx.canvas.width / this.orignalWidth;

        return {
            width: this.ctx.canvas.width,
            height: this.ratio * this.orignalHeight
        };
    }

    static get svgMap() {
        return '/world.svg';
    }

    static get limitFps() {
        return 2;
    }

}
