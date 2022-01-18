import React from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import Menu from "./components/Menu/Menu";
import {useState} from "react";

const DUMMY_EXPENSES = [
    {
        id: 1,
        title: 'Toilet Paper',
        amount: 94.12,
        date: new Date(2020, 7, 14),
    },
    {
        id: 2,
        title: 'New TV',
        amount: 799.49,
        date: new Date(2021, 2, 12)
    },
    {
        id: 3,
        title: 'Car Insurance',
        amount: 294.67,
        date: new Date(2021, 2, 28),
    },
    {
        id: 4,
        title: 'New Desk (Wooden)',
        amount: 450,
        date: new Date(2021, 5, 12),
    }
];

function App() {
    const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
    const [action, setAction] = useState();
    const [toggleDelete, setToggleDelete] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState();
    const [expenseId, setExpenseId] = useState();

    const addExpenseHandler = expense => {
        // setExpenses([expense, ...expenses]);
        setExpenses((prevExpenses) => {
            return [...prevExpenses, expense];
        });
    };

    const updateExpenseHandler = expense => {
        expenses.forEach(currentExpense => {
            if (expense.id === currentExpense.id) {
                handleDelete(currentExpense);
                addExpenseHandler(expense);
            }
        });
    }

    const handleGetId = (id) => {
        setExpenseId(id);
    };

    const handleDelete = expense => {
        setExpenses(expenses.filter(e => {
            return e.id !== expense.id;
        }));
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
                onSetExpenseToEdit={setExpenseToEdit}
                editExpenseData={expenseToEdit}
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
