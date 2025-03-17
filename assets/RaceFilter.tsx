"use client"
import React from "react";

const ResultsTable = () => {
    return (
        <div className="flex flex-row self-center justify-self-center mx-auto gap-4">
            <label className="input flex items-center gap-4">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                <input type="search" className="grow" placeholder="Search" />
            </label>
            <button className="btn" onClick={() => (window.location.href = window.location.href.split("?")[0] + "?query=" + document.getElementsByTagName("input")[0].value.replace(" ", "+"))}>
                Cerca
            </button>
        </div>

);
};

export default ResultsTable;