import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import {useState} from "react";

const NewExpense = (props) => {
    const [showForm, setShowForm] = useState(false);

    const saveExpenseDataHandler = (enteredExpenseData) => {
      const expenseData = {
          ...enteredExpenseData,
          id: Math.random().toString()
      }
      props.onAddExpense(expenseData);
      setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleAddNewExpense = () => {
      setShowForm(true);
    };

    return (
        <div className="new-expense">
            {(!showForm) ? <button onClick={handleAddNewExpense}>Add New Expense</button> :
                <ExpenseForm
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={handleCancel}
                />
            }
        </div>
    );
}

export default NewExpense;