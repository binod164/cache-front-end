import IncomeCard from "../../components/IncomeCard/IncomeCard";
import ExpenseCard from "../../components/ExpenseCard/ExpenseCard";

const Transactions = (props) => {
  return (  
    <>
    <h1>Transactions</h1>
    <div>
      {props.incomes.map(income => (
        <IncomeCard key={income._id} income={income} handleDeleteIncome={props.handleDeleteIncome} />
      ))}
    </div>
    <div>
      {props.expenses.map(expense => (
        <ExpenseCard key={expense._id} expense={expense} handleDeleteExpense={props.handleDeleteExpense} />
      ))}
    </div>
    </>
  )
}
 
export default Transactions;