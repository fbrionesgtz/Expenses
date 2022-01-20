import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import {useState, useEffect} from "react";

const NewExpense = (props) => {
    const [showForm, setShowForm] = useState(false);

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

    const setExpenseToEditHandler = (value) => {
        props.onSetExpenseToEdit(value);
    };

    useEffect(() => {
        if (props.editExpenseData === undefined) {
            return;
        }
        setShowForm(true);
    }, [props.editExpenseData]);

    useEffect(() => {
        if (props.wasDeleted) {
            setShowForm(false);
        }

        return () => {
            props.onSetWasDeleted(false);
        }
    }, [props.wasDeleted]);

    return (
        <div className="new-expense">
            {(!showForm) ? <button onClick={handleAddNewExpense}>Add New Expense</button> :
                <ExpenseForm
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={handleCancel}
                    onSetExpenseToEdit={setExpenseToEditHandler}
                    editExpenseData={props.editExpenseData}
                />
            }
        </div>
    );
}

export default NewExpense;