import { useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const BudgetControl = ({
    budget, 
    expenses,
    setExpenses,
    setBudget,
    setIsValidBudget
}) => {

    const [percentage, setPercentage] = useState(0)
    const [available, setAvailable] = useState(0);
    const [expensed, setExpensed] = useState(0);

    useEffect(() => {
        const totalExpensed = expenses.reduce((total, expense) => expense.amount + total, 0)
        const totalAvailable = budget - totalExpensed;

        //Compute the percentage

        const newPercentage = (((budget - totalAvailable) / budget)*100).toFixed(2);

        setAvailable(totalAvailable);
        setExpensed(totalExpensed);

        setTimeout(() => {
            setPercentage(newPercentage);
        }, 1000);

    },[expenses])

    const formatAmount = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const result = confirm('Do you really want to reset the app?');

        if(result) {
            setExpenses([]);
            setBudget(0);
            setIsValidBudget(false);
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={percentage}
                    text={`${percentage}% Expense`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button 
                    className='reset-app' 
                    type='button'
                    onClick={handleResetApp}
                >
                    Reset app
                </button>
                <p>
                    <span>Balance: </span> {formatAmount(budget)}
                </p>
                <p className={`${available < 0 ? 'negativo' : ''}`}>
                    <span>Available: </span> {formatAmount(available)}
                </p>
                <p>
                    <span>Expended: </span> {formatAmount(expensed)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl