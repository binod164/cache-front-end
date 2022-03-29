import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import './BudgetCategoryCards.css'
import HomeIcon from '@mui/icons-material/Home';

export default function HousingProgressBar(props) {
  const [progress, setProgress] = useState(0);

  let percentSpent = props.totalHousingExpense / props.currentBudget.housingLimit * 100

  useEffect(() => {
    setProgress(percentSpent)
  }, [percentSpent])
  

  return (
    <div className='budget-cat-card-container'>
    <HomeIcon className='budget-cat-card-icon'/>
    <p className='budget-cat-card-title'>Housing</p>
    <div className='budget-progress-container'>
      <LinearProgress variant="determinate" value={progress} sx={{height: 15}} />
    </div>
    {progress >= 100 ? 
    <p className='budget-status-msg'>You've exceeded your budget</p>
    :
    <p className='budget-status-msg'>Your spending is on track</p>
    }
    </div> 
  );
}