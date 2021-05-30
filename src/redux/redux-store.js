import {combineReducers, createStore} from "redux";
import itemsReducer from "./items-reducer";


let reducers = combineReducers({
    itemsPage: itemsReducer,

});

let store = createStore(reducers,   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.store = store;


export default store;