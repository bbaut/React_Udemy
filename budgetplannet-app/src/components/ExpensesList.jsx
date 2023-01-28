import React from 'react'
import Expense from './Expense'

const ExpensesList = ({
    expenses, 
    setExpenseEdit, 
    deleteExpense,
    search,
    searchedExpenses
}) => {
    return (
        <div className='listado-gastos contenedor'>

            {
                search ? (
                    <>
                        <h2>{searchedExpenses.length ? 'Expenses' : 'No expenses of this type'}</h2>
                        {searchedExpenses.map((expense) => (
                            <Expense 
                                key={expense.id}
                                expense={expense}
                                setExpenseEdit={setExpenseEdit}
                                deleteExpense={deleteExpense}
                            />
                        ))}
                    </>
                ) : (
                    <>
                    <h2>{expenses.length ? 'Expenses' : 'No expenses yet'}</h2>
                    {expenses.map((expense) => (
                        <Expense 
                            key={expense.id}
                            expense={expense}
                            setExpenseEdit={setExpenseEdit}
                            deleteExpense={deleteExpense}
                        />
                    ))}
                    </>
                )
            }
        </div>
    )
}

export default ExpensesList