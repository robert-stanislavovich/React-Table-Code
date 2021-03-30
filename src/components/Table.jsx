import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {compose} from "redux";
import {connect} from "react-redux";
import {
    addCount,
    AddRowAction, deleteCount, deleteRow, editName, SaveEditName, setEditMode, setEditModeName, updateNewCount,
    updateNewName, updateNewPrice, updateTotal
} from "../redux/items-reducer";
import {Button, Card} from "react-bootstrap";
import s from './styles.module.css';


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function subtotal(items) {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}

let ItemsTable = (props) => {


    const classes = useStyles();


    let onAddItem = () => {
        props.AddRowAction(props.newItemName, props.newItemCount, props.newItemPrice)
    }
    let onDeleteItem = (desc) => {
        props.deleteRow(desc)
    }
    let newNameElement = React.createRef()

    let onNameChange = () => {
        let text = newNameElement.current.value
        props.updateNewName(text)
    }
    let newCountElement = React.createRef()

    let onCountChange = () => {
        let text = newCountElement.current.value
        props.updateNewCount(text)
    }
    let newPriceElement = React.createRef()

    let onPriceChange = () => {
        let text = newPriceElement.current.value
        props.updateNewPrice(text)
    }
    let editModeOn = (mode) => {
        props.setEditMode(mode)

    }
    let newEditNameElement = React.createRef()

    let onEditName = () => {
        let text = newEditNameElement.current.value
        props.editName(text)
    }
    let saveEditName = (id) => {
        if (props.editMode)
            props.SaveEditName(id, props.name)
    }
    let addCount = (id, count, total) => {
        props.addCount(id, count, total)
    }
    let deleteCount = (id, count, total) => {
        props.deleteCount(id, count, total)
    }

    let total = subtotal(props.rows)


    useEffect(() => {

        props.updateTotal(total);

    },);


    return (<div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell align="right">Количетсво</TableCell>
                            <TableCell align="right">Цена за 1 единицу</TableCell>
                            <TableCell align="right">Сумма</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => (

                            <TableRow key={row.desc}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.desc}</TableCell>
                                <TableCell align="right"><Button variant="outline-danger" size="sm"
                                                                 onClick={
                                                                     () => {
                                                                         if (row.count > 0) {
                                                                             deleteCount(row.id, row.count - 1, row.count * row.price)
                                                                         }

                                                                     }}
                                > - </Button> {row.count} <Button variant="outline-success" size="sm" onClick={
                                    () => {
                                        addCount(row.id, row.count + 1, row.count * row.price)

                                    }}> + </Button></TableCell>

                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.total.toFixed(2)}</TableCell>


                                <Button variant="outline-danger" onClick={() => {
                                    onDeleteItem(row.desc)

                                }}>Удалить товар</Button>
                                {props.editMode ? <Button variant="outline-success" onClick={() => {
                                    saveEditName(row.id)
                                }}>Сохранить название</Button> : ""}
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3}/>
                            <TableCell colSpan={3}>Итого</TableCell>
                            <TableCell align="right">{props.total}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <div className={s.constructor}>
                <div className={s.changeName}>
                    {props.editMode ? "" : <Button variant="outline-info" onClick={() => {
                        editModeOn(true)

                    }}>Изменить название</Button>}
                    {props.editMode
                        ?
                        <div>
                            Введите новое название, затем нажмите
                            "Сохранить название" рядом с элементом
                            которому хотите изменить название: <input onChange={onEditName} ref={newEditNameElement}/>
                            <br/>
                            <Button size="sm" variant="outline-info" onClick={() => {
                                editModeOn(false)
                            }}> Отмена </Button>

                        </div>
                        : ""}
                </div>
                <div>
                    {props.editModeName ? <div className={s.newElementInputs}>
                        <div>
                            <div>Введите название:</div>
                            <div>Введите количество:</div>
                            <div>Введите цену:</div>
                        </div>
                        <div>
                            <input onChange={onNameChange} ref={newNameElement}/>
                            <input onChange={onCountChange} ref={newCountElement}/>
                            <input onChange={onPriceChange} ref={newPriceElement}/>

                        </div>
                    </div> : ""}
                    <div>
                        {props.editModeName ? <div>
                                <Button className={s.addButton} size="sm" variant="outline-success" onClick={() => {
                                    onAddItem()
                                }}>Добавить</Button>
                                <Button size="sm" variant="outline-info" onClick={() => {
                                    props.setEditModeName(false)
                                }}>Отмена</Button></div> :
                            <Button variant="outline-info" onClick={() => {
                                props.setEditModeName(true)

                            }}>Добавить товар</Button>}</div>
                </div>


            </div>
        </div>
    );


}
let mapStateToProps = (state) => ({
    items: state.itemsPage.items,
    newItemText: state.itemsPage.newItemText,
    rows: state.itemsPage.rows,
    newItemPrice: state.itemsPage.newItemPrice,
    newItemName: state.itemsPage.newItemName,
    newItemCount: state.itemsPage.newItemCount,
    total: state.itemsPage.total,
    editMode: state.itemsPage.editMode,
    name: state.itemsPage.name,
    editModeName: state.itemsPage.editModeName,


})
export default compose(
    connect(mapStateToProps, {
        AddRowAction, updateNewName, updateNewCount,
        updateNewPrice, updateTotal, deleteRow, setEditMode, editName, SaveEditName, addCount,
        deleteCount, setEditModeName
    })
)(ItemsTable);


