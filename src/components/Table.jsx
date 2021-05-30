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
    AddRowAction,
    deleteCount,
    deleteRow,
    editName,
    SaveEditName, SaveEditPrice,
    setEditMode,
    setEditModeId, setEditModeIdPrice,
    setEditModeName, setEditModePrice, setListDescDown, setListDescUp, setListPriceDown, setListPriceUp,
    updateNewCount,
    updateNewName,
    updateNewPrice,
    updateRows,
    updateTotal,
    updateTotalCount
} from "../redux/items-reducer";
import {Button, Card} from "react-bootstrap";
import s from './styles.module.css';
import {Field, Form} from "react-final-form";


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});




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
    let saveEditName = (id, name) => {
        if (props.editMode)
            props.SaveEditName(id, name)
    }
    let deleteCount = (id, count, total) => {
        props.deleteCount(id, count, total)
    }

    useEffect(() => {

        props.updateTotal();


    },);
    const onSubmit = (values) => {
        props.updateNewName(values.username)
        props.updateNewCount(values.password)
        props.updateNewPrice(values.confirm)
        props.AddRowAction(props.newItemName, props.newItemCount, props.newItemPrice)
    }
    const onSubmitDesc = (values) => {
        props.updateNewName(values.changeDesc)
        saveEditName()
    }
     const onSubmitPrice = (values) => {
            props.updateNewPrice(values.changePrice)
            saveEditName()
        }



    return (<div className={s.wrapper}>

           
            <div>
            <TableContainer component={Paper}>

                <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Упорядочить по</TableCell>
                            <TableCell><button type="button" class="btn btn-outline-secondary btn-sm" onClick={() => {
                                props.setListDescUp()
                                props.updateRows()
                            }}>Названию А-я</button><button type="button" class="btn btn-outline-secondary btn-sm" onClick={() => {
                                props.setListDescDown()
                                props.updateRows()
                            }} >Названию Я-а</button></TableCell>
                            <TableCell></TableCell>
                            <TableCell><button type="button" class="btn btn-outline-secondary btn-sm" onClick={() => {
                                props.setListPriceDown()
                                props.updateRows()
                            }}>Цене: убыванию</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm" onClick={() => {
                                props.setListPriceUp()
                                props.updateRows()
                            }}>Цене: возрастанию</button></TableCell>
                            <TableCell></TableCell>


                        </TableRow>
                        <TableRow>
                            <TableCell >id</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell align="right">Количетсво</TableCell>
                            <TableCell align="right">Цена за 1 единицу</TableCell>
                            <TableCell align="right">Сумма</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>
                                    {(props.editMode == true) && (props.editModeId == row.id)
                                        ? <Form
                                            onSubmit={onSubmitDesc}
                                            validate={values => {
                                                const errors = {}
                                                if (!values.changeDesc) {
                                                    errors.changeDesc = 'Вы не ввели название.'
                                                }
                                                return errors
                                            }}
                                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <Field name="changeDesc">
                                                        {({ input, meta }) => (
                                                            <span>
                                                            <span>
                                                                <input className={s.Inputs} {...input} type="text" placeholder={row.desc} />
                                                                {meta.error && meta.touched && <div className={s.validate}>{meta.error}</div>}
                                                            </span>
                                                            <button className={s.changeButtons} onClick={() => {
                                                                saveEditName(row.id, values.changeDesc)
                                                                props.setEditMode(false)
                                                                }
                                                            } type="submit" disabled={submitting || pristine}>
                                                            ✔
                                                            </button>
                                                                <button className={s.changeButtons} onClick={() => {
                                                                props.setEditMode(false)
                                                            }
                                                            }>
                                                                ×
                                                            </button>
                                                            </span>
                                                        )}
                                                    </Field>

                                                </form>
                                            )}
                                        />
                                        : <a className={s.desc} title={"Нажмите чтобы изменить"} onClick={() => {
                                            editModeOn(true)
                                            props.setEditModeId(row.id)
                                        }}>
                                            {row.desc}
                                        </a>
                                    }
                                </TableCell>


                                <TableCell >
                                    <button className={s.floatingButtonRed}
                                            onClick={
                                                () => {
                                                    if (row.count > 0) {
                                                        deleteCount(row.id, row.count - 1)
                                                        props.updateTotalCount(row.id)
                                                    }

                                                }}
                                    >-</button> {row.count} <button className={s.floatingButtonGreen} onClick={
                                    () => {
                                        props.addCount(row.id, row.count + 1)
                                        props.updateTotalCount(row.id)

                                    }}>+</button></TableCell>

                                <TableCell align="right">{(props.editModePrice == true) && (props.editModeIdPrice == row.id) ?
                                    <Form
                                        onSubmit={onSubmitPrice}
                                        validate={values => {
                                            const errors = {}
                                            if (!values.changePrice) {
                                                errors.changePrice = 'Вы не ввели цену.'
                                            }
                                            return errors
                                        }}
                                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                                            <form onSubmit={handleSubmit}>
                                                <Field name="changePrice">
                                                    {({ input, meta }) => (
                                                        <span>
                                                            <span>
                                                                <input className={s.Inputs} {...input} type="text" placeholder={row.price} />
                                                                {meta.error && meta.touched && <div className={s.validate}>{meta.error}</div>}
                                                            </span>
                                                            <button className={s.changeButtons} onClick={() => {
                                                                props.SaveEditPrice(row.id, values.changePrice)
                                                                props.updateTotalCount(row.id)
                                                                props.setEditModePrice(false)
                                                            }
                                                            } type="submit" disabled={submitting || pristine}>
                                                           ✔
                                                            </button> <button className={s.changeButtons} onClick={() => {
                                                            props.setEditModePrice(false)
                                                        }
                                                        }>
                                                                ×
                                                            </button>
                                                            </span>
                                                    )}
                                                </Field>

                                            </form>
                                        )}
                                    />
                                    :
                                    <a className={s.desc} onClick={() => {
                                    props.setEditModePrice(true)
                                    props.setEditModeIdPrice(row.id)
                                }
                                }> {row.price}</a>}</TableCell>


                                <TableCell align="right">{row.total.toFixed(2)}</TableCell>
                                <div className={s.deleteButtonDiv}><a className={s.deleteButton}  onClick={() => {
                                    onDeleteItem(row.id)

                                }}>🗑</a></div>
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
        </div>
            <div className={s.constructor}>
                <Form
                        onSubmit={onSubmit}
                        validate={values => {
                            const errors = {}
                            if (!values.username) {
                                errors.username = 'Вы не ввели название.'
                            }
                            if (!values.password) {
                                errors.password = 'Вы не ввели количетсво.'
                            }
                            if (isNaN(values.password)) {
                                errors.password = 'Нельзя вводить текст'
                            }
                            if (!values.confirm) {
                                errors.confirm = 'Вы не ввели цену.'
                            }
                            if (isNaN(values.confirm)) {
                                errors.confirm = 'Нельзя вводить текст'
                            }
                            return errors
                        }}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                                <Field name="username">
                                    {({ input, meta }) => (
                                        <div>
                                            <input className={s.Inputs} {...input} type="text" placeholder="Введите название" />
                                            {meta.error && meta.touched && <div className={s.validate}>{meta.error}</div>}
                                        </div>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ input, meta }) => (
                                        <div>
                                            <input className={s.Inputs} {...input} type="text" placeholder="Введите количество" />
                                            {meta.error && meta.touched && <div className={s.validate}>{meta.error}</div>}
                                        </div>
                                    )}
                                </Field>
                                <Field name="confirm">
                                    {({ input, meta }) => (
                                        <div>
                                            <input className={s.Inputs} {...input} type="text" placeholder="Введите цену" />
                                            {meta.error && meta.touched && <div className={s.validate}>{meta.error}</div>}
                                        </div>
                                    )}
                                </Field>
                                <div className="buttons">
                                    <Button type="submit" disabled={submitting}>
                                        Добавить товар
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Очистить
                                    </Button>
                                </div>
                            </form>
                        )}
                    />
                </div>





        </div>
    );


}
let mapStateToProps = (state) => ({
    items: state.itemsPage.items,
    newItemText: state.itemsPage.newItemText,
    rows: state.itemsPage.rows,
    rows2: state.itemsPage.rows2,
    newItemPrice: state.itemsPage.newItemPrice,
    newItemName: state.itemsPage.newItemName,
    newItemCount: state.itemsPage.newItemCount,
    total: state.itemsPage.total,
    editMode: state.itemsPage.editMode,
    name: state.itemsPage.name,
    editModeName: state.itemsPage.editModeName,
    editModeId: state.itemsPage.editModeId,
    editModeIdPrice: state.itemsPage.editModeIdPrice,
    editModePrice: state.itemsPage.editModePrice,


})
export default compose(
    connect(mapStateToProps, {
        AddRowAction, updateNewName, updateNewCount,
        updateNewPrice, updateTotal, deleteRow, setEditMode, editName, SaveEditName, addCount,
        deleteCount, setEditModeName, updateRows, updateTotalCount, setEditModeId,
        setEditModeIdPrice, SaveEditPrice, setEditModePrice, setListPriceUp,
        setListPriceDown, setListDescUp, setListDescDown
    })
)(ItemsTable);


