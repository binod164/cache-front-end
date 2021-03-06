import GoalCard from "../../components/GoalCard/GoalCard";
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import '../../components/GoalCard/GoalCard.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const GoalPage = (props) => {
  return ( 
    <>
      <nav className='budget-header-nav'>
        <div className='user-icon-container'>
          <AccountCircleIcon fontSize="medium" className="user-icon" /> {props.user.name}
        </div>
        <h3 className="goal-pg-title">Goals</h3>
        <Link className='logout-link' to="/" onClick={props.handleLogout}><LogoutIcon fontSize="medium"/> </Link>
      </nav>
      <div className="goal-pg-background">
        <div className="add-goal-link-container">
          <Link className="add-goal-link" to="/add-goal">Add Goal<AddIcon fontSize="large" /></Link>
        </div>
        <h3 className='goal-subtitle'>Track and see your progress towards short and long- term savings goals</h3>
        <div>
          {props.goals.map(goal => (
            <GoalCard user={props.user} key={goal._id} goal={goal} handleDeleteGoal={props.handleDeleteGoal} />
          ))}
        </div>
      </div>   
    </>
  );
}

export default GoalPage;