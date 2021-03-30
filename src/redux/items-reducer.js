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


let initialState = {

    newItemName: 'Название',
    newItemCount: 0,
    newItemPrice: 1,
    rows: [
        createRow(1, 'Компьютер', 3, 11.15),
        createRow(2, 'Телевизор', 4, 45.99),
        createRow(3, 'Холодильник', 2, 17.99),
        createRow(4, 'Ноутбук', 2, 11.99),
    ],
    total: null,
    editMode: false,
    name: null,
    editModeName: false,


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
                newItemCount: action.text
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
                rows: state.rows.filter(item => item.desc !== action.desc)
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
        case ADD_COUNT: {

            let change = (id, count, total) => {
                return state.rows.map(obj => {
                    if (obj.id === id) {
                        return {...obj, id, count, total}
                    }
                    return obj;
                });
            }
            let changedRows = change(action.id, action.count, action.total)
            return {
                ...state,
                rows: changedRows
            }
        }
        case DELETE_COUNT: {
            let change = (id, count, total) => {
                return state.rows.map(obj => {
                    if (obj.id === id) {
                        return {...obj, id, count, total}
                    }
                    return obj;
                });
            }
            let changedRows = change(action.id, action.count, action.total)
            return {
                ...state,
                rows: changedRows
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
export const setEditModeName = (mode) =>
    ({type: EDIT_NAME, mode})
export const editName = (name) =>
    ({type: SET_EDIT_NAME, name})
export const SaveEditName = (id, name) =>
    ({type: SAVE_EDIT_NAME, id, name})
export const addCount = (id, count, total) =>
    ({type: ADD_COUNT, id, count, total})
export const deleteCount = (id, count, total) =>
    ({type: DELETE_COUNT, id, count, total})
export const AddRowAction = (desc, count, price) =>
    ({type: ADD_ROW, desc, count, price})


export default itemsReducer;