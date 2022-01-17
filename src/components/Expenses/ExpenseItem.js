import ExpenseDate from './ExpenseDate';
import "./ExpenseItem.css";
import Card from "../UI/Card";
import IconX from "../IconsComponents/IconX";
import IconEdit from "../IconsComponents/IconEdit";

const ExpenseItem = (props) => {
    const handleDelete = (expense) => {
        expense = props.expense;
        props.onDelete(expense);
    };

    const handleEdit = (expense) => {
        expense = props.expense;
        props.onEdit(expense);
        props.onGetId(expense.id);
    };

    return (
        <li>
            <Card className="expense-item">
                <ExpenseDate date={props.date}/>
                <div className="expense-item__description">
                    <h2>{props.title}</h2>
                    <div className="expense-item__price">{props.amount}</div>
                </div>
                <button
                    className={`expense-item__icon-btn ${props.toggleDelete ? "show" : ""}`}
                    type='button'
                    onClick={handleDelete}>
                    <IconX height="2em" width="2em" color="white" strokeWidth="0.3em"/>
                </button>
                <button
                    className={`expense-item__icon-btn ${props.toggleEdit ? "show" : ""}`}
                    type='button'
                    onClick={handleEdit}>
                    <IconEdit height="2em" width="2em" color="white" strokeWidth="0.2em"/>
                </button>
            </Card>
        </li>
    );
}

export default ExpenseItem;