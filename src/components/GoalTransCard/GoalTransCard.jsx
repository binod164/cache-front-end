import { Link } from 'react-router-dom'
import './GoalTransCard.css'


function GoalTransCard ({goal,user}) {
  return ( 
    <>
    {goal.owner._id === user.profile && goal.currentAmount > 0 ?
    <div className='goal-container'>
      <p className='name'>{goal.name}</p>
      <p className='amount'>Savings: - ${goal.currentAmount}</p>
    </div>
    :
    <p></p>
  }
    </>
  );
}

export default GoalTransCard;