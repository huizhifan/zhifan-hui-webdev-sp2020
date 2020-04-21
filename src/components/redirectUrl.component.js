// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {fetchUrl, redirectUrl} from "../actions/url.action";
import {withRouter} from "react-router";


class RedirectUrlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.url = {shortenUrl:"", originalUrl: ""};
        this.shortenUrl = "https://zhifanhui--webdev-a4.herokuapp.com/" +
        this.props.match.params.shorten;
    }

    componentDidMount() {
        this.props.getUrl();
        console.log(this.props.match.params.shorten)
    }

    urlExist() {
        if (this.props.urls) {
            console.log(this.props.urls)
            for (let i = 0; i < this.props.urls.length; i++) {
                let u = this.props.urls[i]
                console.log("u shortern " + u.shortenUrl)
                console.log("this shortern " + this.shortenUrl)
                if (u.shortenUrl === this.shortenUrl) {
                    this.url = u.url;
                    break;
                }
            }
        }
    }

    render() {
        console.log("this is redirectUrl")
        this.urlExist();
        if (this.url.originalUrl.length === 0) {
            return <h3>Url Not Found</h3>
        }

        return null;
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        getUrl: () => dispatch(fetchUrl()),
        redirectUrl: () => dispatch(redirectUrl()),
    }
}


function mapStateToProps(state, props) {
    return { ...state.url,}
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(RedirectUrlComponent))