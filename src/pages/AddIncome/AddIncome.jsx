import { useState, useRef, useEffect } from "react";
import './AddIncome&Expense.css'
import ListRoundedIcon from '@mui/icons-material/ListRounded';

const AddIncome = (props) => {
  const formElement = useRef()

  const [validForm, setValidForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    amount: 0, 
    date: new Date().toLocaleDateString()
  })

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddIncome(formData)
  }

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  return (  
    <main>
    <h1 className="category-title">Add Income</h1>
    <form autoComplete="off" ref={formElement} onSubmit={handleSubmit} >
				<div className="container">
					<label htmlFor="category-input" className="form-label">
						Category:
					</label>
					<input 
						maxLength={18}
						placeholder="Category"
						type="text"
						className="input"
						id="category-input"
						name="name"
            value={formData.category}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="container">
					<label htmlFor="amount-input" className="form-label">
						Amount:
					</label>
					<input 
						min={1}
						max={100000}
						placeholder="Amount"
						type="number"
						className="input"
						id="amount-input"
						name="amount"
            value={formData.amount}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="container">
					<label htmlFor="date-input" className="form-label">
						Date:
					</label>
					<input 
						type="date"
						className="input"
						id="date-input"
						name="date"
            value={formData.date}
            onChange={handleChange}
					/>
				</div>
				<div className="container">
					<button
						type="submit"
						className="add-btn"
            disabled={!validForm}
					>
						Add Income
					</button>
				</div>
			</form>
		</main>
  );
}
 
export default AddIncome;