import { useState } from 'react'
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

const App = () => {
  const [incomes, setIncomes,] = useState([])
  const [goals, setGoals] = useState([])
  const [expenses, setExpenses] = useState([])
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleAddIncome = newIncomeData => {
    setIncomes([...incomes, newIncomeData])
  } 

  const handleAddExpense = newExpenseData => {
    setExpenses([...expenses, newExpenseData])
  } 

  const handleAddGoal = newGoalData => {
    setGoals([...goals, newGoalData])
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
        <Route path='/add-budget' element={<AddBudget />} />
        <Route path='/add-goal' element={<AddGoal handleAddGoal={handleAddGoal} />} />   

        </Routes>
    </>
  )
}

export default App
