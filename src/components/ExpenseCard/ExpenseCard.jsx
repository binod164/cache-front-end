function ExpenseCard({expense, handleDeleteExpense}) {
  return (  
    <>
    <h1>Expense Card</h1>
    <div>
      <h3>{expense.name}</h3>
      <p>{expense.amount}</p>
      <p>{expense.date}</p>
      <button onClick={() => handleDeleteExpense(expense._id)} >X</button>
    </div>
    </>
  );
}

export default ExpenseCard;