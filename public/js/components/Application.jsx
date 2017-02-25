/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

import React from 'react';
import Map from './Map';

export default class Application extends React.Component {

    render() {
        return (
            <div className="container">
                <Map />
            </div>
        );
    }

}
