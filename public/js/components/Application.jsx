/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

import React from 'react';
import Map from './Map';
import {connect} from 'react-redux';

class Application extends React.Component {

    render() {
        const {events} = this.props;

        return (
            <div className="container">
                <Map events={events} />
            </div>
        );
    }

}

export default connect(
    state => ({
        events: state.events
    }),
    dispatch => ({

    })
) (Application);
