import { useState, useEffect } from 'react';
import ChangeDate from './changeDate';
import { Chart } from "react-google-charts";


export default function BudgetDashboard( { transactions } ) {

    const[currentDate, setCurrentDate] = useState(new Date(2024, 0));
    const[currentPage, setCurrentPage] = useState(0);

    const newTransactions = transactions.filter((t) => new Date(t.date).getMonth() == currentDate.getMonth() && new Date(t.date).getFullYear() == currentDate.getFullYear());
    const sortedTransactions = newTransactions.sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        
        return bDate.getTime() - aDate.getTime()
    });

    const[transactionsByMonth, setTransactionsByMonth] = useState(sortedTransactions);
    const[transactionsByMonthByCategory, setTransactionsByMonthByCategory] = useState(Object.groupBy(newTransactions, transaction => transaction.category));
    const[totalAmountMonth, setTotalAmountMonth] = useState(newTransactions.reduce((total, transaction)=>  total + transaction.amount,0));

    const nombrePage = Math.round(newTransactions.length/5);

    const getTransactionsByMonth = ( value ) => {
        const newDate = new Date(currentDate.getFullYear(),currentDate.getMonth() + value);

        const newTransactions = transactions.filter((t) => new Date(t.date).getMonth() == newDate.getMonth() && new Date(t.date).getFullYear() == newDate.getFullYear());
        const sortedTransactions = newTransactions.sort((a, b) => {
            const aDate = new Date(a.date)
            const bDate = new Date(b.date)
            
            return bDate.getTime() - aDate.getTime()
        })
        const transactionsByMonthByCategory = Object.groupBy(newTransactions, transaction => transaction.category);
        const totalAmountMonth = newTransactions.reduce((total, transaction)=>  total + transaction.amount,0);

        setTransactionsByMonthByCategory(transactionsByMonthByCategory);
        setTotalAmountMonth(totalAmountMonth);
        setTransactionsByMonth(sortedTransactions);

        return newDate;
    };

    const handleClickPrev = () => {
        const newDate = getTransactionsByMonth(-1);
        setCurrentDate(newDate);
    };

    const handleClickNext = () => {
        const newDate = getTransactionsByMonth(1);
        setCurrentDate(newDate);
    };

    const dateTransaction = new Date(transactionsByMonth.date);
    const month = dateTransaction.getMonth();
    const year = dateTransaction.getFullYear();
    
    const data = [["Task", "Hours per Day"]];

    Object.entries(transactionsByMonthByCategory).map((t,i) => {
        const totalAmountCategory = t[1].reduce((total, transaction)=>  total + transaction.amount,0);

        return ( data.push([t[1][0].category,totalAmountCategory]))
    });
    
    const options = {
        title: "Expenses by category",
    };

    return (
        <>     
             <div key={month+year} style={{backgroundColor:"#f7f3fc"}}>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <ChangeDate currentDate={currentDate} handleClickPrev={handleClickPrev} handleClickNext={handleClickNext}></ChangeDate>
                    <p>Total spend this month : ${transactionsByMonth.length > 0 && totalAmountMonth.toFixed(2)} </p>
                </div>
                { transactionsByMonth.length > 0 && 
                <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        width: "100%",
                        alignItems: "flex-start"
                    }}>

                    <div style={{flex: 1,minWidth: 0}}>
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width="100%"
                            height="400px"
                        />
                    </div>

                    <div style={{
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px"
                    }}>

                        <table style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}>
                            <thead>
                                <tr>
                                    <th>PAYEE</th>
                                    <th>DATE</th>
                                    <th>AMOUNT</th>
                                    <th>CATEGORY</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactionsByMonth
                                    .slice(currentPage * 5, currentPage * 5 + 5)
                                    .map((t, i) => (
                                        <tr key={t.date + t.category + t.amount}>
                                            <th>{t.payee}</th>
                                            <td>{t.date}</td>
                                            <td>{t.amount}</td>
                                            <td>{t.category}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "12px"
                        }}>
                            {Array(nombrePage).fill().map((a, i) => (
                                <button
                                    key={i}
                                    style={{
                                        border: "none",
                                        padding: "6px 12px",
                                        textDecoration: "none",
                                        borderRadius: "5px",
                                        backgroundColor: currentPage === i ? "#333" : "#eee",
                                        color: currentPage === i ? "white" : "#333",
                                        cursor: "pointer"
                                    }}
                                    onClick={()=>{
                                        setCurrentPage(i);
                                    }} 
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>}
            </div>
        </>
    )
}

