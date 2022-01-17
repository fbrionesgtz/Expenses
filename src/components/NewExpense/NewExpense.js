import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import {useState} from "react";

const NewExpense = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState({
        id: "",
        title: "",
        amount: "",
        date: ""
    });

    const saveExpenseDataHandler = (enteredExpenseData, toUpdate) => {
        const expenseDataToAdd = {
            ...enteredExpenseData,
            id: Math.random().toString(),
            amount: parseFloat(enteredExpenseData.amount)
        }

        const expenseDataToUpdate = {
            ...enteredExpenseData,
            id: props.expenseId,
            amount: parseFloat(enteredExpenseData.amount)
        }

        !toUpdate ? props.onAddExpense(expenseDataToAdd) : props.onUpdateExpenseData(expenseDataToUpdate);
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleAddNewExpense = () => {
        setShowForm(true);
    };

    if (props.editExpenseData !== undefined && expenseToEdit.id !== props.editExpenseData.id) {
        setExpenseToEdit(props.editExpenseData);
        setShowForm(true);
    }

    return (
        <div className="new-expense">
            {(!showForm) ? <button onClick={handleAddNewExpense}>Add New Expense</button> :
                <ExpenseForm
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={handleCancel}
                    editExpenseData={props.editExpenseData}
                />
            }
        </div>
    );
}

export default NewExpense;