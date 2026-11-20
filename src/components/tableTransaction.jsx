import { useState, useEffect } from 'react';
import Pagination from './pagination';


export default function TableTransaction( { tableValue } ) {

    const[currentPage, setCurrentPage] = useState(0);
    const nombrePage = Math.round(tableValue.length/5);

    return (
        <>
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
                {tableValue.slice(currentPage * 5, currentPage * 5 + 5).map((t, i) => (
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
        <Pagination nombrePage={nombrePage} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
        </>
    )
}