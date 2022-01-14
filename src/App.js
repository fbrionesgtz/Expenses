import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import {useState} from "react";
import Menu from "./components/Navigation/Menu";

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

function App(props) {
    const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
    const [action, setAction] = useState();
    const [toggleDelete, setToggleDelete] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState();

    const addExpenseHandler = expense => {
        // setExpenses([expense, ...expenses]);
        setExpenses((prevExpenses) => {
            return [...prevExpenses, expense];
        });
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
        if(checked){
            setToggleDelete(true);
        } else {
            setToggleDelete(false);
        }
    };

    const showEditIcon = (checked) => {
        if(checked){
            setToggleEdit(true);
        } else {
            setToggleEdit(false);
        }
    };

    const handleToggle = (checked, action) => {
        if (action === "delete" && checked) {
            if(toggleEdit){
                showEditIcon(false);
            }
            setAction(action);
            showDeleteIcon(checked);
        } else if(action === "delete" && !checked){
            setAction("");
            showDeleteIcon(checked);
        }else if (action === "edit" && checked) {
            if(toggleDelete){
                showDeleteIcon(false);
            }
            setAction(action);
            showEditIcon(checked);
        } else if(action === "edit" && !checked){
            setAction("");
            showEditIcon(checked);
        }
    };

    return (
        <div>
            <Menu
                onToggle={handleToggle}
                action={action}
            />
            <NewExpense
                onAddExpense={addExpenseHandler}
                editExpenseData={expenseToEdit}
            />
            <Expenses
                expenses={expenses}
                toggleDelete={toggleDelete}
                toggleEdit={toggleEdit}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
}

export default App;
