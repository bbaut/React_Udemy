import React from 'react'
import NewBudget from './NewBudget.jsx'
import BudgetControl from './BudgetControl.jsx'

const Header = ({
    budget, 
    setBudget, 
    isValidBudget, 
    setIsValidBudget,
    expenses,
    setExpenses
}) => {
  return (
    <header>
        <h1>Budget planner</h1>

        {isValidBudget ? (
            <BudgetControl 
                budget={budget}
                expenses={expenses}
                setExpenses={setExpenses}
                setBudget={setBudget}
                setIsValidBudget={setIsValidBudget}
            />
        ) : (
            <NewBudget
                budget={budget}
                setBudget={setBudget}
                setIsValidBudget={setIsValidBudget}
            />
        )}
    </header>
  )
}

export default Header