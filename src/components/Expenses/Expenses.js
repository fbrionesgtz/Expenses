import './Expenses.css';

import ExpensesList from "./ExpensesList";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import {useState} from "react";

function Expenses(props) {
    const [selectedYear, setSelectedYear] = useState("2022");

    const filterExpensesByYear = props.expenses.filter((expense) => {
        return expense.date.getFullYear() === parseInt(selectedYear);
    });

    const handleSelectYear = (selectedYear) => {
        setSelectedYear(selectedYear);
    };

    const handleDelete = (expense) => {
        props.onDelete(expense);
    };

    const handleEdit = (expense) => {
        props.onEdit(expense);
    };

    const handleGetId = (id) => {
        props.onGetId(id);
    };

    return (
        <div>
            <Card className='expenses'>
                <ExpensesFilter
                    selected={selectedYear}
                    onYearChange={handleSelectYear}
                />
                <ExpensesChart expenses={filterExpensesByYear}/>
                <ExpensesList
                    expenses={filterExpensesByYear}
                    toggleDelete={props.toggleDelete}
                    toggleEdit={props.toggleEdit}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onGetId={handleGetId}
                />
            </Card>
        </div>
    );
}

export default Expenses;