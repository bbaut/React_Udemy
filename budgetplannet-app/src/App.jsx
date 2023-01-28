import { useState, useEffect } from 'react'
import Header from './components/Header'
import Searchs from './components/Searchs';
import Modal from './components/Modal';
import ExpensesList from './components/ExpensesList';
import { createId } from './helpers';
import AddIcon from './img/nuevo-gasto.svg'

function App() {

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);

  const[modal, setModal] = useState(false);
  const[animateModal, setAnimateModal] = useState(false);

  const[expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  ); 

  const[expenseEdit, setExpenseEdit] = useState({});
  
  const[search, setSearch] = useState('');
  const[searchedExpenses, setSearchedExpenses] = useState([]);

  useEffect(() => {
    if(Object.keys(expenseEdit).length > 0){
      setModal(true);

      setTimeout(() => {
        setAnimateModal(true);
      }, 250)
    }
  }, [expenseEdit])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  },[budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(()=>{
    if(search){
      const expensesSearched = expenses.filter(expense => expense.type === search);

      setSearchedExpenses(expensesSearched);
    }
  },[search])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;

    if(budgetLS > 0) {
      setIsValidBudget(true);
    }
  }, [])

  const handAddIcon = () => {
    setModal(true);
    setExpenseEdit({});

    setTimeout(() => {
      setAnimateModal(true);
    }, 250)
  }

  const saveExpense = expense => {
    if(expense.id) {
      // Update
      const expensesUpdated = expenses.map(expenseState => expenseState.id === expense.id ? expense : expenseState)
      setExpenses(expensesUpdated);
    } 
    else {
      // New expense 
      expense.id = createId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
      setExpenseEdit({});
    }

    setAnimateModal(false);
        setTimeout(() => {
            setModal(false);
        }, 250)
  }

  const deleteExpense = id => {
    const expensesUpdated = expenses.filter(expense => expense.id !== id);
    setExpenses(expensesUpdated);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      {isValidBudget && (
        <>
          <main>
            <Searchs
              search={search} 
              setSearch={setSearch}
            />
            <ExpensesList 
              expenses={expenses}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
              search={search}
              searchedExpenses={searchedExpenses}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={AddIcon} 
              alt="Add icon" 
              onClick={handAddIcon}
            />
          </div>
        </>
      )}

      {modal && <Modal 
                  setModal={setModal} 
                  animateModal={animateModal} 
                  setAnimateModal={setAnimateModal}
                  saveExpense={saveExpense}
                  expenseEdit={expenseEdit}
                  setExpenseEdit={setExpenseEdit}
                />}

    </div>
  )
}

export default App
