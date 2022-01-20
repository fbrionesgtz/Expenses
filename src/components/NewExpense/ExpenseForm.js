import "./ExpenseForm.css";
import {useState, useEffect} from "react";

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState("");
    const [buttonText, setButtonText] = useState("Add Expense");
    const [dataGathered, setDataGathered] = useState();

    const clearFormHandler = () => {
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");
    };

    const populateForm = (expense) => {
        setEnteredTitle(expense.title);
        setEnteredAmount(expense.amount);
        setEnteredDate(expense.date);
    }

    const cancelHandler = () => {
        clearFormHandler();
        props.onCancel();
    };

    const titleChangeHandler = (e) => {
        setEnteredTitle(e.target.value);
    };

    const amountChangeHandler = (e) => {
        setEnteredAmount(e.target.value);
    };

    const dateChangeHandler = (e) => {
        setEnteredDate(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate)
        };

        props.onSaveExpenseData(expenseData, dataGathered);
        setDataGathered(false);
        setButtonText("Add Expense");
        clearFormHandler();
    };

    useEffect(() => {
        if (props.editExpenseData === undefined) {
            return;
        } else {
            setDataGathered(true);
            setButtonText("Edit Expense");
            clearFormHandler();
            populateForm(props.editExpenseData);
        }

        return () => {
            props.onSetExpenseToEdit(undefined);
        }
    }, [props.editExpenseData]);

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input
                        type="text"
                        value={enteredTitle}
                        onChange={titleChangeHandler}
                    />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={enteredAmount}
                        onChange={amountChangeHandler}
                    />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input
                        type="date"
                        min="2019-01-01"
                        value={enteredDate}
                        onChange={dateChangeHandler}
                    />
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={cancelHandler}>Cancel</button>
                <button type="submit">{buttonText}</button>
            </div>
        </form>
    );
}

export default ExpenseForm;