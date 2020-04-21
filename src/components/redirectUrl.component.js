// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {fetchUrl, redirectUrl} from "../actions/url.action";
import {withRouter} from "react-router";


class RedirectUrlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.originalUrl = "";
        this.shortenUrl = "https://zhifanhui--webdev-a4.herokuapp.com/" +
        this.props.match.params.shorten;
    }

    componentDidMount() {
        this.props.getUrl();
        console.log(this.props.match.params.shorten)
        // console.log("database:" + this.props.urls)
        // // this.urlExist()
    }

    urlExist() {
        if (this.props.urls) {
            console.log(this.props.urls)
            for (let i = 0; i < this.props.urls.length; i++) {
                let u = this.props.urls[i]
                console.log("u shortern " + u.shortenUrl)
                console.log("this shortern " + this.shortenUrl)
                if (u.shortenUrl === this.shortenUrl) {
                    this.originalUrl = u.originalUrl;
                    break;
                }
            }
        }
    }

    render() {
        // let originalUrl = this.props.redirectUrl.originalUrl;
        // this.props.getUrl();
        // console.log("database:" + this.props.urls)
        // this.urlExist();
        console.log("this is redirectUrl")
        // console.log(this.props.urls)
        // console.log(this.props.match.params.shortenUrl)
        this.urlExist();
        if (this.originalUrl.length === 0) {
            return <h3>Url Not Found</h3>
        }
        window.location.assign(this.originalUrl);
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