/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

import Animation from './Animation';

export default class WorldMap {

    constructor(ctx) {
        this.ctx = ctx;

        this.init();
        this.loadSvg();
    }

    init() {
        this.updateCanvasSize();

        this.animation = new Animation(WorldMap.limitFps, this.render.bind(this));
        this.animation.start();
    }

    loadSvg() {
        this.map = new Image();
        this.map.onload = () => this.drawMap();
        this.map.src = WorldMap.svgMap;
    }

    drawMap() {
        let mapSize = this.calculateMapSize();

        this.ctx.drawImage(this.map, 0, 0, mapSize.width, mapSize.height);
    }

    updateCanvasSize() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }

    render() {
        this.updateCanvasSize();
        this.drawMap();
    }

    calculateMapSize() {
        return {
            width: this.ctx.canvas.width,
            height: this.ctx.canvas.width / this.map.width * this.map.height
        };
    }

    static get svgMap() {
        return '/world.svg';
    }

    static get limitFps() {
        return 24;
    }

}
