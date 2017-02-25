/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

import Event from '../models/Event';
import {RECEIVE_EVENT} from '../constants/actions';

const initialState = [];

export default function events(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_EVENT:
            return [
                ...state,
                action.event
            ];
            break;
        default:
            return state;
    }
};
