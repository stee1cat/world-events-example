/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

import React from 'react';
import WorldMap from '../WorldMap';

export default class Map extends React.Component {

    componentDidMount() {
        this.initMap();
    }

    initMap() {
        const ctx = this.refs.canvas.getContext('2d');

        this.map = new WorldMap(ctx)
    }

    componentWillUpdate(props) {
        this.map.setEvents(props.events);
    }

    render() {
        return (
            <div className="map">
                <canvas ref="canvas" />
            </div>
        );
    }

}
