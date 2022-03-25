import { useState, useRef, useEffect } from "react"

function AddGoal(props) {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
  })

  useEffect(()=> {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    evt.preventDefault()
		// const goalFormData = new FormData()
    // goalFormData.append('name', formData.name)
    // goalFormData.append('amount', formData.amount)
    props.handleAddGoal(formData)
  }

  return (
    <>
      <h1>Add Goal</h1>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="name-input" className="form-label">
						Goals's Name (required)
					</label>
					<input 
						type="text"
						className="form-control"
						id="name-input"
						name="name"
            value={formData.name}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="amount-input" className="form-label">
						Goal Amount (required)
					</label>
					<input 
						type="number"
						className="form-control"
						id="amount-input"
						name="amount"
            value={formData.amount}
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
						Add Goal
					</button>
				</div>
			</form>
    </>
  )
}


export default AddGoal