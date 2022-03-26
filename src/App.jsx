import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import AddIncomeExpense from './pages/AddIncomeExpense/AddIncomeExpense'
import AddIncome from './pages/AddIncome/AddIncome'
import AddExpense from './pages/AddExpense/AddExpense'
import AddBudget from './pages/AddBudget/AddBudget'
import AddGoal from './pages/AddGoal/AddGoal'
import * as goalService from './services/goals'
import * as expenseService from './services/expenses'
import * as budgetService from './services/budgets'
import * as incomeService from './services/incomes'
import Transactions from './pages/Transactions/Transactions'

const App = () => {
  const [incomes, setIncomes] = useState([])
  const [goals, setGoals] = useState([])
  const [expenses, setExpenses] = useState([])
  const [budgets, setBudgets] = useState([])

  const [user, setUser] = useState(authService.getUser())

  const navigate = useNavigate()

  const handleDeleteIncome = id => {
    incomeService.deleteOne(id)
    .then(deletedIncome => setIncomes(incomes.filter(income => income._id !== deletedIncome._id)))
    
  }

  const handleDeleteExpense = id => {
    expenseService.deleteOne(id)
    .then(deletedExpense => setExpenses(expenses.filter(expense => expense._id !== deletedExpense._id)))
    
  }

  useEffect(() => {
    incomeService.getAll()
    .then(allIncomes => setIncomes(allIncomes))
  }, [])

  useEffect(() => {
    expenseService.getAll()
    .then(allExpenses => setExpenses(allExpenses))
  }, [])

  useEffect(() => {
    budgetService.getAll()
    .then(allBudgets => setBudgets(allBudgets))
  }, [])

  const handleAddIncome = newIncomeData => {
    incomeService.create(newIncomeData)
    .then(newIncome => setIncomes([...incomes, newIncome]))
  } 

  const handleAddExpense = newExpenseData => {
    expenseService.create(newExpenseData)
    .then(newExpense => setExpenses([...expenses, newExpense]))
  } 

  const handleAddGoal = newGoalData => {
    setGoals([...goals, newGoalData])
  } 

  const handleAddBudget = newBudgetData => {
    budgetService.create(newBudgetData)
    .then(newBudget => setBudgets([...budgets, newBudgetData]))
  } 

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
        />
        <Route path="/add" element={<AddIncomeExpense />}/>

        <Route path='/add-income' element={<AddIncome handleAddIncome={handleAddIncome} />} />
        <Route path='/add-expense' element={<AddExpense handleAddExpense={handleAddExpense} />} />  
        <Route path='/add-budget' element={<AddBudget handleAddBudget={handleAddBudget} />} />
        <Route path='/add-goal' element={<AddGoal handleAddGoal={handleAddGoal} />} />   
        <Route path='/transactions' element={
        <Transactions 
        incomes={incomes} handleDeleteIncome={handleDeleteIncome} 
        expenses={expenses} handleDeleteExpense={handleDeleteExpense}/>} 
        />  

        </Routes>
    </>
  )
}

export default App
