import { useState, useEffect } from 'react';


export default function Pagination( { nombrePage, currentPage,  setCurrentPage} ) {
    
    return (
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
    )
}