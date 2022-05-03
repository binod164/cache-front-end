import DoughnutChart from '../../components/DoughnutChart/DoughnutChart'
import '../../components/Header/Header.css'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const Landing = (props) => {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const d = new Date()
  let currentMonth = month[d.getMonth()]
  let hasBudget = props?.budgets?.some((budget) => budget.month === currentMonth)
  let totalLimit = props?.budgets[props.budgets.length-1]?.totalLimit

  return (
    <>
      {props.user ?
        <main>
          <>
            <nav className='header-nav'>
              <div className='user-icon-container'>
                <AccountCircleIcon fontSize="medium" className="user-icon" /> {props.user.name}
              </div>
              <h3 className='title' >Spending Overview</h3>
              <Link className='logout-link' to="/" onClick={props.handleLogout}><LogoutIcon fontSize="medium"/> </Link>
            </nav>
          </>
          {hasBudget ?
            <h3 className='remaining-budget-msg'>You have ${totalLimit - props.totalExpense} remaining in your budget</h3>
            :
            <h3 className='remaining-budget-msg'>No budget found, create one 
              <Link to="/add-budget"> here</Link> 
            </h3>
          }
            <div>
              <DoughnutChart 
              totalExpense={props.totalExpense} 
              healthExpense={props.healthExpense}
              housingExpense={props.housingExpense}
              groceryExpense={props.groceryExpense}
              billsExpense={props.billsExpense}
              travelExpense={props.travelExpense}
              otherExpense={props.otherExpense}
              />
            </div>
        </main>
        :
        <main className='guest-landing'>     
          <div className='logo-container'>
            <img className="cache-logo" src="cache-logo.png" alt='cache logo'></img>
          </div> 
          <div className='landing-intro-container'>
          <h4 className='landing-intro'>Experience an easy way to manage your money.</h4>
          </div>      
          <p className='title-nouser'>
            <Link className='login-link' to="/login"> Log In</Link> or 
            <Link className='login-link' to="/signup"> Sign Up</Link> to get started
          </p> 
        </main>           
      }
    </> 
  )
}

export default Landing
