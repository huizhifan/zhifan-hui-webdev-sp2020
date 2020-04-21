// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {addUrl, deleteUrl, fetchUrl} from "../actions/url.action";
import {withRouter} from "react-router";


class UrlDeleteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.shortenUrl = "https://zhifanhui--webdev-a4.herokuapp.com/" +
            this.props.match.params.shorten;
    }

    componentDidMount() {
        this.props.getUrl();
        console.log(this.props.match.params.shortern)
    }

    render() {
        if (this.props.loading) {
            return <h3>Loading...</h3>
        }
        console.log("url component");
        console.log(this.props.urls)
        return (<div>
            <h1>These are my UrlDeleteComponent!</h1>
            <div>{this._renderUrlList()}</div>
        </div>);
    }

    _deleteUrl(id) {
        this.props.deleteUrl(id);
    }

    _renderUrlList() {
        let m = -1;
        for (let i = 0; i < this.props.urls.length; i++) {
            let u = this.props.urls[i];
            if (this.shortenUrl === u.shortenUrl) {
                m = i;
                break;
            }
        }
        if (m === -1) {
            return <h3>Link Not Found</h3>
        }
        let item = this.props.urls[m];
        const urlRows = (
            <tr key={item.id}>
                <td>{item.originalUrl}</td>
                <td>{item.shortenUrl}</td>
                <td><input type='button' value='Delete' onClick={() => this._deleteUrl(item._id)}/> </td>

            </tr>
        );
        return (<table>
            <thead>
            <tr>
                <th>OriginalUrl</th>
                <th>ShortenUrl</th>
            </tr>
            </thead>
            <tbody>
            {urlRows}
            </tbody>
        </table>)
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        getUrl: () => dispatch(fetchUrl()),
        deleteUrl: (id) => dispatch(deleteUrl(id)),

    }
}


function mapStateToProps(state, props) {
    return { ...state.url,}
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(UrlDeleteComponent))