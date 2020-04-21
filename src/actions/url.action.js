import Axios from 'axios'

function loadingUrls() {
    return {
        type: "REQUEST_URLS"
    }
}

function receiveUrlList(urls) {
    return {
        type: "RECEIVE_URLS",
        urls
    }
}

function inFlight() {
    return {
        type: "REQUEST_INFLIGHT"
    }
}


export function fetchUrl() {
    return function(dispatch) {
        dispatch(loadingUrls());
        return Axios.get(`/api/url`)
            .then(response => dispatch(receiveUrlList(response.data)),
                error => console.log('An error occurred.', error)
            );
    }
}

export function addUrl(url) {
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/url`, url)
            .then(() => Axios.get(`/api/url`),
                error => console.log('An error occurred.', error))
            .then(
                response => dispatch(receiveUrlList(response.data)),
                error => console.log('An error occurred.', error)
            )
    }
}

export function deleteUrl(urlId) {
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.delete(`/api/url/` + urlId)
            .then(() => Axios.get(`/api/url`),
                error => console.log('An error occurred.', error))
            .then(
                response => dispatch(receiveUrlList(response.data)),
                error => console.log('An error occurred.', error)
            )
    }
}

export function redirectUrl() {
    return function(dispatch) {
        Axios.get('/api/url/:shortenUrl')
        .then(() => Axios.get(`/api/url`),
            error => console.log('An error occurred.', error))
        .then(
            response => dispatch(receiveUrlList(response.data)),
            error => console.log('An error occurred.', error)
        )
    }
}