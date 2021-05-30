const ADD_ITEM = 'ADD_ITEM';
const UPDATE_NEW_ID = 'UPDATE_NEW_ID';
const ADD_ROW = 'ADD_ROW';
const UPDATE_NEW_ITEM_NAME = 'UPDATE_NEW_ITEM_NAME';
const UPDATE_NEW_ITEM_COUNT = 'UPDATE_NEW_ITEM_COUNT';
const UPDATE_NEW_ITEM_PRICE = 'UPDATE_NEW_ITEM_PRICE';
const SET_TOTAL = 'SET_TOTAL';
const DELETE_ROW = 'DELETE_ROW';
const SET_EDIT_MODE = 'SET_EDIT_MODE';
const SET_EDIT_NAME = 'SET_EDIT_NAME';
const SAVE_EDIT_NAME = 'SAVE_EDIT_NAME';
const ADD_COUNT = 'ADD_COUNT';
const DELETE_COUNT = 'DELETE_COUNT';
const EDIT_NAME = 'EDIT_NAME';
const UPDATE_ROWS = 'UPDATE_ROWS';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const SET_EDIT_MODE_ID = 'SET_EDIT_MODE_ID';
const SET_EDIT_MODE_ID_PRICE = 'SET_EDIT_MODE_ID_PRICE';
const SAVE_EDIT_PRICE = 'SAVE_EDIT_PRICE';
const SET_EDIT_MODE_PRICE = 'SET_EDIT_MODE_PRICE';
const SET_LIST_PRICE_UP = 'SET_LIST_PRICE_UP';
const SET_LIST_PRICE_DOWN = 'SET_LIST_PRICE_DOWN';
const SET_LIST_DESC_UP = 'SET_LIST_DESC_UP';
const SET_LIST_DESC_DOWN = 'SET_LIST_DESC_DOWN';


let initialState = {

    newItemName: 'Название',
    newItemCount: 0,
    newItemPrice: 1,
    rows: [
        createRow(1, 'Компьютер', 3, 2157),
        createRow(2, 'Телевизор', 4, 2485),
        createRow(3, 'Холодильник', 2, 1634),
        createRow(4, 'Ноутбук', 2, 3186),
        createRow(5, 'Пылесос', 2, 386),
        createRow(6, 'Наушники', 5, 138),
    ],
    rows2: [
        {id: 1, name: 'Компьютер', count: 3, price: 2157},
        {id: 2, name: 'Телевизор', count: 4, price: 2485},
        {id: 3, name: 'Холодильник', count: 2, price: 1634},
        {id: 4, name: 'Ноутбук', count: 2, price: 3186},
        {id: 5, name: 'Пылесос', count: 21, price: 386},
        {id: 6, name: 'Наушники', count: 5, price: 138}
    ],
    total: null,
    editMode: false,
    editModeId: false,
    name: null,
    editModeName: false,
    editModeIdPrice: false,
    editModePrice: false,


};

function priceRow(count, price) {

    return count * price;
}

function createRow(id, desc, count, price) {
    const total = priceRow(count, price);
    return {id, desc, count, price, total};
}

function subtotal(items) {
    return items.map(({total}) => total).reduce((sum, i) => sum + i, 0);
}

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}


const itemsReducer = (state = initialState, action) => {


    const invoiceSubtotal = subtotal(state.rows);

    switch (action.type) {


        case ADD_ITEM: {
            let newItem = {
                id: state.items.length + 1,
                name: state.newItemName,
                count: 0,
                price: 2
            };
            return {
                ...state,
                items: [...state.items, newItem],
                newItemName: ''
            };
        }
        case UPDATE_NEW_ITEM_NAME: {
            return {
                ...state,
                newItemName: action.text
            }
        }
        case UPDATE_NEW_ITEM_COUNT: {
            return {
                ...state,
                newItemCount: parseInt(action.text)
            }
        }
        case UPDATE_NEW_ITEM_PRICE: {
            return {
                ...state,
                newItemPrice: parseInt(action.text)
            }
        }
        case SET_TOTAL: {
            return {
                ...state,
                total: ccyFormat(invoiceSubtotal)
            }
        }
        case DELETE_ROW: {

            return {
                ...state,
                rows: state.rows.filter(item => item.id !== action.desc)
            }
        }

        case ADD_ROW: {
            let last = () => {
                const split = state.rows.reverse()
                let splitRes = split[0].id
                return splitRes
            }
            return {
                ...state,
                rows: [...state.rows, createRow(last() + 1, state.newItemName, state.newItemCount, state.newItemPrice)]
            }
        }
        case SET_EDIT_MODE: {
            return {
                ...state,
                editMode: action.mode
            }
        }
        case SET_EDIT_MODE_PRICE: {
            return {
                ...state,
                editModePrice: action.mode
            }
        }
        case SET_EDIT_MODE_ID: {
            return {
                ...state,
                editModeId: action.id
            }
        }
        case EDIT_NAME: {
            return {
                ...state,
                editModeName: action.mode
            }
        }
        case SET_EDIT_NAME: {
            return {
                ...state,
                name: action.name
            }
        }
        case SAVE_EDIT_NAME: {
            let change = (id, desc) => {
                return state.rows.map(obj => {
                    if (obj.id === id) {
                        return {...obj, id, desc}
                    }
                    return obj;
                });
            }
            let changedRows = change(action.id, action.name)
            return {
                ...state,
                rows: changedRows
            }
        }
        case SAVE_EDIT_PRICE: {
            let change = (id, price) => {
                return state.rows.map(obj => {
                    if (obj.id === id) {
                        return {...obj, id, price}
                    }
                    return obj;
                });
            }
            let changedRows = change(action.id, action.price)
            return {
                ...state,
                rows: changedRows
            }
        }
        case ADD_COUNT: {

            let change = (id, count) => {
                return state.rows.map(obj => {

                    if (obj.id === id) {
                        return {...obj, id, count}
                    }
                    return obj;
                });
            }
            let changedRows = change(action.id, action.count)
            return {
                ...state,
                rows: changedRows
            }
        }
        case UPDATE_TOTAL: {

            let change = (id) => {
                return state.rows.map(obj => {
                    let total = obj.count*obj.price
                    if (obj.id === id) {
                        return {...obj, id, total}
                    }
                    return obj;
                });
            }
            let changedRows = change(action.id)
            return {
                ...state,
                rows: changedRows
            }
        }

        case DELETE_COUNT: {
            let change = (id, count) => {
                return state.rows.map(obj => {
                    if (obj.id === id) {
                        return {...obj, id, count}
                    }
                    return obj;
                });
            }
            let changedRows = change(action.id, action.count)
            return {
                ...state,
                rows: changedRows
            }
        }
        case UPDATE_ROWS: {
            return {
                ...state,
                rows: state.rows.map(r => {return r})
            }
        }
        case SET_EDIT_MODE_ID_PRICE: {
            return {
                ...state,
                editModeIdPrice: action.id
            }
        }
        case SET_LIST_PRICE_UP: {
            let list = () => {
                return state.rows.sort(function (a, b) {
                    if (a.price > b.price) {
                        return 1;
                    }
                    if (a.price < b.price) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                }
                )
                }
            return {
                ...state,
                rows: list()

            }
        }
        case SET_LIST_PRICE_DOWN: {
            let list = () => {
                return state.rows.sort(function (a, b) {
                        if (a.price > b.price) {
                            return -1;
                        }
                        if (a.price < b.price) {
                            return 1;
                        }
                        // a должно быть равным b
                        return 0;
                    }
                )
            }
            return {
                ...state,
                rows: list()

            }
        }
        case SET_LIST_DESC_UP: {
            let list = () => {
                return state.rows.sort(function (a, b) {

                        return a.desc.localeCompare(b.desc);
                    }
                )
            }
            return {
                ...state,
                rows: list()

            }
        }
        case SET_LIST_DESC_DOWN: {
            let list = () => {
                return state.rows.sort(function (a, b) {

                        return b.desc.localeCompare(a.desc);
                    }
                )
            }
            return {
                ...state,
                rows: list()

            }
        }


        default:
            return state;
    }
}



export const updateNewName = (text) =>
    ({type: UPDATE_NEW_ITEM_NAME, text})
export const updateNewCount = (text) =>
    ({type: UPDATE_NEW_ITEM_COUNT, text})
export const updateNewPrice = (text) =>
    ({type: UPDATE_NEW_ITEM_PRICE, text})
export const updateTotal = (total) =>
    ({type: SET_TOTAL, total})
export const deleteRow = (desc) =>
    ({type: DELETE_ROW, desc})
export const setEditMode = (mode) =>
    ({type: SET_EDIT_MODE, mode})
export const setEditModePrice = (mode) =>
    ({type: SET_EDIT_MODE_PRICE, mode})
export const setEditModeId = (id) =>
    ({type: SET_EDIT_MODE_ID, id})
export const setEditModeIdPrice = (id) =>
    ({type: SET_EDIT_MODE_ID_PRICE, id})
export const setEditModeName = (mode) =>
    ({type: EDIT_NAME, mode})
export const editName = (name) =>
    ({type: SET_EDIT_NAME, name})
export const SaveEditName = (id, name) =>
    ({type: SAVE_EDIT_NAME, id, name})
export const SaveEditPrice = (id, price) =>
    ({type: SAVE_EDIT_PRICE, id, price})
export const addCount = (id, count) =>
    ({type: ADD_COUNT, id, count})
export const updateTotalCount = (id) =>
    ({type: UPDATE_TOTAL, id})
export const deleteCount = (id, count) =>
    ({type: DELETE_COUNT, id, count})
export const AddRowAction = (desc, count, price) =>
    ({type: ADD_ROW, desc, count, price})
export const updateRows = () =>
    ({type: UPDATE_ROWS})
export const setListPriceUp = () =>
    ({type: SET_LIST_PRICE_UP})
export const setListPriceDown = () =>
    ({type: SET_LIST_PRICE_DOWN})
export const setListDescUp = () =>
    ({type: SET_LIST_DESC_UP})
export const setListDescDown = () =>
    ({type: SET_LIST_DESC_DOWN})


export default itemsReducer;