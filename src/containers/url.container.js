// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {addUrl, deleteUrl, fetchUrl} from "../actions/url.action";
import {withRouter} from "react-router";


class Urls extends React.Component {
    constructor() {
        super();
        this.duplicate = false;
        this.state = {
            shortenUrl: ""
        };
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    componentDidMount() {
        this.props.getUrl();
    }

    render() {
        if (this.props.loading) {
            return <h3>Loading...</h3>
        }
        console.log("url component");
        console.log(this.props.urls)
        return (<div>
            <h1>These are my Urls!</h1>
            <div>{this._renderUrlList()}</div>
        </div>);
    }

    _deleteUrl(id) {
        this.props.deleteUrl(id);
    }

    _urlExist() {
        for (let i = 0; i < this.props.urls.length; i++) {
            let tmp = "https://zhifanhui--webdev-a4.herokuapp.com/" + this.state.shortenUrl
            if (tmp  === this.props.urls[i].shortenUrl) {
                this.duplicate = true;
                return;
            }
        }
        this.duplicate = false;
    }

    _brandedUrl() {
        this._urlExist();
        if (this.duplicate) {
            console.log("dupilcate")
            return;
        };
        let url = {};
        if (this.state.shortenUrl.length === 0) {
            url.shortenUrl = this.uuidv4();
        } else {
            url.shortenUrl = this.state.shortenUrl
        }
        url.shortenUrl = "https://zhifanhui--webdev-a4.herokuapp.com/" + url.shortenUrl
        url.originalUrl = this.state.originalUrl;
        this.props.addUrl(url);
    }

    _handleFormUpdate(event, value) {
        this.setState({
            [value]: event.target.value || '',
            })
    }

    _renderUrlList() {
        const urlRows = this.props.urls.map(url => (
            <tr key={url._id}>
                <td>{url.originalUrl}</td>
                <td>{url.shortenUrl}</td>
                {/*<td><input type='button' value='Delete' onClick={() => this._deleteUrl(url._id)}/> </td>*/}
            </tr>));
        console.log(this.duplicate)
        return (<table>
            <thead>
            <tr>
                <th>OriginalUrl</th>
                <th>ShortenUrl</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {urlRows}
            <tr key={'input'}>
                <td><input type={'text'} value={this.state.originalUrl} onChange={e => this._handleFormUpdate(e, 'originalUrl')}/></td>
                <td><input type={'text'} value={this.state.shortenUrl} onChange={e => this._handleFormUpdate(e, 'shortenUrl')}/></td>
                <td><input type='button' value='submit' onClick={() => this._brandedUrl()}/> </td>
            </tr>
            </tbody>
        </table>)
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        getUrl: () => dispatch(fetchUrl()),
        addUrl: (url) => dispatch(addUrl(url)),
        deleteUrl: (id) => dispatch(deleteUrl(id)),

    }
}


function mapStateToProps(state, props) {
    return { ...state.url,}
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Urls))