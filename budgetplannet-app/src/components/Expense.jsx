import React from 'react'
import {
    LeadingActions, 
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatDate } from '../helpers';
import savedIcon from '../img/icono_ahorro.svg'
import homeIcon from '../img/icono_casa.svg'
import foodIcon from '../img/icono_comida.svg'
import otherIcon from '../img/icono_gastos.svg'
import entertainmentIcon from '../img/icono_ocio.svg'
import insuranceIcon from '../img/icono_salud.svg'

const iconsDictionary = {
    saved: savedIcon,
    food: foodIcon,
    entertainment: entertainmentIcon,
    home: homeIcon,
    insurance: insuranceIcon,
    other: otherIcon
}

const Expense = ({expense, setExpenseEdit, deleteExpense}) => {
    const {type, name, amount, id, date} = expense;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={()=> setExpenseEdit(expense)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
       <TrailingActions>
            <SwipeAction 
                onClick={() => deleteExpense(id)}
                destructive={true}
            >
                Delete
            </SwipeAction>
       </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                        <img 
                            src={iconsDictionary[type]} 
                            alt="Expense icon" 
                        />
                        <div className='descripcion-gasto'>
                            <p className='categoria'>{type}</p>
                            <p className='nombre-gasto'>{name}</p>
                            <p className='fecha-gasto'>
                                Add on: {''}
                                <span>{formatDate(date)}</span>
                            </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>${amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expense