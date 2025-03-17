'use client'
import React from 'react'

function getYears() {
    const years = [];
    for (let i = 2020; i <= (new Date()).getFullYear(); i++) { // gli anni partono dal 2020 perche` prima c'erano i PDF.2
        years.push(i);
    }
    return years;
}

export function YearSelector({defaultYear}) {
    const years = getYears();
    return (
        <select id="year" defaultValue={defaultYear} className="select" onChange={function () {
            window.location.href = `/year/${document.getElementsByTagName("select")[0].selectedIndex + 2019}`
        }}>
            <option disabled={true}>Scegli l'anno</option>
            {years.map(year => (
                <option key={year}>{year}</option>
            ))}
        </select>
    )
}

export default YearSelector;