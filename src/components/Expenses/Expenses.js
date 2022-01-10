import './Expenses.css';

import ExpensesList from "./ExpensesList";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import {useState} from "react";


function Expenses(props) {
    const [selectedYear, setSelectedYear] = useState("2022");

    const handleSelectYear = (selectedYear) => {
        setSelectedYear(selectedYear);
    };

    const filterExpensesByYear = props.expenses.filter((expense) => {
        return expense.date.getFullYear() === parseInt(selectedYear);
    });

    return (
        <div>
            <Card className='expenses'>
                <ExpensesFilter
                    selected={selectedYear}
                    onYearChange={handleSelectYear}
                />
                <ExpensesChart expenses={filterExpensesByYear}/>
                <ExpensesList expenses={filterExpensesByYear}/>
            </Card>
        </div>
    );
}

export default Expenses;