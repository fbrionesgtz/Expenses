import React from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import Menu from "./components/Menu/Menu";
import {useState, useEffect} from "react";
import useHttp from "./hooks/use-http";

function App() {
    const [expenses, setExpenses] = useState([]);
    const [action, setAction] = useState();
    const [toggleDelete, setToggleDelete] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState();
    const [expenseId, setExpenseId] = useState();
    const [wasDeleted, setWasDeleted] = useState(false);
    const {sendRequest} = useHttp();

    useEffect(() => {
        const transformExpenses = (expenses) => {
            let transformedExpenses = [];
            for (const key in expenses) {
                const [year, month, day] = expenses[key].date.split(",");

                transformedExpenses.push({
                    id: expenses[key].id,
                    title: expenses[key].title,
                    amount: expenses[key].amount,
                    date: new Date(parseInt(year), parseInt(month), parseInt(day))
                });
            }
            setExpenses(transformedExpenses);
        }
        sendRequest({url: "https://expenses-4b105-default-rtdb.firebaseio.com/expenses.json"}, transformExpenses);
    }, [sendRequest]);

    const addExpenseHandler = expense => {
        setExpenses((prevExpenses) => {
            return [...prevExpenses, expense];
        });

        sendRequest({
            url: "https://expenses-4b105-default-rtdb.firebaseio.com/expenses.json",
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                [expense.id]: {
                    id: expense.id,
                    title: expense.title,
                    amount: expense.amount,
                    date: `${expense.date.getFullYear()},${expense.date.getMonth()},${expense.date.getDay()}`
                }
            }
        });
    };

    const updateExpenseHandler = expense => {

        expenses.forEach(currentExpense => {
            if (expense.id === currentExpense.id) {
                handleDelete(currentExpense);
                addExpenseHandler(expense);
            }
        });

        sendRequest({
            url: `https://expenses-4b105-default-rtdb.firebaseio.com/expenses/${expense.id}.json`,
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                id: expense.id,
                title: expense.title,
                amount: expense.amount,
                date: `${expense.date.getFullYear()},${expense.date.getMonth()},${expense.date.getDay()}`
            }
        });
    }

    const handleGetId = (id) => {
        setExpenseId(id);
    };

    const handleDelete = expense => {
        setWasDeleted(true);
        setExpenses(expenses.filter(e => {
            return e.id !== expense.id;
        }));

        sendRequest({
            url: `https://expenses-4b105-default-rtdb.firebaseio.com/expenses/${expense.id}.json`,
            method: "DELETE"
        });
    };

    const handleEdit = expense => {
        setExpenseToEdit(expense);
    };

    const showDeleteIcon = (checked) => {
        if (checked) {
            setToggleDelete(true);
        } else {
            setToggleDelete(false);
        }
    };

    const showEditIcon = (checked) => {
        if (checked) {
            setToggleEdit(true);
        } else {
            setToggleEdit(false);
        }
    };

    const handleToggle = (checked, action) => {
        if (action === "delete" && checked) {
            if (toggleEdit) {
                showEditIcon(false);
            }
            setAction(action);
            showDeleteIcon(checked);
        } else if (action === "delete" && !checked) {
            setAction("");
            showDeleteIcon(checked);
        } else if (action === "edit" && checked) {
            if (toggleDelete) {
                showDeleteIcon(false);
            }
            setAction(action);
            showEditIcon(checked);
        } else if (action === "edit" && !checked) {
            setAction("");
            showEditIcon(checked);
        }
    };

    return (
        <React.Fragment>
            <Menu
                onToggle={handleToggle}
                action={action}
            />
            <NewExpense
                expenseId={expenseId}
                onAddExpense={addExpenseHandler}
                onUpdateExpenseData={updateExpenseHandler}
                editExpenseData={expenseToEdit}
                onSetExpenseToEdit={setExpenseToEdit}
                wasDeleted={wasDeleted}
                onSetWasDeleted={setWasDeleted}
            />
            <Expenses
                expenses={expenses}
                toggleDelete={toggleDelete}
                toggleEdit={toggleEdit}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onGetId={handleGetId}
            />
        </React.Fragment>
    );
}

export default App;
