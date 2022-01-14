import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = (props) => {
    const handleDelete = (expense) => {
        props.onDelete(expense);
    };

    const handleEdit = (expense) => {
        props.onEdit(expense);
    };

    if (props.expenses.length === 0) {
        return <h2 className="expenses-list__fallback">No expenses found.</h2>;
    }

    return <ul className="expenses-list">
        {props.expenses.map((expense) => (
            <ExpenseItem
                expense={expense}
                key={expense.id}
                title={expense.title}
                amount={expense.amount}
                date={expense.date}
                onDelete={handleDelete}
                onEdit={handleEdit}
                toggleDelete={props.toggleDelete}
                toggleEdit={props.toggleEdit}
            />))}
    </ul>;
}

export default ExpensesList;