import {combineReducers, createStore} from "redux";
import itemsReducer from "./items-reducer";


let reducers = combineReducers({
    itemsPage: itemsReducer,

});

let store = createStore(reducers);

window.store = store;


export default store;