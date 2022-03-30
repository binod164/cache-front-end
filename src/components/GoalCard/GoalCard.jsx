import { Link } from 'react-router-dom'
import './GoalCard.css'
import ClearIcon from '@mui/icons-material/Clear';
import SavingsIcon from '@mui/icons-material/Savings';
import GoalProgressBar from '../GoalProgressBar/GoalProgressBar'

function GoalCard ({goal, handleDeleteGoal, user}) {
  return ( 
    <>
    {goal.owner._id === user.profile ?
    <div className='goal-container'>
      <SavingsIcon className='savings-icon' fontSize='large' />
      <p className='goal-name'>{goal.name}</p>
      <div className='goal-progress-container'>
        <GoalProgressBar goal={goal} className='goal-progress' />
      </div>
      <p className='goal-current-amount'>Current Amount: {goal.currentAmount}</p>
      <p className='goal-amount'>Goal Target: {goal.amount}</p>
      <div className='delete-goal-btn-container'>
      <button className='delete-goal-btn' onClick={() => handleDeleteGoal(goal._id)}><ClearIcon fontSize='small' /></button>
      </div>
      <div className='edit-goal-link-container'>
      <Link to='/edit-goal' state={{goal}} className='edit-goal-link'>Edit</Link>
      </div>
    </div>
    :
    <p></p>
  }
    </>
  );
}

export default GoalCard;