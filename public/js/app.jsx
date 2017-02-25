/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import Application from './components/Application';
import reducer from './reducers';
import WebSocketListener from './WebSocketListener';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('app')
);

new WebSocketListener(store);
