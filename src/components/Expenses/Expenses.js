import './Expenses.css';
import "../UI/Button/Button.css";
import ExpensesList from "./ExpensesList";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import {useState} from "react";
import Modal from "../UI/Modal/Modal";
import ModalForm from "../UI/ModalForm/ModalForm";

function Expenses(props) {
    const [selectedYear, setSelectedYear] = useState("2022");
    const [expenseToDelete, setExpenseToDelete] = useState();
    const [showModal, setShowModal] = useState(false);

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

    const handleShowModal = () => {
        setShowModal(prevState => {
            return !prevState;
        });
    }

    return (
        <div>
            {showModal &&
            <Modal>
                <ModalForm
                    prompt="Are you sure you want to delete the expense?"
                    btnYesOnClick={() => {
                        handleDelete(expenseToDelete);
                        handleShowModal();
                    }}
                    btnNoOnClick={handleShowModal}
                />
            </Modal>}
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
                    onDelete={expense => {
                        setExpenseToDelete(expense);
                        handleShowModal();
                    }}
                    onEdit={handleEdit}
                    onGetId={handleGetId}
                />
            </Card>
        </div>
    );
}

export default Expenses;