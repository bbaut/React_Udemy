import { useState, useEffect } from 'react';
import Message from './Message';
import CloseIcon from '../img/cerrar.svg' 

const Modal = ({
    setModal, 
    animateModal, 
    setAnimateModal, 
    saveExpense, 
    expenseEdit,
    setExpenseEdit
}) => {

    const [message, setMessage]  = useState('')
    const[name, setName] = useState('');
    const[amount, setAmount] = useState('');
    const[type, setType] = useState('');
    const[date, setDate] = useState('');
    const[id, setId] = useState('');

    useEffect(() => {
        if( Object.keys(expenseEdit).length > 0){
            setName(expenseEdit.name);
            setAmount(expenseEdit.amount);
            setType(expenseEdit.type);
            setId(expenseEdit.id);
            setDate(expenseEdit.date);
        }
    }, [])

    const hideModal = () => {
        setAnimateModal(false);
        setExpenseEdit({})
        setTimeout(() => {
            setModal(false);
        }, 250)
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([name, amount, type].includes('')){
            setMessage('All fields required');
            setTimeout(() => {
                setMessage('');
            },2000)
            return
        }

        saveExpense({name, amount, type, id, date})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CloseIcon} 
                    alt="close modal" 
                    onClick={hideModal}
                />
            </div>

            <form 
                className={`formulario ${animateModal ? "animar" : "cerrar"}`}
                onSubmit={handleSubmit}
            >
                <legend>{expenseEdit.name ? 'Edit expense' : 'New expense'}</legend>
                {message && <Message type="error">{message}</Message>}

                <div className='campo'>
                    <label htmlFor="expense">Expense</label>

                    <input 
                        id="expense"
                        type="text" 
                        placeholder='Add expense'
                        value={name}
                        onChange = {e => setName(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="amount">Amount</label>

                    <input 
                        id="amount"
                        type="number" 
                        placeholder='Add amount'
                        value={amount}
                        onChange = {e => setAmount(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="type">Type</label>

                    <select 
                        id="type"
                        value={type}
                        onChange = {e => setType(e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="saved">Saved</option>
                        <option value="food">Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="home">Home</option>
                        <option value="insurance">Insurance</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <input 
                    type="submit"
                    value={expenseEdit.name ? 'Save changes' : 'Add expense'}
                />
            </form>
        </div>
    )
}

export default Modal