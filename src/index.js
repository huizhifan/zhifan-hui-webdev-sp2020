import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers';
import Urls from "./containers/url.container"
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";
import RedirectUrlComponent from './components/redirectUrl.component'
import DeleteUrl from './components/url.delete.component'

const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
            <Route path="/url" component={Urls} />
            <Route path="/url/:shorten" component={RedirectUrlComponent}  />
            <Route path="/edit/:shorten" component={DeleteUrl} />
            <Redirect exact from="/" to="url"/>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);