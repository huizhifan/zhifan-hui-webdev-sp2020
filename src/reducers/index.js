
import urlReducers from "./url.reducer";
import {combineReducers} from 'redux'


export default combineReducers({
    url: urlReducers,
})