import {combineReducers} from 'redux'


function inFlight(state = false, action) {
    return action.type === 'REQUEST_INFLIGHT';
}

function urls(state = [], action) {
    switch (action.type) {
        case 'RECEIVE_URLS':
            return action.urls
    }
    return state;
}

function loading(state = true, action) {
    switch (action.type) {
        case 'RECEIVE_URLS':
        case 'REQUEST_URLS':
            return false;
        default:
            return state;
    }

}


export default combineReducers({
    inFlight,
    urls,
    loading,
});

