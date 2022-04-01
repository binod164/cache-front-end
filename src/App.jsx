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
import Budget from './pages/Budget/Budget'
import EditBudget from './pages/EditBudget/EditBudget'
import Goals from './pages/Goals/Goals'
import EditGoal from './pages/EditGoal/EditGoal'
import 'chart.js/auto';


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

  const handleDeleteGoal = id => {
    goalService.deleteOne(id)
    .then(deletedGoal => setGoals(goals.filter(goal => goal._id !== deletedGoal._id)))
  }

  const handleDeleteBudget = id => {
    budgetService.deleteOne(id)
    .then(deletedBudget => setBudgets(budgets.filter(budget => budget._id !== deletedBudget._id)))
  }

  const handleUpdateBudget = updatedBudgetData => {
    budgetService.update(updatedBudgetData)
    .then(updatedBudget => {
      const newBudgetsArray = budgets.map(budget => 
        budget._id === updatedBudget._id ? updatedBudget : budget
      )
      setBudgets(newBudgetsArray)
      navigate('/budgets')
    })
  }

  const handleUpdateGoal = updatedGoalData => {
    goalService.update(updatedGoalData)
    .then(updatedGoal => {
      const newGoalsArray = goals.map(goal => 
        goal._id === updatedGoal._id ? updatedGoal : goal
      )
      setGoals(newGoalsArray)
      navigate('/goals')
    })
  }

  useEffect(() => {
    if(user) {
    incomeService.getAll()
    .then(allIncomes => setIncomes(allIncomes))
    expenseService.getAll()
    .then(allExpenses => setExpenses(allExpenses))
    budgetService.getAll()
    .then(allBudgets => setBudgets(allBudgets))
    goalService.getAll()
    .then(allGoals => setGoals(allGoals))
    }
  }, [user])

  const handleAddIncome = newIncomeData => {
    incomeService.create(newIncomeData)
    .then(newIncome => setIncomes([...incomes, newIncome]))
    navigate('/transactions')
  } 

  const handleAddExpense = newExpenseData => {
    expenseService.create(newExpenseData)
    .then(newExpense => setExpenses([...expenses, newExpense]))
    navigate('/transactions')
  } 

  const handleAddGoal = newGoalData => {
    goalService.create(newGoalData)
    .then(newGoal => setGoals([...goals, newGoal]))
    navigate('/goals')
  }

  const handleAddBudget = newBudgetData => {
    budgetService.create(newBudgetData)
    .then(newBudget => 
      setBudgets([...budgets, newBudget]))
      navigate('/budgets')
  } 

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  let totalIncome = incomes.reduce(function(prev, income){
    if (income.owner._id === user?.profile) {
    prev = prev + income.amount
    }
    return prev
  }, 0)


  let totalExpense = expenses.reduce(function(prev, expense){
    if (expense.owner._id === user?.profile) {
    prev = prev + expense.amount
    }
    return prev
  }, 0)

  let healthExpense = expenses.reduce(function(prev, expense){
    if (expense.owner._id === user?.profile) {
      if(expense.category.includes("Health")){
        prev = prev + expense.amount
      }
    }
    return prev
  }, 0)
  
  let housingExpense = expenses.reduce(function(prev, expense){
    if (expense.owner._id === user?.profile) {
      if(expense.category.includes("Housing")){
        prev = prev + expense.amount
      }
    }
    return prev
  }, 0)

  let groceryExpense = expenses.reduce(function(prev, expense){
    if (expense.owner._id === user?.profile) {
      if(expense.category.includes("Grocery")){
        prev = prev + expense.amount
      }
    }
    return prev
  }, 0)

  let billsExpense = expenses.reduce(function(prev, expense){
    if (expense.owner._id === user?.profile) {
      if(expense.category.includes("Bills")){
        prev = prev + expense.amount
      }
    }
    return prev
  }, 0)

  let travelExpense = expenses.reduce(function(prev, expense){
    if (expense.owner._id === user?.profile) {
      if(expense.category.includes("Travel")){
        prev = prev + expense.amount
      }
    }
    return prev
  }, 0)

  let otherExpense = expenses.reduce(function(prev, expense){
    if (expense.owner._id === user?.profile) {
      if(expense.category.includes("Other")){
        prev = prev + expense.amount
      }
    }
    return prev
  }, 0)

  let totalSavings = goals.reduce(function(prev, goal){
    if (goal.owner._id === user?.profile) {
        prev = prev + goal.currentAmount
    }
    return prev
  }, 0)


  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing
        handleLogout={handleLogout} 
        user={user}
        budgets={budgets}
        totalExpense={totalExpense} 
        healthExpense={healthExpense}
        housingExpense={housingExpense}
        groceryExpense={groceryExpense}
        billsExpense={billsExpense}
        travelExpense={travelExpense}
        otherExpense={otherExpense}
        />} />
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
        <Route path="/add" element={user ? <AddIncomeExpense /> : <Navigate to="/login" />}
        />
        <Route path='/add-income' element= {user ? <AddIncome handleAddIncome={handleAddIncome} /> : <Navigate to='/login' />} 
        />
        <Route path='/add-expense' element= {user ? <AddExpense handleAddExpense={handleAddExpense} /> : <Navigate to='/login' />} 
        />  
        <Route path='/add-budget' element={user ? <AddBudget handleAddBudget={handleAddBudget} /> : <Navigate to='/login' />} 
        />
        <Route path='/add-goal' element={user ? <AddGoal handleAddGoal={handleAddGoal} /> : <Navigate to='/login' />} 
        />  
        <Route path='/transactions' element={user ?
        <Transactions 
        handleLogout={handleLogout}
        user={user} 
        incomes={incomes} handleDeleteIncome={handleDeleteIncome} 
        expenses={expenses} handleDeleteExpense={handleDeleteExpense}
        totalExpense={totalExpense} totalIncome={totalIncome} totalSavings={totalSavings} goals={goals}
        /> : <Navigate to='/login' />} 
        />  
        <Route path='/budgets' element={user ? <Budget 
          handleLogout={handleLogout}
          budgets={budgets} 
          handleDeleteBudget={handleDeleteBudget} 
          user={user}
          totalExpense={totalExpense} 
          healthExpense={healthExpense}
          housingExpense={housingExpense}
          groceryExpense={groceryExpense}
          billsExpense={billsExpense}
          travelExpense={travelExpense}
        /> : <Navigate to='/login' />} 
        /> 
        <Route path='/edit-budget' element={ user ? <EditBudget handleUpdateBudget={handleUpdateBudget} user={user} /> : <Navigate to="/login" />} 
        /> 
        <Route path='/goals' element={ user ? <Goals handleLogout={handleLogout} goals={goals} user={user} handleDeleteGoal={handleDeleteGoal}/> : <Navigate to="/login" /> } 
        />
        <Route path='/edit-goal' element={ user ? <EditGoal  user={user} handleUpdateGoal={handleUpdateGoal}/> : <Navigate to="/login" />} 
        />
      </Routes>
    </>
  )
}

export default App
