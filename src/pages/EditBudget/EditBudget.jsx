import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from 'react-router-dom'

const EditBudget = (props) => {
  const formElement = useRef()

  const location = useLocation()

  const [formData, setFormData] = useState(location.state.budget)

  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  const [validForm, setValidForm] = useState(true)

  useEffect(() => {
      formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
    }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleUpdateBudget(formData)

  }  


  return (
    <>
      <h1>Edit Budget</h1>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="form-group mb-4">
					<label htmlFor="total-input" className="form-label">
						Total Limit
					</label>
					<input 
						type="number"
						className="form-control"
						id="total-input"
						name="totalLimit"
            value={formData.totalLimit} 
            onChange={handleChange}
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="budget-input" className="form-label">
						Budget Category (required)
					</label>
					<select name="category"  value={formData.category} onChange={handleChange} >
            <option name="Health">Health</option>
            <option name="Housing">Housing</option>
            <option name="Grocery">Grocery</option>
            <option name="Bills">Bills</option>
            <option name="Travel">Travel</option>
            <option name="Other">Other</option>
          </select>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="categorytotal-input" className="form-label">
						Category Limit (required)
					</label>
					<input 
						type="number"
						className="form-control"
						id="categorytotal-input"
						name="categoryLimit"
            value={formData.categoryLimit} 
            onChange={handleChange}
						required
					/>
				</div>
        <div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
					>
						Edit Budget
					</button>
				</div>
			</form>
    </>
    );
}

export default EditBudget;