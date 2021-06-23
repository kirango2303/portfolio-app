import React, { useEffect, useRef } from 'react'
import CompanyCard from '../CompanyCard/CompanyCard'
const data = ["AAPL", "MSFT", "GOOGL", "GPC", "GPN", "GPS", "GRMN"]

const Filter = () => {
    return (
        <div className="container">
            <CompanyCard companyName="AAPL"/>
            <CompanyCard companyName="MSFT"/>
            {/* <CompanyCard companyName="GOOGL"/> */}
            <CompanyCard companyName="FB"/>

        </div>
    )
}

export default Filter
